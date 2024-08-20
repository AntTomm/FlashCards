'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { doc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box, AppBar, Toolbar, Button } from "@mui/material";
import Link from "next/link";

function Footer() {
    return (
      <Box
        sx={{
          background: 'linear-gradient(to left, #de6161, #92EFFD)',
          color: 'white',
          textAlign: 'center',
          py: 2, 
          mt: 'auto', 
        }}>
        <Typography variant="body3">
          © 2024 Created by Anthony Tommaso.
        </Typography>
      </Box>
    );
  }

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});
    const searchParams = useSearchParams();
    const search = searchParams.get('id');

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return;

            const flashcardSetsRef = collection(db, "users", user.id, "flashcardSets", search, "cards");
            const querySnapshot = await getDocs(flashcardSetsRef);
            const flashcardsArray = [];
            querySnapshot.forEach((doc) => {
                flashcardsArray.push({ id: doc.id, ...doc.data() });
            });
            setFlashcards(flashcardsArray);
        }
        getFlashcard();
    }, [user, search]);

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    if (!isLoaded || !isSignedIn) {
        return <div>Loading...</div>;
    }

    return (
        <Box
      sx={{
        background: 'linear-gradient(to bottom, #de6161, #92EFFD)', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container maxWidth="lg">
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
            <SignedOut>
              <Typography variant='h6' sx={{ flexGrow: 1 }}>
                Pricing
              </Typography>
              <Button color="inherit">
                <Link href="/" passHref>
                  Home
                </Link>
              </Button>
              <Button color="inherit">
                <Link href="/Sign-in" passHref>
                  Sign in 
                </Link>
              </Button>
              <Button color="inherit">
                <Link href="/Sign-up" passHref>
                  Sign Up
                </Link>
              </Button>
              <Button color="inherit">
                <Link href="/Features" passHref>
                  Features
                </Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Typography variant='h6' sx={{ flexGrow: 1 }}>
                Your Flashcards
              </Typography>
              <UserButton/>
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
            </SignedIn>
          </Toolbar>
        </AppBar>
      </Container>

        <Container maxWidth="md">
            <Grid container spacing={3} sx={{ mt: 4 }}>
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
        </Container>
        <Footer/>
        </Box>
    );
}
