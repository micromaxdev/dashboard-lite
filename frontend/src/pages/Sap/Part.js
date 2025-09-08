import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Grid } from "@material-ui/core";
import Spinner from "../../components/Spinner";
import {
  getImg,
  getLatestPurchases,
  getLatestSales,
  getOpos,
  getOsos,
  getPartNotes,
  getCurrentWarehouseStock,
  getSohs,
  reset,
} from "../../features/all/allSlice";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button } from "flowbite-react/lib/cjs/components";
import Opos from "./Part/Opos";
import Osos from "./Part/Osos";
import AdditionalInfo from "./AdditionalInfo";
import LatestSales from "./Part/LatestSales";
import PartNotes from "./Part/PartNotes";
import WarehouseStocks from "./Part/WarehouseStocks";
import Sohs from "./Part/Sohs";
import LatestPurchases from "./Part/LatestPurchases";
import ScreenReport from "./Part/ScreenReport";
import SalesByPartPerCustomer from "./Part/SalesByPartPerCustomer";

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => option.itemNo + option.itemDescription,
});

export default function Part({ props }) {
  //------------------ATTRIBUTES/VARIABLES------------------

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [matched, setMatched] = useState([]);
  // Category filter
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");

  const {
    opos,
    osos,
    latestSales,
    latestPurchases,
    partNotes,
    sohs,
    isLoading,
    isError,
    message,
    isSuccess,
  } = useSelector((state) => state.all);

  const [allParts, setAllParts] = useState([]);

  const distinctParts = unique(allParts, ["itemNo", "itemDescription"]).sort(
    (a, b) => (a.itemNo > b.itemNo ? 1 : -1)
  );
  const filteredParts = distinctParts.filter((part) => {
    const categoryMatch =
      selectedCategory === "All" || part.category === selectedCategory;

    const subcategoryMatch =
      selectedSubcategory === "All" || part.subCategory === selectedSubcategory;

    return categoryMatch && subcategoryMatch;
  });

  const sortedFilteredParts = filteredParts.sort((a, b) =>
    a.itemNo > b.itemNo ? 1 : -1
  );

  const [query, setQuery] = React.useState("");

  //------------------FUNCTIONS------------------

  //------------

  function unique(arr, keyProps) {
    const kvArray = arr.map((entry) => {
      const key = keyProps.map((k) => entry[k]).join("|");
      return [key, entry];
    });
    const map = new Map(kvArray);
    return Array.from(map.values());
  }

  //------------

  function handleMatched(value) {
    if (value == null) {
      setMatched("");
    } else {
      setMatched(value);
    }
  }

  //------------

  const renameKey = (object, key, newKey) => {
    const clonedObj = clone(object);

    const targetKey = clonedObj[key];

    delete clonedObj[key];

    clonedObj[newKey] = targetKey;

    return clonedObj;
  };

  //------------

  const clone = (obj) => Object.assign({}, obj);

  // New filter functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setSelectedCategory(value);
      // Reset subcategory when category changes
      setSelectedSubcategory("All");
    } else if (name === "subcategory") {
      setSelectedSubcategory(value);
    }
  };

  //------------------USE EFFECT------------------

  //------------

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    try {
      dispatch(getOsos());
      dispatch(getOpos());
      dispatch(getLatestSales());
      dispatch(getPartNotes());
      dispatch(getCurrentWarehouseStock());
      dispatch(getSohs());
      dispatch(getLatestPurchases());
    } catch (error) {}

    // return () => {
    //     dispatch(reset())
    // }
  }, [isError, message, dispatch]);

  //-What to do if matched changes? Currently empty

  useEffect(() => {}, [matched]);

  //------------

  useEffect(() => {
    var obj = [...osos, ...latestSales, ...latestPurchases, ...partNotes];
    //var obj = [...latestSales];

    for (let i = 0; i < obj.length; i++) {
      obj[i] = renameKey(obj[i], "partCode", "itemNo");
      obj[i] = renameKey(obj[i], "description", "itemDescription");
    }

    var combined = [...opos, ...sohs, ...obj];

    combined = combined.filter((x) => {
      return (
        typeof x.itemNo != "undefined" ||
        typeof x.itemDescription != "undefined"
      );
    });

    setAllParts(combined);
  }, [osos, opos, latestSales, partNotes, sohs, latestPurchases]);

  const uniqueCategories = [
    ...new Set(partNotes.map((note) => note.category).filter(Boolean)),
  ];
  const uniqueSubcategories = [
    ...new Set(partNotes.map((note) => note.subCategory).filter(Boolean)),
  ];

  //------------

  if (isLoading) {
    return <Spinner />;
  }

  //------------------RETURN RENDER------------------

  return (
    <>
      <div className="flex">
        <Autocomplete
          id="filter-demo"
          onChange={(event, value) => handleMatched(value)}
          options={sortedFilteredParts}
          getOptionLabel={(option) =>
            option?.itemNo?.toString() +
            " ➡ " +
            option?.itemDescription?.toString()
          }
          filterOptions={filterOptions}
          sx={{ width: 400 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by code/description"
              style={{ backgroundColor: "white" }}
            />
          )}
        />
        <div className="block mt-5  ml-10">
          <select
            name="category"
            value={selectedCategory}
            onChange={handleChange}
            className="mr-5"
          >
            <option value="All">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            name="subcategory"
            value={selectedSubcategory}
            onChange={handleChange}
            className="mr-5"
          >
            <option value="All">All Subcategories</option>
            {uniqueSubcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex mt-3 mb-3">
        <Button.Group>
          <Button color="gray" onClick={() => setQuery("opos")}>
            Outstanding Purchase Orders
          </Button>
          <Button color="gray" onClick={() => setQuery("latestPurchases")}>
            Latest Purchases
          </Button>
          <Button color="gray" onClick={() => setQuery("osos")}>
            Outstanding Sales Orders
          </Button>
          <Button color="gray" onClick={() => setQuery("latestSales")}>
            Latest Sales
          </Button>
          <Button color="gray" onClick={() => setQuery("partNotes")}>
            Current Stock Status
          </Button>
          <Button color="gray" onClick={() => setQuery("warehouseStock")}>
            Warehouse Stock Status
          </Button>
          <Button color="gray" onClick={() => setQuery("salesPerCustomer")}>
            Sales Per Customer
          </Button>
          <Button color="gray" onClick={() => setQuery("screenReport")}>
            Screen Report
          </Button>
          <Button color="gray" onClick={() => setQuery("additionalInfo")}>
            Additional Info
          </Button>
        </Button.Group>
      </div>

      {query == "opos" && (
        <Opos
          code={matched?.itemNo}
          itemDescription={matched?.itemDescription}
        />
      )}
      {query == "osos" && (
        <Osos
          code={matched?.itemNo}
          itemDescription={matched?.itemDescription}
        />
      )}
      {query == "latestSales" && (
        <LatestSales
          code={matched?.itemNo}
          itemDescription={matched?.itemDescription}
        />
      )}
      {query == "latestPurchases" && (
        <LatestPurchases
          code={matched?.itemNo}
          itemDescription={matched?.itemDescription}
        />
      )}
      {query == "partNotes" && (
        <PartNotes
          code={matched?.itemNo}
          itemDescription={matched?.itemDescription}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
        />
      )}
      {query == "warehouseStock" && (
        <WarehouseStocks
          code={matched?.itemNo}
          itemDescription={matched?.itemDescription}
        />
      )}
      {query == "salesPerCustomer" && (
        <SalesByPartPerCustomer
          latestSales={latestSales}
          partCode={matched?.itemNo}
        />
      )}
      {query == "screenReport" && (
        <ScreenReport
          code={matched?.itemNo}
          itemDescription={matched?.itemDescription}
        />
      )}
      {query == "additionalInfo" && <AdditionalInfo itemNo={matched?.itemNo} />}
    </>
  );
}
