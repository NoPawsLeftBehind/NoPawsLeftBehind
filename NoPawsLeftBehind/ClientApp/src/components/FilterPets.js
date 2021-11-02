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
import { appTheme } from './Theme.js'
import { ThemeProvider } from '@mui/material/styles';

const drawerWidth = 240;

export default function FilterPets(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div >
            <Toolbar />
            <Toolbar />

            <Stack spacing={4} p={2}>
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
                        Size
          </InputLabel>
                    <NativeSelect
                        defaultValue={30}
                        inputProps={{
                            name: "size",
                            id: "uncontrolled-native"
                        }}
                    >
                        <option value={10}>Small</option>
                        <option value={20}>Medium</option>
                        <option value={30}>Large</option>
                    </NativeSelect>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Gender
          </InputLabel>
                    <NativeSelect
                        defaultValue={30}
                        inputProps={{
                            name: "age",
                            id: "uncontrolled-native"
                        }}
                    >
                        <option value={10}>Male</option>
                        <option value={20}>Female</option>
                        <option value={30}>Other</option>
                    </NativeSelect>
                </FormControl>
                <Button variant="contained">Search</Button>
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
                        mt: 7,

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
                <Box mt={7}
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer mt={7}
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
                    <Drawer m={7}
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
                    <CardList />
                </Box>
            </Box>
        </ThemeProvider>
    );
}