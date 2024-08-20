import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
import Head from "next/head";

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

export default function Home() {
  
  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #de6161, #92EFFD)', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
      >
      <Head>
        <title>FlashBrain AI</title>
        <meta name="description" content='FlashBrain AI: the most innovative study buddy!' />
      </Head>

      <Container maxWidth="lg">
        <AppBar
            position="relative" 
            sx={{
                background: 'linear-gradient(to right, #de6161, #92EFFD)',
                boxShadow: 3,
                borderRadius: 2,
                mt: 1, 
                mx: 2, 
                px: 2, 
                py: 1, 
                width: 'calc(100% - px)', 
            }}
        >
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 2 }}>FlashBrain AI</Typography>
            <SignedOut>
            <Button color="inherit" sx={{ marginRight: 25 }} href="/Explanation">What is this?</Button>
              <Button color="inherit" href="/Sign-in">Lock in</Button>
              <Button color="inherit" href="/Sign-up">Sign Up</Button>
              <Button color="inherit" href="/Features">Features</Button>
              <Button color="inherit" href="/Prices">Pricing</Button>
            </SignedOut>
            <SignedIn>
            <Button color="inherit" sx={{ marginRight: 25 }} href="/Explanation">What is this?</Button>
              <UserButton />
              <Button color="inherit" sx={{ marginLeft: 1 }}href="/flashcards">your sets</Button>
              <Button color="inherit" sx={{ marginRight: 2 }}href="/Features">Features</Button>
              <Button color="inherit" href="/Prices">Pricing</Button>
            </SignedIn>
          </Toolbar>
        </AppBar>
      </Container>

      <Box sx={{
        textAlign: 'center',
        my: 40,
      }}>
        <Typography variant="h2" className="fade-in-text">Welcome to your new study system.</Typography>
        <Typography variant="h5" className="fade-in-text2">
          The MOST EFFICIENT method for crafting flashcards from the ground up.
        </Typography>
        <Button variant='contained' color='primary' sx={{ mt: 2 }} href="/generate">Lets Go!</Button>
      </Box>
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
          </Grid>
        </Grid>
      </Box>
      <Footer/>
    </Box>
  );
}
