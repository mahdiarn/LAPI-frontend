import React from 'react'
import {Link} from 'react-router-dom'

import history from '../../../Shared/History'
import APIBuilder from '../../../Shared/APIBuilder'
import Constants from '../../../Shared/Constants'
import Authorization from '../../../Shared/Authorization'

import Navbar from '../../Navbar/Navbar'
import Button from '../../Button/MainButton'

import {Grid, Typography, Checkbox, Paper, TextField, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'
import {Add as AddIcon} from '@material-ui/icons'

import {daftarPeluangColumns as columns} from '../../../Shared/Columns'

import AddPeluangDialog from '../../Dialog/AddPeluangProyek'



class DaftarPeluang extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      rowsPerPage: 5,
      peluangList: [],
      peluangListView: [],
      searchPeluang: '',
      filter: 0,
      filterList: [
        {id: 0, nama: 'Nama Peluang'},
        {id: 1, nama: 'Pemberi Kerja'}
      ],
      addPeluangWindow: false,
      filterCheck: [],
      isKonsultanChecked: false,
      isPelatihanChecked: false,
      isPengembanganTeknologiChecked: false,
      isPengujianChecked: false,
      isPemilihanLangsungChecked: false,
      isPenunjukanLangsungChecked: false,
      isSeleksiTerbatasChecked: false,
      isSeleksiUmumChecked: false,
      isSwakelolaChecked: false,
    }

    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    this.handleChangeSearchPeluang = this.handleChangeSearchPeluang.bind(this)
    this.handleChangeFilter = this.handleChangeFilter.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleToggleAddPeluangWindow = this.handleToggleAddPeluangWindow.bind(this)
  }

  async componentDidMount() {
    async function validateToken() {
      let isValid = await Authorization.validateToken()
      if (!isValid) return history.push('/logout')
    }
    validateToken()
    const response = await APIBuilder('peluang-proyek')
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

  handleChangeSearchPeluang = (event) => {
    this.setState({
      searchPeluang: event.target.value.toLowerCase()
    }, () => {
      this.filterSearch()
    })
  }

  handleChangeFilter = (event) => {
    this.setState({filter: event.target.value}, () => {
      this.filterSearch()
    })
  }

  handleCheck = (value, type) => {
    switch (type) {
      case 'konsultan':
        this.setState({
          isKonsultanChecked: value,
        }, () => {
          this.filterSearch()
        })
        break;
      case 'pelatihan':
        this.setState({
          isPelatihanChecked: value,
        }, () => {
          this.filterSearch()
        })
        break;
      case 'pengembangan-teknologi':
        this.setState({
          isPengembanganTeknologiChecked: value,
        }, () => {
          this.filterSearch()
        })
        break;
      case 'pengujian':
        this.setState({
          isPengujianChecked: value,
        }, () => {
          this.filterSearch()
        })
        break;
      case 'pemilihan-langsung':
        this.setState({
          isPemilihanLangsungChecked: value,
        }, () => {
          this.filterSearch()
        })
        break;
      case 'penunjukan-langsung':
        this.setState({
          isPenunjukanLangsungChecked: value,
        }, () => {
          this.filterSearch()
        })
        break;
      case 'seleksi-terbatas':
        this.setState({
          isSeleksiTerbatasChecked: value,
        }, () => {
          this.filterSearch()
        })
        break;
      case 'seleksi-umum':
        this.setState({
          isSeleksiUmumChecked: value,
        }, () => {
          this.filterSearch()
        })
        break;
      case 'swakelola':
        this.setState({
          isSwakelolaChecked: value,
        }, () => {
          this.filterSearch()
        })
        break;
      default:
        return 0
    }
  }

  handleToggleAddPeluangWindow = async (event) => {
    const { addPeluangWindow } = this.state
    const response = await APIBuilder('peluang-proyek')
    if (response.code === 200) this.setState({peluangList: response.payload.data, peluangListView: response.payload.data})
    this.setState({addPeluangWindow: !(addPeluangWindow)})
  }

  filterSearch() {
    const {searchPeluang, filter, peluangList} = this.state
    const {isKonsultanChecked, isPelatihanChecked, isPengembanganTeknologiChecked, isPengujianChecked} = this.state
    const {
      isPemilihanLangsungChecked,
      isPenunjukanLangsungChecked,
      isSeleksiTerbatasChecked,
      isSeleksiUmumChecked,
      isSwakelolaChecked,
    } = this.state
    let peluangListView = []
    peluangListView = peluangList
    if (
      isKonsultanChecked ||
      isPelatihanChecked ||
      isPengembanganTeknologiChecked ||
      isPengujianChecked
    ) {
      peluangListView = peluangListView.filter(el => (
        ((isKonsultanChecked) && (el.klasifikasi === Constants.PROYEK_KLASIFIKASI_KONSULTAN)) ||
        ((isPengembanganTeknologiChecked) && (el.klasifikasi === Constants.PROYEK_KLASIFIKASI_PENGEMBANGAN_TEKNOLOGI)) ||
        ((isPelatihanChecked) && (el.klasifikasi === Constants.PROYEK_KLASIFIKASI_PELATIHAN)) ||
        ((isPengujianChecked) && (el.klasifikasi === Constants.PROYEK_KLASIFIKASI_PENGUJIAN))
      ))
    }

    if (
      isPemilihanLangsungChecked ||
      isPenunjukanLangsungChecked ||
      isSeleksiTerbatasChecked ||
      isSeleksiUmumChecked ||
      isSwakelolaChecked
    ) {
      peluangListView = peluangListView.filter(el => (
        ((isPemilihanLangsungChecked) && (el.pengadaan === Constants.PROYEK_JENIS_PENGADAAN_PEMILIHAN_LANGSUNG)) ||
        ((isPenunjukanLangsungChecked) && (el.pengadaan === Constants.PROYEK_JENIS_PENGADAAN_PENUNJUKAN_LANGSUNG)) ||
        ((isSeleksiTerbatasChecked) && (el.pengadaan === Constants.PROYEK_JENIS_PENGADAAN_SELEKSI_TERBATAS)) ||
        ((isSeleksiUmumChecked) && (el.pengadaan === Constants.PROYEK_JENIS_PENGADAAN_SELEKSI_UMUM)) ||
        ((isSwakelolaChecked) && (el.pengadaan === Constants.PROYEK_JENIS_PENGADAAN_SWAKELOLA))
      ))
    }
    if (filter === 0) peluangListView = peluangListView.filter(el => el.nama.toLowerCase().includes(searchPeluang))
    if (filter === 1) peluangListView = peluangListView.filter(el => el.pemberi_kerja.toLowerCase().includes(searchPeluang))
    this.setState({
      peluangListView
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
          return 'Pengujian'
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
        case Constants.PELUANG_STATUS_ACCEPT:
          return 'Accept'
        case Constants.PELUANG_STATUS_HOLD:
          return 'Hold'
        case Constants.PELUANG_STATUS_REJECT:
          return 'Reject'  
        default:
          return ''
      }
    } else {
      return value
    }
  }

  render() {
    const {page, rowsPerPage, peluangListView, searchPeluang, filter, filterList, addPeluangWindow} = this.state
    const filterView = filterList.map((item, key) => {
      return (
        <MenuItem value={item.id} key={`peluang-${item.id}-${key}`}>{item.nama}</MenuItem>
      )
    })
    const {
      isKonsultanChecked,
      isPelatihanChecked,
      isPengembanganTeknologiChecked,
      isPengujianChecked
    } = this.state

    const {
      isPemilihanLangsungChecked,
      isPenunjukanLangsungChecked,
      isSeleksiTerbatasChecked,
      isSeleksiUmumChecked,
      isSwakelolaChecked,
    } = this.state

    return (
      <Grid item container>
        <AddPeluangDialog open={addPeluangWindow} onClose={this.handleToggleAddPeluangWindow}/>
        <Navbar role={Authorization.getRole()} email={Authorization.getEmail()} title={'Daftar Peluang'}/>
        <Grid item container justify="center" alignItems="center" style={{ marginTop: '4em', padding: '0 4em'}}>
          <Grid item container justify="center" md={12} alignItems="center" style={{ padding: '15px'}}>
            <Grid item container justify="flex-start" md={12} alignItems="center" style={{ padding: '15px'}}>
              <Grid item container justify="flex-start" md={3} style={{ padding: '15px'}}>
                <Typography>Cari peluang:</Typography>
              </Grid>
              <Grid item container justify="flex-start" md={3} style={{ padding: '15px'}}>
                <TextField id="search-user" label="Cari Peluang" variant="outlined" type="text" fullWidth value={searchPeluang} onChange={this.handleChangeSearchPeluang}/>
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
              <Grid item container justify="flex-end" md={3} style={{ padding: '15px'}}>
                {(Authorization.getRole() === 7) ? (
                  <Button style={{padding: '0em 1em', height: '2em'}} onClick={this.handleToggleAddPeluangWindow}><AddIcon></AddIcon> Tambah Peluang</Button>
                ) : (
                  <div />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item container justify="flex-start" alignItems="center" style={{ padding: '0 4em'}}>
            <Grid item container justify="flex-start" alignItems="center" md={2} style={{ padding: '15px'}}>
              <Checkbox
                checked={isKonsultanChecked}
                onChange={() => {this.handleCheck(!isKonsultanChecked,'konsultan')}}
                value="konsultanChecked"
                color="primary"
              />
              <Typography>
                Konsultan
              </Typography>
            </Grid>
            <Grid item container justify="flex-start" alignItems="center" md={2} style={{ padding: '15px'}}>
              <Checkbox
                checked={isPelatihanChecked}
                onChange={() => {this.handleCheck(!isPelatihanChecked,'pelatihan')}}
                value="statusChecked"
                color="primary"
              />
              <Typography>
                Pelatihan
              </Typography>
            </Grid>
            <Grid item container justify="flex-start" alignItems="center" md={4} style={{ padding: '15px'}}>
              <Checkbox
                checked={isPengembanganTeknologiChecked}
                onChange={() => {this.handleCheck(!isPengembanganTeknologiChecked,'pengembangan-teknologi')}}
                value="statusChecked"
                color="primary"
              />
              <Typography>
                Pengembangan Teknologi
              </Typography>
            </Grid>
            <Grid item container justify="flex-start" alignItems="center" md={2} style={{ padding: '15px'}}>
              <Checkbox
                checked={isPengujianChecked}
                onChange={() => {this.handleCheck(!isPengujianChecked,'pengujian')}}
                value="statusChecked"
                color="primary"
              />
              <Typography>
                Pengujian
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justify="flex-start" alignItems="center" style={{ padding: '0 4em'}}>
            <Grid item container justify="flex-start" alignItems="center" md={3} style={{ padding: '15px'}}>
              <Checkbox
                checked={isPemilihanLangsungChecked}
                onChange={() => {this.handleCheck(!isPemilihanLangsungChecked,'pemilihan-langsung')}}
                value="statusChecked"
                color="primary"
              />
              <Typography>
                Pemilihan Langsung
              </Typography>
            </Grid>
            <Grid item container justify="flex-start" alignItems="center" md={3} style={{ padding: '15px'}}>
              <Checkbox
                checked={isPenunjukanLangsungChecked}
                onChange={() => {this.handleCheck(!isPenunjukanLangsungChecked,'penunjukan-langsung')}}
                value="statusChecked"
                color="primary"
              />
              <Typography>
                Penunjukan Langsung
              </Typography>
            </Grid>
            <Grid item container justify="flex-start" alignItems="center" md={2} style={{ padding: '15px'}}>
              <Checkbox
                checked={isSeleksiTerbatasChecked}
                onChange={() => {this.handleCheck(!isSeleksiTerbatasChecked,'seleksi-terbatas')}}
                value="statusChecked"
                color="primary"
              />
              <Typography>
                Seleksi Terbatas
              </Typography>
            </Grid>
            <Grid item container justify="flex-start" alignItems="center" md={2} style={{ padding: '15px'}}>
              <Checkbox
                checked={isSeleksiUmumChecked}
                onChange={() => {this.handleCheck(!isSeleksiUmumChecked,'seleksi-umum')}}
                value="statusChecked"
                color="primary"
              />
              <Typography>
                Seleksi Umum
              </Typography>
            </Grid>
            <Grid item container justify="flex-start" alignItems="center" md={2} style={{ padding: '15px'}}>
              <Checkbox
                checked={isSwakelolaChecked}
                onChange={() => {this.handleCheck(!isSwakelolaChecked,'swakelola')}}
                value="statusChecked"
                color="primary"
              />
              <Typography>
                Swakelola
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
                        if (column.id !== 'menu') {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              { this.columnValue(column,value) }
                            </TableCell>
                          )
                        } else {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              <Link to={`/peluang/${row.id}`}>Detail</Link>
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

export default DaftarPeluang