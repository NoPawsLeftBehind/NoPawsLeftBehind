import * as React from "react";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";

export default function Favorited() {
    const [selected, setSelected] = React.useState(false);


    return (
        <Box
            onClick={() => {
                setSelected(!selected);

            }}
        >
            {selected ? (
                <FavoriteIcon sx={{ color: pink[500] }} />
            ) : (
                    <FavoriteIcon color="disabled" />
                )}
        </Box>
    );
}