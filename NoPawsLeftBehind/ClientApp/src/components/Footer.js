import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export class Footer extends React.Component {
    render() {
        return (
            <Box
                style={{ zIndex: 1252 }}
                position="relative"
                component="footer"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                    width: "100%",
                    height: "100%",

                    backgroundColor: "#4a148c",

                }}
            >
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    p={2}
                >
                    <Grid
                        container
                        columnSpacing={10}
                        direction="row"
                        justifyContent="center"
                    >
                        <Grid item style={{ textAlign: "center" }}>
                            <Typography variant="h6" color="#f3e5f5"> Address </Typography>
                            <Typography color="#f3e5f5"> 1701 SW Western Blvd. </Typography>
                            <Typography color="#f3e5f5"> Corvallis, OR 97333 </Typography>
                        </Grid>
                        <Grid item style={{ textAlign: "center" }}>
                            <Typography variant="h6" color="#f3e5f5"> Phone Number </Typography>
                            <Typography color="#f3e5f5"> 541.737.2464 </Typography>
                        </Grid>
                        <Grid item style={{ textAlign: "center" }}>
                            <Typography variant="h6" color="#f3e5f5"> Hours </Typography>
                            <Typography color="#f3e5f5"> 8 AM -5 PM Mon - Fri </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="overline" style={{ textAlign: "center" }} color="#f3e5f5">
                        {" "}
          No Paws Left Behind | Copyright&copy; 2021
        </Typography>
                </Stack>
            </Box>
        );
    }
}