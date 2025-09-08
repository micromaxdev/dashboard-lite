import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import EnhancedTable from "../Table";
import {
  getMonthDifference,
  stringToNum,
} from "../../../components/Helper/Helper";

//--------------------------Table----------------------------

function createData(
  id,
  salesEmployee,
  overdue,
  currentMonth,
  nextMonth,
  twoMonthsLater,
  future,
  total
) {
  return {
    id,
    salesEmployee,
    overdue,
    currentMonth,
    nextMonth,
    twoMonthsLater,
    future,
    total,
  };
}

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function ServiceJobBook({ code, itemDescription }) {
  // --------------------------Constants----------------------------
  const { openServiceJobs, isLoading } = useSelector((state) => state.all);

  // Calculate dynamic month labels
  const now = new Date();
  const currentMonthName = now.toLocaleString("default", { month: "long" });
  const nextMonthDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const nextMonthName = nextMonthDate.toLocaleString("default", {
    month: "long",
  });
  const twoMonthsLaterDate = new Date(now.getFullYear(), now.getMonth() + 2, 1);
  const twoMonthsLaterName = twoMonthsLaterDate.toLocaleString("default", {
    month: "long",
  });

  // Extract unique sales employees based on their name
  const distinctSalesEmployees = unique(openServiceJobs, [
    "salesEmployeeName",
  ]).sort((a, b) => (a.salesEmployeeName > b.salesEmployeeName ? 1 : -1));

  const [rows, setRows] = useState([]);

  // Updated header cells with dynamic labels
  const headCells = [
    {
      id: "salesEmployee",
      numeric: false,
      disablePadding: false,
      label: "Sales Employee",
    },
    {
      id: "overdue",
      numeric: false,
      disablePadding: true,
      label: "Overdue",
    },
    {
      id: "currentMonth",
      numeric: false,
      disablePadding: false,
      label: currentMonthName,
    },
    {
      id: "nextMonth",
      numeric: false,
      disablePadding: false,
      label: nextMonthName,
    },
    {
      id: "twoMonthsLater",
      numeric: false,
      disablePadding: false,
      label: twoMonthsLaterName,
    },
    {
      id: "future",
      numeric: false,
      disablePadding: false,
      label: "Future",
    },
    {
      id: "total",
      numeric: false,
      disablePadding: false,
      label: "Total",
    },
  ];

  // --------------------------Functions----------------------------

  function handleSearch() {
    const currentDate = new Date();

    const tableRows = distinctSalesEmployees?.map((emp) => {
      let overdue = 0,
        currentMonth = 0,
        nextMonth = 0,
        twoMonthsLater = 0,
        future = 0,
        total = 0;

      // For each service job, if the sales employee matches, categorise the amount based on the dueDate difference.
      openServiceJobs.forEach((osj) => {
        if (osj.salesEmployeeName === emp.salesEmployeeName) {
          const monthDifference = getMonthDifference(currentDate, osj.dueDate);

          if (monthDifference < 0) {
            overdue += stringToNum(osj.amountToBeInvoiced, 2);
          } else if (monthDifference === 0) {
            currentMonth += stringToNum(osj.amountToBeInvoiced, 2);
          } else if (monthDifference === 1) {
            nextMonth += stringToNum(osj.amountToBeInvoiced, 2);
          } else if (monthDifference === 2) {
            twoMonthsLater += stringToNum(osj.amountToBeInvoiced, 2);
          } else if (monthDifference >= 3) {
            future += stringToNum(osj.amountToBeInvoiced, 2);
          }
        }
      });

      total = overdue + currentMonth + nextMonth + twoMonthsLater + future;

      return createData(
        emp.salesEmployeeName, // using the sales employee's name as the identifier
        emp.salesEmployeeName,
        overdue,
        currentMonth,
        nextMonth,
        twoMonthsLater,
        future,
        total
      );
    });

    addTotal(tableRows);
  }

  function addTotal(tableRows) {
    let allRows = tableRows;

    const overdue = allRows.reduce((sum, current) => sum + current.overdue, 0);
    const currentMonth = allRows.reduce(
      (sum, current) => sum + current.currentMonth,
      0
    );
    const nextMonth = allRows.reduce(
      (sum, current) => sum + current.nextMonth,
      0
    );
    const twoMonthsLater = allRows.reduce(
      (sum, current) => sum + current.twoMonthsLater,
      0
    );
    const future = allRows.reduce((sum, current) => sum + current.future, 0);
    const total = allRows.reduce((sum, current) => sum + current.total, 0);

    allRows.push({
      id: "Total2",
      salesEmployee: "Total",
      overdue: overdue,
      currentMonth: currentMonth,
      nextMonth: nextMonth,
      twoMonthsLater: twoMonthsLater,
      future: future,
      total: total,
    });

    setRows(allRows);
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

  // Recalculate the table rows whenever the openServiceJobs array updates
  useEffect(() => {
    handleSearch();
  }, [openServiceJobs]);

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
