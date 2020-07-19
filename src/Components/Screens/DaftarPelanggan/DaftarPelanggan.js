import React from 'react'
import {Link} from 'react-router-dom'
import * as moment from 'moment'
import 'moment/locale/id'

import history from '../../../Shared/History'
import APIBuilder from '../../../Shared/APIBuilder'
import Constants from '../../../Shared/Constants'
import Authorization from '../../../Shared/Authorization'
import PelangganDetailDialog from '../../Dialog/PemberiKerjaSelfDetail'

import Navbar from '../../Navbar/Navbar'

import { Checkbox, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TextField, TableHead, TableRow, TableCell, TableBody, TablePagination, Typography } from '@material-ui/core'

import {daftarPelangganColumns as columns} from '../../../Shared/Columns'

class DaftarPelanggan extends React.Component {

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
      isPemerintahPusat: false,
      isPemerintahDaerah: false,
      isBUMN: false,
      isSwasta: false,
      isLainLain: false,
      selectedPelangganId: 0,
      pelangganDetailWindow: false,
    }

    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    this.handleChangeSearchProyek = this.handleChangeSearchProyek.bind(this)
    this.handleChangeFilter = this.handleChangeFilter.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleTogglePelangganDetailWindow = this.handleTogglePelangganDetailWindow.bind(this)
  }

  async componentDidMount() {
    async function validateToken() {
      let isValid = await Authorization.validateToken()
      if (!isValid) return history.push('/logout')
    }
    validateToken()
    const response = await APIBuilder('pemberi-kerja')
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
    if (column.id === 'jenis') {
      switch (value) {
        case (Constants.JENIS_PEMBERI_KERJA_BUMN_BUMD_BHMN):
          return 'BUMN / BUMD / BHMN'
        case (Constants.JENIS_PEMBERI_KERJA_LAIN_LAIN):
          return 'Lain - Lain'
        case (Constants.JENIS_PEMBERI_KERJA_PEMERINTAH_DAERAH):
          return 'Pemerintah Daerah'
        case (Constants.JENIS_PEMBERI_KERJA_SWASTA):
          return 'Swasta'
        case (Constants.JENIS_PEMBERI_KERJA_PEMERINTAH_PUSAT):
          return 'Pemerintah Pusat'
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
      isPemerintahPusat,
      isPemerintahDaerah,
      isBUMN,
      isSwasta,
      isLainLain
    } = this.state
    let peluangListView = []
    peluangListView = peluangList
    if (
      isPemerintahPusat ||
      isPemerintahDaerah ||
      isBUMN ||
      isSwasta ||
      isLainLain
    ) {
      peluangListView = peluangListView.filter(el => (
        ((isPemerintahPusat) && (el.jenis === Constants.JENIS_PEMBERI_KERJA_PEMERINTAH_PUSAT)) ||
        ((isPemerintahDaerah) && (el.jenis === Constants.JENIS_PEMBERI_KERJA_PEMERINTAH_DAERAH)) ||
        ((isBUMN) && (el.jenis === Constants.JENIS_PEMBERI_KERJA_BUMN_BUMD_BHMN)) ||
        ((isSwasta) && (el.jenis === Constants.JENIS_PEMBERI_KERJA_SWASTA)) ||
        ((isLainLain) && (el.jenis === Constants.JENIS_PEMBERI_KERJA_LAIN_LAIN))
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
      case 'pemerintah-pusat':
        this.setState({
          isPemerintahPusat: value,
        }, () => {
          this.filterSearch()
        })
        break;
      case 'pemerintah-daerah':
        this.setState({
          isPemerintahDaerah: value,
        }, () => {
          this.filterSearch()
        })
        break;
      case 'bumn':
        this.setState({
          isBUMN: value,
        }, () => {
          this.filterSearch()
        })
        break;
      case 'swasta':
        this.setState({
          isSwasta: value,
        }, () => {
          this.filterSearch()
        })
        break;
      case 'lain-lain':
        this.setState({
          isLainLain: value,
        }, () => {
          this.filterSearch()
        })
        break;      
      default:
        return 0
    }
  }
  
  handleDirectToDaftarProyekPage = (e) => {
    history.push('/daftar-proyek')
  }

  handleTogglePelangganDetailWindow = () => {
    const { pelangganDetailWindow } = this.state
    this.setState({ pelangganDetailWindow: !pelangganDetailWindow })
  }

  setPelangganId = (id) => {
    this.setState({ selectedPelangganId: id })
  }

  render() {
    const {page, rowsPerPage, peluangListView} = this.state
    const { searchProyek, filter, filterList, pelangganDetailWindow, selectedPelangganId } = this.state
    const {
      isPemerintahPusat,
      isPemerintahDaerah,
      isBUMN,
      isSwasta,
      isLainLain
    } =  this.state
    const filterView = filterList.map((item, key) => {
      return (
        <MenuItem value={item.id} key={`peluang-${item.id}-${key}`}>{item.nama}</MenuItem>
      )
    })
    return (
      <Grid item container>
        <PelangganDetailDialog
          open={pelangganDetailWindow}
          onClose={() => {this.handleTogglePelangganDetailWindow()}}
          myroute={this.props.location.pathname}
          pemberiKerjaId={selectedPelangganId}
        />
        <Navbar role={Authorization.getRole()} email={Authorization.getEmail()} title={'Daftar Pelanggan'}/>
        <Grid item container justify="center" alignItems="center" style={{padding: '0 4em'}}>
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
          <Grid item container justify="flex-start" alignItems="center" style={{ padding: '0 0em'}}>
            <Grid item container justify="flex-start" alignItems="center" md={2} style={{ padding: '0px'}}>
              <Checkbox
                checked={isPemerintahPusat}
                onChange={() => {this.handleCheck(!isPemerintahPusat,'pemerintah-pusat')}}
                value="konsultanChecked"
                color="primary"
              />
              <Typography>
                Pemerintah Pusat
              </Typography>
            </Grid>
            <Grid item container justify="flex-start" alignItems="center" md={2} style={{ padding: '0px'}}>
              <Checkbox
                checked={isPemerintahDaerah}
                onChange={() => {this.handleCheck(!isPemerintahDaerah,'pemerintah-daerah')}}
                value="konsultanChecked"
                color="primary"
              />
              <Typography>
                Pemerintah Daerah
              </Typography>
            </Grid>
            <Grid item container justify="flex-start" alignItems="center" md={3} style={{ padding: '0px'}}>
              <Checkbox
                checked={isBUMN}
                onChange={() => {this.handleCheck(!isBUMN,'bumn')}}
                value="konsultanChecked"
                color="primary"
              />
              <Typography>
                BUMN / BUMD / BHMN
              </Typography>
            </Grid>
            <Grid item container justify="flex-start" alignItems="center" md={2} style={{ padding: '0px'}}>
              <Checkbox
                checked={isSwasta}
                onChange={() => {this.handleCheck(!isSwasta,'swasta')}}
                value="konsultanChecked"
                color="primary"
              />
              <Typography>
                Swasta
              </Typography>
            </Grid>
            <Grid item container justify="flex-start" alignItems="center" md={2} style={{ padding: '0px'}}>
              <Checkbox
                checked={isLainLain}
                onChange={() => {this.handleCheck(!isLainLain,'lain-lain')}}
                value="konsultanChecked"
                color="primary"
              />
              <Typography>
                Lain - Lain
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
                {peluangListView.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map(column => {
                        const value = row[column.id]
                        if (column.id === 'no') {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              {key+1}
                            </TableCell>
                          )
                        } else if (column.id === 'menu') {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              <Link to={this.props.location.pathname} onClick={() => {
                                this.setPelangganId(row.id)
                                this.handleTogglePelangganDetailWindow()
                              }}>Detail</Link>
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

export default DaftarPelanggan