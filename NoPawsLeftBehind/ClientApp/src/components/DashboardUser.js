import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Paper, Divider, Box } from '@mui/material'
import DashboardFavoritesList from './DashboardFavoritesList';

const DashboardUser = () => {
    const { isLoading, user } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        !(user["https://nopawsleftbehind.azurewebsites.net/role"] === "admin") && (
            <div>
                <Box p={2} className="center-items">
                    <h2>Favorited Animals</h2>
                    <Divider />
                    <DashboardFavoritesList />
                </Box>
            </div>
        )
    );
};

export default DashboardUser