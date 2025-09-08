import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import EnhancedTable from "../Table";
import {
  getMonthDifference,
  stringToNum,
} from "../../../components/Helper/Helper";

function createData(
  id,
  source,
  ytdSales,
  overdue,
  currentMonth,
  nextMonth,
  twoMonthsLater,
  future,
  total
) {
  return {
    id,
    source,
    ytdSales,
    overdue,
    currentMonth,
    nextMonth,
    twoMonthsLater,
    future,
    total,
  };
}

export default function SalesForecast() {
  const { osos, openServiceJobs, subscriptions, latestSales, isLoading } =
    useSelector((state) => state.all);
  const [rows, setRows] = useState([]);

  // Debugging log for latestSales changes
  console.log("[SalesForecast] Latest sales data:", {
    latestSalesLength: latestSales?.length,
    latestSalesSample: latestSales?.slice(0, 3),
    isLoading,
  });

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

  const headCells = [
    {
      id: "source",
      numeric: false,
      disablePadding: false,
      label: "Source",
    },
    {
      id: "ytdSales",
      numeric: true,
      disablePadding: false,
      label: "YTD Sales",
    },
    {
      id: "overdue",
      numeric: true,
      disablePadding: false,
      label: "Overdue",
    },
    {
      id: "currentMonth",
      numeric: true,
      disablePadding: false,
      label: currentMonthName,
    },
    {
      id: "nextMonth",
      numeric: true,
      disablePadding: false,
      label: nextMonthName,
    },
    {
      id: "twoMonthsLater",
      numeric: true,
      disablePadding: false,
      label: twoMonthsLaterName,
    },
    {
      id: "future",
      numeric: true,
      disablePadding: false,
      label: "Future",
    },
    {
      id: "total",
      numeric: true,
      disablePadding: false,
      label: "Total",
    },
  ];

  useEffect(() => {
    console.log("[SalesForecast] useEffect triggered with dependencies:", {
      osos: osos?.length,
      openServiceJobs: openServiceJobs?.length,
      subscriptions: subscriptions?.length,
      latestSales: latestSales?.length,
    });

    if (osos && openServiceJobs && subscriptions && latestSales) {
      console.log(
        "[SalesForecast] All required data available, calculating totals"
      );
      calculateTotals();
    } else {
      console.warn("[SalesForecast] Missing required data:", {
        ososMissing: !osos,
        openServiceJobsMissing: !openServiceJobs,
        subscriptionsMissing: !subscriptions,
      });
    }
  }, [osos, openServiceJobs, subscriptions, latestSales]); // Added latestSales to dependencies

  const calculateYTDSales = (sales) => {
    console.log(
      "[SalesForecast] calculateYTDSales called with sales:",
      sales?.length
    );

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Determine financial year start date
    const financialYearStart = new Date(
      currentMonth >= 6 ? currentYear : currentYear - 1,
      6, // July (0-based index)
      1
    );
    console.log("[SalesForecast] Financial year range:", {
      financialYearStart,
      currentDate,
    });
    const ytdTotal = sales?.reduce((total, sale, index) => {
      try {
        const [day, month, year] = sale.invoiceDate.split("/");
        const saleDate = new Date(
          2000 + parseInt(year),
          parseInt(month) - 1,
          parseInt(day)
        );

        const isValidDate = !isNaN(saleDate.getTime());
        if (!isValidDate) {
          console.warn(
            `[SalesForecast] Invalid date at index ${index}:`,
            sale.invoiceDate
          );
          return total;
        }

        const inRange =
          saleDate >= financialYearStart && saleDate <= currentDate;
        const amount = parseFloat(sale.audSalesAmount) || 0;

        console.debug(`[SalesForecast] Sale ${index}:`, {
          invoiceDate: sale.invoiceDate,
          parsedDate: saleDate,
          inRange,
          amount,
        });

        return inRange ? total + amount : total;
      } catch (error) {
        console.error(
          `[SalesForecast] Error processing sale ${index}:`,
          error,
          sale
        );
        return total;
      }
    }, 0);

    console.log("[SalesForecast] Calculated YTD total:", ytdTotal);
    return ytdTotal;
  };

  const calculateTotals = () => {
    console.log("[SalesForecast] calculateTotals started", {
      ososCount: osos?.length,
      jobsCount: openServiceJobs?.length,
      subscriptionsCount: subscriptions?.length,
      latestSalesCount: latestSales?.length,
    });

    const currentDate = new Date();
    const tableRows = [];

    // Calculate Order Book totals
    let orderBookOverdue = 0,
      orderBookCurrentMonth = 0,
      orderBookNextMonth = 0,
      orderBookTwoMonthsLater = 0,
      orderBookFuture = 0;

    osos.forEach((oso) => {
      const monthDifference = getMonthDifference(currentDate, oso.dueDate);
      const value = stringToNum(oso.outstandingValue);

      if (monthDifference < 0) {
        orderBookOverdue += value;
      } else if (monthDifference === 0) {
        orderBookCurrentMonth += value;
      } else if (monthDifference === 1) {
        orderBookNextMonth += value;
      } else if (monthDifference === 2) {
        orderBookTwoMonthsLater += value;
      } else if (monthDifference > 2) {
        orderBookFuture += value;
      }
    });

    const orderBookTotal =
      orderBookOverdue +
      orderBookCurrentMonth +
      orderBookNextMonth +
      orderBookTwoMonthsLater +
      orderBookFuture;

    // Calculate Service Job Book totals
    let serviceJobOverdue = 0,
      serviceJobCurrentMonth = 0,
      serviceJobNextMonth = 0,
      serviceJobTwoMonthsLater = 0,
      serviceJobFuture = 0;

    openServiceJobs.forEach((job) => {
      const monthDifference = getMonthDifference(currentDate, job.dueDate);
      const value = stringToNum(job.amountToBeInvoiced, 2);

      if (monthDifference < 0) {
        serviceJobOverdue += value;
      } else if (monthDifference === 0) {
        serviceJobCurrentMonth += value;
      } else if (monthDifference === 1) {
        serviceJobNextMonth += value;
      } else if (monthDifference === 2) {
        serviceJobTwoMonthsLater += value;
      } else if (monthDifference >= 3) {
        serviceJobFuture += value;
      }
    });

    const serviceJobTotal =
      serviceJobOverdue +
      serviceJobCurrentMonth +
      serviceJobNextMonth +
      serviceJobTwoMonthsLater +
      serviceJobFuture;

    // Map subscription data to rows
    const subscriptionRows = [];
    let subscriptionsTotalOverdue = 0,
      subscriptionsTotalCurrent = 0,
      subscriptionsTotalMonth1 = 0,
      subscriptionsTotalMonth2 = 0,
      subscriptionsTotalFuture = 0;

    if (subscriptions && subscriptions.length > 0) {
      subscriptions.forEach((subscription) => {
        // Calculate total for this subscription
        const subTotal =
          (subscription.Overdue || 0) +
          (subscription.Current || 0) +
          (subscription.Month1 || 0) +
          (subscription["Month 2"] || 0) +
          (subscription["Month 3"] || 0) +
          (subscription.Future || 0);

        // Add to subscription totals
        subscriptionsTotalOverdue += subscription.Overdue || 0;
        subscriptionsTotalCurrent += subscription.Current || 0;
        subscriptionsTotalMonth1 += subscription.Month1 || 0;
        subscriptionsTotalMonth2 +=
          (subscription["Month 2"] || 0) + (subscription["Month 3"] || 0);
        subscriptionsTotalFuture += subscription.Future || 0;

        // Create row for this subscription
        subscriptionRows.push(
          createData(
            subscription._id,
            subscription.Application,
            0,
            subscription.Overdue || 0,
            subscription.Current || 0,
            subscription.Month1 || 0,
            (subscription["Month 2"] || 0) + (subscription["Month 3"] || 0),
            subscription.Future || 0,
            subTotal
          )
        );
      });
    }

    const subscriptionsTotalSum =
      subscriptionsTotalOverdue +
      subscriptionsTotalCurrent +
      subscriptionsTotalMonth1 +
      subscriptionsTotalMonth2 +
      subscriptionsTotalFuture;

    // Calculate Grand Total including subscriptions
    const grandTotalOverdue =
      orderBookOverdue + serviceJobOverdue + subscriptionsTotalOverdue;
    const grandTotalCurrentMonth =
      orderBookCurrentMonth +
      serviceJobCurrentMonth +
      subscriptionsTotalCurrent;
    const grandTotalNextMonth =
      orderBookNextMonth + serviceJobNextMonth + subscriptionsTotalMonth1;
    const grandTotalTwoMonthsLater =
      orderBookTwoMonthsLater +
      serviceJobTwoMonthsLater +
      subscriptionsTotalMonth2;
    const grandTotalFuture =
      orderBookFuture + serviceJobFuture + subscriptionsTotalFuture;
    const grandTotal = orderBookTotal + serviceJobTotal + subscriptionsTotalSum;

    // Calculate YTD Sales
    console.log(
      "[SalesForecast] Calculating YTD from latestSales:",
      latestSales
    );
    const ytdSales = calculateYTDSales(latestSales);
    console.log("[SalesForecast] Final YTD Sales value:", ytdSales);

    // Create rows for table - add main data sources first
    tableRows.push(
      createData(
        "orderBook",
        "Order Book",
        "",
        orderBookOverdue,
        orderBookCurrentMonth,
        orderBookNextMonth,
        orderBookTwoMonthsLater,
        orderBookFuture,
        orderBookTotal
      ),
      createData(
        "serviceJob",
        "Service Job Book",
        "",
        serviceJobOverdue,
        serviceJobCurrentMonth,
        serviceJobNextMonth,
        serviceJobTwoMonthsLater,
        serviceJobFuture,
        serviceJobTotal
      )
    );

    // Add subscription rows with 0 for YTD Sales
    subscriptionRows.forEach((row) => {
      row.ytdSales = "";
    });
    tableRows.push(...subscriptionRows);

    // Add sub-total row (renamed from Total)
    tableRows.push(
      createData(
        "subTotal",
        "Sub-total",
        "",
        grandTotalOverdue,
        grandTotalCurrentMonth,
        grandTotalNextMonth,
        grandTotalTwoMonthsLater,
        grandTotalFuture,
        grandTotal
      )
    );

    // Add Cumulative Sales Projection row with cumulative totals (renamed from Sales)
    // Note: This row now serves as the Grand Total as well
    tableRows.push(
      createData(
        "cumulativeSales",
        "Cumulative Sales Projection",
        ytdSales,
        ytdSales + grandTotalOverdue,
        ytdSales + grandTotalOverdue + grandTotalCurrentMonth,
        ytdSales +
          grandTotalOverdue +
          grandTotalCurrentMonth +
          grandTotalNextMonth,
        ytdSales +
          grandTotalOverdue +
          grandTotalCurrentMonth +
          grandTotalNextMonth +
          grandTotalTwoMonthsLater,
        ytdSales +
          grandTotalOverdue +
          grandTotalCurrentMonth +
          grandTotalNextMonth +
          grandTotalTwoMonthsLater +
          grandTotalFuture,
        "" // Empty total as requested
      )
    );

    // Grand Total row has been removed - the Cumulative Sales Projection row now serves this purpose

    setRows(tableRows);
  };

  const getGrandTotalValue = (rows) => {
    const cumulativeSalesRow = rows.find((row) => row.id === "cumulativeSales");
    return cumulativeSalesRow ? cumulativeSalesRow.future : 0;
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="flex flex-col">
      <div className="w-full">
        {rows.length > 0 && (
          <div className="mb-4 text-xl font-bold">
            Grand Total: ${getGrandTotalValue(rows).toLocaleString()}
          </div>
        )}
        <EnhancedTable rows={rows} headerCells={headCells} rowsPP={10} />
      </div>
    </section>
  );
}
