import React, { useEffect, useState } from "react";
import EnhancedTable from "../Table";
import moment from "moment";
import { formatNumberWithCommas } from "../../../components/Helper/Helper";

const NewCustomersByFinancialYear = ({
  allCustomers,
  latestSales,
  headerCells,
  selectedSalesEmployee,
}) => {
  const [selectedFinancialYear, setSelectedFinancialYear] = useState("");
  const [startOfFinancialYear, setStartOfFinancialYear] = useState(null);
  const [endOfFinancialYear, setEndOfFinancialYear] = useState(null);
  const [newCustomersFinancialYear, setNewCustomersFinancialYear] = useState(
    []
  );

  const [selectedStartMonth, setSelectedStartMonth] = useState("");
  const [selectedEndMonth, setSelectedEndMonth] = useState("");

  function getMonthIndex(monthAbbreviation) {
    switch (monthAbbreviation.toUpperCase()) {
      case "JAN":
        return 0; // July
      case "FEB":
        return 1; // August
      case "MAR":
        return 2; // September
      case "APR":
        return 3; // October
      case "MAY":
        return 4; // November
      case "JUN":
        return 5; // December
      case "JUL":
        return 6; // January
      case "AUG":
        return 7; // February
      case "SEP":
        return 8; // March
      case "OCT":
        return 9; // April
      case "NOV":
        return 10; // May
      case "DEC":
        return 11; // June
      default:
        return -1; // Invalid abbreviation
    }
  }
  const months = [
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
  ];

  const getFinancialYearsFromSales = () => {
    const years = new Set();
    latestSales.forEach((sale) => {
      const invoiceDate = moment(sale.invoiceDate, "DD/MM/YYYY");
      const financialYearStart =
        invoiceDate.month() >= 6 ? invoiceDate.year() : invoiceDate.year() - 1;
      const financialYearEnd = financialYearStart + 1;
      years.add(`${financialYearStart} - ${financialYearEnd}`);
    });

    // Convert the Set to an Array and sort it in descending order
    return Array.from(years).sort((a, b) => {
      const [startYearA] = a.split(" - ").map(Number);
      const [startYearB] = b.split(" - ").map(Number);
      return startYearB - startYearA;
    });
  };

  useEffect(() => {
    let newCustomersForFinancialYear = [];

    // Use filteredSales and filteredCustomers
    let filteredSales =
      selectedSalesEmployee !== "All"
        ? latestSales.filter(
            (sale) => sale.salesEmployee === selectedSalesEmployee
          )
        : [...latestSales];

    let filteredCustomers =
      selectedSalesEmployee !== "All"
        ? allCustomers.filter(
            (customer) => customer.salesEmployeeName === selectedSalesEmployee
          )
        : [...allCustomers];

    if (selectedFinancialYear) {
      const [startYear, endYear] = selectedFinancialYear
        .split(" - ")
        .map(Number);

      // Get the index of the selected start and end months
      const startMonthIndex = getMonthIndex(selectedStartMonth);
      const endMonthIndex = getMonthIndex(selectedEndMonth);

      // Determine the year for startMonth and endMonth based on selected months
      const startMonthYear = startMonthIndex <= 5 ? endYear : startYear;
      const endMonthYear = endMonthIndex <= 5 ? endYear : startYear;

      const startMonth = moment({
        year: startMonthYear,
        month: startMonthIndex,
        date: 1,
      });
      const endMonth = moment({
        year: endMonthYear,
        month: endMonthIndex,
        date: 1,
      }).endOf("month");
      const startOfFY = moment({ year: startYear, month: 6, date: 1 });
      const endOfFY = moment({ year: endYear, month: 5, date: 30 }).endOf(
        "day"
      );

      // Use filteredCustomers here instead of allCustomers
      newCustomersForFinancialYear = filteredCustomers
        .filter((customer) => {
          const firstInvoiceDateMoment = moment(
            customer.firstInvoiceDate,
            "DD/MM/YYYY"
          );
          const effectiveExpiryDate = customer.overrideExpiryDate
            ? customer.overrideExpiryDate
            : customer.expiryDate;
          const expiryDateMoment = moment(effectiveExpiryDate, "DD/MM/YYYY");

          const isInvoiceDateAfterExpiry =
            firstInvoiceDateMoment.isAfter(expiryDateMoment);

          return (
            (!isInvoiceDateAfterExpiry &&
              firstInvoiceDateMoment.isAfter(startOfFY) &&
              firstInvoiceDateMoment.isBefore(endOfFY)) ||
            (expiryDateMoment.isAfter(startOfFY) &&
              expiryDateMoment.isBefore(endOfFY))
          );
        })
        .map((customer) => {
          let filteredSalesForCustomer = [];

          if (startMonth.isValid() && endMonth.isValid()) {
            filteredSalesForCustomer = filteredSales.filter(
              (sale) =>
                sale.customerCode === customer.customerCode &&
                sale.customerName === customer.customerName &&
                moment(sale.invoiceDate, "DD/MM/YYYY").isAfter(startMonth) &&
                moment(sale.invoiceDate, "DD/MM/YYYY").isBefore(endMonth)
            );
          } else {
            // Use filteredSales here instead of latestSales
            filteredSalesForCustomer = filteredSales.filter(
              (sale) =>
                sale.customerCode === customer.customerCode &&
                sale.customerName === customer.customerName &&
                moment(sale.invoiceDate, "DD/MM/YYYY").isAfter(startOfFY) &&
                moment(sale.invoiceDate, "DD/MM/YYYY").isBefore(endOfFY)
            );
          }

          const totalSales = computeTotalSales(filteredSalesForCustomer);
          const totalGP = computeTotalGP(filteredSalesForCustomer);

          return { ...customer, totalSales, totalGP, filteredSalesForCustomer }; // Include filteredSales here
        });
    } else {
      setStartOfFinancialYear(null);
      setEndOfFinancialYear(null);
    }

    setNewCustomersFinancialYear(newCustomersForFinancialYear);
  }, [
    allCustomers,
    selectedFinancialYear,
    selectedSalesEmployee,
    selectedEndMonth,
  ]);

  const computeTotalSales = (sales) => {
    return sales.reduce(
      (sum, sale) => sum + parseFloat(sale.audSalesAmount),
      0
    );
  };

  const computeTotalGP = (sales) => {
    return sales.reduce(
      (sum, sale) =>
        sum + (parseFloat(sale.audSalesAmount) - parseFloat(sale.COGS)),
      0
    );
  };

  // Assuming that latestSales is an array of sales data
  const TotalDisplay = ({ data }) => {
    // Step 3: Calculate totals using filtered data
    const totalSales = data.reduce(
      (sum, customer) => sum + customer.totalSales,
      0
    );
    const totalGP = data.reduce((sum, customer) => sum + customer.totalGP, 0);

    return (
      <div className="flex items-center mb-5">
        <span className="font-bold mr-2">Total Sales:</span>
        <span className="mr-4">${formatNumberWithCommas(totalSales)}</span>
        <span className="font-bold mr-2">Total GP:</span>
        <span>${formatNumberWithCommas(totalGP)}</span>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-3" style={{ display: "flex", gap: "15px" }}>
        <div>
          <select
            value={selectedFinancialYear}
            onChange={(e) => setSelectedFinancialYear(e.target.value)}
            className="mb-3"
          >
            <option value="">Select Financial Year</option>
            {getFinancialYearsFromSales().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={selectedStartMonth}
            onChange={(e) => {
              setSelectedStartMonth(e.target.value);
              setSelectedEndMonth("");
            }}
            className="mr-3"
          >
            <option value="">Select Start Month</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={selectedEndMonth}
            onChange={(e) => setSelectedEndMonth(e.target.value)}
            disabled={!selectedStartMonth}
          >
            <option value="">Select End Month</option>
            {months.slice(months.indexOf(selectedStartMonth)).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <TotalDisplay data={newCustomersFinancialYear} />

      <EnhancedTable
        rows={newCustomersFinancialYear}
        headerCells={headerCells}
        rowsPP={25}
      />
    </div>
  );
};

export default NewCustomersByFinancialYear;
