import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

const LoginButton = () => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        !isAuthenticated && (
            <Button color="secondary"
                onClick={() => loginWithRedirect()}>Login
            </Button>
        )
    );
};

export default LoginButton