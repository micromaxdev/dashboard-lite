import * as React from "react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import {
  getCustomerNotes,
  getCustomers,
  getLatestSales,
  getSalesOrderLogs,
  getOpenServiceJobs,
  getOsos,
} from "../../features/all/allSlice";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button } from "flowbite-react/lib/cjs/components";
import AdditionalInfo from "./AdditionalInfo";
import AddressDetails from "./Customer/AddressDetails";
import CustomerNotes from "./Customer/CustomerNotes";
import CustomerOsos from "./Customer/CustomerOsos";
import CustomerLatestSales from "./Customer/CustomerLatestSales";
import CustomerOpenServiceJobs from "./Customer/OpenServiceJobs";
import ProductsSold from "./Customer/ProductsSold";
import SalesByProduct from "./Customer/SalesByProduct";

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => option.customerName + option.customerCode,
});

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const unique = (arr, keyProps) => {
  const kvArray = arr.map((entry) => {
    const key = keyProps.map((k) => entry[k]).join("|");
    return [key, entry];
  });
  const map = new Map(kvArray);
  return Array.from(map.values());
};

const Customer = ({ cusCode, cusName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cusQuery = useQuery().get("customerQuery") || "";
  const [query, setQuery] = React.useState(cusQuery);

  const {
    customers: addressDetails,
    latestSales,
    customerNotes,
    osos,
    openServiceJobs,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.all);

  const [matched, setMatched] = useState(null);
  const [allCustomers, setAllCustomers] = useState([]);
  const handleSetQuery = (newQuery) => {
    setQuery(newQuery);
    navigate(`/dashboard/sap?query=customer&customerQuery=${newQuery}`);
  };

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
    dispatch(getCustomers());
    dispatch(getLatestSales());
    dispatch(getCustomerNotes());
    dispatch(getOsos());
    dispatch(getOpenServiceJobs());
    dispatch(getSalesOrderLogs());
  }, [dispatch, isError, message]);

  useEffect(() => {
    setAllCustomers([
      ...addressDetails,
      ...latestSales,
      ...customerNotes,
      ...osos,
      ...openServiceJobs,
    ]);
  }, [addressDetails, latestSales, customerNotes, osos, openServiceJobs]);

  const distinctCustomers = useMemo(
    () =>
      unique(allCustomers, ["customerName", "customerCode"]).sort((a, b) =>
        a.customerName.localeCompare(b.customerName)
      ),
    [allCustomers]
  );

  const handleMatched = useCallback(
    (value) => {
      navigate(`/dashboard/sap?query=customer&customerQuery=${query}`);
      setMatched(value || null);
    },
    [query, navigate]
  );

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="">
      <Autocomplete
        id="filter-demo"
        onChange={(event, value) => handleMatched(value)}
        options={distinctCustomers}
        getOptionLabel={(option) =>
          `${option.customerName} ➡ ${option.customerCode}`
        }
        filterOptions={filterOptions}
        sx={{ width: 400 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by customer name/code"
            style={{ backgroundColor: "white" }}
          />
        )}
      />

      <div className="flex mt-3 mb-3">
        <Button.Group>
          <Button color="gray" onClick={() => handleSetQuery("addressDetails")}>
            Address Details
          </Button>
          <Button color="gray" onClick={() => handleSetQuery("customerNotes")}>
            Customer Notes
          </Button>
          <Button color="gray" onClick={() => handleSetQuery("latestSales")}>
            Latest Sales
          </Button>
          <Button color="gray" onClick={() => handleSetQuery("osos")}>
            Outstanding Sales Orders
          </Button>
          <Button
            color="gray"
            onClick={() => handleSetQuery("openServiceJobs")}
          >
            Open Service Jobs - not fully invoiced
          </Button>
          <Button color="gray" onClick={() => handleSetQuery("productsSold")}>
            Product Qty Sold
          </Button>
          <Button
            color="gray"
            onClick={() => handleSetQuery("salesPerProduct")}
          >
            Sales By Product
          </Button>
          <Button color="gray" onClick={() => handleSetQuery("additionalInfo")}>
            Additional Info
          </Button>
        </Button.Group>
      </div>

      {query === "addressDetails" && (
        <AddressDetails
          code={matched?.customerCode}
          name={matched?.customerName}
        />
      )}
      {query === "customerNotes" && (
        <CustomerNotes
          code={matched?.customerCode}
          name={matched?.customerName}
        />
      )}
      {query === "latestSales" && (
        <CustomerLatestSales
          code={matched?.customerCode}
          name={matched?.customerName}
        />
      )}
      {query === "osos" && (
        <CustomerOsos
          code={matched?.customerCode}
          name={matched?.customerName}
        />
      )}
      {query === "openServiceJobs" && (
        <CustomerOpenServiceJobs
          code={matched?.customerCode}
          name={matched?.customerName}
        />
      )}
      {query === "productsSold" && (
        <ProductsSold
          code={matched?.customerCode}
          name={matched?.customerName}
        />
      )}
      {query === "salesPerProduct" && !cusCode && (
        <SalesByProduct
          code={matched?.customerCode}
          name={matched?.customerName}
        />
      )}
      {query === "salesPerProduct" && cusCode && (
        <SalesByProduct code={cusCode} name={cusName} />
      )}
      {query === "additionalInfo" && (
        <AdditionalInfo itemNo={matched?.partCode} />
      )}
    </div>
  );
};

export default Customer;
