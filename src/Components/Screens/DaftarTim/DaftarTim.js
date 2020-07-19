import React from 'react'
import {Link} from 'react-router-dom'
import 'moment/locale/id'

import history from '../../../Shared/History'
import APIBuilder from '../../../Shared/APIBuilder'
import Authorization from '../../../Shared/Authorization'
import { baseUrl } from '../../../Shared/Config'

import Navbar from '../../Navbar/Navbar'

import { Checkbox, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TextField, TableHead, TableRow, TableCell, TableBody, TablePagination, Typography } from '@material-ui/core'

import {daftarTimColumns as columns} from '../../../Shared/Columns'

import UploadDialog from '../../Dialog/Upload'
import TimDetailDialog from '../../Dialog/TimDetail'

class DaftarTim extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      rowsPerPage: 5,
      peluangList: [],
      peluangListView: [],
      searchTim: '',
      uploadCvTimId: 0,
      filter: 0,
      filterList: [
        {id: 0, nama: 'Nama Ketua Tim'},
        {id: 1, nama: 'Nama PM'},
        {id: 2, nama: 'Nomor Kelompok Keahlian'},
        {id: 3, nama: 'Nama Kelompok Keahlian'},
        {id: 4, nama: 'Jumlah Proyek (=)'},
        {id: 5, nama: 'Jumlah Proyek (>=)'},
        {id: 6, nama: 'Jumlah Proyek (<=)'},
        {id: 7, nama: 'Jumlah Proyek Aktif (=)'},
        {id: 8, nama: 'Jumlah Proyek Aktif (>=)'},
        {id: 9, nama: 'Jumlah Proyek Aktif (<=)'},
      ],
      uploadWindow: false,
      isWithCV: false,
      isWithoutCV: false,
      timDetailWindow: false,
      timSelected: {},
    }

    this.handleToggleUploadWindow = this.handleToggleUploadWindow.bind(this)
    this.handleToggleTimDetailWindow = this.handleToggleTimDetailWindow.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    this.handleChangeSearchTim = this.handleChangeSearchTim.bind(this)
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

  handleChangeSearchTim = (event) => {
    this.setState({
      searchTim: event.target.value.toLowerCase()
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
    return value
  }

  filterSearch() {
    const {searchTim, filter, peluangList} = this.state
    const {
      isWithCV,
      isWithoutCV,
    } = this.state
    let peluangListView = []
    peluangListView = peluangList
    if (
      isWithCV ||
      isWithoutCV 
    ) {
      peluangListView = peluangListView.filter(el => (
        ((isWithCV) && (el.cv)) ||
        ((isWithoutCV) && (!el.cv))
      ))
    }
    if (filter === 0) peluangListView = peluangListView.filter(el => el.nama_ketua.toLowerCase().includes(searchTim))
    if (filter === 1) peluangListView = peluangListView.filter(el => el.nama_pm.toLowerCase().includes(searchTim))
    if (filter === 2) peluangListView = peluangListView.filter(el => el.kelompok_keahlian === parseInt(searchTim))
    if (filter === 3) peluangListView = peluangListView.filter(el => el.nama.toLowerCase().includes(searchTim))
    if (filter === 4) peluangListView = peluangListView.filter(el => el.total_project === parseInt(searchTim))
    if (filter === 5) peluangListView = peluangListView.filter(el => el.total_project >= parseInt(searchTim))
    if (filter === 6) peluangListView = peluangListView.filter(el => el.total_project <= parseInt(searchTim))
    if (filter === 7) peluangListView = peluangListView.filter(el => el.total_active_project === parseInt(searchTim))
    if (filter === 8) peluangListView = peluangListView.filter(el => el.total_active_project >= parseInt(searchTim))
    if (filter === 9) peluangListView = peluangListView.filter(el => el.total_active_project <= parseInt(searchTim))
    this.setState({
      peluangListView
    })
  }

  handleCheck = (value, type) => {
    switch (type) {
      case 'cv-tidak-ada':
        this.setState({
          isWithoutCV: value,
        }, () => {
          this.filterSearch()
        })
        break;
      case 'cv-ada':
          this.setState({
            isWithCV: value,
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

  handleToggleUploadWindow = (value) => {
    this.setState({uploadWindow: value})
  }

  handleToggleTimDetailWindow = () => {
    const { timDetailWindow } = this.state
    this.setState({timDetailWindow: !timDetailWindow})
  }

  selectTim = (row) =>{
    let timTemp = {
      id: row.id,
      nama_ketua: row.nama_ketua,
      nama_pm: row.nama_pm,
      kelompok_keahlian: row.kelompok_keahlian,
      nama_kelompok_keahlian: row.nama,
      total_active_project: row.total_active_project,
      total_project: row.total_project,
      email_tim: row.email_tim,
      kontak_tim: row.kontak_tim,
      alamat_tim: row.alamat_tim,
      filename: row.filename,
      extension: row.extension
    }

    this.setState({ timSelected: timTemp })
  }

  render() {
    const {page, rowsPerPage, peluangListView} = this.state
    const { searchTim, filter, filterList, uploadWindow, uploadCvTimId } = this.state
    const { timDetailWindow, timSelected } = this.state
    const {
      isWithoutCV,
      isWithCV
    } =  this.state
    const filterView = filterList.map((item, key) => {
      return (
        <MenuItem value={item.id} key={`peluang-${item.id}-${key}`}>{item.nama}</MenuItem>
      )
    })
    return (
      <Grid item container>
        <UploadDialog open={uploadWindow} onClose={() => {this.handleToggleUploadWindow(!uploadWindow)}} uploadCvTimId={uploadCvTimId} proyekId={-1}/>
        <TimDetailDialog
          open={timDetailWindow}
          onClose={() => {this.handleToggleTimDetailWindow()}}
          refreshData={() => {this.refreshData()}}
          tim={timSelected}
          myroute={this.props.location.pathname}
        />
        <Navbar role={Authorization.getRole()} email={Authorization.getEmail()} title={'Daftar Tim'}/>
        <Grid item container justify="center" alignItems="center" style={{padding: '0 4em'}}>
          <Grid item container justify="center" md={12} alignItems="center" style={{ padding: '15px'}}>
            <Grid item container justify="flex-start" md={12} alignItems="center" style={{ padding: '15px'}}>
              <Grid item container justify="flex-start" md={3} style={{ padding: '15px'}}>
                <Typography>Cari proyek:</Typography>
              </Grid>
              <Grid item container justify="flex-start" md={3} style={{ padding: '15px'}}>
                <TextField id="search-user" label="Cari Proyek" variant="outlined" type="text" fullWidth value={searchTim} onChange={this.handleChangeSearchTim}/>
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
                checked={isWithCV}
                onChange={() => {this.handleCheck(!isWithCV,'cv-ada')}}
                value="konsultanChecked"
                color="primary"
              />
              <Typography>
                CV Ada
              </Typography>
            </Grid>
            <Grid item container justify="flex-start" alignItems="center" md={2} style={{ padding: '15px'}}>
              <Checkbox
                checked={isWithoutCV}
                onChange={() => {this.handleCheck(!isWithoutCV,'cv-tidak-ada')}}
                value="konsultanChecked"
                color="primary"
              />
              <Typography>
                CV Tidak Ada
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
                                this.selectTim(row)
                                this.handleToggleTimDetailWindow()
                              }}>Detail</Link>
                            </TableCell>
                          )
                        } else if (column.id === 'nama_ketua_pm') {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              {`${row.nama_ketua} - ${row.nama_pm}`}
                            </TableCell>
                          )
                        } else if (column.id === 'kelompok_keahlian_nama') {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              {`${row.kelompok_keahlian}: ${row.nama}`}
                            </TableCell>
                          )
                        } else if (column.id === 'cv') {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              {(row.filename) ? (<a href={`${baseUrl}/uploads/${row.filename}.${row.extension}`} rel="next noopener noreferrer" target="_blank">Lihat</a>) : (<div/>)}
                              <br />
                              <Link to={'#'} onClick={() => {
                                this.setState({uploadCvTimId: row.id, uploadWindow: !uploadWindow})
                              }}>Ubah/Tambah</Link>
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

export default DaftarTim