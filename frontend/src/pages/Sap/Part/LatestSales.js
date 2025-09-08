import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import EnhancedTable from "../Table";
import { stringToDate, stringToNum } from "../../../components/Helper/Helper";
import moment from "moment";
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

export default function LatestSales({ code, itemDescription }) {
  // --------------------------Constants----------------------------

  const { latestSales, isLoading } = useSelector((state) => state.all);

  const matchedLatestSales = latestSales
    .filter((latestSales) => {
      return (
        latestSales.partCode == code &&
        latestSales.description == itemDescription
      );
    })
    .sort((a, b) => {
      return moment(a.invoiceDate, "DD/MM/YY").isBefore(
        moment(b.invoiceDate, "DD/MM/YY")
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
      numeric: false,
      disablePadding: false,
      label: "Qty",
    },
    {
      id: "discount",
      numeric: false,
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
      numeric: false,
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
    const tableRows = matchedLatestSales.map((latestSales, index) => {
      return createData(
        latestSales._id,
        latestSales.customerCode,
        latestSales.customerName,
        latestSales.salesEmployee,
        latestSales.partCode,
        latestSales.description,
        latestSales.currency,
        stringToNum(latestSales.unitPrice, 2),
        stringToNum(latestSales.qty, 2),
        stringToNum(latestSales.discount, 2),
        stringToNum(latestSales.foreignSalesAmount, 2),
        stringToNum(latestSales.audSalesAmount, 2),
        stringToNum(latestSales.invoiceCRNote),
        stringToDate(latestSales.invoiceDate),
        latestSales.salesType
      );
    });

    //tableRows.sort((a, b) => (getStringDate(a.invoiceDate) < getStringDate(b.invoiceDate)) ? 1 : -1)

    code && setRows(tableRows);
  }

  // --------------------------useEffects----------------------------

  //------

  useEffect(() => {
    handleSearch();
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

      <br />
    </section>
  );
}
