import React, { useEffect, useState } from 'react'

import { Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core'
import {daftarLaporanProyekPerTahun as columns} from '../../Shared/Columns'
import {RupiahFormat} from '../../Shared/TextTransformer'
import * as moment from 'moment'

function ReportProyekByDue(props) {
  const [amountPerYearListView, setAmountPerYearListView] = useState([])

  const { amountPerYearList, year } = props

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
            <TableCell
              key="title-head"
              align="center"
              style={{ minWidth: 70 }}
              colSpan={3}
            >
              Rekap Melebihi Akhir Periode {year || 0}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              key="nomer-head"
              align="center"
              style={{ minWidth: 70 }}
            >
              Nomor
            </TableCell>
            <TableCell
              key="keterangan-head"
              align="center"
              style={{ minWidth: 70 }}
            >
              Keterangan
            </TableCell>
            <TableCell
              key="total-head"
              align="center"
              style={{ minWidth: 70 }}
            >
              Jumlah
            </TableCell>
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

export default ReportProyekByDue