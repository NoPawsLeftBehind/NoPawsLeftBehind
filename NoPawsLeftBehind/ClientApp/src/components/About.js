import React, { Component } from 'react';
import { Paper, Divider, Stack, Grid, Toolbar } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from './Theme.js'
import PetLandscape from "../images/PetPic1.jpg";
import PetProfile from "../images/PetPic2.jpg";
import '../style/About.css';

export class About extends Component {
    render() {
        return (
            <ThemeProvider theme={appTheme}>
                <div id="aboutDiv">
                    <Toolbar />
                    <Grid container spacing={3} justify="space-evenly" alignItems="center">
                        <Grid item xs={12} sm={7} className="about-text">
                            <h2>About Us</h2>
                            <Divider />
                            <p>
                                No Paws Left Behind is a Non-Profit Organization with the singular goal of matching pets
                                with prospective pet owners. We partner with animal shelters across the country to host
                                a repository of pets available for adoption. Prospective pet owners can browse pets by
                                a variety of criteria and even read a description of the pet's personality provided by
                                the shelter.
                                <br /><br />
                                Founded in 2021 by software engineers (and animal lovers) Luis Renteria, Jeff Porter,
                                and Lindsey Olmstead, the organization has helped find homes for more than 2000 pets!
                            </p>
                        </Grid>
                        <Grid item xs={12} sm={7} justify="center:>
                            <Paper className="img-about">
                                <Stack id="img-stack">
                                    <img src={PetLandscape} id="pup-img" alt="" />
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>

            </ThemeProvider>
        );
    }
}
