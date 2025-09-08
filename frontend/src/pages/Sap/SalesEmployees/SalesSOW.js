import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import EnhancedTable from "../Table";
import {
  formatNumberWithCommas,
  stringToDate,
} from "../../../components/Helper/Helper";
import moment from "moment";
import { Tabs } from "antd";
import axios from "axios";
const { TabPane } = Tabs;

// Summation function
const summateSales = (
  sales,
  customerCode,
  partCode,
  employee,
  financialYear
) => {
  let startYear, endYear;

  if (financialYear && financialYear !== "All") {
    [startYear, endYear] = financialYear.split(" - ").map(Number);
  }

  return sales.reduce((acc, sale) => {
    if (
      sale.customerCode === customerCode &&
      sale.partCode === partCode &&
      sale.salesEmployee?.toLowerCase() === employee?.toLowerCase()
    ) {
      if (financialYear !== "All") {
        const invoiceDate = moment(sale.invoiceDate, "DD/MM/YY");
        const startFinancialDate = moment(`01/07/${startYear}`, "DD/MM/YYYY");
        const endFinancialDate = moment(`30/06/${endYear}`, "DD/MM/YYYY");

        // console.log("Selected financial year:", financialYear);
        // console.log("Start year:", startYear);
        // console.log("End year:", endYear);
        // console.log("Invoice Date:", invoiceDate.format("DD/MM/YY"));
        // console.log(
        //   "Start Financial Date:",
        //   startFinancialDate.format("DD/MM/YY")
        // );
        // console.log("End Financial Date:", endFinancialDate.format("DD/MM/YY"));

        if (
          invoiceDate.isBetween(
            startFinancialDate,
            endFinancialDate,
            null,
            "[]"
          )
        ) {
          acc += parseFloat(sale.audSalesAmount);
        }
      } else {
        acc += parseFloat(sale.audSalesAmount);
      }
    }
    return acc;
  }, 0);
};

const summateGp = (sales, customerCode, partCode, employee, financialYear) => {
  let startYear, endYear;

  if (financialYear && financialYear !== "All") {
    [startYear, endYear] = financialYear.split(" - ").map(Number);
  }

  return sales.reduce((acc, sale) => {
    if (
      sale.customerCode === customerCode &&
      sale.partCode === partCode &&
      sale.salesEmployee?.toLowerCase() === employee?.toLowerCase()
    ) {
      if (financialYear !== "All") {
        const invoiceDate = moment(sale.invoiceDate, "DD/MM/YY");
        const startFinancialDate = moment(`01/07/${startYear}`, "DD/MM/YYYY");
        const endFinancialDate = moment(`30/06/${endYear}`, "DD/MM/YYYY");

        if (
          invoiceDate.isBetween(
            startFinancialDate,
            endFinancialDate,
            null,
            "[]"
          )
        ) {
          acc += parseFloat(sale.audSalesAmount) - parseFloat(sale.COGS);
        }
      } else {
        acc += parseFloat(sale.audSalesAmount) - parseFloat(sale.COGS);
      }
    }
    return acc;
  }, 0);
};

// Reusable function to create a SOW object
function createSOW(
  id,
  customerCode,
  customerName,
  salesEmployee,
  partCode,
  description,
  currency,
  unitPrice,
  qty,
  discount,
  foreignSalesAmount,
  audSalesAmount,
  invoiceCRNote,
  invoiceDate,
  customerOrderNo,
  courier,
  consignmentNoteNo,
  COGS,
  salesType,
  sOW,
  expiryDate,
  overrideExpiryDate,
  totalSales,
  totalGp,
  expiryStatus
) {
  expiryDate = expiryDate || null;
  overrideExpiryDate = overrideExpiryDate || null;

  return {
    id,
    customerCode,
    customerName,
    salesEmployee,
    partCode,
    description,
    currency,
    unitPrice,
    qty,
    discount,
    foreignSalesAmount,
    audSalesAmount,
    invoiceCRNote,
    invoiceDate,
    customerOrderNo,
    courier,
    consignmentNoteNo,
    COGS,
    salesType,
    sOW,
    expiryDate:
      overrideExpiryDate && isValidDate(new Date(overrideExpiryDate))
        ? overrideExpiryDate
        : expiryDate,
    totalSales,
    totalGp,
    expiryStatus,
  };
}

