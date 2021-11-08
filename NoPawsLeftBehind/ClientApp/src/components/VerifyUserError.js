import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '@mui/material';

const VerifyUserError = () => {
    const { error, isLoading, logout } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            <h2>Check your email to finish verification</h2>
            <p>{error}</p>

            <Button color="secondary"
                onClick={() => logout({ returnTo: window.location.origin })}>
                Return to Homepage
            </Button>
        </div>
    );
};

export default VerifyUserError