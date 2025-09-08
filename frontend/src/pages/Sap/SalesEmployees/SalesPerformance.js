import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import { Button } from "flowbite-react/lib/cjs/components";
import { makeStyles, alpha } from "@material-ui/core/styles";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import Avatar from "@material-ui/core/Avatar";

import { Table } from "flowbite-react/lib/cjs/components/Table";
import { stringToNum } from "../../../components/Helper/Helper";
import SalesPerformanceWeekly from "./SalesPerformanceWeekly";
import SalesPerformanceMonthly from "./SalesPerformanceMonthly";
import SalesPerformanceQuarterly from "./SalesPerformanceQuarterly";

const useStyles = makeStyles((theme) => ({
  iconWrapper: {
    backgroundColor: alpha(theme.palette.background.emphasis, 0.6),
  },
}));

export default function SalesPerformance() {
  // --------------------------Constants----------------------------
  const { budget, isLoading } = useSelector((state) => state.all);

  const [query, setQuery] = React.useState("");
  const classes = useStyles();

  const [matched, setMatched] = React.useState([]);

  const tableHeaders = [
    <>Sales Team</>,
    <>
      Sales Baseline <br /> {budget[0]?.year1}
    </>,
    <>
      GP Baseline <br /> {budget[0]?.year1}
    </>,
    <>
      GP % <br /> {budget[0]?.year1}
    </>,
    <>
      Sales Budget <br /> {budget[0]?.year2}
    </>,
    <>
      GP Budget <br /> {budget[0]?.year2}
    </>,
  ];

  // --------------------------functions----------------------------

  function getTableHeaders() {
    return tableHeaders.map((header, i) => {
      return (
        <Table.HeadCell key={i} className="bg-gray-200">
          {header}
        </Table.HeadCell>
      );
    });
  }

  function getTableRows() {
    return budget?.map((bud, i) => (
      <Table.Row
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
        key={i}
      >
        <Table.Cell
          className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
          key={bud.salesTeam}
        >
          {bud.salesTeam}
        </Table.Cell>
        <Table.Cell
          className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
          key={bud.salesBaseLine}
        >
          ${stringToNum(bud.salesBaseLine).toLocaleString()}
        </Table.Cell>
        <Table.Cell
          className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
          key={bud.gpBaseLine}
        >
          ${stringToNum(bud.gpBaseLine).toLocaleString()}
        </Table.Cell>
        <Table.Cell
          className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
          key={bud.gPPercent}
        >
          {stringToNum(bud.gPPercent, 2).toLocaleString()}%
        </Table.Cell>
        <Table.Cell
          className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
          key={bud.salesBudget}
        >
          ${stringToNum(bud.salesBudget).toLocaleString()}
        </Table.Cell>
        <Table.Cell
          className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
          key={bud.gpBudget}
        >
          ${stringToNum(bud.gpBudget).toLocaleString()}
        </Table.Cell>
      </Table.Row>
    ));
  }

  // --------------------------useEffects----------------------------

  //--------

  //--------

  useEffect(() => {
    try {
    } catch (error) {}
  }, []);

  //--------

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="w-full">
        <hr />
        <br />
        <div className="inline-block w-full">
          <div className="flex w-full">
            <Button.Group>
              {query === "Weekly" ? (
                <Button
                  gradientMonochrome="info"
                  onClick={() => setQuery("Weekly")}
                >
                  <span className="w-full text-md  font-bold  dark:text-white">
                    Weekly
                  </span>
                </Button>
              ) : (
                <Button color="gray" onClick={() => setQuery("Weekly")}>
                  <span className="w-full text-md  font-bold text-blue-900 dark:text-white">
                    Weekly
                  </span>
                </Button>
              )}
              {query === "Monthly" ? (
                <Button
                  gradientMonochrome="info"
                  onClick={() => setQuery("Monthly")}
                >
                  <span className="w-full text-md  font-bold  dark:text-white">
                    Monthly
                  </span>
                </Button>
              ) : (
                <Button color="gray" onClick={() => setQuery("Monthly")}>
                  <span className="w-full text-md  font-bold text-blue-900 dark:text-white">
                    Monthly
                  </span>
                </Button>
              )}
              {query === "Quarterly" ? (
                <Button
                  gradientMonochrome="info"
                  onClick={() => setQuery("Quarterly")}
                >
                  <span className="w-full text-md  font-bold dark:text-white">
                    Quarterly
                  </span>
                </Button>
              ) : (
                <Button color="gray" onClick={() => setQuery("Quarterly")}>
                  <span className="w-full text-md  font-bold text-blue-900 dark:text-white">
                    Quarterly
                  </span>
                </Button>
              )}
            </Button.Group>
          </div>
          <div className="mt-5">
            {query === "Weekly" && <SalesPerformanceWeekly />}
            {query === "Monthly" && <SalesPerformanceMonthly />}
            {query === "Quarterly" && <SalesPerformanceQuarterly />}
          </div>
          <div className="mt-4"></div>
        </div>
      </div>
    </div>
  );
}
