import React, { Component } from 'react';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '../style/Footer.css';

export class Footer extends Component {
    render() {
        return (
            <footer>
                <Stack orientation="vertical" sx={{ top: "auto", bottom: 0 }}>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={12} textAlign="center">
                            <Typography>
                                No Paws Left Behind | Copyright&copy; {new Date().getFullYear()}.
                            </Typography>
                        </Grid>
                    </Grid>
                </Stack>
            </footer>
        );
    }
}