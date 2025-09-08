import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stringToNum } from "../../../components/Helper/Helper";

import Spinner from "../../../components/Spinner";
import EnhancedTable from "../Table";

//--------------------------Table----------------------------

function createData(
  id,
  partCode,
  description,
  longDescription,
  category,
  subCategory,
  brand,
  inventoryUOM,
  stockOnHand,
  committed,
  ordered,
  available,
  storageLocation
) {
  return {
    id,
    partCode,
    description,
    longDescription,
    category,
    subCategory,
    brand,
    inventoryUOM,
    stockOnHand,
    committed,
    ordered,
    available,
    storageLocation,
  };
}

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function PartNotes({
  code,
  itemDescription,
  selectedCategory,
  selectedSubcategory,
}) {
  // --------------------------Constants----------------------------

  const { partNotes, isLoading } = useSelector((state) => state.all);

  const [matched, setMatched] = useState([]);

  const matchedPartNotes = partNotes.filter((partNotes) => {
    return (
      partNotes.partCode == code && partNotes.description == itemDescription
    );
  });

  const [rows, setRows] = useState([]);

  const headCells = [
    {
      id: "partCode",
      numeric: false,
      disablePadding: false,
      label: "Part Code",
    },
    {
      id: "description",
      numeric: false,
      disablePadding: false,
      label: "Description",
    },
    {
      id: "longDescription",
      numeric: false,
      disablePadding: false,
      label: "Long Description",
    },
    {
      id: "inventoryUOM",
      numeric: false,
      disablePadding: false,
      label: "InventoryUOM",
    },
    {
      id: "stockOnHand",
      numeric: false,
      disablePadding: false,
      label: "Total Stock",
    },
    {
      id: "committed",
      numeric: false,
      disablePadding: false,
      label: "Committed",
    },
    {
      id: "ordered",
      numeric: false,
      disablePadding: false,
      label: "Ordered",
    },
    {
      id: "available",
      numeric: false,
      disablePadding: false,
      label: "Available",
    },
    {
      id: "category",
      numeric: false,
      disablePadding: false,
      label: "Category",
    },
    {
      id: "subCategory",
      numeric: false,
      disablePadding: false,
      label: "Sub Category",
    },
    {
      id: "brand",
      numeric: false,
      disablePadding: false,
      label: "Brand",
    },
    {
      id: "storageLocation",
      numeric: false,
      disablePadding: false,
      label: "Storage Location",
    },
  ];

  // --------------------------Functions----------------------------

  function handleSearch() {
    if (matched) {
      // If a specific part is selected, show only that part
      const selectedPart = matchedPartNotes.find(
        (partNote) =>
          partNote.partCode === code && partNote.description === itemDescription
      );

      if (selectedPart) {
        setRows([
          createData(
            selectedPart._id,
            selectedPart.partCode,
            selectedPart.description,
            selectedPart.longDescription,
            selectedPart.category,
            selectedPart.subCategory,
            selectedPart.brand,
            selectedPart.inventoryUOM,
            stringToNum(selectedPart.stockOnHand),
            stringToNum(selectedPart.committed),
            stringToNum(selectedPart.ordered),
            stringToNum(selectedPart.available),
            selectedPart.storageLocation
          ),
        ]);
        return;
      }
    }

    // If no specific part is selected, show all matching parts based on filters
    const filteredPartNotes = partNotes.filter((partNote) => {
      return (
        (selectedCategory === "All" ||
          partNote.category === selectedCategory) &&
        (selectedSubcategory === "All" ||
          partNote.subCategory === selectedSubcategory)
      );
    });

    const tableRows = filteredPartNotes.map((partNote) => {
      return createData(
        partNote._id,
        partNote.partCode,
        partNote.description,
        partNote.longDescription,
        partNote.category,
        partNote.subCategory,
        partNote.brand,
        partNote.inventoryUOM,
        stringToNum(partNote.stockOnHand),
        stringToNum(partNote.committed),
        stringToNum(partNote.ordered),
        stringToNum(partNote.available),
        partNote.storageLocation
      );
    });

    setRows(tableRows);
  }

  // --------------------------useEffects----------------------------

  useEffect(() => {
    handleSearch();
  }, [code, itemDescription, selectedCategory, selectedSubcategory]);

  if (isLoading) {
    return <Spinner />;
  }

  // --------------------------Return----------------------------

  return (
    <section className="flex">
      <div className="">
        <EnhancedTable rows={rows} headerCells={headCells} />
      </div>

      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell>Part&nbsp;Code</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Long&nbsp;Description</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Sub&nbsp;Category</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Stock&nbsp;On&nbsp;Hand</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.partCode}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.longDescription}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.subCategory}</TableCell>
                <TableCell align="right">{row.brand}</TableCell>
                <TableCell align="right">{row.stockOnHand}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </section>
  );
}
