import React, { Component } from 'react';
import { Grid, Typography, Box } from '@mui/material'
import Logo from "../images/Logo.png";

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <img src={Logo} className="logo" />
                        </Grid>
                        <Grid item xs={6} className="summary">
                            <Typography variant="h4" component="div">
                                Save a pet. Be a superhero!
                            </Typography>
                            <Typography variant="p" component="div">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                                and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                                leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                                the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                                software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        );
    }
}
