import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardList from "./CardList";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { appTheme } from './Theme.js'
import { ThemeProvider } from '@mui/material/styles';

const drawerWidth = 240;
const sample = {
    animals: [
        {
            name: "",
            type: "",
            breed: "",
            size: "",
            gender: ""
        }
    ]
};

let filter_payload = {
    type: [],
    breed: [],
    disposition: []
};

export default function FilterPets(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [filterResults, setFilterResults] = React.useState(sample);
    const [filterList, setFilterList] = React.useState()

    const getFilterList = async () => {
        const response = await fetch('api/FilterOptions');
        const data = await response.json();

        return data


    };

    const getRequest = async () => {
        const response = await fetch('api/animals');
        const data = await response.json();
        return { animals: data, loading: false }
    };


    React.useEffect(() => {

        var fe_filters = ['type', 'breed', 'disposition']
        var be_filters = ['typeName', 'breedName', 'disposition']

        let data = getFilterList()
        data.then(function (result) {

            var cnt = 0
            for (const prop in result) {
                //console.log(result[prop]);

                for (const element of result[prop]) {
                    filter_payload[fe_filters[cnt]].push(element[be_filters[cnt]])
                }
                cnt++
            }

            console.log(filter_payload)
            setFilterList(filter_payload)
        })

        getRequest().then(function (result) {
            console.log(result)
            setFilterResults(result)

        })
        
    }, []);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // sample data to auto populate filter options


    const initialValues = {
        type: "",
        breed: "",
        disposition: ""
    };

    const onSubmit = (values) => {
        console.log(values);
        // Make a post request based on filter parameters

        var data = getRequest()

        // Set filterResults to the results of the promise

        data.then(function (result) {
            console.log(result)
            setFilterResults(result)

        })
    };

    const drawer = (
        <div>
            <Toolbar />
            <Toolbar />

            <Stack spacing={4} p={2}>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ values, handleChange }) => {
                        return (
                            <Form>
                                <FormControl>
                                    <InputLabel
                                        variant="standard"
                                        shrink={true}
                                        htmlFor="uncontrolled-native"
                                    >
                                        Type
                  </InputLabel>
                                    <NativeSelect
                                        defaultValue={30}
                                        onChange={handleChange}
                                        name="type"
                                        id="type"
                                    >
                                        <option value={"None"}>None</option>
                                        {filter_payload.type.map((item) => (
                                            <option value={item}>{item}</option>
                                        ))}
                                    </NativeSelect>
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Breed
                  </InputLabel>
                                    <NativeSelect
                                        defaultValue={30}
                                        onChange={handleChange}
                                        name="breed"
                                        id="breed"
                                    >
                                        <option value={"None"}>None</option>
                                        {filter_payload.breed.map((item) => (
                                            <option value={item}>{item}</option>
                                        ))}
                                    </NativeSelect>
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Disposition
                  </InputLabel>
                                    <NativeSelect
                                        defaultValue={30}
                                        onChange={handleChange}
                                        name="disposition"
                                        id="disposition"
                                    >
                                        <option value={"None"}>None</option>
                                        {filter_payload.disposition.map((item) => (
                                            <option value={item}>{item}</option>
                                        ))}
                                    </NativeSelect>
                                </FormControl>

                             
                                <Button type="submit" variant="contained">
                                    Search
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </Stack>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

        return (
       <ThemeProvider theme={appTheme}>
        <Box sx={{ display: "flex" }} mt={5}>
            <CssBaseline />
            <AppBar
                position="fixed"
                style={{ zIndex: 1252 }}
                sx={{
                    ml: { sm: `${drawerWidth}px` },
                    mt: 7
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Pet Listing
          </Typography>
                </Toolbar>
            </AppBar>
            <Box
                mt={7}
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    mt={7}
                    container={container}
                    style={{ zIndex: 1250 }}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: false // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth
                        }
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    m={7}
                    variant="permanent"
                    style={{ zIndex: 1250 }}
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth
                        }
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                {" "}
                <Toolbar />
                <CardList filterResults={filterResults} />
            </Box>
           </Box>
        </ThemeProvider>
    );
}