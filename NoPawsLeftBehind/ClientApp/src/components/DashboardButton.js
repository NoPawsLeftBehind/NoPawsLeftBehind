import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

class DashboardButton extends Component {
    render() {
        const { isAuthenticated, isLoading, user } = this.props.auth0;

        if (isLoading) {
            return <div>Loading ...</div>;
        }

        return isAuthenticated && (
            <Button href="/dashboard" color="secondary">
                <img src={user.picture} alt={user.nickname} style={{height: '4vh', marginRight: '1vh'}}/>
                {user.nickname}
            </Button>
        );
    }
}

export default withAuth0(DashboardButton);