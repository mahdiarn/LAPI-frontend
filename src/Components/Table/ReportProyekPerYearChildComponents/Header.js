import React from 'react'

import { TableHead, TableRow, TableCell} from '@material-ui/core'

function Header(props) {
  return (
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
          style={{ minWidth: 150 }}
          rowSpan={3}
          colSpan={2}
        >
          Uraian
        </TableCell>
        <TableCell
          key="kontrak-head"
          align="center"
          style={{ minWidth: 70 }}
          colSpan={2}
        >
          Kontrak Tahun {props.year || 0}
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
  )
}

export default Header