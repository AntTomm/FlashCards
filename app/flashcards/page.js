'use client';
import { SignedOut, useUser, SignedIn, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Card, CardActionArea, CardContent, AppBar, Toolbar, Button } from "@mui/material";
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

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcardSets() {
      if (!user) return;

      const userDocRef = doc(db, "users", user.id);

      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        const sets = userData.flashcardSets || [];
        console.log("Retrieved flashcard sets:", sets);
        setFlashcardSets(sets);
      } else {
        console.log("No such document!");
      }
    }
    getFlashcardSets();
  }, [user]);

  if (!isLoaded) return <div>Loading...</div>;

  if (!isSignedIn) {
    return (
      <Container maxWidth="sm">
        <Box mt={8} mb={12} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" component="h1" gutterBottom>
            Flashcard Sets
          </Typography>
          <Box width="100%" p={3} display="flex" justifyContent="center" bgcolor="white" boxShadow={3} borderRadius={1}>
            <Typography variant="body1" color="error">
              You must sign in first to view flashcard sets.
            </Typography>
          </Box>
        </Box>
      </Container>
    );
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
                FlashBrain AI
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
              <Button color="inherit" href="/Prices">Pricing</Button>
            </SignedIn>
          </Toolbar>
        </AppBar>
      </Container>


    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" my={4}>
        Your Flashcard Sets
      </Typography>
      {flashcardSets.length === 0 ? (
        <Box textAlign="center" color="text.secondary">
          Hold up! You dont have any sets to review. How about making one first?
        </Box>
      ) : (
        <Grid container spacing={4}>
          {flashcardSets.map((set, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined" sx={{ cursor: 'pointer', boxShadow: 1, '&:hover': { boxShadow: 3 } }}>
              <CardActionArea onClick={() => router.push(`/flashcard?id=${set.name}`)}>
                  <CardContent>
                    <Typography variant="h6" component="div" align="center">
                      {set.name || `Set ${index + 1}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
    <Footer/>
    </Box>
  );
}
