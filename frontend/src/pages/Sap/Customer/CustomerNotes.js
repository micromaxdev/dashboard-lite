import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EnhancedTable from "../Table";

//--------------------------Table----------------------------

function createData(id, customerCode, customerName, customerNotes) {
  return { id, customerCode, customerName, customerNotes };
}

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function CustomerNotes({ code, name }) {
  // --------------------------Constants----------------------------

  const { customerNotes, isLoading } = useSelector((state) => state.all);

  const matchedCustomerNotes = customerNotes.filter((customerNotes) => {
    return (
      customerNotes.customerCode == code && customerNotes.customerName == name
    );
  });

  const [rows, setRows] = useState([]);

  const headCells = [
    {
      id: "customerCode",
      numeric: false,
      disablePadding: true,
      label: "Cus Code",
    },
    {
      id: "customerName",
      numeric: false,
      disablePadding: false,
      label: "Cus Name",
    },
    {
      id: "customerNotes",
      numeric: false,
      disablePadding: false,
      label: "Customer Notes",
    },
  ];

  // --------------------------Functions----------------------------

  function handleSearch(value) {
    const tableRows = matchedCustomerNotes.map((customerNotes, index) => {
      return createData(
        customerNotes._id,
        customerNotes.customerCode,
        customerNotes.customerName,
        customerNotes.customerNotes
      );
    });

    setRows(tableRows);
  }

  // --------------------------useEffects----------------------------

  //------
  //auto search
  useEffect(() => {
    handleSearch();
  }, [code, name]);

  if (isLoading) {
    return <Spinner />;
  }

  // --------------------------Return----------------------------

  return (
    <section className="flex">
      <div className="">
        <EnhancedTable rows={rows} headerCells={headCells} />
      </div>

      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer&nbsp;Code</TableCell>
              <TableCell align="right">Customer&nbsp;Name</TableCell>
              <TableCell align="right">Customer&nbsp;Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.customerCode}
                </TableCell>
                <TableCell align="right">{row.customerName}</TableCell>
                <TableCell align="right">{row.customerNotes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </section>
  );
}
