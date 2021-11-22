import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Box, Divider } from '@mui/material';
import DashboardAdoptList from './DashboardAdoptList';
import '../style/Dashboard.css';

const DashboardAdmin = () => {
    const { isLoading, user } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        (user["https://nopawsleftbehind.azurewebsites.net/role"] === "admin") && (
            <div>
                <Box className="center-items" p={2} >
                    <Button variant='contained' href="/add-pet">
                        Add Pet Profile
                    </Button>
                </Box>
                <Box className="center-items" p={2} >
                    <h2>Pending Adoptions</h2>
                    <Divider />
                    <DashboardAdoptList />
                </Box>
            </div>
        )
    );
};

export default DashboardAdmin