import React, { useEffect, useState } from 'react'

import { Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@material-ui/core'
import {daftarPMColumns as columns} from '../../Shared/Columns'

function PMList(props) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [pmListView, setPMListView] = useState([])

  const { pmList } = props

  useEffect(() => {
    setPMListView(pmList || [])
  }, [pmList]) 

  const handleChangeRowsPerPage = (event) => {
    setPage(0)
    setRowsPerPage(event.target.value)
  }

  const handleChangePage = (event) => {
    setPage(page + 1)
  }
  
  return (
    <div>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {pmListView.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map(column => {
                  const value = row[column.id];
                  return (
                    <TableCell key={value} align={column.align}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={pmListView.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default PMList