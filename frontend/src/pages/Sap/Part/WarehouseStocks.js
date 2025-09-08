import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stringToNum } from "../../../components/Helper/Helper";

import Spinner from "../../../components/Spinner";
import EnhancedTable from "../Table";

//--------------------------Table----------------------------

function createData(
  id,
  itemCode,
  itemName,
  longDescription,
  totalStock,
  qtyInWhs01,
  qtyInDemoWhs,
  qtyInTS01Whs,
  qtyInNSW01Whs,
  qtyInQLD01Whs,
  qtyInVIC01Whs,
  qtyInWA01Whs
) {
  return {
    id,
    itemCode,
    itemName,
    longDescription,
    totalStock,
    qtyInWhs01,
    qtyInDemoWhs,
    qtyInTS01Whs,
    qtyInNSW01Whs,
    qtyInQLD01Whs,
    qtyInVIC01Whs,
    qtyInWA01Whs,
  };
}

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function WarehouseStocks({ code, itemDescription }) {
  // --------------------------Constants----------------------------

  const { warehouseStock, isLoading } = useSelector((state) => state.all);

  const [matched, setMatched] = useState([]);

  const matchedWarehouseStock = warehouseStock.filter((stock) => {
    return stock.itemCode === code && stock.itemName === itemDescription;
  });

  const [rows, setRows] = useState([]);

  const headCells = [
    {
      id: "itemCode",
      numeric: false,
      disablePadding: false,
      label: "Part Code",
    },
    {
      id: "itemName",
      numeric: false,
      disablePadding: false,
      label: "Description",
    },
    {
      id: "longDescription",
      numeric: false,
      disablePadding: false,
      label: "Long Description",
    },
    {
      id: "totalStock",
      numeric: false,
      disablePadding: false,
      label: "Total Stock",
    },
    {
      id: "qtyInWhs01",
      numeric: false,
      disablePadding: false,
      label: "Warehouse 01",
    },
    {
      id: "qtyInDemoWhs",
      numeric: false,
      disablePadding: false,
      label: "Demo Warehouse",
    },
    {
      id: "qtyInTS01Whs",
      numeric: false,
      disablePadding: false,
      label: "TS 01 Whs",
    },
    {
      id: "qtyInNSW01Whs",
      numeric: false,
      disablePadding: false,
      label: "NSW Whs",
    },
    {
      id: "qtyInQLD01Whs",
      numeric: false,
      disablePadding: false,
      label: "QLD Whs",
    },
    {
      id: "qtyInVIC01Whs",
      numeric: false,
      disablePadding: false,
      label: "VIC Whs",
    },
    {
      id: "qtyInWA01Whs",
      numeric: false,
      disablePadding: false,
      label: "WA Whs",
    },
  ];

  // --------------------------Functions----------------------------

  function handleSearch() {
    if (matched) {
      const selectedStock = matchedWarehouseStock.find(
        (stock) => stock.itemCode === code && stock.itemName === itemDescription
      );

      if (selectedStock) {
        setRows([
          createData(
            selectedStock._id,
            selectedStock.itemCode,
            selectedStock.itemName,
            selectedStock.longDescription,
            selectedStock.totalStock,
            selectedStock.qtyInWhs01,
            selectedStock.qtyInDemoWhs,
            selectedStock.qtyInTS01Whs,
            selectedStock.qtyInNSW01Whs,
            selectedStock.qtyInQLD01Whs,
            selectedStock.qtyInVIC01Whs,
            selectedStock.qtyInWA01Whs
          ),
        ]);
        return;
      }
    }
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
