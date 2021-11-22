import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ActionAreaCard from "./ActionAreaCard";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PetTable from "./PetTable";
import Toolbar from "@mui/material/Toolbar";
import "./styles.css";
import { useParams } from "react-router-dom";

var pet_profile_info = {
    name: 'none',
    description: 'none',
    type: 'none',
    breed: 'none',
    size: 'none',
    gender: 'none',
    age: 'none',
    color: 'none',
    availability: 'none'
}

export default function App() {
    const { id } = useParams();
    const [petID, setPetID] = React.useState(id);
    const [petInfo, setPetInfo] = React.useState(pet_profile_info)
    const [validID, getValidID] = React.useState(true)
    const [isPetProfile, setIsPetProfile] = React.useState(true)
    const [available, setAvailable] = React.useState(true)

    const getRequest = async () => {

        var data
        const response = await fetch('api/animals/' + id);

        if (response.status >= 200 && response.status <= 299) {
            data = await response.json();
        } else {
            console.log(response.status, response.statusText);
            data = {error: response.status}
        }
        return data
    }

    React.useEffect(() => {

        getRequest().then(function (result) {
            console.log('get request')
            console.log(result)
            setIsPetProfile('name' in result)

            if ('name' in result) {
                setAvailable(result.availability == 'Available')
                setPetInfo(result)
            }
        });

    }, []);



    const adopt_button = (
        <Button
            variant="contained"
            sx={{ mt: 2, bgcolor: "#4a148c" }}
            style={{ maxWidth: "70%", mt: 2 }}
        >
            Adopt
        </Button>
        )

    const pet_profile = (
        <Grid container spacing={6} display="flex" flexDirection="row" p={3}>
            <Grid
                item
                xs={12}
                md={4}
                sm={12}
                style={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Stack width="100%" display="flex" direction="column"
                    alignItems="center"
                      >
                    <ActionAreaCard availability={petInfo.availability} />

                    {available ? adopt_button : (<div> </div>)}
                </Stack>
            </Grid>
            <Grid
                item
                xs={12}
                md={8}
                sm={12}
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    flexDirection: "column"
                }}
            >
                <Typography color="#000000" variant="h3" align="left" mb={2}>
                    {/*Pet's name*/}
                    {petInfo.name}

                </Typography>
                <Typography color="#000000" variant="h5" align="left" mb={1}>
                    About

                </Typography>
                <Typography color="#000000" variant="p" align="left">
                    {petInfo.description}
                </Typography>
                <PetTable petTraits={petInfo} />
            </Grid>
        </Grid>

    );

    const no_pet_profile = (


        <Typography color="#000000" variant="p" align="center">
            Pet ID does not exist
        </Typography>
        )



    return (
        <div className="App">
            <Toolbar />

            <Box
                height="100%"
                minHeight="100%"
                width="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    minWidth="576px"
                    
                    sx={{
                        bgcolor: "#e1bee7",
                        height: "75%",
                        width: "90%",
                        m: "auto",
                        borderRadius: 5
                    }}
                >
                    {isPetProfile ? pet_profile : no_pet_profile}
                </Box>
            </Box>
        </div>
    );
}