// Validate if the date is valid
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

export default function SalesSOW() {
  const { latestSales } = useSelector((state) => state.all);

  const [allSOWs, setAllSOWs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedFinancialYear, setSelectedFinancialYear] = useState("All");

  const TotalDisplay = ({ data, selectedEmployee, latestSales }) => {
    let filteredData = data;
    if (selectedEmployee !== "All") {
      filteredData = data.filter(
        (sow) => sow.salesEmployee === selectedEmployee
      );
    }

    const totalSales = filteredData.reduce((acc, sow) => {
      const sowTotalSales = summateSales(
        latestSales,
        sow.customerCode,
        sow.partCode,
        sow.salesEmployee,
        selectedFinancialYear // New Argument
      );
      return acc + sowTotalSales;
    }, 0);

    const totalGp = filteredData.reduce((acc, sow) => {
      const sowTotalGp = summateGp(
        latestSales,
        sow.customerCode,
        sow.partCode,
        sow.salesEmployee,
        selectedFinancialYear
      );
      return acc + sowTotalGp;
    }, 0);

    return (
      <div className="flex space-x-4 mb-5">
        <div className="space-x-2">
          <strong>Total Sales: </strong> $
          {formatNumberWithCommas(totalSales.toFixed(2))}
        </div>
        <div className="space-x-2">
          <strong>Total GP: </strong> $
          {formatNumberWithCommas(totalGp.toFixed(2))}
        </div>
      </div>
    );
  };

  // Fetch all SOWs
  useEffect(() => {
    const fetchAllSOWs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/all/getAllSOWs");

        setAllSOWs(response.data.filter((sow) => sow?.sOW === true));
      } catch (error) {
        console.error("Error fetching SOWs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllSOWs();
  }, []);

  const computeSalesForSOWs = (sows) => {
    return sows.map((sow) => {
      const totalSales = summateSales(
        latestSales,
        sow.customerCode,
        sow.partCode,
        sow.salesEmployee,
        selectedFinancialYear
      );

      const totalGp = summateGp(
        latestSales,
        sow.customerCode,
        sow.partCode,
        sow.salesEmployee,
        selectedFinancialYear
      );

      // Find the corresponding SOW entry from allSOWs that has the same customerCode and partCode
      const matchingSOW = allSOWs.find(
        (entry) =>
          entry.customerCode === sow.customerCode &&
          entry.partCode === sow.partCode
      );

      // Use either the expiryDate or the overrideExpiryDate from the matchingSOW
      const expiryDateToUse = matchingSOW
        ? matchingSOW.overrideExpiryDate || matchingSOW.expiryDate
        : null;

      const expiryStatus = moment().isAfter(moment(expiryDateToUse, "DD/MM/YY"))
        ? "Expired"
        : "Active";

      return createSOW(
        sow.id,
        sow.customerCode,
        sow.customerName,
        sow.salesEmployee,
        sow.partCode,
        sow.description,
        sow.currency,
        sow.unitPrice,
        sow.qty,
        sow.discount,
        sow.foreignSalesAmount,
        sow.audSalesAmount,
        sow.invoiceCRNote,
        sow.invoiceDate,
        sow.customerOrderNo,
        sow.courier,
        sow.consignmentNoteNo,
        sow.COGS,
        sow.salesType,
        sow.sOW,
        expiryDateToUse, // Pass the chosen expiry date here
        sow.overrideExpiryDate, // You can still pass this if you want
        totalSales,
        totalGp,
        expiryStatus
      );
    });
  };

  const renderTable = () => {
    let sowsToRender = allSOWs.filter((sow) => sow.sOW === true); // Filter only those rows with SOW as true

    if (selectedEmployee !== "All") {
      sowsToRender = sowsToRender.filter(
        (sow) => sow.salesEmployee === selectedEmployee
      );
    }

    return computeSalesForSOWs(sowsToRender);
  };

  const uniqueSalesEmployees = [
    ...new Set(allSOWs.map((sow) => sow.salesEmployee)),
  ];

  const headCells = [
    // { id: "id", label: "ID" },
    { id: "customerCode", label: "Customer Code" },
    { id: "customerName", label: "Customer Name" },
    { id: "salesEmployee", label: "Sales Employee" },
    { id: "partCode", label: "Part Code" },
    { id: "description", label: "Description" },
    // { id: "currency", label: "Currency" },
    // { id: "unitPrice", label: "Unit Price" },
    // { id: "qty", label: "Quantity" },
    // { id: "discount", label: "Discount" },
    // { id: "foreignSalesAmount", label: "Foreign Sales Amount" },
    // { id: "audSalesAmount", label: "AUD Sales Amount" },
    // { id: "invoiceCRNote", label: "Invoice/CR Note" },
    // { id: "invoiceDate", label: "Invoice Date" },
    // { id: "customerOrderNo", label: "Customer Order No" },
    // { id: "courier", label: "Courier" },
    // { id: "consignmentNoteNo", label: "Consignment Note No" },
    // { id: "COGS", label: "COGS" },
    // { id: "salesType", label: "Sales Type" },
    // { id: "sOW", label: "SOW" },
    { id: "expiryDate", label: "Expiry Date" },
    { id: "expiryStatus", label: "Expiry Status" },
    { id: "totalSales", label: "Total Sales" },
    { id: "totalGp", label: "Total GP" },
  ];

  // Derive unique years from the allSOWs data
  const uniqueYears = [
    ...new Set(
      allSOWs.map((sow) => {
        const date = moment(sow.invoiceDate, "DD/MM/YY");
        return date.year();
      })
    ),
  ].sort();

  // Check if the latest date in allSOWs is beyond 1/7/YYYY
  const latestDate = moment.max(
    allSOWs.map((sow) => moment(sow.invoiceDate, "DD/MM/YY"))
  );
  const currentYear = moment().year();
  const startOfCurrentFinancialYear = moment(
    `01/07/${currentYear}`,
    "DD/MM/YYYY"
  );

  if (latestDate.isAfter(startOfCurrentFinancialYear)) {
    uniqueYears.push(currentYear + 1);
  }

  // Special handling: Add previous year for early invoices in a year
  allSOWs.forEach((sow) => {
    const date = moment(sow.invoiceDate, "DD/MM/YY");
    const startOfThatFinancialYear = moment(
      `01/07/${date.year()}`,
      "DD/MM/YYYY"
    );
    if (date.isBefore(startOfThatFinancialYear)) {
      uniqueYears.push(date.year() - 1);
    }
  });

  // Make sure the years are unique and sorted
  const sortedUniqueYears = [...new Set(uniqueYears)].sort();

  // Generate an array of financial years based on those unique years
  const financialYears = sortedUniqueYears.reduce((acc, year, index, array) => {
    if (array[index + 1]) {
      acc.push(`${year} - ${array[index + 1]}`);
    }
    return acc;
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="flex bg-white border shadow-md rounded-md px-5">
      <div className="block mt-5">
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="mr-5"
        >
          <option value="All">All</option>
          {uniqueSalesEmployees.map((employee) => (
            <option key={employee} value={employee}>
              {employee}
            </option>
          ))}
        </select>

        {/* Financial Year Select Menu */}
        <select
          value={selectedFinancialYear}
          onChange={(e) => setSelectedFinancialYear(e.target.value)}
        >
          <option value="All">All Financial Years</option>
          {financialYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Sales SOW" key="1">
            <TotalDisplay
              data={allSOWs}
              selectedEmployee={selectedEmployee}
              latestSales={latestSales}
              selectedFinancialYear={selectedFinancialYear}
            />
            <EnhancedTable
              rows={renderTable(allSOWs)}
              headerCells={headCells}
              rowsPP={25}
            />
          </TabPane>
        </Tabs>
      </div>
    </section>
  );
}
