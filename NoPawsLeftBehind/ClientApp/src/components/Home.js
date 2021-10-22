import React, { Component } from 'react';
import { Grid, Paper, Typography } from '@mui/material'
import Logo from "../images/Logo.png";
import '../style/Home.css';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="mainDiv">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper elevation={3} className="paper">
                            <img src={Logo} className="logo" />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={3} className="paper">
                            <React.Fragment>
                                <Typography variant="h4" component="div" className="summary">
                                    Save a pet. Be a superhero!
                                </Typography>
                                <Typography variant="p" component="div" className="summary">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                                    the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                                    software like Aldus PageMaker including versions of Lorem Ipsum.
                                </Typography>
                            </React.Fragment>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
