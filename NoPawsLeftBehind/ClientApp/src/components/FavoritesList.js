﻿import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Paper, Divider, Box } from '@mui/material'
import Pup from "../images/pup-flower.jpg";

const FavoritesList = () => {
    const { isLoading, user } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        !(user["https://nopawsleftbehind.azurewebsites.net/role"] === "admin") && (
            <div className="top-bottom-margin">
                <Paper elevation={3} id="favorites-paper">
                    <Box p={2}>
                        <h2>Favorited Animals</h2>
                        <Divider />
                        <img src={Pup} id="pup-img" alt="" />
                    </Box>
                </Paper>
            </div>
        )
    );
};

export default FavoritesList