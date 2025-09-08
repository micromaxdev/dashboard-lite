import React, { useState, useEffect } from "react";
import EnhancedTable from "../Table";
import moment from "moment";

const SalesByPartPerCustomer = ({ latestSales, partCode }) => {
  const [rows, setRows] = useState([]);
  const [headCells, setHeadCells] = useState([]);

  useEffect(() => {
    // Replace with the desired partCode
    const customerSalesByPart = processSalesByCustomer(latestSales, partCode);

    const rows = customerSalesByPart.map((item, index) => ({
      id: index + 1,
      customerCode: item.customerCode,
      customerName: item.customerName,
      salesEmployee: item.salesEmployee,
      partCode: item.partCode,
      description: item.description,
      qty: item.qty ? item.qty : 0,
      fyminus4: item.fyminus4 ? item.fyminus4 : 0,
      fyminus3: item.fyminus3 ? item.fyminus3 : 0,
      fyminus2: item.fyminus2 ? item.fyminus2 : 0,
      fyminus1: item.fyminus1 ? item.fyminus1 : 0,
      currentfy: item.currentfy ? item.currentfy : 0,
    }));
    setRows(rows);
  }, [latestSales, partCode]);

  useEffect(() => {
    const { currentFYStart } = findCurrentAndPreviousFY();

    const headCells = [
      {
        id: "customerCode",
        numeric: false,
        disablePadding: false,
        label: "Cus Code",
      },
      {
        id: "customerName",
        numeric: false,
        disablePadding: false,
        label: "Customer Name",
      },
      {
        id: "salesEmployee",
        numeric: false,
        disablePadding: true,
        label: "Sales Employee",
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
        id: "qty",
        numeric: true,
        disablePadding: false,
        label: "Qty",
      },
      {
        id: "fyminus4",
        numeric: true,
        disablePadding: false,
        label: `${currentFYStart
          .clone()
          .subtract(4, "years")
          .format("YYYY")}-${currentFYStart
          .clone()
          .subtract(3, "years")
          .format("YYYY")} $`,
      },
      {
        id: "fyminus3",
        numeric: true,
        disablePadding: false,
        label: `${currentFYStart
          .clone()
          .subtract(3, "years")
          .format("YYYY")}-${currentFYStart
          .clone()
          .subtract(2, "years")
          .format("YYYY")} $`,
      },
      {
        id: "fyminus2",
        numeric: true,
        disablePadding: false,
        label: `${currentFYStart
          .clone()
          .subtract(2, "years")
          .format("YYYY")}-${currentFYStart
          .clone()
          .subtract(1, "years")
          .format("YYYY")} $`,
      },
      {
        id: "fyminus1",
        numeric: true,
        disablePadding: false,
        label: `${currentFYStart
          .clone()
          .subtract(1, "years")
          .format("YYYY")}-${currentFYStart.clone().format("YYYY")} $`,
      },
      {
        id: "currentfy",
        numeric: true,
        disablePadding: false,
        label: "Current FY $",
      },
    ];
    setHeadCells(headCells);
  }, []);

  return (
    <div>
      <EnhancedTable rows={rows} headerCells={headCells} />
    </div>
  );
};

function processSalesByCustomer(latestSales, partCode) {
  const filteredSales = filterByPartCode(latestSales, partCode);
  const { currentFYStart, previousFYStartEnd } = findCurrentAndPreviousFY();

  const customerSalesByPart = calculateCustomerSales(
    filteredSales,
    currentFYStart,
    previousFYStartEnd
  );

  return customerSalesByPart;
}

function filterByPartCode(sales, partCode) {
  return sales.filter((sale) => sale.partCode === partCode);
}

function findCurrentFinancialYear() {
  const today = moment();
  const startOfCurrentFY = moment([today.year(), 6, 1]); // 1st July of the current year
  if (today.isBefore(startOfCurrentFY)) {
    startOfCurrentFY.subtract(1, "year");
  }
  return startOfCurrentFY;
}

function findCurrentAndPreviousFY() {
  const currentFYStart = findCurrentFinancialYear();
  let previousFYStartEnd = [];

  for (let i = 1; i <= 4; i++) {
    const start = moment(currentFYStart).subtract(i, "years");
    const end = moment(start).add(1, "years").subtract(1, "seconds"); // 30th June end of day
    previousFYStartEnd.push({ start, end });
  }

  return { currentFYStart, previousFYStartEnd };
}

function calculateCustomerSales(
  filteredSales,
  currentFYStart,
  previousFYStartEnd
) {
  const salesByCustomer = {};

  filteredSales.forEach((sale) => {
    const customerCode = sale.customerCode;
    if (!salesByCustomer[customerCode]) {
      salesByCustomer[customerCode] = {
        customerCode: sale.customerCode,
        customerName: sale.customerName,
        salesEmployee: sale.salesEmployee,
        partCode: sale.partCode,
        description: sale.description,
        qty: 0,
        fyminus4: 0,
        fyminus3: 0,
        fyminus2: 0,
        fyminus1: 0,
        currentfy: 0,
      };
    }

    salesByCustomer[customerCode].qty += parseInt(sale.qty);

    const invoiceDate = moment(sale.invoiceDate, "DD/MM/YY");
    if (
      invoiceDate.isBetween(
        currentFYStart,
        moment(currentFYStart).add(1, "years").subtract(1, "seconds"),
        null,
        "[]" // Inclusive of both ends
      )
    ) {
      salesByCustomer[customerCode].currentfy += parseFloat(
        sale.audSalesAmount
      );
    } else {
      previousFYStartEnd.forEach((fy, index) => {
        if (invoiceDate.isBetween(fy.start, fy.end, null, "[]")) {
          salesByCustomer[customerCode][`fyminus${index + 1}`] += parseFloat(
            sale.audSalesAmount
          );
        }
      });
    }
  });

  return Object.values(salesByCustomer);
}

export default SalesByPartPerCustomer;
