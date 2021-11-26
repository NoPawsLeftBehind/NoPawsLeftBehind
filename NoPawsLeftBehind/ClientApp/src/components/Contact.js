import React, { Component } from 'react';
import { Paper, Divider, Container, Grid, Toolbar } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from './Theme.js'
import PetLandscape from "../images/PetPic1.jpg";
import PetProfile from "../images/PetPic2.jpg";
import '../style/Contact.css';

export class Contact extends Component {
    render() {
        return (
            <ThemeProvider theme={appTheme}>
                <div id="contactDiv">
                    <Toolbar />
                    <Grid container spacing={2} justify="center" justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={12} md={6} justify="center" justifyContent="center" alignItems="center">
                            <Container id="img-container-contact" >
                                <img src={PetProfile} id="img-contact" alt="" />
                            </Container>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Container id="contact-text">
                                <h2>Contact Information</h2>
                                <Divider />
                                <p>
                                    1701 SW Western Blvd <br/> Corvallis, OR 97333
                                    <br /><br />
                                    Phone:  541.737.2464
                                    <br />
                                    Monday - Friday<br />
                                    Hours:  8:00 AM - 5:00 PM
                                </p>
                            </Container>
                        </Grid>
                    </Grid>
                </div>
            </ThemeProvider>
        );
    }
}
