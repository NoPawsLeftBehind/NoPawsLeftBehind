import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PetsIcon from "@mui/icons-material/Pets";

const theme = createTheme();

export default function SignUp() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get("email"),
            password: data.get("password")
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid
                component="main"
                maxWidth="xs"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    width: "100vw"
                }}
            >
                <CssBaseline />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: 500,
                        p: 3,
                        boxShadow: 3
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <PetsIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
          </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox value="allowExtraEmails" color="primary" />
                                    }
                                    label="I agree to the term and services"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            color="secondary"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
            </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </ThemeProvider>
    );
}