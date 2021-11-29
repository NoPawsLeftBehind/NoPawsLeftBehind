import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

export default function FAQ() {

    const text_color = '#000000'
    return (
        <div className="App" mb={1}>
            <Toolbar />
            <Box
                height="100%"
                minHeight="100%"
                width="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    minWidth="576px"
                    sx={{
                        bgcolor: "#e1bee7",
                        height: "75%",
                        width: "90%",
                        m: "auto",
                        borderRadius: 5
                    }}
                >
                    <Grid container spacing={6} display="flex" flexDirection="row" p={3}>
                        <Grid
                            item
                            xs={12}
                            md={12}
                            sm={12}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column"
                            }}
                        >
                            <Typography variant="h2" color={text_color} align="center" mb={2}>
                                Frequently Asked Questions (FAQ)
              </Typography>

                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={12}
                            sm={12}
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                flexDirection: "column"
                            }}
                        >

                            <Typography variant="h5" color={text_color} align="left" mb={1} sx={{ fontWeight: 'bold' }}>
                                Q: What are the requirements to adopt?
              </Typography>
                            <Typography variant="h5" color={text_color} align="left" mb={1}>
                                A: You must be 18 years of age or older, have a valid state-issue identification, and allowed to have a pet where you live. To protect you and your pet, get your landlord or HOA's permission in writing before you adopt.
              </Typography>

                            <Typography variant="h5" color={text_color} align="left" mt={4} sx={{ fontWeight: 'bold' }}>
                                Q: What are your shelter's visit hours?
              </Typography>
                            <Typography variant="h5" color={text_color} align="left" mb={1}>
                                A: 1234 Poodle St, Corvallis, Oregon Friday through Sunday 11:00 AM until 5:00 PM.
              </Typography>

                            <Typography variant="h5" color={text_color} align="left" mt={4} sx={{ fontWeight: 'bold' }}>
                                Q: Are there any adoption fees?
              </Typography>
                            <Typography variant="h5" color={text_color} align="left" mb={1}>
                                A: Baby adoptions fees are $50, adults are $40
              </Typography>

                            <Typography variant="h5" color={text_color} align="left" mt={4} sx={{ fontWeight: 'bold' }}>
                                Q: How do I choose a pet on your website?
              </Typography>
                            <Typography variant="h5" color={text_color} align="left" mb={1}>
                                A: Create an account, then go on the "Search Pets" page. You search for specific types and breeds using the filter options. From the list, you can visit a specific pet's profile by clicking on 'Page'. Once on the pet's page, you can review their information, and click on the "Adopt" button. Only pet's that are available will have the Adopt button enabled.

              </Typography>

                            <Typography variant="h5" color={text_color} align="left" mt={4} sx={{ fontWeight: 'bold' }}>
                                Q: How do I create an account?
              </Typography>
                            <Typography variant="h5" color={text_color} align="left" mb={1}>
                                A: On the homepage, click on 'Sign-Up'. You will be redirected to Auth0 to create your user's account.
              </Typography>

                            <Typography variant="h5" color={text_color} align="left" mt={4} sx={{ fontWeight: 'bold' }}>
                                Q: How do I add a pet to my favorite list?
              </Typography>
                            <Typography variant="h5" color={text_color} align="left" mb={1}>
                                A: Simply visit a pet's profile, then click on the heart icon. This will add a pet to your account dashboard.
              </Typography>


                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
}