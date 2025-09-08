import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import EnhancedTable from "../Table";
import { stringToDate } from "../../../components/Helper/Helper";

//--------------------------Table----------------------------

function createData(
  id,
  supplierCode,
  supplierName,
  supplierCurrency,
  billingAddress,
  creationDate
) {
  return {
    id,
    supplierCode,
    supplierName,
    supplierCurrency,
    billingAddress,
    creationDate,
  };
}

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function SupplierAddressDetails({ code, name }) {
  // --------------------------Constants----------------------------

  const { suppliers: addressDetails, isLoading } = useSelector(
    (state) => state.all
  );

  const matchedAddressDetails = addressDetails.filter((addressDetails) => {
    return (
      addressDetails.supplierCode === code &&
      addressDetails.supplierName === name
    );
  });

  const [rows, setRows] = useState([]);

  const headCells = [
    {
      id: "supplierCode",
      numeric: false,
      disablePadding: true,
      label: "Supplier Code",
    },
    {
      id: "supplierName",
      numeric: false,
      disablePadding: false,
      label: "Supplier Name",
    },
    {
      id: "supplierCurrency",
      numeric: false,
      disablePadding: false,
      label: "Supplier Currency",
    },
    {
      id: "billingAddress",
      numeric: false,
      disablePadding: false,
      label: "Billing Address",
    },
    {
      id: "creationDate",
      numeric: false,
      disablePadding: false,
      label: "Creation Date",
    },
  ];

  // --------------------------Functions----------------------------

  function handleSearch(value) {
    const tableRows = matchedAddressDetails.map((addressDetails, index) => {
      return createData(
        addressDetails._id,
        addressDetails.supplierCode,
        addressDetails.supplierName,
        addressDetails.supplierCurrency,
        addressDetails.billingAddress,
        stringToDate(addressDetails.creationDate)
      );
    });

    setRows(tableRows);
  }

  // --------------------------useEffects----------------------------

  //------
  //auto search
  useEffect(() => {
    handleSearch();
  }, [code, name]);

  if (isLoading) {
    return <Spinner />;
  }

  // --------------------------Return----------------------------

  return (
    <section className="flex">
      <div className="">
        <EnhancedTable rows={rows} headerCells={headCells} />
      </div>
    </section>
  );
}
