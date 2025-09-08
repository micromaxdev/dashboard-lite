import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SortableTable from "../../../components/DataDisplay/SortableTable";
import {
  convertKeysToNumberFormat,
  convertNumbersInArrayTo2DecimalPlaces,
  sortArrayByMultipleKeys,
  getArrayOfUniqueValues,
  filterArrayByKeyValuePair,
  sortStringArrayKeepingFirstIndexValue,
} from "../../../components/Helper/Helper";
import Spinner from "../../../components/Spinner";

const OutstandingServiceBook = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("ALL EMPLOYEES");
  const [totalArrayForRows, setTotalArrayForRows] = useState([]);
  const [arrayToUseForRows, setArrayToUseForRows] = useState([]);

  const { openServiceJobs, isLoading } = useSelector((state) => state.all);

  const keysToChangeFromStringToNumber = [
    "quotedAmount",
    "totalInvoicedAmount",
    "amountToBeInvoiced",
  ];

  function handleSalesEmployeeChange(event) {
    setSelectedEmployee(event.target.value);
  }

  const headCells = [
    { id: "customerCode", label: "Customer Code" },
    { id: "customerName", label: "Customer Name" },
    { id: "call_id", label: "Call ID" },
    { id: "serviceCallSubject", label: "Service Call Subject" },
    { id: "salesEmployeeName", label: "Sales Employee" },
    { id: "quotedAmount", label: "Quoted Amount" },
    { id: "totalInvoicedAmount", label: "Total Invoiced Amount" },
    { id: "amountToBeInvoiced", label: "Amount To Be Invoiced" },
    { id: "dateCreated", label: "Date Created" },
    { id: "dueDate", label: "Due Date" },
  ];

  useEffect(() => {
    let empList = ["ALL EMPLOYEES"];
    getArrayOfUniqueValues(openServiceJobs, "salesEmployeeName").map((emp) =>
      empList.push(emp)
    );
    empList = sortStringArrayKeepingFirstIndexValue(empList, "ALL EMPLOYEES");
    setEmployeeList(empList);

    let filteredArray = convertKeysToNumberFormat(
      openServiceJobs,
      keysToChangeFromStringToNumber
    );
    filteredArray = convertNumbersInArrayTo2DecimalPlaces(filteredArray);
    setArrayToUseForRows(
      sortArrayByMultipleKeys(
        filteredArray,
        "salesEmployeeName",
        "asc",
        "dueDate",
        "asc"
      )
    );
    setTotalArrayForRows(
      sortArrayByMultipleKeys(
        filteredArray,
        "salesEmployeeName",
        "asc",
        "dueDate",
        "asc"
      )
    );
  }, [openServiceJobs]);

  useEffect(() => {
    if (selectedEmployee !== "ALL EMPLOYEES") {
      setArrayToUseForRows(
        filterArrayByKeyValuePair(
          totalArrayForRows,
          "salesEmployeeName",
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
        <SortableTable
          headCells={headCells}
          arrayToUseForRows={arrayToUseForRows}
          keysToChangeFromStringToNumber={keysToChangeFromStringToNumber}
          rowsPP={1000}
        />
      </div>
    </section>
  );
};

export default OutstandingServiceBook;
