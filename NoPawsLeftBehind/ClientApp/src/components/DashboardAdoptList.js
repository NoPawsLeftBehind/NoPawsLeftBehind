import React, { Component } from "react";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { withAuth0 } from '@auth0/auth0-react';

export class DashboardAdoptList extends Component {

    constructor(props) {
        super(props);
        this.state = { adoptions: [], loading: true };
    }

    componentDidMount() {
        this.populatePendingAdoptionData();
    }

    approveAdopt = async e => {
        try {
            const { getAccessTokenSilently } = this.props.auth0;
            const token = await getAccessTokenSilently();

            const payload = {
                animalID: e,
                status: 'approve'
            }

            const response = await fetch(
                `api/adoption`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                },
            );

            const data = await response.json();
            this.setState({ adoptions: data, loading: false });
        }
        catch (error) {
            console.log(error);
        }

        this.populatePendingAdoptionData();
    }

    denyAdopt = async e => {
        try {
            const { getAccessTokenSilently } = this.props.auth0;
            const token = await getAccessTokenSilently();

            const payload = {
                animalID: e,
                status: 'deny'
            }

            const response = await fetch(
                `api/adoption`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                },
            );

            const data = await response.json();
            this.setState({ adoptions: data, loading: false });
        }
        catch (error) {
            console.log(error);
        }

        this.populatePendingAdoptionData();
    }

    render() {
        let pet_data = {
            name: []
        };

        if (this.state.adoptions.length !== 0) {
            pet_data.name = this.state.adoptions
        }

        return (
            pet_data.name.length > 0 && (
                <Container>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        {pet_data.name.map((elem) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={7}
                                lg={6}
                                key={pet_data.name.indexOf(elem)}
                            >
                                <Card sx={{ minWidth: 150, m: 2, justfyContent: "center" }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="150"
                                        sx={{ width: "95%", height: 150, border: 1 }}
                                        image={`${elem.picture}`}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {`${elem.name}`}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: "center" }}>
                                        <Button size="small" variant="contained" onClick={e => this.approveAdopt(`${elem.id}`)}>Approve</Button>
                                        <Button size="small" variant="outlined" onClick={e => this.denyAdopt(`${elem.id}`)} > Deny</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            )
        );
    }

    async populatePendingAdoptionData() {
        try {
            const { getAccessTokenSilently } = this.props.auth0;
            const token = await getAccessTokenSilently();

            const response = await fetch(
                `api/adoption`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            const data = await response.json();
            this.setState({ adoptions: data, loading: false });
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default withAuth0(DashboardAdoptList);