'use client'
import { db } from "@/firebase";
import { useUser, UserButton } from "@clerk/nextjs";
import Image from 'next/image'; // Correct import for Image
import { AppBar, Toolbar, Container, Box, Typography, Paper, TextField, Button, Grid, Card, CardActionArea, CardContent, DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog } from "@mui/material";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

function Footer(){
    return (
        <Box
        sx={{
            background: 'linear-gradient(to left, #de6161, #92EFFD)',
        color: 'white',
        textAlign: 'center',
        py: 2, 
        mt: 'auto',
        }}>
        <Typography variant ="body3">
        © 2024 Created by Anthony Tommaso.
        </Typography>
        </Box>
    )
}

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();
    
    const handleSubmit = async () => {
        fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }), 
        })
        .then((res) => res.json())
        .then((data) => setFlashcards(data))
        .catch((error) => {
            console.error("Error fetching flashcards:", error);
        });
    };

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveFlashcards = async () => {
        if (!name.trim()) {
            alert("Please enter a name for your flashcard set.");
            return;
        }
    
        setIsSaving(true);
        try {
            const userDocRef = doc(collection(db, "users"), user.id);
            const userDocSnap = await getDoc(userDocRef);
    
            const batch = writeBatch(db);
    
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                const updatedSets = [
                    ...(userData.flashcardSets || []),
                    { name }
                ];
                batch.update(userDocRef, { flashcardSets: updatedSets });
            } else {
                batch.set(userDocRef, { flashcardSets: [{ name }] });
            }
    
            const setDocRef = doc(collection(userDocRef, "flashcardSets"), name);
            flashcards.forEach((flashcard) => {
                const cardDocRef = doc(collection(setDocRef, "cards")); 
                batch.set(cardDocRef, flashcard);
            });
    
            await batch.commit();
    
            alert("Flashcards saved successfully!");
            handleClose();
            setName("");
            setFlashcards([]); // Clear flashcards after saving
            router.push('/flashcards');
        } catch (error) {
            console.error("Error saving flashcards:", error);
            alert("An error occurred while saving flashcards. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };    
    

if(!isLoaded){
    return <div>Generating . . . </div>
}

if (!isSignedIn) {
    return (
      <Container maxWidth="sm" sx={{
        background: 'linear-gradient(to bottom, #de6161, #92EFFD)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>Hold Up!</Typography>
        <Box sx = {{mb:4}} >
            <Image 
            src="/halt.png" 
            alt = "Hold Up"
            width = {200}
            height = {200}
            objectFit = "contain"
            />
        </Box>
        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
          Please log in or create an account to access the flashcard generator. This will also allow you to view your saved collections, inquire billing, and more.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" href="/Sign-in">
            Login
          </Button>
          <Button variant="contained" color="secondary" href="/Sign-up">
            Sign Up
          </Button>
        </Box>
      </Container>
    );
}


return (
    <Box
        sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(to bottom, #de6161, #92EFFD)',
        }}
    >
        <AppBar
            position="relative" 
            sx={{
                background: 'linear-gradient(to right, #de6161, #92EFFD)',
                boxShadow: 3,
                borderRadius: 2,
                mt: 2, 
                mx: 2, 
                px: 2, 
                py: 1, 
                width: 'calc(100% - 32px)', 
            }}
        >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    The Generator!
                </Typography>
                <Button color="inherit" sx={{ marginRight: 170 }} href="/Explanation">What is this?</Button>
                <Button color="inherit">
                    <Link href="/" passHref>
                        Home
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link href="/Features" passHref>
                        Features
                    </Link>
                </Button>
                {isSignedIn ? (
                    <UserButton />
                ) : (
                    <>
                        <Button color="inherit">
                            <Link href="/Sign-in" passHref>
                                Login
                            </Link>
                        </Button>
                        <Button color="inherit">
                            <Link href="/Sign-up" passHref>
                                Sign Up
                            </Link>
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>

        <Container maxWidth="md">
            <Box
                sx={{
                    mt: 4,
                    mb: 6,
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4">Create Your Flashcards!</Typography>
                <Paper sx={{ p: 4, width: '100%' }}>
                    <TextField
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        label="Enter text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleSubmit}
                        fullWidth
                    >
                        Generate
                    </Button>
                </Paper>
            </Box>

            {flashcards.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5">Your study set:</Typography>
                    <Grid container spacing={4}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardActionArea onClick={() => handleCardClick(index)}>
                                        <CardContent>
                                            <Box sx={{
                                                perspective: '1000px',
                                                '& > div': {
                                                    transition: 'transform 0.4s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '200px',
                                                    boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                                                    transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                },
                                                '& > div > div': {
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    boxSizing: 'border-box'
                                                },
                                                '& > div > div:nth-of-type(2)': {
                                                    transform: 'rotateY(180deg)',
                                                }
                                            }}>
                                                <div>
                                                    <div>
                                                        <Typography variant="h5" component="div">
                                                            {flashcard.front}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="h5" component="div">
                                                            {flashcard.back}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Button variant='contained' color='secondary' onClick={handleOpen}>
                            Save
                        </Button>
                    </Box>
                </Box>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save Flashcards</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a name for your new collection.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Collection Name'
                        type='text'
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={saveFlashcards} disabled={isSaving}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>

        <Footer />
    </Box>
)};