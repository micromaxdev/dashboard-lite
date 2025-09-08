import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import moment from "moment";
import { stringToNum } from "../../../components/Helper/Helper";

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function ScreenReport({ code, itemDescription }) {
  // --------------------------Constants----------------------------

  const { latestSales, opos, osos, partNotes, isLoading } = useSelector(
    (state) => state.all
  );

  const matchedLatestSales = latestSales.filter((latestSales) => {
    return (
      latestSales.partCode == code && latestSales.description == itemDescription
    );
  });

  const matchedPartNotes = partNotes.filter((partNotes) => {
    return (
      partNotes.partCode == code && partNotes.description == itemDescription
    );
  });

  const matchedOpo = opos.filter((opo) => {
    return opo.itemNo == code && opo.itemDescription == itemDescription;
  });

  const matchedOsos = osos.filter((osos) => {
    return osos.partCode == code && osos.description == itemDescription;
  });

  const [
    totalSalesOrdersPerMonthThisYear,
    setTotalSalesOrdersPerMonthThisYear,
  ] = React.useState(Array(12).fill(0));

  const [totalOposPerMonthThisYear, setTotalOposPerMonthThisYear] =
    React.useState(Array(12).fill(0));

  const [totalOsosPerMonthThisYear, setTotalOsosPerMonthThisYear] =
    React.useState(Array(12).fill(0));

  const [
    totalSalesOrdersPerMonthLastYear,
    setTotalSalesOrdersPerMonthLastYear,
  ] = React.useState(Array(12).fill(0));

  const [
    totalSalesOrdersPerMonth2YearsAgo,
    setTotalSalesOrdersPerMonth2YearsAgo,
  ] = React.useState(Array(12).fill(0));

  const [
    totalSalesOrdersPerMonth3YearsAgo,
    setTotalSalesOrdersPerMonth3YearsAgo,
  ] = React.useState(Array(12).fill(0));

  const [
    totalSalesOrdersPerMonth4YearsAgo,
    setTotalSalesOrdersPerMonth4YearsAgo,
  ] = React.useState(Array(12).fill(0));

  const [totalOposPerMonthBeforeThisYear, setTotalOposPerMonthBeforeThisYear] =
    React.useState(Array(12).fill(0));

  const [totalOposPerMonthAfterThisYear, setTotalOposPerMonthAfterThisYear] =
    React.useState(Array(12).fill(0));

  const [totalOsosPerMonthBeforeThisYear, setTotalOsosPerMonthBeforeThisYear] =
    React.useState(Array(12).fill(0));

  const [totalOsosPerMonthAfterThisYear, setTotalOsosPerMonthAfterThisYear] =
    React.useState(Array(12).fill(0));

  const [predictedStockOnHand, setPredictedStockOnHand] = React.useState(
    Array(12).fill(0)
  );

  const [cumulativePurchaseRequirement, setCumulativePurchaseRequirement] =
    React.useState(Array(12).fill(0));

  const currentYear = new Date().getFullYear();

  // let sixMonthAverage =
  //   totalSalesOrdersPerMonthLastYear.reduce((a, b) => a + b) / 2;

  const currentDate = new Date();
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 6,
    currentDate.getDate()
  );

  // console.log("startDate: ", startDate);

  const sixMonthSales = matchedLatestSales.filter((sale) => {
    const [day, month, year] = sale.invoiceDate.split("/");
    const saleDate = new Date(`${20}${year}-${month}-${day}`); // converts "16/06/21" to "2021-06-16"
    return saleDate >= startDate && saleDate <= currentDate;
  });

  const sixMonthQuantities = sixMonthSales.map((sale) => {
    return stringToNum(sale.qty);
  });

  const sixMonthAvg =
    sixMonthQuantities.reduce((total, quantity) => {
      return total + quantity;
    }, 0) / 6;

  const sixMonthAverage = sixMonthAvg.toFixed(2);

  // --------------------------Functions----------------------------

  // --------------------------useEffects----------------------------

  //------

  useEffect(() => {}, [code, itemDescription]);

  useEffect(() => {
    // const currentYear = 2022;

    //--------------------------Latest Sales----------------------------
    const qtyByMonthLatestSales = Array(12).fill(0);
    const qtyByMonthLatestSalesLastYear = Array(12).fill(0);
    const qtyByMonthLatestSales2YearsAgo = Array(12).fill(0);
    const qtyByMonthLatestSales3YearsAgo = Array(12).fill(0);
    const qtyByMonthLatestSales4YearsAgo = Array(12).fill(0);

    matchedLatestSales.forEach((sale) => {
      const date = moment(sale.invoiceDate, "DD/MM/YY");

      if (date.year() === currentYear) {
        const month = date.month();
        qtyByMonthLatestSales[month] += stringToNum(sale.qty);
      }
      if (date.year() === currentYear - 1) {
        const month = date.month();
        qtyByMonthLatestSalesLastYear[month] += stringToNum(sale.qty);
      }
      if (date.year() === currentYear - 2) {
        const month = date.month();
        qtyByMonthLatestSales2YearsAgo[month] += stringToNum(sale.qty);
      }
      if (date.year() === currentYear - 3) {
        const month = date.month();
        qtyByMonthLatestSales3YearsAgo[month] += stringToNum(sale.qty);
      }
      if (date.year() === currentYear - 4) {
        const month = date.month();
        qtyByMonthLatestSales4YearsAgo[month] += stringToNum(sale.qty);
      }
    });

    // console.log(qtyByMonthLatestSales);
    setTotalSalesOrdersPerMonthThisYear(qtyByMonthLatestSales);
    setTotalSalesOrdersPerMonthLastYear(qtyByMonthLatestSalesLastYear);
    setTotalSalesOrdersPerMonth2YearsAgo(qtyByMonthLatestSales2YearsAgo);
    setTotalSalesOrdersPerMonth3YearsAgo(qtyByMonthLatestSales3YearsAgo);
    setTotalSalesOrdersPerMonth4YearsAgo(qtyByMonthLatestSales4YearsAgo);

    //--------------------------OSOS----------------------------
    const qtyByMonthOsos = Array(12).fill(0);
    const qtyByMonthOsosBeforeThisYear = Array(12).fill(0);
    const qtyByMonthOsosAfterThisYear = Array(12).fill(0);

    matchedOsos.forEach((sale) => {
      const date = moment(sale.dueDate, "DD/MM/YY");

      if (date.year() === currentYear) {
        const month = date.month();
        qtyByMonthOsos[month] += stringToNum(sale.outstandingQty);
      }
      if (date.year() < currentYear) {
        const month = date.month();
        qtyByMonthOsosBeforeThisYear[month] += stringToNum(sale.outstandingQty);
      }
      if (date.year() > currentYear) {
        const month = date.month();
        qtyByMonthOsosAfterThisYear[month] += stringToNum(sale.outstandingQty);
      }
    });

    // add all the qty from last year or prior to january of this year
    qtyByMonthOsos[0] += qtyByMonthOsosBeforeThisYear.reduce(
      (sum, qty) => sum + qty,
      0
    );

    //add all the qty from next year or after to december of this year
    qtyByMonthOsos[11] += qtyByMonthOsosAfterThisYear.reduce(
      (sum, qty) => sum + qty,
      0
    );

    // console.log(qtyByMonthOsos);
    setTotalOsosPerMonthThisYear(qtyByMonthOsos);
    setTotalOsosPerMonthBeforeThisYear(qtyByMonthOsosBeforeThisYear);
    setTotalOsosPerMonthAfterThisYear(qtyByMonthOsosAfterThisYear);

    //--------------------------OPOS----------------------------
    const qtyByMonthOpos = Array(12).fill(0);
    const qtyByMonthOposBeforeThisYear = Array(12).fill(0);
    const qtyByMonthOposAfterThisYear = Array(12).fill(0);

    matchedOpo.forEach((sale) => {
      const date = moment(sale.dueDate, "DD/MM/YY");

      if (date.year() === currentYear) {
        const month = date.month();
        // console.log(stringToNum(sale.qty));

        qtyByMonthOpos[month] += stringToNum(sale.outstandingQty);
      }
      if (date.year() < currentYear) {
        const month = date.month();
        qtyByMonthOposBeforeThisYear[month] += stringToNum(sale.outstandingQty);
      }
      if (date.year() > currentYear) {
        const month = date.month();
        qtyByMonthOposAfterThisYear[month] += stringToNum(sale.outstandingQty);
      }
    });

    // add all the qty from last year or prior to january of this year
    qtyByMonthOpos[0] += qtyByMonthOposBeforeThisYear.reduce(
      (sum, qty) => sum + qty,
      0
    );

    //add all the qty from next year or after to december of this year
    qtyByMonthOpos[11] += qtyByMonthOposAfterThisYear.reduce(
      (sum, qty) => sum + qty,
      0
    );

    setTotalOposPerMonthThisYear(qtyByMonthOpos);
    setTotalOposPerMonthBeforeThisYear(qtyByMonthOposBeforeThisYear);
    setTotalOposPerMonthAfterThisYear(qtyByMonthOposAfterThisYear);

    //--------------------------Predicted Stock On Hand----------------------------

    const predictedStockOnHand = Array(12).fill(0);

    for (let i = 0; i < 12; i++) {
      try {
        if (i === 0) {
          predictedStockOnHand[i] =
            stringToNum(matchedPartNotes[0]?.stockOnHand) -
            (qtyByMonthLatestSales[i] + qtyByMonthOsos[i] + qtyByMonthOpos[i]);
        } else {
          predictedStockOnHand[i] =
            predictedStockOnHand[i - 1] -
            (qtyByMonthLatestSales[i] + qtyByMonthOsos[i] + qtyByMonthOpos[i]);
        }
      } catch (error) {}
    }

    //--------------------------Cumulative Purchase Requirement----------------------------

    const cumulativePurchaseRequirement = Array(12).fill(0);

    for (let i = 0; i < 12; i++) {
      try {
        cumulativePurchaseRequirement[i] =
          sixMonthAverage - predictedStockOnHand[i];
      } catch (error) {}
    }

    setCumulativePurchaseRequirement(cumulativePurchaseRequirement);

    setPredictedStockOnHand(predictedStockOnHand);
  }, [code, itemDescription]);

  if (isLoading) {
    return <Spinner />;
  }

  // --------------------------Return----------------------------

  return (
    <div className="max-w-5xl">
      <table className="w-full text-left table-collapse border-collapse ml-auto">
        <thead>
          <tr className="text-md font-semibold text-gray-700 bg-gray-100">
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Month
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Usage ({currentYear - 4})
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Usage ({currentYear - 3})
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Usage ({currentYear - 2})
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Usage ({currentYear - 1})
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Usage ({currentYear})
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Sales Order Requirement ({currentYear})
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Purchase Orders in Progress ({currentYear})
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Predicted Stock On Hand
            </th>
            <th className="px-4 py-2 text-center border-b border-gray-400">
              Cumulative Purchase Requirement
            </th>
          </tr>
        </thead>
        <tbody>
          {totalSalesOrdersPerMonthThisYear.map((total, index) => {
            const today = moment();
            const last12Months = moment().subtract(12, "months");
            const month = moment().month(index);

            const monthName = moment().month(index).format("MMMM");
            return (
              <tr key={index} className="text-sm hover:bg-gray-100">
                <td className="px-4 py-2 text-center border-b border-gray-400">
                  {monthName}
                </td>
                <td className="px-4 py-2 text-center border-b border-gray-400">
                  {totalSalesOrdersPerMonth4YearsAgo[index]}
                </td>
                <td className="px-4 py-2 text-center border-b border-gray-400">
                  {totalSalesOrdersPerMonth3YearsAgo[index]}
                </td>
                <td className="px-4 py-2 text-center border-b border-gray-400">
                  {totalSalesOrdersPerMonth2YearsAgo[index]}
                </td>
                <td className="px-4 py-2 text-center border-b border-gray-400">
                  {month.isSameOrAfter(last12Months, "month") &&
                  month.isSameOrAfter(today, "month") ? (
                    <div className="bg-green-100">
                      {totalSalesOrdersPerMonthLastYear[index]}
                    </div>
                  ) : (
                    totalSalesOrdersPerMonthLastYear[index]
                  )}
                </td>
                <td className="px-4 py-2 text-center border-b border-gray-400">
                  {month.isSameOrAfter(last12Months, "month") &&
                  month.isSameOrBefore(today, "month") ? (
                    <div className="bg-green-100">
                      {totalSalesOrdersPerMonthThisYear[index]}
                    </div>
                  ) : (
                    totalSalesOrdersPerMonthThisYear[index]
                  )}
                </td>
                {/* <td className="px-4 py-2 text-center border-b border-gray-400">
                  {totalSalesOrdersPerMonthThisYear[index]}
                </td> */}
                <td className="px-4 py-2 text-center border-b border-gray-400">
                  {totalOsosPerMonthThisYear[index]}
                </td>
                <td className="px-4 py-2 text-center border-b border-gray-400">
                  {totalOposPerMonthThisYear[index]}
                </td>
                <td className="px-4 py-2 text-center border-b border-gray-400">
                  {predictedStockOnHand[index]}
                </td>
                <td className="px-4 py-2 text-center border-b border-gray-400">
                  {cumulativePurchaseRequirement[index]}
                </td>
              </tr>
            );
          })}
          <tr className="text-sm ">
            <td className="px-4 py-2 text-center border-b border-gray-400 font-bold">
              Total
            </td>
            <td className="px-4 py-2 text-center border-b border-gray-400 font-semibold">
              {totalSalesOrdersPerMonth4YearsAgo.reduce((a, b) => a + b)}
            </td>
            <td className="px-4 py-2 text-center border-b border-gray-400 font-semibold">
              {totalSalesOrdersPerMonth3YearsAgo.reduce((a, b) => a + b)}
            </td>
            <td className="px-4 py-2 text-center border-b border-gray-400 font-semibold">
              {totalSalesOrdersPerMonth2YearsAgo.reduce((a, b) => a + b)}
            </td>
            <td className="px-4 py-2 text-center border-b border-gray-400 font-semibold">
              {totalSalesOrdersPerMonthLastYear.reduce((a, b) => a + b)}
            </td>
            <td className="px-4 py-2 text-center border-b border-gray-400 font-semibold">
              {totalSalesOrdersPerMonthThisYear.reduce((a, b) => a + b)}
            </td>
            <td className="px-4 py-2 text-center border-b border-gray-400 font-semibold">
              {totalOsosPerMonthThisYear.reduce((a, b) => a + b)}
            </td>
            <td className="px-4 py-2 text-center border-b border-gray-400 font-semibold">
              {totalOposPerMonthThisYear.reduce((a, b) => a + b)}
            </td>
            <td className="px-4 py-2 text-center border-b border-gray-400 font-semibold">
              {/* {predictedStockOnHand.slice(-1)[0] -
                (totalOsosPerMonthThisYear.reduce((a, b) => a + b) +
                  totalOposPerMonthThisYear.reduce((a, b) => a + b))} */}
            </td>
            <td className="px-4 py-2 text-center border-b border-gray-400 font-semibold">
              {/* {sixMonthAverage -
                (predictedStockOnHand.slice(-1)[0] -
                  (totalOsosPerMonthThisYear.reduce((a, b) => a + b) +
                    totalOposPerMonthThisYear.reduce((a, b) => a + b)))} */}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex">
        <div className="">
          <div className="flex mt-5">
            <h1 className="mb-4 text-md font-extrabold tracking-tight text-gray-900 md:text-md dark:text-white underline">
              Stock on hand:
            </h1>

            <div className="ml-2 font-medium text-md">
              {stringToNum(matchedPartNotes[0]?.stockOnHand)}
            </div>
          </div>

          <div className="flex">
            <h1 className="mb-4 text-md font-extrabold tracking-tight text-gray-900 md:text-md dark:text-white underline">
              6 month average:
            </h1>

            <div className="ml-2 font-medium text-md">{sixMonthAverage}</div>
          </div>
        </div>

        <div className="">
          <div className="flex mt-5 ml-5">
            <h1 className="bg-green-200 mb-4 text-md font-extrabold tracking-tight text-gray-900 md:text-md dark:text-white underline">
              OSOs before {currentYear}:
            </h1>

            <div className="ml-2 font-medium text-md">
              {totalOsosPerMonthBeforeThisYear.reduce(
                (sum, qty) => sum + qty,
                0
              )}
            </div>

            <h1 className="bg-green-400 ml-4 mb-4 text-md font-extrabold tracking-tight text-gray-900 md:text-md dark:text-white underline">
              OSOs after {currentYear}:
            </h1>

            <div className="ml-2 font-medium text-md">
              {totalOsosPerMonthAfterThisYear.reduce(
                (sum, qty) => sum + qty,
                0
              )}
            </div>
          </div>

          <div className="flex ml-5">
            <h1 className="bg-yellow-200 mb-4 text-md font-extrabold tracking-tight text-gray-900 md:text-md dark:text-white underline">
              OPOs before {currentYear}:
            </h1>

            <div className="ml-2 font-medium text-md">
              {totalOposPerMonthBeforeThisYear.reduce(
                (sum, qty) => sum + qty,
                0
              )}
            </div>

            <h1 className="ml-4 mb-4 text-md bg-yellow-400 font-extrabold tracking-tight text-gray-900 md:text-md dark:text-white underline">
              OPOs after {currentYear}:
            </h1>

            <div className="ml-2 font-medium text-md ">
              {totalOposPerMonthAfterThisYear.reduce(
                (sum, qty) => sum + qty,
                0
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
