import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import moment from "moment";
import { stringToNum } from "../../../components/Helper/Helper";
import ProductsSoldByYear from "./ProductsSoldByYear";

export default function ProductsSold({ code, name }) {
  // --------------------------Constants----------------------------

  const { latestSales, isLoading } = useSelector((state) => state.all);

  const matchedLatestSales = latestSales.filter((latestSales) => {
    return latestSales.customerCode == code && latestSales.customerName == name;
  });

  const [uniqueRecords, setUniqueRecords] = React.useState([]);

  const calculateTotals = (month) => {
    let sum = 0;
    uniqueRecords.forEach((record) => {
      const monthlyQty = record.monthQty[month] || 0;
      sum += monthlyQty;
    });
    return isNaN(sum) ? "" : sum;
  };

  const calculateTotal = () => {
    let sum = 0;
    uniqueRecords.forEach((record) => {
      sum += Object.values(record.monthQty).reduce((a, b) => a + b);
    });
    return isNaN(sum) ? "" : sum;
  };

  const currentDate = new Date();
  const financialYearStart = new Date(currentDate.getFullYear(), 6, 1);
  const financialYearEnd = new Date(currentDate.getFullYear() + 1, 5, 30);

  let currentFinancialYearStart;
  let currentFinancialYearEnd;

  if (currentDate >= financialYearStart && currentDate <= financialYearEnd) {
    currentFinancialYearStart = financialYearStart.getFullYear();
    currentFinancialYearEnd = financialYearEnd.getFullYear();
  } else {
    currentFinancialYearStart = financialYearStart.getFullYear() - 1;
    currentFinancialYearEnd = financialYearEnd.getFullYear() - 1;
  }

  let monthQty = {
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
  };

  // --------------------------Functions----------------------------
  const getUniqueRecords = () => {
    const filteredSales = matchedLatestSales.filter((sale) => {
      return moment(sale.invoiceDate, "DD/MM/YY").isBetween(
        moment(`30-06-${currentFinancialYearStart}`, "DD-MM-YYYY"),
        moment(`1-07-${currentFinancialYearEnd}`, "DD-MM-YYYY"),
        null,
        "(]"
      );
    });
    updateMonthQty(filteredSales);
    let uniquePartCode = [
      ...new Set(
        filteredSales.map(
          (item) =>
            `${item.partCode}-${item.description}-${item.customerCode}-${item.customerName}`
        )
      ),
    ];
    let newUniqueRecords = [];
    uniquePartCode.map((partCode) => {
      let uniqueRecord = filteredSales.filter(
        (item) =>
          `${item.partCode}-${item.description}-${item.customerCode}-${item.customerName}` ===
          partCode
      );
      let monthQty = {};
      uniqueRecord.forEach((sale) => {
        const month = moment(sale.invoiceDate, "DD/MM/YY").format("MMM");
        if (!monthQty[month]) monthQty[month] = 0;
        monthQty[month] += stringToNum(sale.qty);
      });
      newUniqueRecords.push({
        partCode: uniqueRecord[0].partCode,
        description: uniqueRecord[0].description,
        monthQty,
      });
    });
    setUniqueRecords(newUniqueRecords);
  };

  function updateMonthQty(filteredSales) {
    let monthQty = {};
    let total = {};
    let sum = 0;

    // Iterate through the filtered sales and update the monthQty object
    filteredSales?.forEach((sale) => {
      const month = moment(sale.invoiceDate, "DD/MM/YY").format("MMM");
      if (!monthQty[month]) monthQty[month] = 0;
      monthQty[month] += stringToNum(sale.qty);

      if (!total[month]) total[month] = 0;
      total[month] += stringToNum(sale.qty);

      sum += stringToNum(sale.qty);
    });

    total["Total"] = sum;
    monthQty["Total"] = total;
    setUniqueRecords(monthQty);
  }

  function resetMonthQty() {
    monthQty = {
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
    };
  }

  // --------------------------useEffects-----------------

  useEffect(() => {
    resetMonthQty();
    getUniqueRecords();
  }, [code, name]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-5xl">
      <div className="flex">
        <h2 className="text-2xl font-extrabold dark:text-white mr-3">
          Current Financial Year{" "}
        </h2>
        <h3 className="text-lg font-extrabold dark:text-white mt-1">
          {" "}
          {currentFinancialYearStart} - {currentFinancialYearEnd}
        </h3>
      </div>
      <table className="w-full text-left table-collapse border-collapse ml-auto">
        <thead>
          <tr className="text-md font-semibold text-gray-700 bg-gray-100">
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Part Code
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Description
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Jul
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Aug
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Sep
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Oct
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Nov
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Dec
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Jan
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Feb
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Mar
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Apr
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              May
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Jun
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400 bg-green-300">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {uniqueRecords.map((record, index) => (
            <tr key={index} className="text-md font-medium text-gray-700">
              <td className="px-4 py-2 text-center border-b border-gray-400">
                {record.partCode}
              </td>
              <td className="px-4 py-2 text-center border-b border-gray-400">
                {record.description}
              </td>
              <td className="px-4 py-2 text-center border-b border-gray-400">
                {record.monthQty.Jul}
              </td>
              <td className="px-4 py-2 text-center border-b border-gray-400">
                {record.monthQty.Aug}
              </td>
              <td className="px-4 py-2 text-center border-b border-gray-400">
                {record.monthQty.Sep}
              </td>
              <td className="px-4 py-2 text-center border-b border-gray-400">
                {record.monthQty.Oct}
              </td>
              <td className="px-4 py-2 text-center border-b border-gray-400">
                {record.monthQty.Nov}
              </td>
              <td className="px-4 py-2 text-center border-b border-gray-400">
                {record.monthQty.Dec}
              </td>
              <td className="px-4 py-2 text-center border-b border-gray-400">
                {record.monthQty.Jan}
              </td>
              <td className="px-4 py-2 text-center border-b border-gray-400">
                {record.monthQty.Feb}
              </td>
              <td className="px-4 py-2 text-center border-b border-gray-400">
                {record.monthQty.Mar}
              </td>
              <td className="px-4 py-2 text-center border-b border-gray-400">
                {record.monthQty.Apr}
              </td>
              <td className="px-4 py-2 text-center border-b border-gray-400">
                {record.monthQty.May}
              </td>
              <td className="px-4 py-2 text-center border-b border-gray-400">
                {record.monthQty.Jun}
              </td>
              <td className="px-4 py-2 text-center border-b border-gray-400 bg-green-100 font-semibold">
                {Object.values(record.monthQty).reduce(
                  (acc, curr) => acc + curr,
                  0
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td className="px-4 py-2 text-center border-b border-gray-400 bg-green-300 font-bold">
              Total
            </td>
            <td className="px-4 py-2 text-center border-b border-gray-400  bg-green-100"></td>
            <td className="text-center border-b border-gray-400 bg-green-100 font-bold">
              {calculateTotals("Jul")}
            </td>
            <td className="text-center border-b border-gray-400 bg-green-100 font-bold">
              {calculateTotals("Aug")}
            </td>
            <td className="text-center border-b border-gray-400 bg-green-100 font-bold">
              {calculateTotals("Sep")}
            </td>
            <td className="text-center border-b border-gray-400 bg-green-100 font-bold">
              {calculateTotals("Oct")}
            </td>
            <td className="text-center border-b border-gray-400 bg-green-100 font-bold">
              {calculateTotals("Nov")}
            </td>
            <td className="text-center border-b border-gray-400 bg-green-100 font-bold">
              {calculateTotals("Dec")}
            </td>
            <td className="text-center border-b border-gray-400 bg-green-100 font-bold">
              {calculateTotals("Jan")}
            </td>
            <td className="text-center border-b border-gray-400 bg-green-100 font-bold">
              {calculateTotals("Feb")}
            </td>
            <td className="text-center border-b border-gray-400 bg-green-100 font-bold">
              {calculateTotals("Mar")}
            </td>
            <td className="text-center border-b border-gray-400 bg-green-100 font-bold">
              {calculateTotals("Apr")}
            </td>
            <td className="text-center border-b border-gray-400 bg-green-100 font-bold">
              {calculateTotals("May")}
            </td>
            <td className="text-center border-b border-gray-400 bg-green-100 font-bold">
              {calculateTotals("Jun")}
            </td>
            <td className="px-4 py-2 text-center border-b border-gray-400 bg-green-300 font-bold">
              {calculateTotal()}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-5">
        <h2 className="text-2xl font-extrabold dark:text-white">
          Product qty sold by financial year
        </h2>
        <ProductsSoldByYear code={code} name={name} />
      </div>
    </div>
  );
}
