import React, { useEffect, useState } from 'react'

import { Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core'
import {daftarLaporanProyekPerTahun as columns} from '../../Shared/Columns'
import {RupiahFormat} from '../../Shared/TextTransformer'
import * as moment from 'moment'

import Header from './ReportProyekPerYearChildComponents/Header'
import SubTable from './ReportProyekPerYearChildComponents/SubTable'

function ReportProyekPerYear(props) {
  const { year } = props
  
  return (
    <div>
      <Table stickyHeader aria-label="sticky table">
        <Header year={year}/>
        <SubTable
          index={1}
          title="Proyek Berdasarkan Proses Pengadaan"
          url={'proyek/amount-by-pengadaan'}
          headTitleAlign="left"
          headIndexAlign="center"
          year={year}
          category="pengadaan"
        />
      </Table>
    </div>
  )
}

export default ReportProyekPerYear