import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '@mui/material';

const LogoutButton = () => {
    const { isAuthenticated, isLoading, logout } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <Button color="secondary" id="logout"
                onClick={() => logout({ returnTo: window.location.origin })}>
                Log Out
            </Button>
        )
    );
};

export default LogoutButton;