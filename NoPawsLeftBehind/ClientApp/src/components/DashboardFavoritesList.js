import React, { Component } from "react";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

export class DashboardFavoritesList extends Component {

    constructor(props) {
        super(props);
        this.state = { animals: [], loading: true };
    }

    componentDidMount() {
        this.populateAnimalsData();
    }

    render() {

        console.log(this.state)

        let pet_data = {
            name: [
                { name: "Tiger King", type: "Cat", breed: "Siamese", gender: "Female" },
                { name: "Tiger King", type: "Cat", breed: "Siamese", gender: "Female" },
                { name: "Tiger King", type: "Cat", breed: "Siamese", gender: "Female" },
                { name: "Tiger King", type: "Cat", breed: "Siamese", gender: "Female" },
                { name: "Tiger King", type: "Cat", breed: "Siamese", gender: "Female" },
                { name: "Tiger King", type: "Cat", breed: "Siamese", gender: "Female" },
                { name: "Tiger King", type: "Cat", breed: "Siamese", gender: "Female" }
            ],
            id: [1, 2, 3, 4]
        };

        if (this.state.animals.length !== 0) {

            pet_data.name = this.state.animals
        }

        return (
            <Container justifyContent="center">
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
                            <Card sx={{ maxWidth: 275, m: 1 }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="150"
                                    sx={{ width: "95%", height: 150, border: 1 }}
                                    image="https://cdn2.bulbagarden.net/upload/thumb/e/e3/052Meowth-Alola.png/600px-052Meowth-Alola.png"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {`${elem.name}`}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Adopt</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }

    async populateAnimalsData() {
        const response = await fetch('api/animals');
        const data = await response.json();
        this.setState({ animals: data, loading: false });
    }
}

export default DashboardFavoritesList;