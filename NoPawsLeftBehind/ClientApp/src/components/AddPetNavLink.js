import React from 'react';
import { Nav } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";

const AddPetNavLink = () => {
    const { isAuthenticated, user } = useAuth0();

    return (
        isAuthenticated && user["https://nopawsleftbehind.azurewebsites.net/role"] === "admin" && (
            <Nav.Link className="mx-4" href="/add-pet">Add Pet</Nav.Link>
        )
    );
};

export default AddPetNavLink;