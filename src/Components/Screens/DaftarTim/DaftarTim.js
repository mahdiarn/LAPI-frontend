import React from 'react'
import {Link} from 'react-router-dom'
import * as moment from 'moment'
import 'moment/locale/id'

import history from '../../../Shared/History'
import APIBuilder from '../../../Shared/APIBuilder'
import Constants from '../../../Shared/Constants'
import Authorization from '../../../Shared/Authorization'

import Navbar from '../../Navbar/Navbar'

import { Checkbox, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TextField, TableHead, TableRow, TableCell, TableBody, TablePagination, Typography } from '@material-ui/core'

import {daftarProyekColumns as columns} from '../../../Shared/Columns'

class DaftarTim extends React.Component {

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
        {id: 0, nama: 'Nama Proyek'},
        {id: 1, nama: 'Pemberi Kerja'},
        {id: 2, nama: 'Tim Pelaksana'}
      ],
      isPemantauan: false,
      isPengadaan: false
    }

    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    this.handleChangeSearchProyek = this.handleChangeSearchProyek.bind(this)
    this.handleChangeFilter = this.handleChangeFilter.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }

  async componentDidMount() {
    async function validateToken() {
      let isValid = await Authorization.validateToken()
      if (!isValid) return history.push('/logout')
    }
    validateToken()
    const response = await APIBuilder('tim')
    console.log(response)
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

  handleChangeSearchProyek = (event) => {
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
    } else if (column.id === 'status') {
      switch (value) {
        case Constants.PROYEK_STATUS_PENGADAAN:
          return 'Pengadaan'
        case Constants.PROYEK_STATUS_PEMANTAUAN:
          return 'Pemantauan'
        default:
          return ''
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
    if (percentage > 60) {
      return '#0F0'
    } else if (percentage < 60 && percentage > 30) {
      return '#F80'
    } else {
      return '#F00'
    } 
  }

  filterSearch() {
    const {searchProyek, filter, peluangList} = this.state
    const {
      isPemantauan,
      isPengadaan,
    } = this.state
    let peluangListView = []
    peluangListView = peluangList
    if (
      isPemantauan ||
      isPengadaan 
    ) {
      peluangListView = peluangListView.filter(el => (
        ((isPemantauan) && (el.status === Constants.PROYEK_STATUS_PEMANTAUAN)) ||
        ((isPengadaan) && (el.status === Constants.PROYEK_STATUS_PENGADAAN))
      ))
    }
    if (filter === 0) peluangListView = peluangListView.filter(el => el.nama.toLowerCase().includes(searchProyek))
    if (filter === 1) peluangListView = peluangListView.filter(el => el.pemberi_kerja.toLowerCase().includes(searchProyek))
    if (filter === 2) peluangListView = peluangListView.filter(el => el.nama_ketua.toLowerCase().includes(searchProyek))
    this.setState({
      peluangListView
    })
  }

  handleCheck = (value, type) => {
    switch (type) {
      case 'pengadaan':
        this.setState({
          isPengadaan: value,
        }, () => {
          this.filterSearch()
        })
        break;
      case 'pemantauan':
          this.setState({
            isPemantauan: value,
          }, () => {
            this.filterSearch()
          })
          break;
      default:
        return 0
    }
  }
  
  handleDirectToPengalamanPage = (e) => {
    history.push('/daftar-pengalaman')
  }

  render() {
    const {page, rowsPerPage, peluangListView} = this.state
    const { searchProyek, filter, filterList } = this.state
    const {
      isPengadaan,
      isPemantauan
    } =  this.state
    const filterView = filterList.map((item, key) => {
      return (
        <MenuItem value={item.id} key={`peluang-${item.id}-${key}`}>{item.nama}</MenuItem>
      )
    })
    return (
      <Grid item container>
        <Navbar role={Authorization.getRole()} email={Authorization.getEmail()} title={'Daftar Tim'}/>
        <Grid item container justify="center" alignItems="center" style={{ marginTop: '4em', padding: '0 4em'}}>
          <Grid item container justify="center" md={12} alignItems="center" style={{ padding: '15px'}}>
            <Grid item container justify="flex-start" md={12} alignItems="center" style={{ padding: '15px'}}>
              <Grid item container justify="flex-start" md={3} style={{ padding: '15px'}}>
                <Typography>Cari proyek:</Typography>
              </Grid>
              <Grid item container justify="flex-start" md={3} style={{ padding: '15px'}}>
                <TextField id="search-user" label="Cari Proyek" variant="outlined" type="text" fullWidth value={searchProyek} onChange={this.handleChangeSearchProyek}/>
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
          </Grid>
          <Grid item container justify="flex-start" alignItems="center" style={{ padding: '0 4em'}}>
            <Grid item container justify="flex-start" alignItems="center" md={2} style={{ padding: '15px'}}>
              <Checkbox
                checked={isPengadaan}
                onChange={() => {this.handleCheck(!isPengadaan,'pengadaan')}}
                value="konsultanChecked"
                color="primary"
              />
              <Typography>
                Pengadaan
              </Typography>
            </Grid>
            <Grid item container justify="flex-start" alignItems="center" md={2} style={{ padding: '15px'}}>
              <Checkbox
                checked={isPemantauan}
                onChange={() => {this.handleCheck(!isPemantauan,'pemantauan')}}
                value="konsultanChecked"
                color="primary"
              />
              <Typography>
                Pemantauan
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
                {peluangListView.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map(column => {
                        const value = row[column.id]
                        const status = row['status']
                        if (column.id === 'menu') {
                          if (status === 2) return (
                            <TableCell key={column.id+value} align={column.align}>
                              <Link to={`/peluang/log/${row.id}`}>Detail</Link>
                            </TableCell>
                          )
                          if (status === 4) return (
                            <TableCell key={column.id+value} align={column.align}>
                              <Link to={`/proyek/${row.id}`}>Detail</Link>
                            </TableCell>
                          )
                        } else if (column.id === 'pin') {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              {` P${this.columnValue(column,value) || '-'} `}
                            </TableCell>
                          )
                        } else if (column.id === 'tanggal_selesai_proyek' && status === 4) {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              <div style={{color: this.classifyColor(row['tanggal_mulai_proyek'],row['tanggal_selesai_proyek'])}}>&#9679;</div>
                              <div>({
                                (value && moment(row['tanggal_selesai_proyek']).diff(moment(), 'days') > 0) ? moment(row['tanggal_selesai_proyek']).diff(moment(), 'days') : 0
                              } hari)</div>
                            </TableCell>
                          )
                        } else {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              { this.columnValue(column,value) }
                            </TableCell>
                          )
                        }
                        return 0
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

export default DaftarTim