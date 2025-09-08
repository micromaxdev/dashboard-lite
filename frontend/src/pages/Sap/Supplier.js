import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import {
  getOpos,
  getSupplierNotes,
  getSuppliers,
  reset,
} from "../../features/all/allSlice";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button } from "flowbite-react/lib/cjs/components";
import AdditionalInfo from "./AdditionalInfo";
import SupplierAddressDetails from "./Supplier/AddressDetails";
import SupplierNotes from "./Supplier/SupplierNotes";
import SupplierOpos from "./Supplier/SupplierOpos";

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => option.supplierCode + option.supplierName,
});

export default function Supplier({ props }) {
  //------------------ATTRIBUTES/VARIABLES------------------

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [matched, setMatched] = useState([]);

  const {
    suppliers: addressDetails,
    supplierNotes,
    opos,
    isLoading,
    isError,
    message,
    isSuccess,
  } = useSelector((state) => state.all);

  const [allSuppliers, setAllSuppliers] = React.useState([]);

  const distinctSuppliers = unique(allSuppliers, [
    "supplierCode",
    "supplierName",
  ]).sort((a, b) => (a.supplierCode > b.supplierCode ? 1 : -1));

  const [query, setQuery] = React.useState("");

  const [showAllOpos, setShowAllOpos] = useState(false);

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
    // console.log(value)
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

  //------------------USE EFFECT------------------

  //------------

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    try {
      dispatch(getSupplierNotes());
      dispatch(getSuppliers());
      dispatch(getOpos());
    } catch (error) {}

    // return () => {
    //     dispatch(reset())
    // }
  }, [isError, message, dispatch]);

  //------------

  useEffect(() => {}, [matched]);

  //------------

  useEffect(() => {
    // var obj = [...osos, ...latestSales, ...partNotes];

    // for (let i = 0; i < obj.length; i++) {
    //     obj[i] = renameKey(obj[i], 'partCode', 'itemNo');
    //     obj[i] = renameKey(obj[i], 'description', 'itemDescription');
    // }

    // var combined = [...addressDetails, ...latestSales, ...customerNotes, ...osos, ...openServiceJobs]

    const safeAddressDetails = Array.isArray(addressDetails)
      ? addressDetails
      : [];
    const safeSupplierNotes = Array.isArray(supplierNotes) ? supplierNotes : [];
    const safeOpos = Array.isArray(opos) ? opos : [];

    setAllSuppliers([...safeAddressDetails, ...safeSupplierNotes, ...safeOpos]);
  }, [addressDetails, supplierNotes, opos]);

  //------------

  if (isLoading) {
    return <Spinner />;
  }

  //------------------RETURN RENDER------------------

  return (
    <div className="">
      <Autocomplete
        id="filter-demo"
        onChange={(event, value) => {
          handleMatched(value);
          setShowAllOpos(false);
        }}
        options={distinctSuppliers}
        getOptionLabel={(option) =>
          option.supplierName + " ➡ " + option.supplierCode
        }
        filterOptions={filterOptions}
        sx={{ width: 400 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by supplier name/code"
            style={{ backgroundColor: "white" }}
          />
        )}
      />

      <div className="flex mt-3 mb-3">
        <Button.Group>
          <Button color="gray" onClick={() => setQuery("addressDetails")}>
            Address Details
          </Button>
          <Button
            color="gray"
            onClick={() => {
              setQuery("opos");
            }}
          >
            Outstanding Purchase Orders
          </Button>
          <Button color="gray" onClick={() => setQuery("supplierNotes")}>
            Supplier Notes
          </Button>
          <Button color="gray" onClick={() => setQuery("additionalInfo")}>
            Additional Info
          </Button>
        </Button.Group>
      </div>

      {query == "addressDetails" && (
        <SupplierAddressDetails
          code={matched?.supplierCode}
          name={matched?.supplierName}
        />
      )}
      {query == "opos" && (
        <SupplierOpos
          code={matched?.supplierCode}
          name={matched?.supplierName}
          showAll={showAllOpos}
          onShowAll={() => setShowAllOpos(true)}
          onDeactivateShowAll={() => setShowAllOpos(false)}
        />
      )}
      {query == "supplierNotes" && (
        <SupplierNotes
          code={matched?.supplierCode}
          name={matched?.supplierName}
        />
      )}
      {query == "additionalInfo" && <AdditionalInfo itemNo={matched?.itemNo} />}
    </div>
  );
}
