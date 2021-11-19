import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories) {
    return { name, calories };
}

const rows = [
    createData("Type", "Dog"),
    createData("Breed", "Australian Shepherd"),
    createData("Size", "Medium"),
    createData("Gender", "Male"),
    createData("Age", "3 yr")
];

export default function PetTable() {
    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow
                        sx={{
                            bgcolor: "#4a148c"
                        }}
                    >
                        <TableCell sx={{ color: "#f3e5f5" }}>
                            <h3>Pet Data</h3>
                        </TableCell>
                        <TableCell sx={{ color: "#f3e5f5" }} align="right">
                            <h3>Info</h3>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}