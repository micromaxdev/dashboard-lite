import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import moment from "moment";
import {
  convertNumberToIncludeComma,
  convertNumbersInArrayToIncludeComma,
  stringToNum,
} from "../../../components/Helper/Helper";

export default function SalesByProductPerYear({ code, name }) {
  // --------------------------Constants----------------------------
  const { latestSales, isLoading } = useSelector((state) => state.all);

  const matchedLatestSales = latestSales.filter((latestSales) => {
    return latestSales.customerCode == code && latestSales.customerName == name;
  });

  const [uniqueRecords, setUniqueRecords] = React.useState([]);

  const currentFinancialYearStart = moment().year();
  const oneYearAgo = currentFinancialYearStart - 1;
  const twoYearsAgo = currentFinancialYearStart - 2;
  const threeYearsAgo = currentFinancialYearStart - 3;

  let yearQty = {
    [currentFinancialYearStart]: 0,
    [oneYearAgo]: 0,
    [twoYearsAgo]: 0,
    [threeYearsAgo]: 0,
  };

  // let totalYearQty = {
  //   [currentFinancialYearStart]: 0,
  //   [oneYearAgo]: 0,
  //   [twoYearsAgo]: 0,
  //   [threeYearsAgo]: 0,
  // };

  const [totalYearQty, setTotalYearQty] = React.useState({
    [currentFinancialYearStart]: 0,
    [oneYearAgo]: 0,
    [twoYearsAgo]: 0,
    [threeYearsAgo]: 0,
  });

  const yearTotals = Object.values(totalYearQty).reduce((a, b) => a + b);

  // --------------------------Functions----------------------------
  const getUniqueRecords = () => {
    const filteredSales = matchedLatestSales.filter((sale) => {
      const saleYear = moment(sale.invoiceDate, "DD/MM/YY").year();
      return (
        saleYear === currentFinancialYearStart ||
        saleYear === oneYearAgo ||
        saleYear === twoYearsAgo ||
        saleYear === threeYearsAgo
      );
    });

    updateYearQty(filteredSales);

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
      newUniqueRecords.push({
        partCode: uniqueRecord[0].partCode,
        description: uniqueRecord[0].description,
        yearQty: updateYearQty(uniqueRecord),
      });
    });
    setUniqueRecords(newUniqueRecords);

    // calculate total quantity sold for each year
    let totalYearQty = { ...yearQty };
    newUniqueRecords.forEach((record) => {
      Object.keys(record.yearQty).forEach((year) => {
        totalYearQty[year] += record.yearQty[year];
      });
    });

    setTotalYearQty(totalYearQty);

    // calculate total quantity sold for each product
    newUniqueRecords.forEach((record) => {
      record.totalQty = Object.values(record.yearQty).reduce((a, b) => a + b);
    });
    setUniqueRecords(newUniqueRecords);
  };

  // function updateYearQty(filteredSales) {
  //   let yearQty = {
  //     [currentFinancialYearStart]: 0,
  //     [oneYearAgo]: 0,
  //     [twoYearsAgo]: 0,
  //     [threeYearsAgo]: 0,
  //   };
  //   filteredSales.forEach((sale) => {
  //     const saleYear = moment(sale.invoiceDate, "DD/MM/YY").year();
  //     if (!yearQty[saleYear]) yearQty[saleYear] = 0;
  //     yearQty[saleYear] += stringToNum(sale.audSalesAmount);
  //   });
  //   return yearQty;
  // }

  function updateYearQty(filteredSales) {
    const yearQty = {
      [currentFinancialYearStart]: 0,
      [oneYearAgo]: 0,
      [twoYearsAgo]: 0,
      [threeYearsAgo]: 0,
    };

    filteredSales.forEach((sale) => {
      const saleDate = moment(sale.invoiceDate, "DD/MM/YY");
      const saleFinancialYearStart =
        saleDate.month() >= 6 ? saleDate.year() + 1 : saleDate.year();
      const saleQty = stringToNum(sale.audSalesAmount);

      if (saleFinancialYearStart === currentFinancialYearStart) {
        yearQty[currentFinancialYearStart] += saleQty;
      } else if (saleFinancialYearStart === oneYearAgo) {
        yearQty[oneYearAgo] += saleQty;
      } else if (saleFinancialYearStart === twoYearsAgo) {
        yearQty[twoYearsAgo] += saleQty;
      } else if (saleFinancialYearStart === threeYearsAgo) {
        yearQty[threeYearsAgo] += saleQty;
      }
    });

    return yearQty;
  }

  useEffect(() => {
    getUniqueRecords();
  }, [code, name]);

  // --------------------------Render----------------------------
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <table className="w-full text-left table-collapse border-collapse ml-auto">
            <thead>
              <tr className="text-md font-semibold text-gray-700 bg-gray-100">
                <th className="px-4 py-2 text-center border-b border-gray-400">
                  Part Code
                </th>
                <th className="px-4 py-2 text-center border-b border-gray-400">
                  Description
                </th>
                {Object.keys(yearQty).map((year) => (
                  <th
                    key={year}
                    className="px-4 py-2 text-center border-b border-gray-400"
                  >
                    {year - 1} - {year}
                  </th>
                ))}
                <th className="px-4 py-2 text-center border-b border-gray-400">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {convertNumbersInArrayToIncludeComma(uniqueRecords).map(
                (record) => (
                  <tr key={record.partCode}>
                    <td className="px-4 py-2 border-b border-gray-400">
                      {record.partCode}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-400 ">
                      {record.description}
                    </td>
                    {Object.keys(yearQty).map((year) => (
                      <td
                        key={year}
                        className="px-4 py-2 text-center border-b border-gray-400"
                      >
                        {record.yearQty[year] &&
                          "$" +
                            convertNumberToIncludeComma(record.yearQty[year])}
                      </td>
                    ))}
                    <td className="px-4 py-2 text-center border-b border-gray-400 bg-green-100">
                      {record.totalQty &&
                        "$" + convertNumberToIncludeComma(record.totalQty)}
                    </td>
                  </tr>
                )
              )}
              <tr>
                <td className="px-4 py-2 border-b border-gray-400 font-bold">
                  Total
                </td>
                <td className="px-4 py-2 border-b border-gray-400 bg-green-100"></td>
                {Object.keys(totalYearQty).map((year) => (
                  <td
                    key={year}
                    className="px-4 py-2 text-center border-b border-gray-400 bg-green-100"
                  >
                    {totalYearQty[year] &&
                      "$" + convertNumberToIncludeComma(totalYearQty[year])}
                  </td>
                ))}
                <td className="px-4 py-2 text-center border-b border-gray-400 font-bold bg-green-300">
                  {yearTotals && "$" + convertNumberToIncludeComma(yearTotals)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
