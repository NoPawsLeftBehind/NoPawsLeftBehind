import React, { useState } from "react";
import { Grid, Typography, CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const getRequest = async () => {
    const response = await fetch('api/Animals');
    const data = await response.json();
    console.log(data)
    console.log('huh')
}

export default function CardList() {

    const [card, setCard] = useState('');



    getRequest();
    console.log('hello')


    const pet_data = {
        name: [
            { name: "Tiger Queen", type: "Cat", breed: "Siamese", gender: "Female" },
            { name: "Tiger Queen", type: "Cat", breed: "Siamese", gender: "Female" },
            { name: "Tiger Queen", type: "Cat", breed: "Siamese", gender: "Female" },
            { name: "Tiger Queen", type: "Cat", breed: "Siamese", gender: "Female" },
            { name: "Tiger Queen", type: "Cat", breed: "Siamese", gender: "Female" },
            { name: "Tiger Queen", type: "Cat", breed: "Siamese", gender: "Female" },
            { name: "Tiger Queen", type: "Cat", breed: "Siamese", gender: "Female" }
        ],
        id: [1, 2, 3, 4]
    };
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
                                <Typography variant="body1" color="text.secondary">
                                    <p>{`Type: ${elem.type}`}</p>
                                    <p>{`Breed: ${elem.breed}`}</p>
                                    <p>{`Gender: ${elem.gender}`}</p>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Save</Button>
                                <Button size="small">Adopt</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
