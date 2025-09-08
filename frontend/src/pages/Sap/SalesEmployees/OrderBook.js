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

export default function OrderBook({ code, itemDescription }) {
  // --------------------------Constants----------------------------

  const { osos, isLoading } = useSelector((state) => state.all);

  const distinctSalesEmployees = unique(osos, ["salesEmployee"]).sort((a, b) =>
    a.salesEmployee > b.salesEmployee ? 1 : -1
  );

  const [rows, setRows] = useState([]);

  // Dynamic month labels
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

  function handleSearch(value) {
    var currentDate = new Date();
    //for each sales emp, calculate values for each column
    const tableRows = distinctSalesEmployees?.map((emp, index) => {
      var overdue = 0,
        currentMonth = 0,
        nextMonth = 0,
        twoMonthsLater = 0,
        future = 0,
        total = 0;

      osos.map((oso) => {
        if (oso.salesEmployee === emp.salesEmployee) {
          //overdue (calc based on prior months)
          if (getMonthDifference(currentDate, oso.dueDate) < 0) {
            overdue += stringToNum(oso.outstandingValue);
          }

          //current months totals
          if (getMonthDifference(currentDate, oso.dueDate) == 0) {
            currentMonth += stringToNum(oso.outstandingValue);
          }

          //next months totals
          if (getMonthDifference(currentDate, oso.dueDate) == 1) {
            nextMonth += stringToNum(oso.outstandingValue);
          }

          //next 2 months totals
          if (getMonthDifference(currentDate, oso.dueDate) == 2) {
            twoMonthsLater += stringToNum(oso.outstandingValue);
          }

          //future totals
          if (getMonthDifference(currentDate, oso.dueDate) > 2) {
            future += stringToNum(oso.outstandingValue);
          }
        }
      });

      total = overdue + currentMonth + nextMonth + twoMonthsLater + future;

      return createData(
        emp.salesEmployee, //for id
        emp.salesEmployee,
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
    var allRows = tableRows;

    var overdue = allRows.reduce(function (sum, current) {
      return sum + current.overdue;
    }, 0);

    var currentMonth = allRows.reduce(function (sum, current) {
      return sum + current.currentMonth;
    }, 0);

    var nextMonth = allRows.reduce(function (sum, current) {
      return sum + current.nextMonth;
    }, 0);

    var twoMonthsLater = allRows.reduce(function (sum, current) {
      return sum + current.twoMonthsLater;
    }, 0);

    var future = allRows.reduce(function (sum, current) {
      return sum + current.future;
    }, 0);

    var total2 = allRows.reduce(function (sum, current) {
      return sum + current.total;
    }, 0);

    allRows.push({
      id: "Total2",
      salesEmployee: "Total",
      overdue: overdue,
      currentMonth: currentMonth,
      nextMonth: nextMonth,
      twoMonthsLater: twoMonthsLater,
      future: future,
      total: total2,
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

  // auto search
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
        <EnhancedTable rows={rows} headerCells={headCells} rowsPP={10} />
      </div>
    </section>
  );
}
