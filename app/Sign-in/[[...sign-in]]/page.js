import { SignIn } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Box, Typography } from "@mui/material";
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

export default function SignInPage() {
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
              Login
            </Typography>
            <Button color="inherit" sx={{ marginRight: 25 }} href="/Explanation">What is this?</Button>
            <Button color="inherit">
              <Link href="/" passHref>
                Home
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
            <Button color="inherit" href="/Prices">Pricing</Button>
          </Toolbar>
        </AppBar>
      </Container>

      <Container maxWidth="sm" sx={{ flex: '1 0 auto' }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '80vh' }}
        >
          <Typography variant="h4" sx={{ my: 2 }}>Ready To ACE Your Exams?</Typography>
          <SignIn />
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
