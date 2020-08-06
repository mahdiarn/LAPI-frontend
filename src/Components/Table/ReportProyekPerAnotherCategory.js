import React, { useEffect, useState } from 'react'

import { Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core'
import {daftarLaporanProyekPerTahun as columns} from '../../Shared/Columns'
import {RupiahFormat} from '../../Shared/TextTransformer'
import * as moment from 'moment'

function ReportProyekPerYear(props) {
  const [reportPerYearListView, setReportPerYearListView] = useState([])

  const { reportPerYearList, year } = props

  useEffect(() => {
    setReportPerYearListView(reportPerYearList || [])
  }, [reportPerYearList]) 
  
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
              colSpan={4}
            >
              Rekap Kelompok Keahlian Tahun {year || 0}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              key="nomor-head"
              align="center"
              style={{ minWidth: 70 }}
            >
              No
            </TableCell>
            <TableCell
              key="fakultas-head"
              align="center"
              style={{ minWidth: 70 }}
            >
              Fakultas
            </TableCell>
            <TableCell
              key="jumlah-proyek-head"
              align="center"
              style={{ minWidth: 70 }}
            >
              Jumlah Proyek
            </TableCell>
            <TableCell
              key="nilai-proyek-head"
              align="center"
              style={{ minWidth: 70 }}
            >
              Nilai Proyek
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportPerYearListView.map((row,key) => {
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