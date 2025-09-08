import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
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
  outstandingValueFC,
  stockQty,
  dateCreated
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
    outstandingValueFC,
    stockQty,
    dateCreated,
  };
}

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function CustomerOsos({ code, name }) {
  // --------------------------Constants----------------------------

  const { osos, salesOrderLogs, isLoading } = useSelector((state) => state.all);

  const matchedOsos = osos.filter((osos) => {
    return osos.customerName === name && osos.customerCode === code;
  });

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
      id: "outstandingValueFC",
      numeric: false,
      disablePadding: false,
      label: "Outst. Value (FC)",
    },
    {
      id: "stockQty",
      numeric: false,
      disablePadding: false,
      label: "Stock Qty",
    },
    {
      id: "dateCreated",
      numeric: false,
      disablePadding: false,
      label: "Date Created",
    },
  ];

  // --------------------------Functions----------------------------

  function handleSearch(value) {
    const salesOrderLogsMap = {};
    salesOrderLogs.forEach((log) => {
      salesOrderLogsMap[log.soNumber] = {
        dateCreated: log.dateCreated,
      };
    });

    const tableRows = matchedOsos.map((osos, index) => {
      const matchingLog = salesOrderLogsMap[osos.soNumber];
      const dateCreated = matchingLog ? matchingLog.dateCreated : "";

      return createData(
        osos._id,
        stringToNum(osos.soNumber),
        osos.customerOrderNo,
        osos.salesEmployee,
        osos.customerCode,
        osos.customerName,
        osos.partCode,
        osos.description,
        stringToNum(osos.outstandingQty),
        stringToDate(osos.dueDate),
        stringToNum(osos.outstandingValue, 2),
        stringToNum(osos["outstandingValue(FC)"], 2),
        stringToNum(osos.stockQty, 2),
        dateCreated
      );
    });

    setRows(tableRows);
  }

  // --------------------------useEffects----------------------------

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
    </section>
  );
}
