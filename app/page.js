import Image from "next/image"
import getStripe from "@/utils/get-stripe"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid } from "@mui/material"
import Head from "next/head"

export default function Home() {
  return (
<Container maxWidth="lg"
sx= {{
  background: 'linear-gradient(to bottom, #4E65FF, #92EFFD))', 
    minHeight: '100vh',
    display: 'flex', 
    flexDirection: 'column',
}}>
  <Head>
    <title>Flashcard SaaS</title>
    <meta name = "description" content = 'Create flashcards from your own text!'/>
  </Head>

  <AppBar position="static">
    <Toolbar>
      <Typography variant = "h6" style={{flexGrow: 1}}>Flashcard </Typography>
      <SignedOut>
        <Button color = "inherit" href="/Sign-in">Lock in</Button>
        <Button color = "inherit" href="/Sign-up">Sign Up</Button>
        <Button color = "inherit">Features</Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </Toolbar>
  </AppBar>

  <Box sx={{
    textAlign: 'center',
    my: 2,
  }}>
    <Typography variant = "h2">Welcome to your new study system.</Typography>
    <Typography variant = "h5">
     {' '}
     The MOST EFFICIENT method for crafting flashcards from the ground up.
       </Typography>
       <Button variant= 'contained' color = 'primary' sx = {{mt: 2}}>Jump In</Button>
  </Box>
  <Box sx = {{my: 5}}>
    <Typography variant = "h4">
      Features:
    </Typography>
    <Grid contained spacing = {4}>
      <Grid items xs={12} md={4}>
        <Typography variant = "h6">Effortless Text Entry</Typography>
        <Typography>Just drop in your text, and watch our software work its magic. Flashcard creation has never been this simple—or this fun!
        </Typography>
      </Grid>
    </Grid>
    <Grid contained spacing = {4}>
      <Grid items xs={12} md={4}>
        <Typography variant = "h6">Seamless OpenAI Integration</Typography>
        <Typography>Unlock the power of AI with a single click. Integrate OpenAI effortlessly and elevate your flashcard creation to a whole new level!
        </Typography>
      </Grid>
      <Grid contained spacing = {4}>
      <Grid items xs={12} md={4}>
        <Typography variant = "h6">Easily Accessible</Typography>
        <Typography>Access your flashcards anytime, anywhere.
        </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Box>
  <Box sx={{ my: 6, textAlign: 'center' }}>
  <Typography variant="h4">Pricing</Typography>
  <Grid container spacing={4} justifyContent="center">
    <Grid item xs={12} md={4}>
      <Box
        sx={{
          p: 3,
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5">Basic</Typography>
        <Typography variant="h6">$5.00 / month</Typography>
        <Typography>
          Access to basic flashcard features & limited storage capacity.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 1 }}>
          Choose Basic
        </Button>
      </Box>
    </Grid>

    <Grid item xs={12} md={4}>
      <Box
        sx={{
          p: 3,
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5">Pro</Typography>
        <Typography variant="h6">$10.00 / month</Typography>
        <Typography>
          Unlimited flashcards & storage, with priority customer support!
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 1 }}>
          Choose Pro
        </Button>
      </Box>
    </Grid>
  </Grid>
</Box>

</Container>
  )
}