import React, { Component } from 'react';
import { AppBar, Paper, Toolbar, Typography } from '@mui/material'

export class Home extends Component {
    render() {
        return (
            <div>
                <AppBar position="fixed" color="inherit" sx={{ top: 'auto', bottom: 0 }}>
                    <Toolbar>
                        <Grid container spacing={6}>
                            <Grid item xs={2} />
                            <Grid item xs={2}>
                                <Link to="/">
                                    <Typography variant="p" component="div" className="path">
                                        Address
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={1}>
                                |
                            </Grid>
                            <Grid item xs={2}>
                                <Link to="/counter">
                                    <Typography variant="p" component="div" className="path">
                                        Operating Hours
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={1}>
                                |
                            </Grid>
                            <Grid item xs={2}>
                                <Link to="/fetch-data">
                                    <Typography variant="p" component="div" className="path">
                                        FAQ
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={2} />
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}