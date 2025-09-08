import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import { Table } from "flowbite-react/lib/cjs/components/Table";
import { getCurrentFinancialYear } from "../../../components/Helper/Helper";
import { getBudget, getLatestSales } from "../../../features/all/allSlice";

const formatNumber = (num) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
};

export default function SalesPerformanceQuarterly() {
  // --------------------------Constants----------------------------
  const {
    latestSales: ls,
    budget,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.all);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    try {
      if (!budget.length) {
        dispatch(getBudget());
      }
      if (!ls.length) {
        dispatch(getLatestSales());
      }
    } catch (error) {}
  }, []);

  const [dropdownYear, setDropdownYear] = React.useState(
    getCurrentFinancialYear()
  );

  const [filteredBudget, setFilteredBudget] = React.useState(
    budget.filter((item) => item.year2 === dropdownYear.toString())
  );

  useEffect(() => {
    const fbudget = budget.filter(
      (item) => item.year2 === dropdownYear.toString()
    );
    setFilteredBudget(fbudget);
  }, [dropdownYear, budget]);

  // State variables
  const [selectedYear, setSelectedYear] = useState(
    (dropdownYear - 1).toString()
  );
  const [tableHeaders, setTableHeaders] = useState([]);
  const [budgets, setBudgets] = useState(budget);
  const [latestSales, setLatestSales] = useState(ls);

  // Define a new state to hold unique years
  const [uniqueYears, setUniqueYears] = useState([]);

  // Extract unique years from budget data and sort them in descending order
  useEffect(() => {
    const yearsSet = new Set(budget.map((b) => b.year2));
    const currentYear = getCurrentFinancialYear().toString();

    // Add current financial year if not in budget data
    if (!yearsSet.has(currentYear)) {
      yearsSet.add(currentYear);
    }

    // Add consecutive years to fill gaps (e.g., if we have 2023 and 2025, add 2024)
    const yearsArray = Array.from(yearsSet)
      .map(Number)
      .sort((a, b) => b - a);
    const filledYears = [];

    if (yearsArray.length > 0) {
      const minYear = Math.min(...yearsArray);
      const maxYear = Math.max(...yearsArray);

      // Fill all years from min to max
      for (let year = maxYear; year >= minYear; year--) {
        filledYears.push(year.toString());
      }
    }

    setUniqueYears(filledYears);
  }, [budget]);

  // Function to handle the year change in the dropdown
  const handleYearChange = (event) => {
    setDropdownYear(event.target.value);
    setSelectedYear((event.target.value - 1).toString());
  };

  // Function to get table headers
  const getTableHeaders = () => {
    return tableHeaders.map((header, index) => (
      <Table.Cell key={index} className="bg-gray-200">
        {header}
      </Table.Cell>
    ));
  };

  // Function to get the rows for the budget table
  const getTableRows = () => {
    const budgetsForSelectedYear = budgets.filter(
      (budget) =>
        budget.year1 === (dropdownYear - 1).toString() &&
        budget.year2 === dropdownYear.toString()
    );

    if (budgetsForSelectedYear.length === 0) return null;

    let totalSalesBaseLine = 0;
    let totalGpBaseLine = 0;
    let totalGpPercent = 0;
    let totalSalesBudget = 0;
    let totalGpBudget = 0;

    budgetsForSelectedYear.forEach((budgetForSelectedYear) => {
      totalSalesBaseLine +=
        parseFloat(budgetForSelectedYear.salesBaseLine || 0) / 4;
      totalGpBaseLine += parseFloat(budgetForSelectedYear.gpBaseLine || 0) / 4;
      totalGpPercent += parseFloat(budgetForSelectedYear.gPPercent || 0);
      totalSalesBudget +=
        parseFloat(budgetForSelectedYear.salesBudget || 0) / 4;
      totalGpBudget += parseFloat(budgetForSelectedYear.gpBudget || 0) / 4;
    });

    // console.log("Total GP Percent:", totalGpPercent);
    // console.log("Number of Records:", budgetsForSelectedYear.length);

    const avgGpPercent =
      budgetsForSelectedYear.length > 0
        ? totalGpPercent / budgetsForSelectedYear.length
        : 0;

    return (
      <>
        {budgetsForSelectedYear.map((budgetForSelectedYear, index) => (
          <Table.Row key={index}>
            <Table.Cell>{budgetForSelectedYear.salesTeam}</Table.Cell>
            <Table.Cell>
              {formatNumber(budgetForSelectedYear.salesBaseLine / 4)}
            </Table.Cell>
            <Table.Cell>
              {formatNumber(budgetForSelectedYear.gpBaseLine / 4)}
            </Table.Cell>
            <Table.Cell>{budgetForSelectedYear.gPPercent}%</Table.Cell>
            <Table.Cell>
              {formatNumber(budgetForSelectedYear.salesBudget / 4)}
            </Table.Cell>
            <Table.Cell>
              {formatNumber(budgetForSelectedYear.gpBudget / 4)}
            </Table.Cell>
          </Table.Row>
        ))}
        {/* Total Row */}
        <Table.Row key="totalRow">
          <Table.Cell>Total</Table.Cell>
          <Table.Cell>{formatNumber(totalSalesBaseLine)}</Table.Cell>
          <Table.Cell>{formatNumber(totalGpBaseLine)}</Table.Cell>
          <Table.Cell>{avgGpPercent.toFixed(2)}%</Table.Cell>
          <Table.Cell>{formatNumber(totalSalesBudget)}</Table.Cell>
          <Table.Cell>{formatNumber(totalGpBudget)}</Table.Cell>
        </Table.Row>
      </>
    );
  };

  const getFinancialMonth = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    const date = new Date(`20${year}`, month - 1, day);
    const startFinYear = new Date(date.getFullYear(), 6, 1);
    if (date < startFinYear)
      startFinYear.setFullYear(startFinYear.getFullYear() - 1);
    const diffMonths =
      date.getMonth() -
      startFinYear.getMonth() +
      12 * (date.getFullYear() - startFinYear.getFullYear());

    return diffMonths + 1;
  };

  const getActualTableHeaders = () => {
    const quarterNames = ["Q1", "Q2", "Q3", "Q4"];

    const weekNumbers = Array.from({ length: 53 }, (v, i) => i + startWeek);

    // Adjust week numbers based on the condition
    const adjustedWeekNumbers = weekNumbers.map((week) =>
      week > 52 ? week - 52 : week
    );

    const headers = [
      <div className="font-bold">Sales Team</div>,
      <div className="font-bold">Actual Sales (Total) {dropdownYear}</div>,
      <div className="font-bold">Actual GP (Total) {dropdownYear}</div>,
      <div className="font-bold">Revised GP</div>,
      ...quarterNames.map((quarter) => [
        <div className="">
          <div className="font-bold">{quarter}</div>{" "}
          <div className="text-green-500 font-bold">Sales</div>
        </div>,
        <div className="">
          <div className="font-bold">{quarter}</div>{" "}
          <div className="text-orange-300 font-bold">GP</div>
        </div>,
      ]),
    ].flat();

    return headers.map((header, index) => (
      <Table.Cell key={index} className="bg-gray-200">
        {header}
      </Table.Cell>
    ));
  };

  const getActualTableRows = () => {
    const today = new Date();

    // Filter sales for the selected financial year
    const salesForSelectedYear = latestSales.filter((sale) => {
      const [day, month, year] = sale.invoiceDate.split("/");
      const saleDate = new Date(`20${year}`, month - 1, day);

      if (saleDate > today) return false;

      if (`20${year}` === selectedYear && saleDate.getMonth() >= 6) return true;

      if (
        `20${year}` === `${parseInt(selectedYear) + 1}` &&
        saleDate.getMonth() < 6
      )
        return true;

      return false;
    });

    let maxQuarterNumber = 0;
    const salesByTeam = salesForSelectedYear.reduce((acc, curr) => {
      if (!acc[curr.salesEmployee]) {
        acc[curr.salesEmployee] = {
          sales: 0,
          gp: 0,
          quarterlySales: {},
          quarterlyGP: {},
        };
      }

      const saleValue = parseFloat(curr.audSalesAmount);
      const gpValue = saleValue - parseFloat(curr.COGS);
      const quarterNumber = getFinancialQuarter(curr.invoiceDate);

      if (quarterNumber > maxQuarterNumber) {
        maxQuarterNumber = quarterNumber;
      }

      if (
        !acc[curr.salesEmployee].quarterlySales.hasOwnProperty(quarterNumber)
      ) {
        acc[curr.salesEmployee].quarterlySales[quarterNumber] = 0;
        acc[curr.salesEmployee].quarterlyGP[quarterNumber] = 0;
      }

      acc[curr.salesEmployee].quarterlySales[quarterNumber] += saleValue;
      acc[curr.salesEmployee].quarterlyGP[quarterNumber] += gpValue;

      return acc;
    }, {});

    let totalSales = 0;
    let totalGP = 0;
    let totalQuarterlySales = {};
    let totalQuarterlyGP = {};

    for (let team in salesByTeam) {
      salesByTeam[team].sales = Object.values(
        salesByTeam[team].quarterlySales
      ).reduce((a, b) => a + b, 0);
      salesByTeam[team].gp = Object.values(
        salesByTeam[team].quarterlyGP
      ).reduce((a, b) => a + b, 0);

      totalSales += salesByTeam[team].sales;
      totalGP += salesByTeam[team].gp;

      for (let quarter in salesByTeam[team].quarterlySales) {
        if (!totalQuarterlySales[quarter]) {
          totalQuarterlySales[quarter] = 0;
        }
        totalQuarterlySales[quarter] +=
          salesByTeam[team].quarterlySales[quarter];
      }

      for (let quarter in salesByTeam[team].quarterlyGP) {
        if (!totalQuarterlyGP[quarter]) {
          totalQuarterlyGP[quarter] = 0;
        }
        totalQuarterlyGP[quarter] += salesByTeam[team].quarterlyGP[quarter];
      }
    }

    // Calculate the total revised GP
    let totalRevisedGP = 0;

    for (let team in salesByTeam) {
      const salesTeamMemberData = filteredBudget.find(
        (item) => item.salesTeam === team
      );

      const additionalCOGS =
        parseFloat(salesTeamMemberData?.additionalCOGS) || 0;

      totalRevisedGP += parseFloat(salesByTeam[team].gp - additionalCOGS);
    }

    const totalRow = (
      <Table.Row key="totals">
        <Table.Cell className="font-bold">Total</Table.Cell>
        <Table.Cell className="font-bold">
          {formatNumber(totalSales)}
        </Table.Cell>
        <Table.Cell className="font-bold">{formatNumber(totalGP)}</Table.Cell>
        <Table.Cell className="font-bold">
          {formatNumber(totalRevisedGP)}
        </Table.Cell>
        {Object.entries(totalQuarterlySales).map(([quarter, sales], i) => (
          <React.Fragment key={`total-quarter-${i}`}>
            <Table.Cell
              className="font-bold text-green-500"
              key={`total-sales-${i}`}
            >
              {formatNumber(sales)}
            </Table.Cell>
            <Table.Cell
              className="font-bold text-orange-300"
              key={`total-gp-${i}`}
            >
              {formatNumber(totalQuarterlyGP[quarter])}
            </Table.Cell>
          </React.Fragment>
        ))}
      </Table.Row>
    );

    return [
      ...Object.keys(salesByTeam).map((team, index) => {
        const quarterData = [];
        for (let i = 1; i <= maxQuarterNumber; i++) {
          quarterData.push({
            sales: salesByTeam[team].quarterlySales[i] || 0,
            gp: salesByTeam[team].quarterlyGP[i] || 0,
          });
        }

        const salesTeamMemberData = filteredBudget.find(
          (item) => item.salesTeam === team
        );

        const additionalCOGS =
          parseFloat(salesTeamMemberData?.additionalCOGS) || 0;

        const revisedGP = formatNumber(salesByTeam[team].gp - additionalCOGS);

        return (
          <Table.Row key={index}>
            <Table.Cell>{team}</Table.Cell>
            <Table.Cell>{formatNumber(salesByTeam[team].sales)}</Table.Cell>
            <Table.Cell>{formatNumber(salesByTeam[team].gp)}</Table.Cell>
            <Table.Cell>{revisedGP}</Table.Cell>
            {quarterData.map((data, index) => (
              <React.Fragment key={`quarter-${index}`}>
                <Table.Cell key={`sales-${index}`}>
                  {formatNumber(data.sales)}
                </Table.Cell>
                <Table.Cell key={`gp-${index}`}>
                  {formatNumber(data.gp)}
                </Table.Cell>
              </React.Fragment>
            ))}
          </Table.Row>
        );
      }),
      totalRow,
    ];
  };

  // Function to get week number given the date in "DD/MM/YY" format
  const getWeekNumber = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    const date = new Date(`20${year}`, month - 1, day);
    let startFinYear = new Date(date.getFullYear(), 6, 1);
    if (date < startFinYear)
      startFinYear = new Date(date.getFullYear() - 1, 6, 1);
    const diff = date - startFinYear;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const weekNumber = Math.ceil(diff / oneWeek) + 25;

    return weekNumber;
  };

  const getFinancialQuarter = (dateString) => {
    const [day, month] = dateString.split("/");
    const monthIndex = parseInt(month, 10);

    if (monthIndex >= 7 && monthIndex <= 9) {
      return 1;
    } else if (monthIndex >= 10 && monthIndex <= 12) {
      return 2;
    } else if (monthIndex >= 1 && monthIndex <= 3) {
      return 3;
    } else if (monthIndex >= 4 && monthIndex <= 6) {
      return 4;
    }

    return null;
  };

  // Variables for start week and current week
  const startWeek = getWeekNumber(
    "01/07/" + (selectedYear - 1).toString().slice(-2)
  );

  // Effect to initialize table headers when budgets are loaded
  useEffect(() => {
    if (budgets.length > 0) {
      setTableHeaders([
        <div className="font-bold">Sales Team</div>,
        <div className="font-bold">
          Sales Baseline <br /> {dropdownYear - 1}
        </div>,
        <div className="font-bold">
          GP Baseline <br /> {dropdownYear - 1}
        </div>,
        <div className="font-bold">
          GP % <br /> {dropdownYear - 1}
        </div>,
        <div className="font-bold">
          Sales Budget <br /> {dropdownYear}
        </div>,
        <div className="font-bold">
          GP Budget <br /> {dropdownYear}
        </div>,
      ]);
    }
  }, [budgets, selectedYear]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="block">
      <select value={dropdownYear} onChange={handleYearChange}>
        {uniqueYears.map((year) => (
          <option key={year} value={year}>
            {`${year - 1}-${year}`}
          </option>
        ))}
      </select>
      <div className="mt-4 flex">
        <Table>
          <Table.Head>{getTableHeaders()}</Table.Head>
          <Table.Body className="divide-y">{getTableRows()}</Table.Body>
        </Table>
      </div>
      <div className="mt-4 flex">
        <Table>
          <Table.Head>{getActualTableHeaders()}</Table.Head>
          <Table.Body className="divide-y">{getActualTableRows()}</Table.Body>
        </Table>
      </div>
    </div>
  );
}
