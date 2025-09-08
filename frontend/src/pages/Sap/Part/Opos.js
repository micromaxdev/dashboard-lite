import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import EnhancedTable from "../Table";
import { stringToDate, stringToNum } from "../../../components/Helper/Helper";

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

export default function Opos({ code, itemDescription }) {
  // --------------------------Constants----------------------------

  const { opos, isLoading, isError, message } = useSelector(
    (state) => state.all
  );

  const [matched, setMatched] = useState([]);

  const matchedOpo = opos.filter((opo) => {
    return opo.itemNo == code && opo.itemDescription == itemDescription;
  });

  const [rows, setRows] = useState([]);

  const headCells = [
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
      disablePadding: true,
      label: "Purchase Order",
    },
    {
      id: "rowNumber",
      numeric: false,
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
      id: "outstandingQty",
      numeric: true,
      disablePadding: false,
      label: "Outstanding Qty",
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
    const tableRows = matchedOpo.map((opo, index) => {
      return createData(
        opo._id,
        opo.itemNo,
        opo.itemDescription,
        opo.purchaseOrder,
        stringToNum(opo.rowNumber),
        stringToDate(opo.dueDate),
        opo.supplierCode,
        opo.supplierName,
        stringToNum(opo.outstandingQty, 2)
      );
    });

    setRows(tableRows);
  }

  // --------------------------useEffects----------------------------

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
    </section>
  );
}
