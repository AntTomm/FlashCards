"use client";

import { useState, useEffect } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Typography, Box, Grid, CircularProgress } from "@mui/material";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

const plans = [
  {
    type: "free",
    name: "Free",
    displayName: "Free",
    price: "$0/Month",
    limit: "5 Flashcard Sets with basic customer support assistance.",
  },
  {
    type: "basic",
    name: "Basic",
    displayName: "Basic",
    price: "$5/Month",
    limit: "25 Flashcard Sets, and the ability to choose however many flashcards the user wants for 5 of them.",
  },
  {
    type: "pro",
    name: "Pro",
    displayName: "Locked In ",
    price: "$10/Month",
    limit: "Unlimited flashcard sets with the ability to choose however many flashcards the user wants per set. Priority customer service.",
  },
];

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

export default function PricingSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [message, setMessage] = useState("");
  const { user } = useUser(); 
  const isLoggedIn = user !== null;

  useEffect(() => {
    if (user) {
      setCurrentPlan(user.publicMetadata.planType || "free");
    }
  }, [user]);

  const handleSubmit = async (planType) => {
    if (!isLoggedIn) {
      setMessage("Sign In to select a plan.");
      return;
    }

    setIsLoading(true);
    setMessage("");
    try {
      if (planType === currentPlan) {
        setMessage("You are already subscribed to this plan.");
        return;
      }

      if (planType === "free") {
        await handleDowngrade(planType);
      } else {
        const response = await fetch("/api/checkout_session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ planType }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDowngrade = async (planType) => {
    if (!user) return;

    try {
      const response = await fetch("/api/cancel_subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setCurrentPlan("free");
      setMessage(
        "Your plan has been downgraded to Free. Your current subscription will remain active until the end of the billing period."
      );
    } catch (error) {
      console.error("Error downgrading plan:", error);
      setMessage("There was an error downgrading your plan. Please try again, or contact customer support.");
    }
  };

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
                FlashBrain AI
              </Typography>
              <Button color="inherit" sx={{ marginRight: 25 }} href="/Explanation">What is this?</Button>
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
            </SignedIn>
          </Toolbar>
        </AppBar>
      </Container>

      <Container maxWidth="sm" sx={{ flex: '1 0 auto', mt: 6 }}>
  <Typography variant='h2' textAlign="center">Pricing Options:</Typography>
  <Typography variant='body1' textAlign="center">
    Every user is automatically a Free User! Subscriptions are not mandatory, though could come in handy if you continue to use the website.
  </Typography>
  <Grid
    container
    spacing={1}
    direction="row"
    justifyContent="flex-start"
    alignItems="flex-start"
    alignContent="stretch"
    wrap="wrap"
  >
  </Grid>

  {message && <Box my={4} textAlign="center" color="red">{message}</Box>}
  {!currentPlan && isLoggedIn && (
    <Box mt={4} textAlign="center" color="red">Select a Plan</Box>
  )}

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 6 }}>
          {plans.map((plan) => (
            <Grid item xs={12} md={6} key={plan.type}>
              <Box
                sx={{
                  p: 3,
                  border: '3px solid',
                  borderColor: 'grey.300',
                  borderRadius: 5,
                  textAlign: "center",
                }}
              >
                <Typography variant="h5">{plan.displayName}</Typography>
                <Typography variant="h6">{plan.price}</Typography>
                <Typography>{plan.limit}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleSubmit(plan.type)}
                  disabled={isLoading || currentPlan === plan.type}
                >
                  {isLoading
                    ? <CircularProgress size={24} />
                    : !isLoggedIn || !currentPlan
                    ? `Choose ${plan.name} Plan`
                    : currentPlan === plan.type
                    ? "Current Plan"
                    : `Choose ${plan.name} Plan`}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}