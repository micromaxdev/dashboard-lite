import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../../components/Spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EnhancedTable from "../Table";
import { stringToNum } from "../../../components/Helper/Helper";

//--------------------------Table----------------------------

function createData(
  id,
  salesEmployeeName,
  customerCode,
  customerName,
  call_id,
  subject,
  quotedAmount,
  totalInvoicedAmount,
  totalOutstanding
) {
  return {
    id,
    salesEmployeeName,
    customerCode,
    customerName,
    call_id,
    subject,
    quotedAmount,
    totalInvoicedAmount,
    totalOutstanding,
  };
}

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function CustomerOpenServiceJobs({ code, name }) {
  // --------------------------Constants----------------------------

  const { openServiceJobs, isLoading } = useSelector((state) => state.all);

  const matchedOpenServiceJobs = openServiceJobs.filter((openServiceJobs) => {
    return (
      openServiceJobs.customerName == name &&
      openServiceJobs.customerCode == code
    );
  });

  const [rows, setRows] = useState([]);

  const headCells = [
    {
      id: "salesEmployeeName",
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
      id: "call_id",
      numeric: false,
      disablePadding: false,
      label: "Call ID",
    },
    {
      id: "subject",
      numeric: false,
      disablePadding: false,
      label: "Subject",
    },
    {
      id: "quotedAmount",
      numeric: false,
      disablePadding: false,
      label: "Quoted Amount",
    },
    {
      id: "totalInvoicedAmount",
      numeric: false,
      disablePadding: false,
      label: "Total Invoiced Amt",
    },
    {
      id: "totalOutstanding",
      numeric: false,
      disablePadding: false,
      label: "Total Outst.",
    },
  ];

  // --------------------------Functions----------------------------

  function totOutstanding(quotedAmount, totalInvoicedAmount) {
    var a1 = parseFloat(quotedAmount.replace(/,/g, ""));
    var a2 = parseFloat(totalInvoicedAmount.replace(/,/g, ""));
    var diff = a1 - a2;

    return diff;
  }

  function handleSearch(value) {
    const tableRows = matchedOpenServiceJobs.map((openServiceJobs, index) => {
      return createData(
        openServiceJobs._id,
        openServiceJobs.salesEmployeeName,
        openServiceJobs.customerCode,
        openServiceJobs.customerName,
        stringToNum(openServiceJobs.call_id),
        openServiceJobs.subject,
        stringToNum(openServiceJobs.quotedAmount, 2),
        stringToNum(openServiceJobs.totalInvoicedAmount, 2),
        stringToNum(
          totOutstanding(
            openServiceJobs.quotedAmount,
            openServiceJobs.totalInvoicedAmount
          ),
          2
        )
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
              <TableCell>Sales&nbsp;Employee</TableCell>
              <TableCell align="right">Cus&nbsp;Code</TableCell>
              <TableCell align="right">Cus&nbsp;Name</TableCell>
              <TableCell align="right">Call&nbsp;ID</TableCell>
              <TableCell align="right">Subject</TableCell>
              <TableCell align="right">Quoted&nbsp;Amount</TableCell>
              <TableCell align="right">Total&nbsp;Invoiced&nbsp;Amt</TableCell>
              <TableCell align="right">Total&nbsp;Outst.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.salesEmployeeName}
                </TableCell>
                <TableCell align="right">{row.customerCode}</TableCell>
                <TableCell align="right">{row.customerName}</TableCell>
                <TableCell align="right">{row.call_id}</TableCell>
                <TableCell align="right" style={{ maxWidth: 200 }}>{row.subject}</TableCell>
                <TableCell align="right">${row.quotedAmount}</TableCell>
                <TableCell align="right">${row.totalInvoicedAmount}</TableCell>
                <TableCell align="right">${totOutstanding(row.quotedAmount, row.totalInvoicedAmount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </section>
  );
}
