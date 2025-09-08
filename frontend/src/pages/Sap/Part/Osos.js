import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "../../../components/Spinner";
import { getOsos, reset } from "../../../features/all/allSlice";
import { Button } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdditionalInfo from "../AdditionalInfo";
import EnhancedTable from "../Table";
import { stringToDate, stringToNum } from "../../../components/Helper/Helper";

//--------------------------Table----------------------------

function createData(
  id,
  soNumber,
  customerOrderNo,
  salesEmployee,
  customerCode,
  customerName,
  partCode,
  description,
  outstandingQty,
  dueDate,
  outstandingValue,
  stockQty
) {
  return {
    id,
    soNumber,
    customerOrderNo,
    salesEmployee,
    customerCode,
    customerName,
    partCode,
    description,
    outstandingQty,
    dueDate,
    outstandingValue,
    stockQty,
  };
}

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function Osos({ code, itemDescription }) {
  // --------------------------Constants----------------------------

  const dispatch = useDispatch();

  const { osos, isLoading, isError, message } = useSelector(
    (state) => state.all
  );

  const [matched, setMatched] = useState([]);

  const matchedOsos = osos.filter((osos) => {
    return osos.partCode == code && osos.description == itemDescription;
  });

  const distinctOsos = unique(osos, ["partCode", "description"]).sort((a, b) =>
    a.partCode > b.partCode ? 1 : -1
  );

  const [rows, setRows] = useState([]);

  const headCells = [
    {
      id: "soNumber",
      numeric: false,
      disablePadding: false,
      label: "Sales Order No",
    },
    {
      id: "customerOrderNo",
      numeric: false,
      disablePadding: false,
      label: "Cus Order No",
    },
    {
      id: "salesEmployee",
      numeric: false,
      disablePadding: false,
      label: "Sales Employee",
    },
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
      id: "partCode",
      numeric: false,
      disablePadding: false,
      label: "Part Code",
    },
    {
      id: "description",
      numeric: false,
      disablePadding: false,
      label: "Description",
    },
    {
      id: "outstandingQty",
      numeric: false,
      disablePadding: false,
      label: "Outst. Qty",
    },
    {
      id: "dueDate",
      numeric: false,
      disablePadding: false,
      label: "Due Date",
    },
    {
      id: "outstandingValue",
      numeric: false,
      disablePadding: false,
      label: "Outst. Value",
    },
    {
      id: "stockQty",
      numeric: false,
      disablePadding: false,
      label: "Stock Qty",
    },
  ];

  // --------------------------Functions----------------------------

  function handleMatched(value) {
    // console.log(value)
    if (value == null) {
      setMatched("");
    } else {
      setMatched(value);
    }
  }

  function handleSearch(value) {
    // console.log(matchedOsos)

    const tableRows = matchedOsos.map((osos, index) => {
      return createData(
        osos._id,
        osos.soNumber,
        osos.customerOrderNo,
        osos.salesEmployee,
        osos.customerCode,
        osos.customerName,
        osos.partCode,
        osos.description,
        stringToNum(osos.outstandingQty),
        stringToDate(osos.dueDate),
        stringToNum(osos.outstandingValue, 2),
        stringToNum(osos.stockQty, 2)
      );
    });

    setRows(tableRows);
  }

  function unique(arr, keyProps) {
    const kvArray = arr.map((entry) => {
      const key = keyProps.map((k) => entry[k]).join("|");
      return [key, entry];
    });
    const map = new Map(kvArray);
    return Array.from(map.values());
  }

  // --------------------------useEffects----------------------------

  //------
  //auto search
  useEffect(() => {
    handleSearch(matched);
  }, [code, itemDescription]);

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
              <TableCell>Sales&nbsp;Order&nbsp;No</TableCell>
              <TableCell align="right">Cus&nbsp;Order&nbsp;No</TableCell>
              <TableCell align="right">Sales&nbsp;Employee</TableCell>
              <TableCell align="right">Cus&nbsp;Code</TableCell>
              <TableCell align="right">Cus&nbsp;Name</TableCell>
              <TableCell align="right">Part&nbsp;Code</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Outst.&nbsp;Qty</TableCell>
              <TableCell align="right">Due&nbsp;Date</TableCell>
              <TableCell align="right">Outst.&nbsp;Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.soNumber}
                </TableCell>
                <TableCell align="right">{row.customerOrderNo}</TableCell>
                <TableCell align="right">{row.salesEmployee}</TableCell>
                <TableCell align="right">{row.customerCode}</TableCell>
                <TableCell align="right">{row.customerName}</TableCell>
                <TableCell align="right">{row.partCode}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.outstandingQty}</TableCell>
                <TableCell align="right">{row.dueDate}</TableCell>
                <TableCell align="right">${row.outstandingValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </section>
  );
}
