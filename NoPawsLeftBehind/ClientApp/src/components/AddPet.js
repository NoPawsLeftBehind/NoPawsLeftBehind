import React, { Component } from "react";
import { Container, Grid, Button, Paper, Box, Toolbar, Select, MenuItem, InputLabel, FormControl, OutlinedInput, Stack } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { withAuth0 } from '@auth0/auth0-react';
import '../style/AddPet.css';
import { appTheme } from './Theme.js'

export class AddPet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageFile: null,
            imagePreview: "",
            attributes: null,
            animalName: "",
            description: "",
            picture: "",
            type: -1,
            breed: -1,
            sex: -1,
            availability: -1,
            age: -1,
            weight: -1,
            colors: [],
            dispositions: [],
            news: "",
            loading: true
        }
    }

    componentDidMount() {
        this.populateAttributeData();
    }

    updateImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            let file = e.target.files[0];
            let img_preview = URL.createObjectURL(file);

            this.setState({
                imageFile: file,
                imagePreview: img_preview
            });
        }
    }

    handleNameChange = (e) => {
        this.setState({
            animalName: e.target.value
        })
    }

    handleDescriptionChange = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    handleTypeChange = (e) => {
        this.setState({
            type: e.target.value
        })
    }

    handleBreedChange = (e) => {
        this.setState({
            breed: e.target.value
        })
    }

    handleSexChange = (e) => {
        this.setState({
            sex: e.target.value
        })
    }

    handleAvailabilityChange = (e) => {
        this.setState({
            availability: e.target.value
        })
    }

    handleAgeChange = (e) => {
        const min = 0;
        const max = 100;
        var ageInput = parseInt(e.target.value);

        if (ageInput > max) {
            ageInput = max;
            e.target.value = max;
        }
        else if (ageInput < min) {
            ageInput = min;
            e.target.value = min;
        }

        this.setState({
            age: ageInput
        })
    }

    handleWeightChange = (e) => {
        const min = 0;
        const max = 1000;
        var weightInput = parseInt(e.target.value);

        if (weightInput > max) {
            weightInput = max;
            e.target.value = max
        }
        else if (weightInput < min) {
            weightInput = min;
            e.target.value = min;
        }

        this.setState({
            weight: weightInput
        })
    }

    handleColorsChange = (e) => {
        const val = e.target.value;

        this.setState({
            colors: typeof val === 'string' ? val.split(',') : val,
        })
    }

    handleDispositionsChange = (e) => {
        const val = e.target.value;

        this.setState({
            dispositions: typeof val === 'string' ? val.split(',') : val,
        })
    }

    handleNewsChange = (e) => {
        this.setState({
            news: e.target.value
        })
    }

    createPetProfile = async e => {
        if (this.state.animalName === "") {
            alert("Animal Name cannot be null");
            return;
        }

        if (this.state.imageFile === null) {
            alert("Picture cannot be null");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', this.state.imageFile);

            formData.append('upload_preset', 'ml_default');
            const options = {
                method: 'POST',
                body: formData,
            };

            const response = await fetch(`${process.env.REACT_APP_CLOUD_ENDPOINT}${process.env.REACT_APP_CLOUD_NAME}/image/upload`, options)

            const data = await response.json();
            this.setState({
                picture: data.secure_url,
            })
        }
        catch (error) {
            console.log(error);
        }

        try {
            const { getAccessTokenSilently } = this.props.auth0;
            const token = await getAccessTokenSilently();

            const payload = {
                name: this.state.animalName,
                description: this.state.description,
                picture: this.state.picture,
                type: this.state.type,
                breed: this.state.breed,
                sex: this.state.sex,
                availability: this.state.availability,
                age: this.state.age,
                weight: this.state.weight,
                colors: this.state.colors,
                news: this.state.news,
                dispositions: this.state.dispositions
            }

            const response = await fetch(
                `api/Animals`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                },
            );

            const data = await response;

            if (response.status >= 200 && response.status <= 300) {
                alert("Animal profile successfully created");
            }
            else {
                alert("Cound not create animal profile!");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        const { imagePreview, animalName, description, type, breed, sex, availability, colors, news, dispositions } = this.state;

        let attribute_data = null;

        if (this.state.attributes) {
            attribute_data = this.state.attributes;
        }

        return (
            attribute_data && (
                <ThemeProvider theme={appTheme}>
                    <Container>
                        <Toolbar />
                        <h2>Create a Pet Profile</h2>
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justifyContent="center"
                            style={{ flexGrow: 1 }}
                        >
                            <Grid item xs={12} sm={12} md={6} justify="center" alignItems="center" className="img-grid">
                                <Paper variant="outlined" id="img-paper-add">
                                    <Box p={1} id="img-box">
                                        {imagePreview && (
                                            <img src={imagePreview} alt="" id="img-add" />
                                        )}
                                        {!imagePreview && (
                                            <InsertPhotoOutlinedIcon color="primary" fontSize="large" className="icon" />
                                        )}
                                    </Box>
                                </Paper>
                                <input type="file" onChange={this.updateImage} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} justify="center" alignItems="center">
                                <Box component="form">
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="animalName">Animal Name</InputLabel>
                                        <OutlinedInput className="form-margins"
                                            id="animalName"
                                            required
                                            value={animalName}
                                            onChange={this.handleNameChange}
                                            label="Animal Name"
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="description">Description</InputLabel>
                                        <OutlinedInput className="form-margins"
                                            id="description"
                                            multiline
                                            rows={3}
                                            value={description}
                                            onChange={this.handleDescriptionChange}
                                            label="Description"
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel id="type-label">Type</InputLabel>
                                        <Select className="form-margins"
                                            labelId="type-label"
                                            id="type-select"
                                            value={type}
                                            label="Type"
                                            onChange={this.handleTypeChange}
                                        >
                                            {attribute_data.animalTypes && attribute_data.animalTypes.map((item) =>
                                                <MenuItem key={item.typeID} value={item.typeID}>{item.typeName}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel id="breed-label">Breed</InputLabel>
                                        <Select className="form-margins"
                                            labelId="breed-label"
                                            id="breed-select"
                                            value={breed}
                                            label="Breed"
                                            onChange={this.handleBreedChange}
                                        >
                                            {attribute_data.breeds && attribute_data.breeds.map((item) =>
                                                <MenuItem key={item.breedID} value={item.breedID}>{item.breedName}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel id="sex-label">Sex</InputLabel>
                                        <Select className="form-margins"
                                            labelId="sex-label"
                                            id="sex-select"
                                            value={sex}
                                            label="Sex"
                                            onChange={this.handleSexChange}
                                        >
                                            {attribute_data.sexes && attribute_data.sexes.map((item) =>
                                                <MenuItem key={item.sexID} value={item.sexID}>{item.sex}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel id="availability-label">Availability</InputLabel>
                                        <Select className="form-margins"
                                            labelId="availability-label"
                                            id="availability-select"
                                            value={availability}
                                            label="Availability"
                                            onChange={this.handleAvailabilityChange}
                                        >
                                            {attribute_data.availabilities && attribute_data.availabilities.map((item) =>
                                                <MenuItem key={item.availabilityID} value={item.availabilityID}>{item.availability}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl>
                                        <InputLabel htmlFor="age">Age</InputLabel>
                                        <OutlinedInput className="form-margins"
                                            id="age"
                                            label="Age"
                                            type="number"
                                            onChange={this.handleAgeChange}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <InputLabel htmlFor="weight">Weight</InputLabel>
                                        <OutlinedInput className="form-margins"
                                            id="weight"
                                            label="Weight"
                                            type="number"
                                            onChange={this.handleWeightChange}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel id="colors-label">Colors</InputLabel>
                                        <Select className="form-margins"
                                            labelId="colors-label"
                                            id="colors-select"
                                            multiple
                                            value={colors}
                                            label="Colors"
                                            onChange={this.handleColorsChange}
                                        >
                                            {attribute_data.colors && attribute_data.colors.map((item) =>
                                                <MenuItem key={item.colorID} value={item.colorID}>
                                                    {item.color}
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel id="dispositions-label">Dispositions</InputLabel>
                                        <Select className="form-margins"
                                            labelId="dispositions-label"
                                            id="dispositions-select"
                                            multiple
                                            value={dispositions}
                                            label="Dispositions"
                                            onChange={this.handleDispositionsChange}
                                        >
                                            {attribute_data.dispositions && attribute_data.dispositions.map((item) =>
                                                <MenuItem key={item.dispositionID} value={item.dispositionID}>
                                                    {item.disposition}
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="news">News</InputLabel>
                                        <OutlinedInput className="form-margins"
                                            id="news"
                                            multiline
                                            rows={3}
                                            value={news}
                                            onChange={this.handleNewsChange}
                                            label="News"
                                        />
                                    </FormControl>
                                    <Stack my={1} mx={10} justifyContent="center">
                                        <Button variant='contained' className="form-margins" onClick={this.createPetProfile}>Create</Button>
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </ThemeProvider>
            )
        );
    }

    async populateAttributeData() {
        try {
            const { getAccessTokenSilently } = this.props.auth0;
            const token = await getAccessTokenSilently();

            const response = await fetch(
                `api/AddAnimal`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            const data = await response.json();
            this.setState({ attributes: data, loading: false });
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default withAuth0(AddPet);