import React, { Component } from "react";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { withAuth0 } from '@auth0/auth0-react';

export class DashboardFavoritesList extends Component {

    constructor(props) {
        super(props);
        this.state = { favorites: [], loading: true };
    }

    componentDidMount() {
        this.populateFavoritesData();
    }

    adopt = async e => {
        try {
            const { getAccessTokenSilently } = this.props.auth0;
            const token = await getAccessTokenSilently();

            const payload = {
                animalID: e,
                status: 'adopt'
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

        if (this.state.favorites.length !== 0) {
            pet_data.name = this.state.favorites;
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
                                <Card sx={{ maxWidth: 150, m: 2, justfyContent: "center" }}>
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
                                        <Button size="small" onClick={e => this.adopt(`${elem.id}`)}>Adopt</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            )
        );
    }

    async populateFavoritesData() {
        try {
            const { getAccessTokenSilently } = this.props.auth0;
            const token = await getAccessTokenSilently();

            const response = await fetch(
                `api/favorite`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            const data = await response.json();
            this.setState({ favorites: data, loading: false });
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default withAuth0(DashboardFavoritesList);