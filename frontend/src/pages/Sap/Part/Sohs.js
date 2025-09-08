import * as React from 'react';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { stringToNum } from '../../../components/Helper/Helper';

import Spinner from '../../../components/Spinner';
import EnhancedTable from '../Table';


//--------------------------Table----------------------------

function createData(id, partCode, description, longDescription, category, subCategory, brand, stockOnHand) {
  return { id, partCode, description, longDescription, category, subCategory, brand, stockOnHand };
}

// ---------------------------------------------------------------------------------------------
// ---------------------------------------Main function-----------------------------------------
// ---------------------------------------------------------------------------------------------

export default function Sohs({ code, itemDescription }) {

  // --------------------------Constants----------------------------

  const dispatch = useDispatch()

  const { partNotes, isLoading, isError, message } = useSelector(
    (state) => state.all
  )

  const [matched, setMatched] = useState([])

  const matchedPartNotes = partNotes.filter(
    (partNotes) => { return partNotes.partCode == code && partNotes.description == itemDescription; }
  );

  const [rows, setRows] = useState([])

  const headCells = [
    {
      id: 'partCode',
      numeric: false,
      disablePadding: false,
      label: 'Part Code',
    },
    {
      id: 'description',
      numeric: false,
      disablePadding: false,
      label: 'Description',
    },
    {
      id: 'longDescription',
      numeric: false,
      disablePadding: false,
      label: 'Long Description',
    },
    {
      id: 'brand',
      numeric: false,
      disablePadding: false,
      label: 'Brand',
    },
    {
      id: 'stockOnHand',
      numeric: false,
      disablePadding: false,
      label: 'Stock On Hand',
    },
    {
      id: 'category',
      numeric: false,
      disablePadding: false,
      label: 'Category',
    },
    {
      id: 'subCategory',
      numeric: false,
      disablePadding: false,
      label: 'Sub Category',
    },
  ];

  // --------------------------Functions----------------------------

  function handleMatched(value) {
    // console.log(value)
    if (value == null) {
      setMatched('')
    } else {
      setMatched(value)
    }

  }

  function handleSearch(value) {

    // console.log(matchedPartNotes)

    const tableRows = matchedPartNotes.map((partNotes, index) => {
      return createData(
        partNotes._id,
        partNotes.partCode,
        partNotes.description,
        partNotes.longDescription,
        partNotes.category,
        partNotes.subCategory,
        partNotes.brand,
        stringToNum(partNotes.stockOnHand)
      );
    });

    setRows(tableRows)

  }


  // --------------------------useEffects----------------------------

  useEffect(() => {

    handleSearch();

  }, [code, itemDescription])


  if (isLoading) {
    return <Spinner />
  }


  // --------------------------Return----------------------------

  return (

    <section>

      <EnhancedTable rows={rows} headerCells={headCells} />

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
