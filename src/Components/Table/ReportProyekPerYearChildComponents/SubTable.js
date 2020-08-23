import React, { useEffect, useState } from 'react'

import { TableBody, TableRow, TableCell } from '@material-ui/core'

import * as moment from 'moment'

import {RomawiFormat, RupiahFormat} from '../../../Shared/TextTransformer'
import APIBuilder from '../../../Shared/APIBuilder'

import {
  daftarLaporanJenisPengadaanPerTahun,
  daftarLaporanJenisPemberiKerjaPerTahun,
  daftarLaporanKlasifikasiProyekPerTahun,
  daftarLaporanBulananPerTahun,
} from '../../../Shared/Columns'
import {
  CodeToJenisPengadaan,
  CodeToJenisPemberiKerja,
  CodeToKlasifikasiProyek,
} from '../../../Shared/CodeToName'

function SubTable(props) {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  function getColumns(tableCategory) {
    switch (tableCategory) {
      case 'pengadaan':
        return setColumns(daftarLaporanJenisPengadaanPerTahun)
      case 'jenis_pemberi_kerja':
        return setColumns(daftarLaporanJenisPemberiKerjaPerTahun)
      case 'klasifikasi_proyek':
        return setColumns(daftarLaporanKlasifikasiProyekPerTahun)
      case 'bulan':
        return setColumns(daftarLaporanBulananPerTahun)
      default:
        return setColumns([])
    }
  }

  useEffect(() => {
    async function fetchData() {
      let payload = {
        year: props.year
      }
      
      let response = await APIBuilder(props.url, payload, 'POST')
      if (response.code === 200) setData(response.payload.data)
    }    
    fetchData()
  }, [props.year, props.url])

  useEffect(() => {
    getColumns(props.category)
  }, [props.category])

  function columnValue(column, row) {
    let value = row[column.id]
    switch (column.id) {
      case 'nama_pengadaan':
        return CodeToJenisPengadaan(row['pengadaan'])
      case 'nama_jenis_pemberi_kerja':
        return CodeToJenisPemberiKerja(row['jenis_pemberi_kerja'])
      case 'nama_klasifikasi_proyek':
        return CodeToKlasifikasiProyek(row['klasifikasi_proyek'])
      case 'bulan':
        return moment().month(row['bulan']-1).locale('ID').format('MMMM')
      case 'total_nilai_proyek':
        return RupiahFormat(value)
      default:
        return value
    }
  }

  

  return (
    <TableBody>
      <TableRow hover role="checkbox" tabIndex={-1} key={`subtable-head-row-${props.index}`}>
        <TableCell key={`subtable-head-index-cell-${props.index}`} align={props.headIndexAlign} colSpan={1}>
          { RomawiFormat(props.index) }
        </TableCell>
        <TableCell key={`subtable-head-title-cell-${props.index}`} align={props.headTitleAlign} colSpan={4}>
          { props.title }
        </TableCell>
      </TableRow>
      {data.map((row,key) => {
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
      <TableRow>
        <TableCell key={`total-blank-cell-${props.category}`} colSpan={2}>
          &nbsp;
        </TableCell>
        <TableCell key={`total-cell-${props.category}`}>
          Total
        </TableCell>
        <TableCell key={`total-proyek-cell-${props.category}`} align="center">
          { data.length > 0 ? data.map(el => el.total_proyek).reduce((acc,cur) => acc + cur) : 0 }
        </TableCell>
        <TableCell key={`total-niali-proyek-cell-${props.category}`}>
          { data.length > 0 ? RupiahFormat(data.map(el => el.total_nilai_proyek).reduce((acc,cur) => acc + cur)) : 0 }
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

export default SubTable

{/* 
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
*/}