import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardsList from "./CardsList";

const drawerWidth = 240;

function SearchPets(props) {

    const drawer = (
        <div>
            <Stack spacing={4} p={2} mt={3}>
                <FormControl>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Type
          </InputLabel>
                    <NativeSelect
                        defaultValue={30}
                        inputProps={{
                            name: "type",
                            id: "uncontrolled-native"
                        }}
                    >
                        <option value={10}>Dog</option>
                        <option value={20}>Cat</option>
                    </NativeSelect>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Breed
          </InputLabel>
                    <NativeSelect
                        defaultValue={30}
                        inputProps={{
                            name: "breed",
                            id: "uncontrolled-native"
                        }}
                    >
                        <option value={10}>Siamese</option>
                        <option value={20}>Tabby</option>
                        <option value={30}>Tiger</option>
                    </NativeSelect>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Age
          </InputLabel>
                    <NativeSelect
                        defaultValue={30}
                        inputProps={{
                            name: "age",
                            id: "uncontrolled-native"
                        }}
                    >
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </NativeSelect>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Age
          </InputLabel>
                    <NativeSelect
                        defaultValue={30}
                        inputProps={{
                            name: "age",
                            id: "uncontrolled-native"
                        }}
                    >
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </NativeSelect>
                </FormControl>
                <Button variant="contained">Search</Button>
            </Stack>
        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

                <Drawer
                    variant="permanent"
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
                <CardsList />
            </Box>
        </Box>
    );
}

export default SearchPets;