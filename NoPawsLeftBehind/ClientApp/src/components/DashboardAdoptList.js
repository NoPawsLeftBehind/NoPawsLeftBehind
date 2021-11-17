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
                animalID: e.target.parent.id,
                status: 'approve'
            }

            const response = await fetch(
                `api/adoption`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
                animalID: e.target.parent.id,
                status: 'deny'
            }

            const response = await fetch(
                `api/adoption`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
        console.log(this.state);
        console.log(this.props);

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
                                sm={6}
                                md={4}
                                lg={3}
                                key={pet_data.name.indexOf(elem)}
                            >
                                <Card sx={{ maxWidth: 100, m: 1, justfyContent: "center" }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="100"
                                        sx={{ width: "95%", height: 100, border: 1 }}
                                        image="https://cdn2.bulbagarden.net/upload/thumb/e/e3/052Meowth-Alola.png/600px-052Meowth-Alola.png"
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {`${elem.name}`}
                                        </Typography>
                                    </CardContent>
                                    <CardActions id={`${elem.id}`} sx={{ justifyContent: "center" }}>
                                        <Button size="small" onClick={e => this.approveAdopt(e)}>Approve</Button>
                                        <Button size="small" onClick={e => this.denyAdopt(e)} > Deny</Button>
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