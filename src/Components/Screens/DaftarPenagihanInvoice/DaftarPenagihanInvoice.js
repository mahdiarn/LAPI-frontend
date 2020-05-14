import React from 'react'
import {Link} from 'react-router-dom'
import * as moment from 'moment'
import 'moment/locale/id'

import history from '../../../Shared/History'
import APIBuilder from '../../../Shared/APIBuilder'
import Constants from '../../../Shared/Constants'
import Authorization from '../../../Shared/Authorization'

import Navbar from '../../Navbar/Navbar'

import { Checkbox, Grid, Typography, Paper, TextField, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

import {daftarPembayaranInvoiceColumn as columns} from '../../../Shared/Columns'
import {PinTextFormat} from '../../../Shared/TextTransformer'

import PenagihanInvoiceDetailDialog from '../../Dialog/PenagihanInvoiceDetail'

class DaftarPenagihanInvoice extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      rowsPerPage: 5,
      peluangList: [],
      peluangListView: [],
      searchProyek: '',
      filter: 0,
      filterList: [
        {id: -1, nama: 'Nomor Invoice'},
        {id: 0, nama: 'NIP'},
        {id: 1, nama: 'Nama Proyek'},
        {id: 2, nama: 'Pemberi Kerja'},
      ],
      permohonan: [],
      permohonanListView: [],
      permintaanInvoiceWindow: false,
      selectedPermintaanInvoice: {},
      isTerbitChecked: false,
      isTerbayarkanChecked: false,
    }

    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    this.handleChangeSearchPeluang = this.handleChangeSearchPeluang.bind(this)
    this.handleChangeFilter = this.handleChangeFilter.bind(this)
    this.handleTogglePermintaanInvoiceWindow = this.handleTogglePermintaanInvoiceWindow.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }

  async refreshData() {
    const response = await APIBuilder('termin-proyek/penagihan/')
    if (response.code === 200) this.setState({permohonan: response.payload.data, permohonanListView: response.payload.data})
  }

  async componentDidMount() {
    async function validateToken() {
      let isValid = await Authorization.validateToken()
      if (!isValid) return history.push('/logout')
    }
    validateToken()
    this.refreshData()
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

  handleChangeSearchPeluang = (event) => {
    this.setState({
      searchProyek: event.target.value.toLowerCase()
    }, () => {
      this.filterSearch()
    })
  }

  handleChangeFilter = (event) => {
    this.setState({filter: event.target.value}, () => {
      this.filterSearch()
    })
  }

  handleTogglePermintaanInvoiceWindow = async (permintaanInvoice) => {
    const { permintaanInvoiceWindow } = this.state
    this.setState({permintaanInvoiceWindow: !(permintaanInvoiceWindow), selectedPermintaanInvoice: permintaanInvoice})
  }

  filterSearch() {
    const {searchProyek, filter, permohonan} = this.state
    const {
      isTerbitChecked,
      isTerbayarkanChecked
    } = this.state
    let permohonanListView = []
    permohonanListView = permohonan
    if (
      isTerbitChecked ||
      isTerbayarkanChecked 
    ) {
      permohonanListView = permohonanListView.filter(el => (
        ((isTerbitChecked) && (el.penagihan_status === Constants.TERMIN_STATUS_PENAGIHAN_DITERBITKAN)) ||
        ((isTerbayarkanChecked) && (el.penagihan_status === Constants.TERMIN_STATUS_PENAGIHAN_DIBAYARKAN)) 
      ))
    }

    if (filter === -1) permohonanListView = permohonanListView.filter(el => {
      let fullnomor = `${el.nomor_invoice}/PT. LAPI ITB/S/${moment(el.invoice_created_date).format('MM/YY')}`
      return fullnomor.toLowerCase().includes(searchProyek)
    })
    if (filter === 0) permohonanListView = permohonanListView.filter(el => PinTextFormat(el.pin).includes(searchProyek))
    if (filter === 1) permohonanListView = permohonanListView.filter(el => el.nama.toLowerCase().includes(searchProyek))
    if (filter === 2) permohonanListView = permohonanListView.filter(el => el.pemberi_kerja.toLowerCase().includes(searchProyek))
    this.setState({
      permohonanListView
    })
  }

  columnValue = (column, value) => {
    if (column.id === 'pin') {
      return 'P'+PinTextFormat(value)
    } else if (column.id === 'invoice_created_date') {
      return value ? moment(value).format('YYYY-MM-DD') : '-'
    } else if (column.id === 'penagihan_status') {
      switch (value) {
        case Constants.TERMIN_STATUS_PENAGIHAN_DITERBITKAN:
          return 'Terbit'
        case Constants.TERMIN_STATUS_PENAGIHAN_DIBAYARKAN:
          return 'Terbayarkan'
        default:
          return '-'
      }
    } else if (column.id === 'nomor_invoice') {
      return `${value.nomor_invoice}/PT. LAPI ITB/S/${moment(value.invoice_created_date).format('MM/YY')}`
    } else {
      return value
    }
  }

  handleCheck = (value, type) => {
    switch (type) {
      case 'terbit':
        this.setState({
          isTerbitChecked: value,
        }, () => {
          this.filterSearch()
        })
        break;
      case 'terbayarkan':
          this.setState({
            isTerbayarkanChecked: value,
          }, () => {
            this.filterSearch()
          })
          break;
      default:
        return 0
    }
  }

  render() {
    const {page, rowsPerPage, permohonanListView, searchProyek, filter, filterList, permintaanInvoiceWindow, selectedPermintaanInvoice} = this.state
    const {
      isTerbitChecked,
      isTerbayarkanChecked
    } = this.state
    const filterView = filterList.map((item, key) => {
      return (
        <MenuItem value={item.id} key={`peluang-${item.id}-${key}`}>{item.nama}</MenuItem>
      )
    })

    return (
      <Grid item container>
        <PenagihanInvoiceDetailDialog
          open={permintaanInvoiceWindow}
          onClose={(e) => {this.handleTogglePermintaanInvoiceWindow(e)}}
          value={selectedPermintaanInvoice}
          refreshData={() => {this.refreshData()}}
          myroute={this.props.location.pathname}
        />
        <Navbar role={Authorization.getRole()} email={Authorization.getEmail()} title={'Pembayaran Invoice'}/>
        <Grid item container justify="center" alignItems="center" style={{ marginTop: '4em', padding: '0 4em'}}>
          <Grid item container justify="center" md={12} alignItems="center" style={{ padding: '15px'}}>
            <Grid item container justify="flex-start" md={6} alignItems="center" style={{ padding: '15px'}}>
              <Grid item container justify="flex-start" md={3} style={{ padding: '15px'}}>
                <Typography>Cari proyek:</Typography>
              </Grid>
              <Grid item container justify="flex-start" md={6} style={{ padding: '15px'}}>
                <TextField id="search-user" label="Cari Proyek" variant="outlined" type="text" fullWidth value={searchProyek} onChange={this.handleChangeSearchPeluang}/>
              </Grid>
              <Grid item container justify="flex-start" md={3} style={{ padding: '15px'}}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Filter
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={filter}
                    onChange={this.handleChangeFilter}
                    fullWidth
                  >
                    { filterView }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item container justify="flex-end" md={6} style={{ padding: '15px'}}>
              &nbsp;
            </Grid>
          </Grid>
          <Grid item container justify="flex-start" md={12} alignItems="center" style={{ padding: '15px'}}>
            <Grid item container justify="flex-start" alignItems="center" md={2} style={{ padding: '15px'}}>
              <Checkbox
                checked={isTerbitChecked}
                onChange={() => {this.handleCheck(!isTerbitChecked,'terbit')}}
                value="konsultanChecked"
                color="primary"
              />
              <Typography>
                Terbit
              </Typography>
            </Grid>
            <Grid item container justify="flex-start" alignItems="center" md={2} style={{ padding: '15px'}}>
              <Checkbox
                checked={isTerbayarkanChecked}
                onChange={() => {this.handleCheck(!isTerbayarkanChecked,'terbayarkan')}}
                value="konsultanChecked"
                color="primary"
              />
              <Typography>
                Terbayarkan
              </Typography>
            </Grid>
          </Grid>
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
                {permohonanListView.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map(column => {
                        const value = row[column.id]
                        if (column.id === 'menu') {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              <Link to={`/proyek/${row.proyek_id}`}>Detail Proyek</Link>
                              <br />
                              <Link to={this.props.location.pathname} onClick={() => {this.handleTogglePermintaanInvoiceWindow(row)}}>Detail Penagihan</Link>
                            </TableCell>
                          )
                        } else if (column.id === 'nomor') {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              {key+1}
                            </TableCell>
                          )
                        } else if (column.id === 'nomor_invoice') {
                          let temp = {
                            nomor_invoice: row.nomor_invoice,
                            invoice_created_date: row.invoice_created_date,
                          }
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              { this.columnValue(column,temp) }
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
              count={permohonanListView.length}
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

export default DaftarPenagihanInvoice