import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

const HomeSignupButton = () => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        !isAuthenticated && (
            <Button variant='contained' id='sign-up'
                onClick={() =>
                    loginWithRedirect({
                        screen_hint: 'signup',
                    })
                }
            >
                Sign Up
            </Button>
        )
    );
};

export default HomeSignupButton