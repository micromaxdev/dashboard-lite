import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../../components/Spinner";
import moment from "moment";
import EnhancedTable from "../Table";
import { stringToDate, stringToNum } from "../../../components/Helper/Helper";

//--------------------------Table----------------------------

function createData(
  id,
  customerCode,
  customerName,
  salesEmployee,
  partCode,
  description,
  currency,
  unitPrice,
  qty,
  discount,
  foreignSalesAmount,
  audSalesAmount,
  invoiceCRNote,
  invoiceDate,
  salesType
) {
  return {
    id,
    customerCode,
    customerName,
    salesEmployee,
    partCode,
    description,
    currency,
    unitPrice,
    qty,
    discount,
    foreignSalesAmount,
    audSalesAmount,
    invoiceCRNote,
    invoiceDate,
    salesType,
  };
}

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function CustomerLatestSales({ code, name }) {
  // --------------------------Constants----------------------------

  const { latestSales, isLoading } = useSelector((state) => state.all);

  const matchedLatestSales = latestSales
    .filter((latestSales) => {
      return (
        latestSales.customerName == name && latestSales.customerCode == code
      );
    })
    .sort((a, b) => {
      return moment(a.invoiceDate, "DD/MM/YYYY").isBefore(
        moment(b.invoiceDate, "DD/MM/YYYY")
      )
        ? 1
        : -1;
    });

  const [rows, setRows] = useState([]);

  const headCells = [
    {
      id: "invoiceDate",
      numeric: false,
      disablePadding: false,
      label: "Invoice Date",
    },
    {
      id: "customerName",
      numeric: false,
      disablePadding: false,
      label: "Cus Name",
    },
    {
      id: "customerCode",
      numeric: false,
      disablePadding: true,
      label: "Cus Code",
    },
    {
      id: "salesEmployee",
      numeric: false,
      disablePadding: false,
      label: "Sales Emp",
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
      id: "currency",
      numeric: false,
      disablePadding: false,
      label: "Currency",
    },
    {
      id: "unitPrice",
      numeric: true,
      disablePadding: false,
      label: "Unit Price",
    },
    {
      id: "qty",
      numeric: true,
      disablePadding: false,
      label: "Qty",
    },
    {
      id: "discount",
      numeric: true,
      disablePadding: false,
      label: "Discount",
    },
    {
      id: "foreignSalesAmount",
      numeric: true,
      disablePadding: false,
      label: "Amount",
    },
    {
      id: "audSalesAmount",
      numeric: true,
      disablePadding: false,
      label: "AUD",
    },
    {
      id: "invoiceCRNote",
      numeric: true,
      disablePadding: false,
      label: "Inv/CR Note",
    },
    {
      id: "salesType",
      numeric: false,
      disablePadding: false,
      label: "Sales Type",
    },
  ];

  // --------------------------Functions----------------------------

  function handleSearch(value) {
    var tableRows = matchedLatestSales.map((latestSales, index) => {
      //qty = parseInt(qty)
      return createData(
        latestSales._id,
        latestSales.customerCode,
        latestSales.customerName,
        latestSales.salesEmployee,
        latestSales.partCode,
        latestSales.description,
        latestSales.currency,
        stringToNum(latestSales.unitPrice, 2),
        stringToNum(latestSales.qty),
        stringToNum(latestSales.discount, 2),
        stringToNum(latestSales.foreignSalesAmount, 2),
        stringToNum(latestSales.audSalesAmount, 2),
        stringToNum(latestSales.invoiceCRNote),
        stringToDate(latestSales.invoiceDate),
        latestSales.salesType
      );
    });

    tableRows.sort((a, b) =>
      a.invoiceDate
        ? getStringDate(a.invoiceDate) < getStringDate(b.invoiceDate)
          ? 1
          : -1
        : null
    );

    setRows(tableRows);

    //console.log(moment(matchedLatestSales[0].invoiceDate, "DD-MM-YYYY"));
  }

  function getStringDate(date) {
    var m = moment(date, "DD-MM-YYYY");

    return m;
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
              <TableCell align="right">Invoice&nbsp;Date</TableCell>
              <TableCell align="right">Cus&nbsp;Name</TableCell>
              <TableCell align="right">Cus&nbsp;Code</TableCell>
              <TableCell align="right">Sales&nbsp;Emp</TableCell>
              <TableCell align="right">Part&nbsp;Code</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Curr</TableCell>
              <TableCell align="right">Unit&nbsp;Price</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell align="right">Amnt</TableCell>
              <TableCell align="right">AUD</TableCell>
              <TableCell align="right">Inv/CR&nbsp;Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.invoiceDate}
                </TableCell>
                <TableCell align="right">{row.customerName}</TableCell>
                <TableCell align="right">{row.customerCode}</TableCell>
                <TableCell align="right">{row.salesEmployee}</TableCell>
                <TableCell align="right">{row.partCode}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.currency}</TableCell>
                <TableCell align="right">${row.unitPrice}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.discount}%</TableCell>
                <TableCell align="right">{(row.foreignSalesAmount == 0) ? ('-') : ('$' + row.foreignSalesAmount)}</TableCell>
                <TableCell align="right">${row.audSalesAmount}</TableCell>
                <TableCell align="right">{row.invoiceCRNote}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </section>
  );
}
