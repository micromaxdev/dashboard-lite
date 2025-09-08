import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SortableTable from "../../../components/DataDisplay/SortableTable";
import {
  convertKeysToNumberFormat,
  convertNumbersInArrayTo2DecimalPlaces,
  sortArrayByMultipleKeys,
  getArrayOfUniqueValues,
  filterArrayByKeyValuePair,
  updateKeyValueInArrayByFunction,
  stringToDate,
  sortStringArrayKeepingFirstIndexValue,
} from "../../../components/Helper/Helper";
import Spinner from "../../../components/Spinner";

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function OutstandingSalesOrdersByEmployee() {
  // --------------------------Functions----------------------------

  // --------------------------Constants----------------------------

  //   const financialYearToFilter = "2023";

  const [employeeList, setEmployeeList] = React.useState([]);

  const [selectedEmployee, setSelectedEmployee] =
    React.useState("ALL EMPLOYEES");

  const [totalArrayForRows, setTotalArrayForRows] = React.useState([]);

  const [arrayToUseForRows, setArrayToUseForRows] = React.useState([]);

  // console.log("selectedEmployee", selectedEmployee);

  const { osos, isLoading } = useSelector((state) => state.all);

  const keysToChangeFromStringToNumber = [
    "outstandingQty",
    "outstandingValue",
    "stockQty",
  ];

  function handleSalesEmployeeChange(event) {
    setSelectedEmployee(event.target.value);
  }

  const headCells = [
    {
      id: "soNumber",
      label: "Sales Order No",
    },
    {
      id: "customerOrderNo",
      label: "Cus Order No",
    },
    {
      id: "salesEmployee",
      label: "Sales Employee",
    },
    {
      id: "customerCode",
      label: "Cus Code",
    },
    {
      id: "customerName",
      label: "Cus Name",
    },
    {
      id: "partCode",
      label: "Part Code",
    },
    {
      id: "description",
      label: "Description",
    },
    {
      id: "outstandingQty",
      label: "Outst. Qty",
    },
    {
      id: "dueDate",
      label: "Due Date",
    },
    {
      id: "outstandingValue",
      label: "Outst. Value",
    },
    {
      id: "stockQty",
      label: "Stock Qty",
    },
  ];

  // --------------------------useEffects----------------------------

  useEffect(() => {
    let empList = ["ALL EMPLOYEES"];

    getArrayOfUniqueValues(osos, "salesEmployee").map((emp) =>
      empList.push(emp)
    );

    empList = sortStringArrayKeepingFirstIndexValue(empList, "ALL EMPLOYEES");

    setEmployeeList(empList);

    let filteredArray = convertKeysToNumberFormat(
      osos,
      keysToChangeFromStringToNumber
    );

    filteredArray = convertNumbersInArrayTo2DecimalPlaces(filteredArray);

    filteredArray = updateKeyValueInArrayByFunction(
      filteredArray,
      "dueDate",
      stringToDate
    );

    console.log("filteredArray", filteredArray);

    setArrayToUseForRows(
      sortArrayByMultipleKeys(
        filteredArray,
        "salesEmployee",
        "asc",
        "dueDate",
        "asc"
      )
    );

    setTotalArrayForRows(
      sortArrayByMultipleKeys(
        filteredArray,
        "salesEmployee",
        "asc",
        "dueDate",
        "asc"
      )
    );
  }, [osos]);

  useEffect(() => {
    if (selectedEmployee !== "ALL EMPLOYEES") {
      setArrayToUseForRows(
        filterArrayByKeyValuePair(
          totalArrayForRows,
          "salesEmployee",
          selectedEmployee
        )
      );
    } else {
      setArrayToUseForRows(totalArrayForRows);
    }
  }, [selectedEmployee, totalArrayForRows]);

  if (isLoading) {
    return <Spinner />;
  }

  // --------------------------Return----------------------------

  return (
    <section className="max-w-6xl block">
      <div>
        <label htmlFor="employee-select" className="mr-2">
          Select Employee:
        </label>
        <select
          id="employee-select"
          value={selectedEmployee}
          onChange={handleSalesEmployeeChange}
        >
          {employeeList.map((emp, index) => (
            <option key={index} value={emp}>
              {emp}
            </option>
          ))}
        </select>
      </div>
      <div className="min-w-full">
        <div>
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
