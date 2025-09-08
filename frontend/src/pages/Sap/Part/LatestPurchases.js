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
  partCode,
  description,
  poDate,
  poNum,
  poItem,
  supplierCode,
  supplierName,
  qty,
  currency,
  price
) {
  return {
    id,
    partCode,
    description,
    poDate,
    poNum,
    poItem,
    supplierCode,
    supplierName,
    qty,
    currency,
    price,
  };
}

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function LatestPurchases({ code, itemDescription }) {
  // --------------------------Constants----------------------------

  const { latestPurchases, isLoading } = useSelector((state) => state.all);

  const matchedLatestPurchases = latestPurchases
    .filter((latestPurchases) => {
      return (
        latestPurchases.partCode == code &&
        latestPurchases.description == itemDescription
      );
    })
    .sort((a, b) => {
      return moment(a.poDate, "DD/MM/YYYY").isBefore(
        moment(b.poDate, "DD/MM/YYYY")
      )
        ? 1
        : -1;
    });

  const [rows, setRows] = useState([]);

  const headCells = [
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
      id: "poDate",
      numeric: true,
      disablePadding: false,
      label: "PO Date",
    },
    {
      id: "poNum",
      numeric: false,
      disablePadding: false,
      label: "PO Number",
    },
    {
      id: "poItem",
      numeric: false,
      disablePadding: false,
      label: "PO Item",
    },
    {
      id: "supplierCode",
      numeric: false,
      disablePadding: false,
      label: "Supplier Code",
    },
    {
      id: "supplierName",
      numeric: false,
      disablePadding: false,
      label: "Supplier Name",
    },
    {
      id: "qty",
      numeric: false,
      disablePadding: false,
      label: "Qty",
    },
    {
      id: "currency",
      numeric: false,
      disablePadding: false,
      label: "Currency",
    },
    {
      id: "price",
      numeric: false,
      disablePadding: false,
      label: "Price",
    },
  ];

  // --------------------------Functions----------------------------

  function handleSearch(value) {
    const tableRows = matchedLatestPurchases.map((latestPurchases, index) => {
      return createData(
        latestPurchases.id,
        latestPurchases.partCode,
        latestPurchases.description,
        stringToDate(latestPurchases.poDate),
        stringToNum(latestPurchases.poNum),
        latestPurchases.poItem,
        latestPurchases.supplierCode,
        latestPurchases.supplierName,
        stringToNum(latestPurchases.qty),
        latestPurchases.currency,
        parseFloat(latestPurchases.price)
      );
    });

    //tableRows.sort((a, b) => (getStringDate(a.poDate) < getStringDate(b.poDate)) ? 1 : -1)

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
      <div>
        <EnhancedTable rows={rows} headerCells={headCells} />
      </div>
      <br />
    </section>
  );
}
