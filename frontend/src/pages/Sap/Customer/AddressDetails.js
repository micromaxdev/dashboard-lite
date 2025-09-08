import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import EnhancedTable from "../Table";
import { stringToDate } from "../../../components/Helper/Helper";

//--------------------------Table----------------------------

function createData(
  id,
  customerCode,
  customerName,
  customerCurrency,
  salesEmployeeName,
  paymentTerm,
  billingAddress,
  shippingAddress,
  creationDate
) {
  return {
    id,
    customerCode,
    customerName,
    customerCurrency,
    salesEmployeeName,
    paymentTerm,
    billingAddress,
    shippingAddress,
    creationDate,
  };
}

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function AddressDetails({ code, name }) {
  // --------------------------Constants----------------------------

  const { customers: addressDetails, isLoading } = useSelector(
    (state) => state.all
  );

  const [matched, setMatched] = useState([]);

  const matchedAddressDetails = addressDetails.filter((addressDetails) => {
    return (
      addressDetails.customerCode == code && addressDetails.customerName == name
    );
  });

  const [rows, setRows] = useState([]);

  const headCells = [
    {
      id: "customerCode",
      numeric: false,
      disablePadding: true,
      label: "Cus Code",
    },
    {
      id: "customerName",
      numeric: false,
      disablePadding: false,
      label: "Cus Name",
    },
    {
      id: "customerCurrency",
      numeric: false,
      disablePadding: false,
      label: "Cus Currency",
    },
    {
      id: "salesEmployeeName",
      numeric: false,
      disablePadding: false,
      label: "Sales Employee Name",
    },
    {
      id: "paymentTerm",
      numeric: false,
      disablePadding: false,
      label: "Payment Term",
    },
    {
      id: "billingAddress",
      numeric: false,
      disablePadding: false,
      label: "Billing Address",
    },
    {
      id: "shippingAddress",
      numeric: false,
      disablePadding: false,
      label: "Shipping Address",
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
    // console.log(matchedAddressDetails)

    const tableRows = matchedAddressDetails.map((addressDetails, index) => {
      return createData(
        addressDetails._id,
        addressDetails.customerCode,
        addressDetails.customerName,
        addressDetails.customerCurrency,
        addressDetails.salesEmployeeName,
        addressDetails.paymentTerm,
        addressDetails.billingAddress,
        addressDetails.shippingAddress,
        stringToDate(addressDetails.creationDate)
      );
    });

    setRows(tableRows);
  }

  // --------------------------useEffects----------------------------

  //------
  //auto search
  useEffect(() => {
    handleSearch(matched);
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
