import React from 'react'

import history from '../../../Shared/History'
import APIBuilder from '../../../Shared/APIBuilder'
import Constants from '../../../Shared/Constants'
import Authorization from '../../../Shared/Authorization'

import Navbar from '../../Navbar/Navbar'
import Button from '../../Button/MainButton'

import {Grid, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Button as MUIButton} from '@material-ui/core'

import {informasiProyekFileColumns as fileColumns, informasiProyekColumns} from '../../../Shared/Columns'

import AddLogDialog from '../../Dialog/AddLog'
import UploadDialog from '../../Dialog/Upload'
import EndProyekDialog from '../../Dialog/EndProyek'

import {baseUrl} from '../../../Shared/Config'

class InformasiProyek extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      logPage: 0,
      rowsPerLogPage: 5,
      rowsPerFilePage: 5,
      filePage: 0,
      peluangList: [],
      logListView: [],
      logs: [],
      fileListView: [],
      files: [],
      addLogWindow: false,
      fileWindow: false,
      proyekName: '',
      pin: 0,
      status: 0,
      endProyekWindow: false,
      pemberiKerjaName: ''
    }

    this.handleChangeLogPage = this.handleChangeLogPage.bind(this)
    this.handleChangeRowsPerLogPage = this.handleChangeRowsPerLogPage.bind(this)
    this.handleChangeFilePage = this.handleChangeFilePage.bind(this)
    this.handleChangeRowsPerFilePage = this.handleChangeRowsPerFilePage.bind(this)
    this.handleToggleAddLogWindow = this.handleToggleAddLogWindow.bind(this)
    this.handleToggleFileWindow = this.handleToggleFileWindow.bind(this)
    this.handleToggleEndProyekWindow = this.handleToggleEndProyekWindow.bind(this)
  }

  async refreshData() {
    const {id} = this.props.match.params
    const peluangResponse = await APIBuilder(`peluang-proyek/${id}`)
    if (peluangResponse){
      if(peluangResponse.code === 200) {
        this.setState({
          proyekName: peluangResponse.payload.data.nama,
          pin: peluangResponse.payload.data.pin,
          status: peluangResponse.payload.data.status,
          pemberiKerjaName: peluangResponse.payload.data.nama_pemberi_kerja
        })
      }
    }

    const logResponse = await APIBuilder(`log/list/${id}`)
    if (logResponse.code === 200) this.setState({logList: logResponse.payload.data, logListView: logResponse.payload.data})

    const fileResponse = await APIBuilder(`file/list/${id}`)
    if (fileResponse.code === 200) {
      let data = fileResponse.payload.data
      data.forEach((el) => {
        el.url = `${baseUrl}/uploads/${el.filename}.${el.extension}`
      })

      this.setState({files: data, fileListView: data})
    }
  }

  async componentDidMount() {
    async function validateToken() {
      let isValid = await Authorization.validateToken()
      if (!isValid) return history.push('/logout')
    }
    validateToken()
    this.refreshData()
  }

  handleChangeLogPage = (event, newLogPage) => {
    this.setState({
      logPage: newLogPage
    })
  }

  handleChangeRowsPerLogPage = (event) => {
    this.setState({
      logPage: 0,
      rowsPerLogPage: +event.target.value
    })
  }

  handleChangeFilePage = (event, newFilePage) => {
    this.setState({
      filePage: newFilePage
    })
  }

  handleChangeRowsPerFilePage = (event) => {
    this.setState({
      filePage: 0,
      rowsPerFilePage: +event.target.value
    })
  }

  handleToggleAddLogWindow = async (event) => {
    const { addLogWindow } = this.state
    this.refreshData()
    this.setState({addLogWindow: !(addLogWindow)})
  }

  advanceToPemantauan = async (event) => {
    const {id} = this.props.match.params
    const peluangResponse = await APIBuilder(`proyek/${id}/pantau`)
    if (peluangResponse) {
      if (peluangResponse.code === 200) alert('Berhasil lanjut ke pemantauan!')
      if (peluangResponse.code !== 200) alert('Gagal lanjut ke pemantauan!')
      this.refreshData()
    }
  }

  handleToggleFileWindow = async (event) => {
    const { fileWindow } = this.state
    this.refreshData()
    this.setState({fileWindow: !(fileWindow)})
  }

  handleToggleEndProyekWindow = async (event) => {
    const { endProyekWindow } = this.state
    this.refreshData()
    this.setState({endProyekWindow: !(endProyekWindow)})
  }

  columnValue = (column, value) => {
    if (column.id === 'status') {
      switch (value) {
        case Constants.LOG_STATUS_MESSAGE:
          return '-'
        case Constants.LOG_STATUS_PENDAFTARAN:
          return 'Pendaftaran'
        case Constants.LOG_STATUS_PRAKUALIFIKASI:
          return 'Prakualifikasi'
        case Constants.LOG_STATUS_PROPOSAL:
          return 'Proposal'
        case Constants.LOG_STATUS_KLARIFIKASI_DAN_NEGOSIASI:
          return 'Klarifikasi & Negosiasi'    
        default:
          return ''
      }
    } else {
      return value
    }
  }

  authorizedToAdvanceOrEndProject(role) {
    switch (role) {
      case Constants.ROLE_MK3L:
      case Constants.ROLE_PU:
        return true;
      default:
        return false
    }
  }

  render() {
    const {logPage, rowsPerLogPage, logListView, addLogWindow, fileWindow, endProyekWindow} = this.state
    const {filePage, rowsPerFilePage, fileListView} = this.state
    const {proyekName, pin, status, pemberiKerjaName} = this.state
    const {id} = this.props.match.params
    let pins = (pin) ? (pin === null) ? 'xxxx' : pin : 'xxxx'
    return (
      <Grid item container>
        <AddLogDialog open={addLogWindow} onClose={this.handleToggleAddLogWindow} proyekId={id}/>
        <UploadDialog open={fileWindow} onClose={this.handleToggleFileWindow} proyekId={id}/>
        <EndProyekDialog
          open={endProyekWindow}
          onClose={this.handleToggleEndProyekWindow}
          proyekId={id}
          proyekName={proyekName}
          pemberiKerjaName={pemberiKerjaName}
          status={status}
        />
        <Navbar role={Authorization.getRole()} email={Authorization.getEmail()} title={'Informasi Proyek'}/>
        <Grid item container justify="center" alignItems="center" style={{ marginTop: '4em', padding: '0 1em'}} spacing={2}>
          <Typography variant="h4" style={{color: (status === Constants.PROYEK_STATUS_END) ? '#AB0000' : '#117C9B'}}>{`P${pins} - ${proyekName} ${(status === Constants.PROYEK_STATUS_END) ? '(Berakhir)' : ''}`}</Typography>
        </Grid>
        {(this.authorizedToAdvanceOrEndProject(Authorization.getRole()) && (status !== Constants.PROYEK_STATUS_END)) ? (
          <Grid item container justify="flex-end" alignItems="center" style={{ marginTop: '4em', padding: '0 1em'}} spacing={2}>
            {(status === Constants.PROYEK_STATUS_PENGADAAN) ? (
              <Grid item>
                <Button style={{padding: '0em 1em', height: '2em', backgroundColor: '#65909C'}} onClick={this.advanceToPemantauan}>Lanjut Pemantauan</Button>
              </Grid>
            ) : (
              <div />
            )}
            <Grid item>
              <Button style={{padding: '0em 1em', height: '2em', backgroundColor: '#AB0000'}} onClick={this.handleToggleEndProyekWindow}>Akhiri Proyek</Button>
            </Grid>
          </Grid>
        ) : (
          <div />
        )}
        <Grid item container spacing={2} justify="center" alignItems="flex-start" style={{ marginTop: '4em', padding: '0 1em'}}>
          <Grid item>
            <Paper>
              <Grid container justify="center" alignItems="center">
                <Grid item container justify="flex-end" md={12}>
                  <MUIButton onClick={this.handleToggleAddLogWindow}>Tambah</MUIButton>
                </Grid>
                <Grid item md={12}><Typography>Informasi Proyek</Typography></Grid>
                <Grid item md={12}>&nbsp;</Grid>
              </Grid>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {informasiProyekColumns.map(column => (
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
                  {logListView.slice(logPage * rowsPerLogPage, logPage * rowsPerLogPage + rowsPerLogPage).map(row => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {informasiProyekColumns.map(column => {
                          const value = row[column.id]
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              { this.columnValue(column,value) }
                            </TableCell>
                          )
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
                rowsPerPage={rowsPerLogPage}
                page={logPage}
                onChangePage={this.handleChangeLogPage}
                onChangeRowsPerPage={this.handleChangeRowsPerLogPage}
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <Grid container justify="center" alignItems="center">
                <Grid item container justify="flex-end" md={12}>
                  <MUIButton onClick={this.handleToggleFileWindow}>Tambah</MUIButton>
                </Grid>
                <Grid item md={12}><Typography>File</Typography></Grid>
                <Grid item md={12}>&nbsp;</Grid>
              </Grid>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {fileColumns.map(column => (
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
                  {fileListView.slice(filePage * rowsPerFilePage, filePage * rowsPerFilePage + rowsPerFilePage).map(row => {
                    return (
                      <TableRow hover onClick={() => {window.open(`${row.url}`,`_blank`)}} role="checkbox" tabIndex={-1} key={row.id}>
                        {fileColumns.map(column => {
                          const value = row[column.id]
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              { this.columnValue(column,value) }
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={fileListView.length}
                rowsPerPage={rowsPerFilePage}
                page={filePage}
                onChangePage={this.handleChangeFilePage}
                onChangeRowsPerPage={this.handleChangeRowsPerFilePage}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default InformasiProyek