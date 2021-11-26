import * as React from "react";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";

export default function Favorited({ auth0_obj, id }) {
    const [selected, setSelected] = React.useState(false);

    console.log(auth0_obj)
    console.log(id)

    const getFavoritedStatus = async function getFavorited() {

        var data
        const token = await auth0_obj.getAccessTokenSilently()

        const payload = {
            AnimalID: id
        }

        const response = fetch(
            `api/favorite`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            },
        ).then((response) => {

            data = response.json()
            data.then((body) => {

                console.log(body)

                setSelected(body)

            });
        });
    }

    const updateFavoritedStatus = async function updateFavorited(s) {

        var data
        const token = await auth0_obj.getAccessTokenSilently()
        console.log(s)

        const payload = {
            AnimalID: id,
            status: s
        }

        const response = await fetch(
            `api/favorite/update`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            },
        ).then((response) => {

            data = response
            console.log(response);
        });

        // console.log(data)
    }

    React.useEffect(() => {
        if (auth0_obj.isAuthenticated == true) {

            console.log(getFavoritedStatus())
        }

    }, []);

    if (auth0_obj.isAuthenticated == true) {

        getFavoritedStatus()
    }

    return (
        <Box
            onClick={() => {
                setSelected(!selected);
                updateFavoritedStatus(!selected)
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