import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Favorited from "./Favorited";

export default function ActionAreaCard({ availability }) {

    const [adoptionStatus, setAdoptionStatus] = React.useState(availability);
    const [available, setAvailable] = React.useState(true)

    React.useEffect(() => {
        console.log(adoptionStatus)
        setAdoptionStatus(availability);
    }, [availability]);


    return (
        <Card sx={{ maxWidth: 400, margin: "auto" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="auto"
                    image="https://i.imgur.com/OgFgez7.jpg"
                    alt="green iguana"
                />
                <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography gutterBottom variant="h6" component="div">
                        Status: {adoptionStatus}
          </Typography>

                    <Favorited />
                </CardContent>
            </CardActionArea>
        </Card>
    );
}