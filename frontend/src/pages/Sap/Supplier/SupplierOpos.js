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
import { stringToDate, stringToNum } from "../../../components/Helper/Helper";

//--------------------------Filter Search----------------------------

//--------------------------Table----------------------------

function createData(
  id,
  itemNumber,
  itemDescription,
  purchaseOrder,
  rowNumber,
  dueDate,
  supplierCode,
  supplierName,
  outstandingQty
) {
  return {
    id,
    itemNumber,
    itemDescription,
    purchaseOrder,
    rowNumber,
    dueDate,
    supplierCode,
    supplierName,
    outstandingQty,
  };
}

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function SupplierOpos({
  code,
  name,
  showAll,
  onShowAll,
  onDeactivateShowAll,
}) {
  // --------------------------Constants----------------------------

  const { opos, isLoading } = useSelector((state) => state.all);

  const [rows, setRows] = useState([]);

  const headCells = [
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
      id: "itemNumber",
      numeric: false,
      disablePadding: false,
      label: "Item Number",
    },
    {
      id: "itemDescription",
      numeric: false,
      disablePadding: false,
      label: "Item Description",
    },
    {
      id: "purchaseOrder",
      numeric: false,
      disablePadding: false,
      label: "Purchase Order",
    },
    {
      id: "rowNumber",
      numeric: true,
      disablePadding: false,
      label: "Row Number",
    },
    {
      id: "dueDate",
      numeric: false,
      disablePadding: false,
      label: "Due Date",
    },
    {
      id: "outstandingQty",
      numeric: true,
      disablePadding: false,
      label: "Outstanding Qty",
    },
  ];

  // --------------------------Functions----------------------------

  function handleSearch() {
    if (!opos || !Array.isArray(opos)) {
      setRows([]);
      return;
    }

    if (showAll) {
      const allRows = opos.map((opo) =>
        createData(
          opo._id,
          opo.itemNo,
          opo.itemDescription,
          stringToNum(opo.purchaseOrder),
          stringToNum(opo.rowNumber),
          stringToDate(opo.dueDate),
          opo.supplierCode,
          opo.supplierName,
          stringToNum(opo.outstandingQty)
        )
      );
      setRows(allRows);
    } else {
      const matchedOpo = opos.filter((opo) => {
        return opo.supplierCode == code && opo.supplierName == name;
      });
      const tableRows = matchedOpo.map((opo) =>
        createData(
          opo._id,
          opo.itemNo,
          opo.itemDescription,
          stringToNum(opo.purchaseOrder),
          stringToNum(opo.rowNumber),
          stringToDate(opo.dueDate),
          opo.supplierCode,
          opo.supplierName,
          stringToNum(opo.outstandingQty)
        )
      );
      setRows(tableRows);
    }
  }

  // --------------------------useEffects----------------------------

  //------
  //auto search
  useEffect(() => {
    handleSearch();
  }, [code, name, showAll, opos]);

  // If code or name changes, deactivate showAll
  useEffect(() => {
    if (showAll && (code || name)) {
      onDeactivateShowAll && onDeactivateShowAll();
    }
    // eslint-disable-next-line
  }, [code, name]);

  if (isLoading) {
    return <Spinner />;
  }

  // --------------------------Return----------------------------

  return (
    <section className="flex flex-col w-full">
      <div className="mb-2">
        {!showAll && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded"
            onClick={onShowAll}
          >
            Show All
          </button>
        )}
      </div>
      <div className="">
        <EnhancedTable rows={rows} headerCells={headCells} />
      </div>
    </section>
  );
}
