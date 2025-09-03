import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:

1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the users specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate 10 flashcards 

Remember, the goal is to facilitate extremely effective learning & rentetion with the user of information through these flashcards. You can also quiz the user on the
given flashcards if they ask you to.

Return in the following JSON format:
{
    "flashcards": [
        {
            "front": "string",
            "back": "string"
        }
    ]
}
`;

export async function POST(req) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
    try {
      // Accept either JSON {prompt} or raw text
      let userInput = "";
      const type = req.headers.get("content-type") || "";
      if (type.includes("application/json")) {
        const body = await req.json();
        userInput = typeof body === "string" ? body : body?.prompt ?? "";
      } else {
        userInput = await req.text();
      }
  
      if (!userInput?.trim()) {
        return NextResponse.json({ error: "Empty prompt" }, { status: 400 });
      }
  
      const r = await openai.responses.create({
        model: "gpt-4.1-mini",
        input: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userInput }
        ],
        text: { 
            format: { type: "json_object" }
        }
      });
  
      const text = r.output_text; 
  
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (e) {
        console.error("Model returned non-JSON:", text);
        return NextResponse.json(
          { error: "Model returned malformed JSON" },
          { status: 502 }
        );
      }
  
      if (!parsed?.flashcards || !Array.isArray(parsed.flashcards)) {
        return NextResponse.json(
          { error: "Missing flashcards[] in response" },
          { status: 502 }
        );
      }
  
      return NextResponse.json(parsed.flashcards, { status: 200 });
    } catch (err) {
      const status = err.status ?? err.response?.status ?? 500;
      const details = err.response?.data ?? err.message ?? "unknown";
      console.error("OpenAI upstream:", status, details);
      return NextResponse.json({ error: "Upstream", status, details }, { status });
    }
  }
