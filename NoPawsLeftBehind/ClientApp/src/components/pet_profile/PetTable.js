﻿import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, trait) {
    return { name, trait };
}

export default function PetTable({petTraits}) {
    const [traits, setTraits] = React.useState(petTraits);

    React.useEffect(() => {
        setTraits(petTraits);
    }, [petTraits]);

    const rows = [
        createData("Type", traits.type),
        createData("Breed", traits.breed),
        createData("Size", traits.weight),
        createData("Gender", traits.gender),
        createData("Age", traits.age),
        createData("Color", traits.color),
        createData("Date Arrived", traits.dateCreated)
    ];

    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table aria-label="simple table">
                <TableHead >
                    <TableRow
                        sx={{
                            bgcolor: "#4a148c"

                        }}
                    >
                        <TableCell sx={{
                            color: "#f3e5f5", display: 'flex', justifyContent: 'flex-start' }}>
                            <h3>Pet Traits</h3>
                        </TableCell>
                        <TableCell sx={{ color: "#f3e5f5" }}>

                            
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.trait}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}