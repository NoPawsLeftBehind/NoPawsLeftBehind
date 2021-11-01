import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

const HomeLoginButton = () => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        !isAuthenticated && (
            <Button variant="outlined" id='login'
                onClick={() => loginWithRedirect()}>Login
            </Button>
        )
    );
};

export default HomeLoginButton