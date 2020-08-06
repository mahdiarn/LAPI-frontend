import React, { useEffect, useState } from 'react'

import { Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core'
import {daftarLaporanProyekPerTahun as columns} from '../../Shared/Columns'
import {RupiahFormat} from '../../Shared/TextTransformer'
import * as moment from 'moment'

function ReportProyekPerYear(props) {
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
              key="nomer-head"
              align="center"
              style={{ minWidth: 70 }}
              rowSpan={3}
            >
              No
            </TableCell>
            <TableCell
              key="uraian-head"
              align="center"
              style={{ minWidth: 70 }}
              rowSpan={3}
            >
              Uraian
            </TableCell>
            <TableCell
              key="kontrak-head"
              align="center"
              style={{ minWidth: 70 }}
              colSpan={2}
            >
              Kontrak Tahun {year || 0}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              key="total-head"
              align="center"
              style={{ minWidth: 70 }}
              rowSpan={2}
            >
              Jumlah Proyek
            </TableCell>
            <TableCell
              key="total-nilai-head"
              align="center"
              style={{ minWidth: 70 }}
            >
              Nilai Kontrak Tidak Termasuk PPN
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              key="rupiah-nilai-head"
              align="center"
              style={{ minWidth: 70 }}
            >
              IDR
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

export default ReportProyekPerYear