import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import EnhancedTable from "../Table";

//--------------------------Table----------------------------

function createData(
  id,
  salesTeam,
  salesBaseLine,
  gpBaseLine,
  gPPercent,
  salesBudget,
  gpBudget,
  total
) {
  return {
    id,
    salesTeam,
    salesBaseLine,
    gpBaseLine,
    gPPercent,
    salesBudget,
    gpBudget,
    total,
  };
}

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function SalesBudget({ code, itemDescription }) {
  // --------------------------Constants----------------------------

  const { budget, isLoading } = useSelector((state) => state.all);

  const [rows, setRows] = useState([]);

  const headCells = [
    {
      id: "salesTeam",
      numeric: false,
      disablePadding: false,
      label: "Sales Employee",
    },
    {
      id: "salesBaseLine",
      numeric: false,
      disablePadding: true,
      label: "Sales Baseline (last month)",
    },
    {
      id: "gpBaseLine",
      numeric: false,
      disablePadding: false,
      label: "GP Baseline",
    },
    {
      id: "gPPercent",
      numeric: false,
      disablePadding: false,
      label: "GP %",
    },
    {
      id: "salesBudget",
      numeric: false,
      disablePadding: false,
      label: "Sales Budget",
    },
    {
      id: "gpBudget",
      numeric: false,
      disablePadding: false,
      label: "GP Budget",
    },
  ];

  // --------------------------Functions----------------------------

  function handleSearch() {
    const tableRows = budget.map((bud) => {
      return createData(
        bud.salesTeam, //for id
        bud.salesTeam,
        bud.salesBaseLine,
        bud.gpBaseLine,
        bud.gPPercent,
        bud.salesBudget,
        bud.gpBudget
      );
    });

    setRows(tableRows);
  }

  // --------------------------useEffects----------------------------

  //------
  //auto search
  useEffect(() => {
    handleSearch();
  }, [budget]);

  if (isLoading) {
    return <Spinner />;
  }

  // --------------------------Return----------------------------

  return (
    <section className="flex">
      <div>
        <EnhancedTable rows={rows} headerCells={headCells} rowsPP={10} />
      </div>
    </section>
  );
}
