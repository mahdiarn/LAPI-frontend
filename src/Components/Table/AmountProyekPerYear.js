import React, { useEffect, useState } from 'react'

import { Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core'
import {daftarNilaiProyekPerTahun as columns} from '../../Shared/Columns'
import {RupiahFormat} from '../../Shared/TextTransformer'
import * as moment from 'moment'

function AmountProyekPerYear(props) {
  const [amountPerYearListView, setAmountPerYearListView] = useState([])

  const { amountPerYearList } = props

  useEffect(() => {
    setAmountPerYearListView(amountPerYearList || [])
  }, [amountPerYearList]) 
  
  function columnValue(column, row) {
    let value = row[column.id]
    switch (column.id) {
      case 'no':
        return row['bulan']+1
      case 'bulan':
        return moment().month(value).locale("id").format('MMMM')
      case 'total_nilai_proyek':
        return RupiahFormat(value)
      default:
        return value
    }
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
          {amountPerYearListView.map((row,key) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id+String(key)}>
                {columns.map((column) => {
                  return (
                    <TableCell key={column.id+String(key)} align={column.align}>
                            { columnValue(column,row) }
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default AmountProyekPerYear