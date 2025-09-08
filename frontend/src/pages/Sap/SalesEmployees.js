import * as React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import {
  getBudget,
  getCustomers,
  getJobLogs,
  getLatestSales,
  getOpenServiceJobs,
  getOsos,
  getSalesOrderLogs,
  getSubscriptions,
  reset,
} from "../../features/all/allSlice";
import { Button } from "flowbite-react/lib/cjs/components";
import OrderBook from "./SalesEmployees/OrderBook";
import SalesPerformance from "./SalesEmployees/SalesPerformance";
import ServiceJobBook from "./SalesEmployees/ServiceJobBook";
import SalesBudget from "./SalesEmployees/SalesBudget";
import OrderLogBook from "./SalesEmployees/OrderLogBook";
import ServiceJobLogBook from "./SalesEmployees/ServiceJobLogBook";
import OutstandingSalesOrdersByEmployee from "./SalesEmployees/OutstandingSalesOrdersByEmployee";
import NewCustomerSales from "./SalesEmployees/NewCustomerSales";
import SalesSOW from "./SalesEmployees/SalesSOW";
import OutstandingServiceBook from "./SalesEmployees/OutstandingServiceBook";
import SalesForecast from "./SalesEmployees/SalesForecast";

export default function SalesEmployees({ props }) {
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.all);
  const [query, setQuery] = React.useState("");

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    try {
      dispatch(getOsos());
      dispatch(getCustomers());
      dispatch(getBudget());
      dispatch(getLatestSales());
      dispatch(getOpenServiceJobs());
      dispatch(getSalesOrderLogs());
      dispatch(getJobLogs());
      dispatch(getSubscriptions());
    } catch (error) {}
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="">
      <div className="flex mt-3 mb-3">
        <Button.Group>
          <Button color="gray" onClick={() => setQuery("orderBook")}>
            Sales Order Book
          </Button>
          <Button color="gray" onClick={() => setQuery("osos")}>
            Outstanding Sales Orders
          </Button>
          <Button color="gray" onClick={() => setQuery("serviceBook")}>
            Service Book
          </Button>
          <Button
            color="gray"
            onClick={() => setQuery("outstandingServiceBook")}
          >
            Outstanding Service Book
          </Button>
          <Button color="gray" onClick={() => setQuery("salesForecast")}>
            Sales Forecast
          </Button>
          <Button
            color="gray"
            onClick={() => setQuery("salesPerformance")}
            id="salesPerformance"
          >
            Sales Performance
          </Button>
          <Button color="gray" onClick={() => setQuery("salesBudget")}>
            Sales Budget
          </Button>
          <Button color="gray" onClick={() => setQuery("orderLog")}>
            Sales Order Log
          </Button>
          <Button color="gray" onClick={() => setQuery("serviceJobLog")}>
            Service Job Log
          </Button>
          <Button color="gray" onClick={() => setQuery("newCustomerSales")}>
            New Customer Sales
          </Button>
          <Button color="gray" onClick={() => setQuery("sOWSales")}>
            SOW Sales
          </Button>
        </Button.Group>
      </div>

      {query === "orderBook" && <OrderBook />}
      {query === "osos" && <OutstandingSalesOrdersByEmployee />}
      {query === "serviceBook" && <ServiceJobBook />}
      {query === "outstandingServiceBook" && <OutstandingServiceBook />}
      {query === "salesForecast" && <SalesForecast />}
      {query === "salesPerformance" && <SalesPerformance />}
      {query === "salesBudget" && <SalesBudget />}
      {query === "orderLog" && <OrderLogBook />}
      {query === "serviceJobLog" && <ServiceJobLogBook />}
      {query === "newCustomerSales" && <NewCustomerSales />}
      {query === "sOWSales" && <SalesSOW />}
    </div>
  );
}
