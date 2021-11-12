import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Box } from '@mui/material';
import '../style/Dashboard.css';

const DashboardAddPetProfileButton = () => {
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
            </div>
        )
    );
};

export default DashboardAddPetProfileButton