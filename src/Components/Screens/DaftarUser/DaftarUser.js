import React from 'react'

import history from '../../../Shared/History'
import APIBuilder from '../../../Shared/APIBuilder'
import Authorization from '../../../Shared/Authorization'

import Navbar from '../../Navbar/Navbar'
import Button from '../../Button/MainButton'

import {Grid, Typography, Paper, TextField, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'
import {Add as AddIcon} from '@material-ui/icons'

import {daftarUserColumns as columns} from '../../../Shared/Columns'

class DaftarUser extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      role: '',
      page: 0,
      rowsPerPage: 5,
      userList: [],
      userListView: [],
      searchUser: '',
      filter: 0,
      filterList: [
        {id: 0, nama: 'Email'},
        {id: 1, nama: 'Password'},
        {id: 2, nama: 'Nama Lengkap'},
      ]
    }

    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    this.handleChangeSearchUser = this.handleChangeSearchUser.bind(this)
    this.handleChangeFilter = this.handleChangeFilter.bind(this)
  }

  async componentDidMount() {
    async function validateToken() {
      let isValid = await Authorization.validateToken()
      if (!isValid) return history.push('/logout')
    }
    validateToken()
    const response = await APIBuilder('passwords')
    this.setState({userList: response.payload.data, userListView: response.payload.data})
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

  handleChangeSearchUser = (event) => {
    this.setState({
      searchUser: event.target.value.toLowerCase()
    }, () => {
      this.filterSearch()
    })
  }

  handleChangeFilter = (event) => {
    this.setState({filter: event.target.value}, () => {
      this.filterSearch()
    })
  }

  filterSearch() {
    const {searchUser, filter, userList} = this.state;
    let userListView = []
    if (filter === 0) userListView = userList.filter(el => el.email.toLowerCase().includes(searchUser))
    if (filter === 1) userListView = userList.filter(el => el.password.toLowerCase().includes(searchUser))
    if (filter === 2) userListView = userList.filter(el => el.nama_lengkap && el.nama_lengkap.toLowerCase().includes(searchUser))
    this.setState({
      userListView
    })
  }

  render() {
    const {page, rowsPerPage, userListView, searchUser, filter, filterList} = this.state
    const filterView = filterList.map((item) => {
      return (
        <MenuItem value={item.id} key={`role-${item.id}`}>{item.nama}</MenuItem>
      )
    })

    return (
      <Grid item container>
        <Navbar role={Authorization.getRole()} email={Authorization.getEmail()} title={'Daftar User'}/>
        <Grid item container justify="center" alignItems="center" style={{padding: (window.innerWidth <= 600) ? '0' : '0 4em'}}>
          <Grid item container justify="center" md={12} alignItems="center" style={{ padding: '15px'}}>
            <Grid item container justify="flex-start" md={6} alignItems="center" style={{ padding: '15px'}}>
              <Grid item container justify="flex-start" md={3} style={{ padding: '15px'}}>
                <Typography>Cari user:</Typography>
              </Grid>
              <Grid item container justify="flex-start" md={6} style={{ padding: '15px'}}>
                <TextField id="search-user" label="Cari User" variant="outlined" type="text" fullWidth value={searchUser} onChange={this.handleChangeSearchUser}/>
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
              <Button style={{padding: '0em 1em', height: '2em'}} onClick = {() => {history.push('/tambah-user')}}><AddIcon></AddIcon> Tambah User</Button>
            </Grid>
            
          </Grid>
          <Grid item container justify="center" md={12} style={{ padding: '15px'}}>
            <Typography>Daftar User</Typography>
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
                {userListView.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                      {columns.map(column => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={userListView.length}
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

export default DaftarUser