import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import EnhancedTable from "../Table";

//--------------------------Table----------------------------

function createData(id, supplierCode, supplierName, supplierNotes) {
  return { id, supplierCode, supplierName, supplierNotes };
}

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function SupplierNotes({ code, name }) {
  // --------------------------Constants----------------------------

  const { supplierNotes, isLoading } = useSelector((state) => state.all);

  const matchedSupplierNotes = supplierNotes.filter((supplierNotes) => {
    return (
      supplierNotes.supplierCode === code && supplierNotes.supplierName === name
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
      id: "supplierNotes",
      numeric: false,
      disablePadding: false,
      label: "Supplier Notes",
    },
  ];

  // --------------------------Functions----------------------------

  function handleSearch(value) {
    const tableRows = matchedSupplierNotes.map((supplierNotes, index) => {
      return createData(
        supplierNotes._id,
        supplierNotes.supplierCode,
        supplierNotes.supplierName,
        supplierNotes.supplierNotes
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
