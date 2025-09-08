import * as React from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import SortableTable from "../../../components/DataDisplay/SortableTable";
import {
  convertKeysToNumberFormat,
  convertNumbersInArrayTo2DecimalPlaces,
  convertNumbersInArrayToIncludeComma,
  sortArrayByMultipleKeys,
  stringToNum,
} from "../../../components/Helper/Helper";
import Spinner from "../../../components/Spinner";
import moment from "moment";

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function ServiceJobLogBook() {
  // --------------------------Functions----------------------------

  // --------------------------Constants----------------------------

  //   const financialYearToFilter = "2023";

  const [financialYearToFilter, setFinancialYearToFilter] = React.useState(
    new Date().getFullYear().toString()
  );

  const { jobLogs, isLoading } = useSelector((state) => state.all);

  const today = new Date();
  const fiveYearsAgo = new Date(1, today.getMonth(), today.getFullYear() - 5);

  const logsWithin5Years = jobLogs;

  const groupsBySalesEmployeeAndMonth = logsWithin5Years.reduce(
    (groups, log) => {
      const { salesEmployee, quotedAmount, inputDate } = log;
      const monthYear = moment(inputDate, "DD/MM/YYYY").format("MM/YYYY");
      const financialYear = getFinancialYear(monthYear);
      const key = `${salesEmployee}-${monthYear}`;
      if (!groups[key]) {
        groups[key] = {
          salesEmployee,
          monthYear,
          financialYear,
          totalOrderAmount: 0,
        };
      }
      groups[key].totalOrderAmount += parseFloat(quotedAmount);
      return groups;
    },
    {}
  );

  const result = Object.values(groupsBySalesEmployeeAndMonth).map(
    ({ salesEmployee, monthYear, financialYear, totalOrderAmount }) => ({
      salesEmployee,
      monthYear,
      financialYear,
      totalOrderAmount,
    })
  );

  // Filter the `result` array based on the financial year value
  const filteredResult = result.filter(
    (item) => item.financialYear === financialYearToFilter
  );

  // Create a new array that contains objects with the range of dates and total order amount
  const newResult = filteredResult.map((item) => {
    const startDate = new Date(`01/07/${Number(financialYearToFilter) - 1}`);
    const endDate = new Date(`01/07/${Number(financialYearToFilter)}`);
    return {
      salesEmployee: item.salesEmployee,
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
      totalOrderAmount: item.totalOrderAmount,
    };
  });

  const salesByFinancialYear = filteredResult.reduce(
    (
      salesByEmployee,
      { salesEmployee, financialYear, monthYear, totalOrderAmount }
    ) => {
      const year = parseInt(financialYear);
      const startDate = new Date(`${year - 1}-07-01`);
      const endDate = new Date(`${year}-06-30`);

      // Create a new object for the sales employee if it doesn't exist
      if (!salesByEmployee[salesEmployee]) {
        salesByEmployee[salesEmployee] = {
          salesEmployee,
          financialYear,
          startDate,
          endDate,
          jan: 0,
          feb: 0,
          mar: 0,
          apr: 0,
          may: 0,
          jun: 0,
          jul: 0,
          aug: 0,
          sep: 0,
          oct: 0,
          nov: 0,
          dec: 0,
        };
      }

      // Get the month number from monthYear and set the value for that month key
      const [month] = monthYear.split("/").map(Number);
      switch (month) {
        case 1:
          salesByEmployee[salesEmployee].jan += totalOrderAmount;
          break;
        case 2:
          salesByEmployee[salesEmployee].feb += totalOrderAmount;
          break;
        case 3:
          salesByEmployee[salesEmployee].mar += totalOrderAmount;
          break;
        case 4:
          salesByEmployee[salesEmployee].apr += totalOrderAmount;
          break;
        case 5:
          salesByEmployee[salesEmployee].may += totalOrderAmount;
          break;
        case 6:
          salesByEmployee[salesEmployee].jun += totalOrderAmount;
          break;
        case 7:
          salesByEmployee[salesEmployee].jul += totalOrderAmount;
          break;
        case 8:
          salesByEmployee[salesEmployee].aug += totalOrderAmount;
          break;
        case 9:
          salesByEmployee[salesEmployee].sep += totalOrderAmount;
          break;
        case 10:
          salesByEmployee[salesEmployee].oct += totalOrderAmount;
          break;
        case 11:
          salesByEmployee[salesEmployee].nov += totalOrderAmount;
          break;
        case 12:
          salesByEmployee[salesEmployee].dec += totalOrderAmount;
          break;
        default:
          break;
      }

      return salesByEmployee;
    },
    {}
  );

  let finalData = Object.values(salesByFinancialYear).map((obj) => ({
    ...obj,
  }));

  function getFinancialYear(monthYear) {
    const [month, year] = monthYear.split("/").map(Number);
    if (month < 7) {
      return year.toString();
    } else {
      return (year + 1).toString();
    }
  }

  //   console.log("result", result);

  const printAreaRef = useRef(null);

  const matchedPartNotes = jobLogs.filter((jobLogs) => {
    return stringToNum(jobLogs.stockOnHand) > 0 && jobLogs.storageLocation;
  });

  //   const matchedPartNotesWithAdditionalProperties = matchedPartNotes;

  const keysToChangeFromStringToNumber = [
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
  ];

  let filteredArray = convertKeysToNumberFormat(
    finalData,
    keysToChangeFromStringToNumber
  );

  filteredArray = convertNumbersInArrayTo2DecimalPlaces(filteredArray);

  console.log("filteredArray", filteredArray);

  let arrayToUseForRows = sortArrayByMultipleKeys(
    filteredArray,
    "salesEmployee"
  );

  const total = arrayToUseForRows.reduce(
    (acc, cur) => {
      acc.jan += cur.jan;
      acc.feb += cur.feb;
      acc.mar += cur.mar;
      acc.apr += cur.apr;
      acc.may += cur.may;
      acc.jun += cur.jun;
      acc.jul += cur.jul;
      acc.aug += cur.aug;
      acc.sep += cur.sep;
      acc.oct += cur.oct;
      acc.nov += cur.nov;
      acc.dec += cur.dec;
      return acc;
    },
    {
      salesEmployee: "TOTAL",
      financialYear: financialYearToFilter,
      startDate: "",
      endDate: "",
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
    }
  );

  arrayToUseForRows.push(total);

  // Use a Set to get all unique financial years from the filteredArray
  const uniqueYears = new Set(result.map((item) => item.financialYear));

  // Convert the Set back to an array and sort it in descending order
  const yearOptions = Array.from(uniqueYears).sort().reverse();

  // Handle the change event when an option is selected
  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setFinancialYearToFilter(selectedYear);
  };

  const headCells = [
    {
      id: "salesEmployee",
      label: "Sales Employee",
    },
    {
      id: "jul",
      label: "Jul",
    },
    {
      id: "aug",
      label: "Aug",
    },
    {
      id: "sep",
      label: "Sep",
    },
    {
      id: "oct",
      label: "Oct",
    },
    {
      id: "nov",
      label: "Nov",
    },
    {
      id: "dec",
      label: "Dec",
    },
    {
      id: "jan",
      label: "Jan",
    },
    {
      id: "feb",
      label: "Feb",
    },
    {
      id: "mar",
      label: "Mar",
    },
    {
      id: "apr",
      label: "Apr",
    },
    {
      id: "may",
      label: "May",
    },
    {
      id: "jun",
      label: "Jun",
    },
  ];

  // --------------------------useEffects----------------------------

  useEffect(() => {}, [filteredArray]);

  if (isLoading) {
    return <Spinner />;
  }

  // --------------------------Return----------------------------

  return (
    <section className="max-w-6xl block">
      <div>
        <label htmlFor="financial-year-select" className="mr-2">
          Financial Year:
        </label>
        <select
          id="financial-year-select"
          value={financialYearToFilter}
          onChange={handleYearChange}
        >
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year - 1} - {year}
            </option>
          ))}
        </select>
      </div>
      <div className="min-w-full">
        <div ref={printAreaRef}>
          <SortableTable
            headCells={headCells}
            arrayToUseForRows={arrayToUseForRows}
            keysToChangeFromStringToNumber={keysToChangeFromStringToNumber}
            rowsPP={1000}
          />
        </div>
      </div>
    </section>
  );
}
