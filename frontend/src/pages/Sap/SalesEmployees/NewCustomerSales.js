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
import NewCustomersByFinancialYear from "./NewCustomerSalesByFinanicalYear";
const { TabPane } = Tabs;

//--------------------------Table----------------------------

function createData(
  id,
  customerCode,
  customerName,
  customerCurrency,
  salesEmployeeName,
  billingAddress,
  shippingAddress,
  creationDate,
  firstInvoiceDate,
  expiryDate,
  overrideExpiryDate,
  totalSales,
  totalGP // Added Total Gross Profit (GP) here
) {
  expiryDate = expiryDate || null;
  overrideExpiryDate = overrideExpiryDate || null;

  return {
    id,
    customerCode,
    customerName,
    customerCurrency,
    salesEmployeeName,
    billingAddress,
    shippingAddress,
    creationDate,
    firstInvoiceDate,
    expiryDate:
      overrideExpiryDate && isValidDate(new Date(overrideExpiryDate))
        ? overrideExpiryDate
        : expiryDate,
    totalSales,
    totalGP, // Added Total Gross Profit (GP) here
  };
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function NewCustomerSales({ code, name }) {
  // --------------------------Constants----------------------------

  const {
    // customers: allCustomers,
    latestSales,
    isLoading,
  } = useSelector((state) => state.all);

  const [allCustomers, setAllCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFinancialYear, setSelectedFinancialYear] = useState("");
  const [startOfFinancialYear, setStartOfFinancialYear] = useState(null);
  const [endOfFinancialYear, setEndOfFinancialYear] = useState(null);

  useEffect(() => {
    const fetchNewCustomers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/all/getNewCustomers");
        setAllCustomers(response.data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewCustomers();
  }, []);

  const [allTimeNewCustomers, setAllTimeNewCustomers] = useState([]);
  const [newCustomersFinancialYear, setNewCustomersFinancialYear] = useState(
    []
  );
  const [selectedEmployee, setSelectedEmployee] = useState("All");

  useEffect(() => {
    console.log("hi");
  }, [selectedEmployee]);

  // Extract unique financial years from latestSales
  const getFinancialYearsFromSales = () => {
    const years = new Set();
    latestSales.forEach((sale) => {
      const invoiceDate = moment(sale.invoiceDate, "DD/MM/YYYY");
      const financialYearStart =
        invoiceDate.month() >= 6 ? invoiceDate.year() : invoiceDate.year() - 1;
      const financialYearEnd = financialYearStart + 1;
      years.add(`${financialYearStart} - ${financialYearEnd}`);
    });
    return Array.from(years);
  };

  // New useEffect to filter customers and sales by financial year
  useEffect(() => {
    let newCustomersForFinancialYear = [];

    if (selectedFinancialYear) {
      const [startYear, endYear] = selectedFinancialYear
        .split(" - ")
        .map(Number);
      setStartOfFinancialYear(moment({ year: startYear, month: 6, date: 1 }));
      setEndOfFinancialYear(
        moment({ year: endYear, month: 5, date: 30 }).endOf("day")
      );
      newCustomersForFinancialYear = allCustomers.filter((customer) => {
        const effectiveExpiryDate = customer.overrideExpiryDate
          ? customer.overrideExpiryDate
          : customer.expiryDate;

        const expiryDateMoment = moment(effectiveExpiryDate, "DD/MM/YYYY");

        return (
          customer.firstInvoiceDate !== "" &&
          expiryDateMoment.isAfter(startOfFinancialYear) &&
          expiryDateMoment.isBefore(endOfFinancialYear)
        );
      });
    } else {
      setStartOfFinancialYear(null);
      setEndOfFinancialYear(null);
    }

    setNewCustomersFinancialYear(newCustomersForFinancialYear);
  }, [allCustomers, selectedFinancialYear]);

  const uniqueSalesEmployees = [
    ...new Set(allCustomers.map((c) => c.salesEmployeeName)),
  ];

  const headCells = [
    {
      id: "customerCode",
      numeric: false,
      disablePadding: true,
      label: "Cus Code",
    },
    {
      id: "customerName",
      numeric: false,
      disablePadding: false,
      label: "Cus Name",
    },
    {
      id: "customerCurrency",
      numeric: false,
      disablePadding: false,
      label: "Cus Currency",
    },
    {
      id: "salesEmployeeName",
      numeric: false,
      disablePadding: false,
      label: "Sales Employee Name",
    },
    {
      id: "billingAddress",
      numeric: false,
      disablePadding: false,
      label: "Billing Address",
    },
    {
      id: "shippingAddress",
      numeric: false,
      disablePadding: false,
      label: "Shipping Address",
    },
    {
      id: "creationDate",
      numeric: false,
      disablePadding: false,
      label: "Creation Date",
    },
    {
      id: "firstInvoiceDate",
      numeric: false,
      disablePadding: false,
      label: "First Invoice Date",
    },
    {
      id: "expiryDate",
      numeric: false,
      disablePadding: false,
      label: "Expiry Date",
    },
    {
      id: "totalSales",
      numeric: true,
      disablePadding: false,
      label: "Total Sales",
    },
    {
      id: "totalGP",
      numeric: true,
      disablePadding: false,
      label: "Total GP",
    },
  ];

  const computeTotalSales = (sales, customerCode, customerName) => {
    let filteredSales = sales.filter(
      (sale) =>
        sale.customerCode === customerCode && sale.customerName === customerName
    );
    return filteredSales.reduce(
      (sum, sale) => sum + parseFloat(sale.audSalesAmount),
      0
    );
  };

  const computeTotalGP = (sales, customerCode, customerName) => {
    const filteredSales = sales.filter(
      (sale) =>
        sale.customerCode === customerCode && sale.customerName === customerName
    );
    return filteredSales.reduce(
      (sum, sale) =>
        sum + (parseFloat(sale.audSalesAmount) - parseFloat(sale.COGS)),
      0
    );
  };

  // --------------------------Functions----------------------------

  useEffect(() => {
    const allNewCustomers = allCustomers.filter((customer) => {
      const effectiveExpiryDate = customer.overrideExpiryDate
        ? customer.overrideExpiryDate
        : customer.expiryDate;

      const expiryDateMoment = moment(effectiveExpiryDate, "DD/MM/YYYY");
      const today = moment();
      return (
        customer.firstInvoiceDate !== "" && expiryDateMoment.isAfter(today)
      );
    });

    setAllTimeNewCustomers(allNewCustomers);
  }, [allCustomers]);

  const renderTable = (customers) => {
    let filteredCustomers =
      selectedEmployee !== "All"
        ? customers.filter((c) => c.salesEmployeeName === selectedEmployee)
        : customers;

    // Then map your filteredCustomers
    return filteredCustomers.map((customer) => {
      const totalSales = computeTotalSales(
        latestSales,
        customer.customerCode,
        customer.customerName
      );

      const totalGP = computeTotalGP(
        latestSales,
        customer.customerCode,
        customer.customerName
      );

      const row = createData(
        customer._id,
        customer.customerCode,
        customer.customerName,
        customer.customerCurrency,
        customer.salesEmployeeName,
        customer.billingAddress,
        customer.shippingAddress,
        stringToDate(customer.creationDate),
        stringToDate(customer.firstInvoiceDate),
        stringToDate(
          customer.overrideExpiryDate
            ? customer.overrideExpiryDate
            : customer.expiryDate || ""
        ),
        stringToDate(customer.overrideExpiryDate || ""), // Add overrideExpiryDate here
        totalSales,
        totalGP
      );

      return row;
    });
  };

  const computeSumForTable = (rows, key) => {
    return Math.round(rows.reduce((sum, row) => sum + row[key], 0));
  };

  const TotalDisplay = ({ data, field1, field2 }) => {
    return (
      <div className="flex items-center mb-5">
        <span className="font-bold mr-2">Total Sales:</span>
        <span className="mr-4">
          $
          {formatNumberWithCommas(
            Math.round(computeSumForTable(renderTable(data), field1))
          )}
        </span>
        <span className="font-bold mr-2">Total GP:</span>
        <span>
          $
          {formatNumberWithCommas(
            Math.round(computeSumForTable(renderTable(data), field2))
          )}
        </span>
      </div>
    );
  };

  if (isLoading || loading) {
    return <Spinner />;
  }

  return (
    <section className="flex bg-white border shadow-md rounded-md px-5">
      <div className="block mt-5">
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="All">All</option>
          {uniqueSalesEmployees.map((employee) => (
            <option key={employee} value={employee}>
              {employee}
            </option>
          ))}
        </select>

        <Tabs defaultActiveKey="1">
          <TabPane tab="New Customers (Past 12 months)" key="1">
            <TotalDisplay
              data={allTimeNewCustomers}
              field1="totalSales"
              field2="totalGP"
            />
            <EnhancedTable
              rows={renderTable(allTimeNewCustomers)}
              headerCells={headCells}
              rowsPP={25}
            />
          </TabPane>

          <TabPane tab="New Customers (By Financial Year)" key="2">
            <NewCustomersByFinancialYear
              allCustomers={allCustomers} // Data for all customers
              latestSales={latestSales} // Data for all sales (to compute financial years)
              headerCells={headCells}
              selectedSalesEmployee={selectedEmployee}
            />
          </TabPane>
        </Tabs>
      </div>
    </section>
  );
}
