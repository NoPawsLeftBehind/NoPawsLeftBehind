import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ActionAreaCard from "./ActionAreaCard";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PetTable from "./PetTable";
import Toolbar from "@mui/material/Toolbar";
import "./styles.css";
import { useParams } from "react-router-dom";

export default function App() {
    const { id } = useParams();
    const [petID, setPetID] = React.useState(id);

    console.log(id)

    return (
        <div className="App">
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
                            md={4}
                            sm={12}
                            style={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <Box width="100%">
                                <ActionAreaCard />
                                <Button
                                    variant="contained"
                                    sx={{ mt: 2, bgcolor: "#4a148c" }}
                                    style={{ maxWidth: "70%", mt: 2 }}
                                >
                                    Adopt
                </Button>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={8}
                            sm={12}
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                flexDirection: "column"
                            }}
                        >
                            <Typography variant="h3" align="left" mb={2}>
                                Pet's name
              </Typography>
                            <Typography variant="h5" align="left" mb={1}>
                                About
              </Typography>
                            <Typography variant="p" align="left">
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy
                                text ever since the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen book. It has
                                survived not only five centuries, but also the leap into
                                electronic
              </Typography>
                            <PetTable />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
}