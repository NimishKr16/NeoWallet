"use client";
import { Button, Container, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaMicrosoft } from "react-icons/fa";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const router = useRouter();

  return (
    <Box sx={{ bgcolor: "#0a0a0a", color: "white", minHeight: "100vh", textAlign: "center" }}>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Box sx={{ py: 10 }}>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            NeoWallet
          </Typography>
          <Typography variant="h6" color="gray" gutterBottom>
            The Secure & Smart Way to Manage Your Digital Transactions.
          </Typography>
          <Box mt={3}>
            <Button onClick={() => router.push("/login")} 
            variant="contained" color="primary" size="large" sx={{ borderRadius: 5 }}>
              Get Started
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Features Section */}
      <Container maxWidth="md">
        <Grid container spacing={3} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ bgcolor: "#121212", color: "white", p: 2, borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Authentication Section */}
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Sign in with Trusted Platforms
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {authProviders.map((provider, index) => (
            <Grid item key={index}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 5,
                  color: "white",
                  borderColor: "gray",
                  display: "flex",
                  alignItems: "center",
                  px: 3,
                }}
                startIcon={<provider.icon size={24} />}
              >
                {provider.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ mt: 10, py: 4, bgcolor: "#121212" }}>
        <Typography variant="body2" color="gray">
          © {new Date().getFullYear()} NeoWallet. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}

// Features List
const features = [
  { title: "Fast Transfers", description: "Experience lightning-fast secure digital transactions." },
  { title: "Secure & Private", description: "Your financial data is protected with top-notch encryption." },
  { title: "Trusted Sign-in", description: "Login securely with Google, Apple, and Microsoft." },
];

// Auth Providers List
const authProviders = [
  { name: "Google", icon: FcGoogle },
  { name: "Apple", icon: FaApple },
  { name: "Microsoft", icon: FaMicrosoft },
];