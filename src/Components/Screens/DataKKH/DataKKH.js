import React from 'react'
import {Link} from 'react-router-dom'

import history from '../../../Shared/History'
import APIBuilder from '../../../Shared/APIBuilder'
import Authorization from '../../../Shared/Authorization'

import Navbar from '../../Navbar/Navbar'
import Button from '../../Button/MainButton'

import {Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@material-ui/core'
import {Add as AddIcon} from '@material-ui/icons'

import {daftarKKHColumn as columns} from '../../../Shared/Columns'

import AddKKHDialog from '../../Dialog/AddKKH'
import EditKKHDialog from '../../Dialog/EditKKH'



class DataKKH extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      rowsPerPage: 5,
      logList: [],
      logListView: [],
      addPeluangWindow: false,
      addKKHWindow: false,
      editKKHWindow: false,
      selectedKKH: 0,
    }

    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    this.handleToggleAddKKHWindow = this.handleToggleAddKKHWindow.bind(this)
    this.handleToggleEditKKHWindow = this.handleToggleEditKKHWindow.bind(this)
  }

  async refreshData() {
    const logResponse = await APIBuilder(`log/list`)
    if (logResponse.code === 200) this.setState({logList: logResponse.payload.data, logListView: logResponse.payload.data})
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

  handleToggleAddKKHWindow = async (event) => {
    const { addKKHWindow } = this.state
    this.refreshData()
    this.setState({addKKHWindow: !(addKKHWindow)})
  }

  handleToggleEditKKHWindow = async (event) => {
    const { editKKHWindow } = this.state
    this.refreshData()
    this.setState({editKKHWindow: !(editKKHWindow)})
  }

  columnValue = (column, value) => {
    return value
  }

  render() {
    const {page, rowsPerPage, logListView, addKKHWindow, editKKHWindow, selectedKKH} = this.state

    return (
      <Grid item container>
        <AddKKHDialog open={addKKHWindow} onClose={this.handleToggleAddKKHWindow}/>
        <EditKKHDialog open={editKKHWindow} onClose={this.handleToggleEditKKHWindow} selectedKKH={selectedKKH}/>
        <Navbar role={Authorization.getRole()} email={Authorization.getEmail()} title={'Data KKH'}/>
        <Grid item container justify="center" alignItems="center" style={{padding: '0 4em'}}>
          <Grid item container justify="center" md={12} alignItems="center" style={{ padding: '15px'}}>
            <Grid item container justify="flex-start" md={12} alignItems="center" style={{ padding: '15px'}}>
              <Button style={{padding: '0em 1em', height: '2em'}} onClick={this.handleToggleAddKKHWindow}><AddIcon></AddIcon> Tambah KKH</Button>
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
                {logListView.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
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
                              <Link to={'#'} onClick={() => {
                                this.setState({selectedKKH: row.id})
                                this.handleToggleEditKKHWindow()
                              }}>Ubah</Link>
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
              count={logListView.length}
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

export default DataKKH