import React, { Component } from 'react';
import { Divider, Grid, Toolbar, Container } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from './Theme.js'
import PetLandscape from "../images/PetPic1.jpg";
import '../style/About.css';

export class About extends Component {
    render() {
        return (
            <ThemeProvider theme={appTheme}>
                <div id="aboutDiv">
                    <Toolbar />
                    <Grid container spacing={3} justify="center" ustifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={12}>
                            <Container id="about-text">
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
                            </Container>
                        </Grid>
                        <Grid item xs={12} justify="center" justifyContent="center" alignItems="center">
                            <Container id="img-container" >
                                <img src={PetLandscape} id="img-about" alt="" />
                            </Container>
                        </Grid>
                    </Grid>
                </div>
            </ThemeProvider>
        );
    }
}
