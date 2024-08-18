import { SignIn, ClerkProvider } from"@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Box, Typography } from"@mui/material";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <Container maxwidth="sw"><AppBar position="static" sx={{ background: 'linear-gradient(to bottom, #4E65FF, #92EFFD)' }}><Toolbar><Typography variant='h6' sx={{ flexGrow: 1 }}>
                            Flashcard SaaS
                        </Typography><Button color="inherit"><Link href="/Sign-in" passHref>
                                Login
                            </Link></Button><Button color="inherit"><Link href="/Sign-up" passHref>
                                Sign Up
                            </Link></Button></Toolbar></AppBar><Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                ><Typography variant="h4">Sign In</Typography><SignIn /></Box></Container>
    );
}
