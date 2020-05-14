import React from 'react'
import {Link} from 'react-router-dom'
import * as moment from 'moment'
import 'moment/locale/id'

import history from '../../../Shared/History'
import APIBuilder from '../../../Shared/APIBuilder'
import Constants from '../../../Shared/Constants'
import Authorization from '../../../Shared/Authorization'

import Navbar from '../../Navbar/Navbar'

import {Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination} from '@material-ui/core'

import {daftarPengalamanColumns as columns} from '../../../Shared/Columns'

import {PinTextFormat} from '../../../Shared/TextTransformer'

class DaftarPengalaman extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      rowsPerPage: 5,
      peluangList: [],
      peluangListView: [],
    }

    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    
  }

  async componentDidMount() {
    async function validateToken() {
      let isValid = await Authorization.validateToken()
      if (!isValid) return history.push('/logout')
    }
    validateToken()
    const response = await APIBuilder('proyek/archive')
    console.log(response.payload.data)
    if (response.code === 200) this.setState({peluangList: response.payload.data, peluangListView: response.payload.data})
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    })
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({
      page: 0,
      rowsPerPage: +event.target.value
    })
  }

  columnValue = (column, value) => {
    if (column.id === 'klasifikasi') {
      switch (value) {
        case Constants.PROYEK_KLASIFIKASI_KONSULTAN:
          return 'Konsultan'
        case Constants.PROYEK_KLASIFIKASI_PELATIHAN:
          return 'Pelatihan'
        case Constants.PROYEK_KLASIFIKASI_PENGEMBANGAN_TEKNOLOGI:
          return 'Pengembangan Teknologi'
        case Constants.PROYEK_KLASIFIKASI_PENGUJIAN:
          return 'Pelatihan'
        default:
          return ''
      }
    } else if (column.id === 'pengadaan') {
      switch (value) {
        case Constants.PROYEK_JENIS_PENGADAAN_PEMILIHAN_LANGSUNG:
          return 'Pemilihan Langsung'
        case Constants.PROYEK_JENIS_PENGADAAN_PENUNJUKAN_LANGSUNG:
          return 'Penunjukan Langsung'
        case Constants.PROYEK_JENIS_PENGADAAN_SELEKSI_UMUM:
          return 'Seleksi Umum'
        case Constants.PROYEK_JENIS_PENGADAAN_SELEKSI_TERBATAS:
          return 'Seleksi Terbatas'
        case Constants.PROYEK_JENIS_PENGADAAN_SWAKELOLA:
          return 'Swakelola'
        default:
          return ''
      }
    } else if (column.id === 'tahapan_terakhir') {
      switch (value) {
        case Constants.TAHAPAN_TERAKHIR_PENDAFTARAN:
          return `Pendaftaran`
        case Constants.TAHAPAN_TERAKHIR_PRAKUALIFIKASI:
          return `Prakualifikasi`
        case Constants.TAHAPAN_TERAKHIR_PROPOSAL:
          return `Proposal`
        case Constants.TAHAPAN_TERAKHIR_KLARIFIKASI_DAN_NEGOSIASI:
          return `Klarifikasi Dan Negosiasi`
        case Constants.TAHAPAN_TERAKHIR_PEMANTAUAN:
          return `Pemantauan`
        default:
          return ``
      }
    } else {
      return value
    }
  }

  classifyColor(startDate, endDate) {
    let contractDays = moment(endDate).diff(startDate, 'days')
    let remainingDays = moment(endDate).diff(moment(), 'days')
    if (remainingDays < 0) return '#F00'
    let percentage = ((remainingDays) / contractDays) * 100
    console.log(contractDays, remainingDays, percentage)
    if (percentage > 60) {
      return '#0F0'
    } else if (percentage < 60 && percentage > 30) {
      return '#F80'
    } else {
      return '#F00'
    } 
  }

  render() {
    const {page, rowsPerPage, peluangListView} = this.state

    return (
      <Grid item container>
        <Navbar role={Authorization.getRole()} email={Authorization.getEmail()} title={'Daftar Pengalaman'}/>
        <Grid item container justify="center" alignItems="center" style={{ marginTop: '4em', padding: '0 4em'}}>
          <Paper>
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
                {peluangListView.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map(column => {
                        const value = row[column.id]
                        if (column.id === 'menu') {
                          return(
                            <TableCell key={column.id+value} align={column.align}>
                              <Link to={`/proyek/${row.id}`}>Detail</Link>
                            </TableCell>
                          )
                        } else if (column.id === 'pin') {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              {` P${this.columnValue(column,PinTextFormat(value)) || '-'} `}
                            </TableCell>
                          )
                        } else {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              { this.columnValue(column,value) }
                            </TableCell>
                          )
                        }
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={peluangListView.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default DaftarPengalaman