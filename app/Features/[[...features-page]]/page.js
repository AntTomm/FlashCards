import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Typography, Box, Grid } from "@mui/material";
import Link from "next/link";

export default function FeaturesPage() {
    return (
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
                    <Button color="inherit" sx={{ marginRight: 25 }} href="/Explanation">What is this?</Button>
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
                            <Link href="/Prices" passHref>
                                Pricing
                            </Link>
                        </Button>
                    </SignedIn>
                </Toolbar>
            </AppBar>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '80vh' }}
            >
                <Box sx={{ my: 5 }}>
                    <Typography variant="h4" align="center">
                        Features:
                    </Typography>
                    <Grid container spacing={4} justifyContent="center" sx={{ mt: 6 }}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" className="fade-in-text" align="center" sx={{fontWeight: 'bold'}}>
                                Effortless Text Entry
                            </Typography>
                            <Typography align="center" className="fade-in-text2">
                                Just drop in your text, and watch our software work its magic. Flashcard creation has never been this simple—or this fun!
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" className="fade-in-text" align="center" sx={{fontWeight: 'bold'}}>
                                Seamless OpenAI Integration
                            </Typography>
                            <Typography align="center" className="fade-in-text2">
                                Unlock the power of AI with a single click. Integrate OpenAI effortlessly and elevate your flashcard creation to a whole new level!
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" className="fade-in-text" align="center" sx={{fontWeight: 'bold'}}>
                                Easily Accessible
                            </Typography>
                            <Typography align="center" className="fade-in-text2">
                                Access your flashcards anytime, anywhere.
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
