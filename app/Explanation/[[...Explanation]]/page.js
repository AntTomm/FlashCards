import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Typography, Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import Link from "next/link";
import Image from 'next/image';

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

export default function ExplanationPage() {
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
            <Typography variant='h6' sx={{ flexGrow: 1 }}>
              FlashBrain AI
            </Typography>
            <SignedOut>
              <Button color="inherit">
                <Link href="/" passHref>
                  Home
                </Link>
              </Button>
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
              <Button color="inherit">
                <Link href="/Prices" passHref>
                  Pricing
                </Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
              <Button color="inherit">
                <Link href="/" passHref>
                  Home
                </Link>
              </Button>
              <Button color="inherit">
                <Link href="/flashcards" passHref>
                  Your sets
                </Link>
              </Button>
              <Button color="inherit">
                <Link href="/Features" passHref>
                  Features
                </Link>
              </Button>
              <Button color="inherit">
                <Link href="/Prices" passHref>
                  Pricing
                </Link>
              </Button>
            </SignedIn>
          </Toolbar>
        </AppBar>
      </Container>

      <Container maxWidth="md" sx={{ flex: '1 0 auto' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh', 
          }}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              boxShadow: 5,
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              maxWidth: '50%',
            }}
          >
            <Typography variant="h4" gutterBottom>
              Hi There!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              This project was created as part of Week #4 of my Headstarter AI fellowship. 
              Its intent & purpose is to allow the user to create flashcards on any topic of their desire. 
              While it may not look the most user - friendly or lively, I am actively learning more fullstack concepts to better familarize myself in the future. 
              Please reach out to me on LinkedIn or through my email to give feedback or connect with me!
            </Typography>
          </Box>

          <Box sx={{ ml: 5 }}> 
            <Typography variant="h5" gutterBottom>
              Technologies Used:
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Image src="/nextJS.png" alt="Next.js" width={24} height={24}/>
                </ListItemIcon>
                <ListItemText primary="Next.js" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Image src="/react.png" alt="React.js" width={24} height={24}/>
                </ListItemIcon>
                <ListItemText primary="React.js" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Image src="/mui.png" alt="Material-UI" width={24} height={24}/>
                </ListItemIcon>
                <ListItemText primary="Material-UI" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Image src="/firebase.png" alt="Firebase" width={24} height={24}/>
                </ListItemIcon>
                <ListItemText primary="Firebase" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Image src="/clerk.png" alt="Clerk" width={24} height={24}/>
                </ListItemIcon>
                <ListItemText primary="Clerk Authentication" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
