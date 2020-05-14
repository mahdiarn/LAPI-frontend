import React from 'react'

import history from '../../../Shared/History'
import APIBuilder from '../../../Shared/APIBuilder'
import Constants from '../../../Shared/Constants'
import Authorization from '../../../Shared/Authorization'
import {PinTextFormat} from '../../../Shared/TextTransformer'

import Navbar from '../../Navbar/Navbar'
import Button from '../../Button/MainButton'
import Progress from '../../Progress/Progress'

import {Grid, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Link, TextField} from '@material-ui/core'

import {terminColumns} from '../../../Shared/Columns'
import PersentaseTextFormat from '../../TextFormat/PersentaseTextFormat'

import MasalahDetailDialog from '../../Dialog/MasalahDetail'
import PermintaanPenagihanInvoiceDialog from '../../Dialog/PermintaanPenagihanInvoice'

class TerminProyek extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      terminPage: 0,
      rowsPerTerminPage: 5,
      terminList: [],
      addTerminWindow: false,
      progressVisibility: false,
      proyekName: '',
      pin: 0,
      status: 0,
      persentaseInput: 0,
      targetInput: '',
      masalahDetailWindow: false,
      selectedTerminId: 0,
      terminKeInput: 0,
      permintaanPenagihanInvoiceWindow: false,
      selectedTermin: {}
    }

    this.handleChangeTerminPage = this.handleChangeTerminPage.bind(this)
    this.handleChangeRowsPerTerminPage = this.handleChangeRowsPerTerminPage.bind(this)
    this.handleChangeProgressVisibility = this.handleChangeProgressVisibility.bind(this)
    this.handleChangePersentaseInput = this.handleChangePersentaseInput.bind(this)
    this.handleChangeTargetInput = this.handleChangeTargetInput.bind(this)
    this.handleChangeTerminKeInput = this.handleChangeTerminKeInput.bind(this)
    this.handleToggleMasalahDetailWindow = this.handleToggleMasalahDetailWindow.bind(this)
    this.handleTogglePermintaanPenagihanInvoiceWindow = this.handleTogglePermintaanPenagihanInvoiceWindow.bind(this)
    this.selectMasalahDetail = this.selectMasalahDetail.bind(this)
  }

  async refreshData() {
    const {id} = this.props.match.params
    const peluangResponse = await APIBuilder(`peluang-proyek/${id}`)
    if (peluangResponse){
      if(peluangResponse.code === 200) {
        this.setState({proyekName: peluangResponse.payload.data.nama, pin: peluangResponse.payload.data.pin, status: peluangResponse.payload.data.status})
      }
    }

    const terminResponse = await APIBuilder(`termin-proyek/proyek/${id}`)
    if (terminResponse){
      if(terminResponse.code === 200) {
        this.setState({terminList: terminResponse.payload.data})
      }
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

  handleChangeTerminPage = (event, newTerminPage) => {
    this.setState({
      logPage: newTerminPage
    })
  }

  handleChangePersentaseInput = (event) => {
    this.setState({
      persentaseInput: event.target.value
    })
  }
  handleChangeTargetInput = (event) => {
    this.setState({
      targetInput: event.target.value
    })
  }

  handleChangeTerminKeInput = (event) => {
    this.setState({
      terminKeInput: event.target.value
    })
  }

  handleChangeRowsPerTerminPage = (event) => {
    this.setState({
      logPage: 0,
      rowsPerTerminPage: +event.target.value
    })
  }

  handleChangeProgressVisibility(val) {
    this.setState({progressVisibility: val})
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

  handleCreateTermin = async(event) => {
    const {id} = this.props.match.params
    const {persentaseInput, targetInput, terminKeInput} = this.state
    this.handleChangeProgressVisibility(true)
    event.preventDefault()
    const payload = {
      proyek_id: id,
      termin_ke: terminKeInput,
      persentase: persentaseInput,
      target_selesai: targetInput
    }
    const response = await APIBuilder(`termin-proyek/`, payload, 'POST')
    if (response.code === 200) {
      alert('Berhasil membuat Termin!')
    } else {
      alert('Gagal membuat Termin!')
    }

    this.handleChangeProgressVisibility(false)
    this.refreshData()
    return 0
  }

  handleRemoveTermin = async(event, id) => {
    this.handleChangeProgressVisibility(true)
    event.preventDefault()
  
    const response = await APIBuilder(`termin-proyek/${id}/remove`)
    if (response.code === 200) {
      alert('Berhasil menghapus Termin!')
    } else {
      alert('Gagal menghapus Termin!')
    }

    this.handleChangeProgressVisibility(false)
    this.refreshData()
    return 0
  }

  handleFinishTermin = async(event, id) => {
    this.handleChangeProgressVisibility(true)
    event.preventDefault()
  
    const response = await APIBuilder(`termin-proyek/${id}/finish`)
    if (response.code === 200) {
      alert('Berhasil menyelesaikan Termin!')
    } else {
      alert('Gagal menyelesaikan Termin!')
    }

    this.handleChangeProgressVisibility(false)
    this.refreshData()
    return 0
  }

  handleTagihTermin = async(event, termin) => {
    this.setState({selectedTermin: termin})
    this.handleTogglePermintaanPenagihanInvoiceWindow()
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
    } else if (column.id === 'is_selesai') {
      switch(value) {
        case 0:
          return '-'
        default:
          return 'Selesai'
      }
    } else if (column.id === 'penagihan_status') {
      switch(value) {
        case Constants.TERMIN_STATUS_PENAGIHAN_DITERBITKAN:
          return 'Diterbitkan'
        case Constants.TERMIN_STATUS_PENAGIHAN_PENDING:
          return 'Pending'
        case Constants.TERMIN_STATUS_PENAGIHAN_BELUM_ADA:
        default:
          return 'Belum Ada'
      }
    } else {
      return value || '-'
    }
  }


  handleToggleMasalahDetailWindow = () => {
    const { masalahDetailWindow } = this.state
    this.refreshData()
    this.setState({masalahDetailWindow: !(masalahDetailWindow)})
  }

  selectMasalahDetail = (val) => {
    this.handleToggleMasalahDetailWindow()
    this.setState({selectedTerminId: val})
  }

  handleTogglePermintaanPenagihanInvoiceWindow = () => {
    const { permintaanPenagihanInvoiceWindow } = this.state
    this.refreshData()
    this.setState({permintaanPenagihanInvoiceWindow: !(permintaanPenagihanInvoiceWindow)})
  }

  render() {
    const {terminPage, rowsPerTerminPage, terminList, progressVisibility, masalahDetailWindow, selectedTerminId, permintaanPenagihanInvoiceWindow, selectedTermin} = this.state
    const {persentaseInput, targetInput, terminKeInput} = this.state
    const {proyekName, pin, status} = this.state
    const {id} = this.props.match.params
    return (
      <Grid item container>
        <Progress visibility={progressVisibility} />
        <MasalahDetailDialog
          open={masalahDetailWindow}
          onClose={() => {this.handleToggleMasalahDetailWindow()}}
          namaPerusahaan=''
          alamatPerusahaan=''
          jenisInstansi=''
          proyekId={0}
          terminId={selectedTerminId}
          emailPemberiKerja=''
          teleponPemberiKerja=''
          faxPemberiKerja=''
          kontakPersonelPemberiKerja=''
          penandatangananKontrakPemberiKerja=''
          npwpPemberiKerja=''
          status={status}
          myroute={this.props.location.pathname}
        />
        <PermintaanPenagihanInvoiceDialog
          open={permintaanPenagihanInvoiceWindow}
          onClose={this.handleTogglePermintaanPenagihanInvoiceWindow}
          termin={selectedTermin}
        />
        <Navbar role={Authorization.getRole()} email={Authorization.getEmail()} title={'Termin Proyek'}/>
        <Grid item container spacing={2} justify="flex-start" alignItems="flex-start" style={{ padding: '15px'}}>
          <Button style={{padding: '0em 1em', height: '2em', backgroundColor: '#65909C'}} onClick={() => history.push(`/proyek/${id}`)}>Kembali ke Detail</Button>
        </Grid>
        <Grid item container justify="center" alignItems="center" style={{ marginTop: '4em', padding: '0 1em'}} spacing={2}>
        <Typography variant="h5" style={{color: (status === Constants.PROYEK_STATUS_PEMANTAUAN) ? '#117C9B' : (status === Constants.PROYEK_STATUS_END) ? '#AB0000' : '#000' }}>{`P${PinTextFormat(pin)} - ${proyekName} ${(status === Constants.PROYEK_STATUS_END) ? `(Berakhir)` : ''}` || ''}</Typography>
        </Grid>
        <Grid item container spacing={2} justify="center" alignItems="flex-start" style={{ marginTop: '4em', padding: '0 1em'}}>
          
          <Paper>
            <Grid container justify="center" alignItems="center">
              <Grid item md={12}><Typography>Informasi Termin</Typography></Grid>
              <Grid item md={12}>&nbsp;</Grid>
            </Grid>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Termin Proyek
                  </TableCell>
                  <TableCell colSpan={2} align="center">
                    Masalah Proyek
                  </TableCell>
                  <TableCell colSpan={3} align="center">
                    Permintaan Penagihan
                  </TableCell>
                </TableRow>
                <TableRow>
                  {terminColumns.map(column => (
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
                {terminList.slice(terminPage * rowsPerTerminPage, terminPage * rowsPerTerminPage + rowsPerTerminPage).map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {terminColumns.map(column => {
                        const value = row[column.id]
                        const penagihanStatus = row['penagihan_status']
                        if (column.id === "persentase") {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              { value }&#37;
                            </TableCell>
                          )
                        } else if ((column.id === 'termin-menu') && (status !== Constants.PROYEK_STATUS_END)) {
                          return (
                            <TableCell key={column.id+index} align={column.align}>
                              <Link to={this.props.location.pathname} onClick={(e) => this.handleRemoveTermin(e,row.id)}>Hapus</Link>
                              <br />
                              <Link to={this.props.location.pathname} onClick={(e) => this.handleFinishTermin(e,row.id)}>Selesai</Link>
                            </TableCell>
                          )
                        } else if (column.id === 'termin-masalah-action') {
                          return (
                            <TableCell key={column.id+index} align={column.align}>
                              <Link to={this.props.location.pathname} onClick={(e) => this.selectMasalahDetail(row.id)}>Detail</Link>
                            </TableCell>
                          )
                        } else if (column.id === 'masalah_count') {
                          return (
                            <TableCell key={column.id+index} align={column.align}>
                              {value || 0}
                            </TableCell>
                          )
                        } else if (column.id === 'termin-penagihan-action') {
                          return (
                            <TableCell key={column.id+index} align={column.align}>
                              {(penagihanStatus === Constants.TERMIN_STATUS_PENAGIHAN_DITERBITKAN) ? (<Link>Lihat</Link>) : ''}
                              {(penagihanStatus === Constants.TERMIN_STATUS_PENAGIHAN_PENDING) ? '-' : ''}
                              {((penagihanStatus === Constants.TERMIN_STATUS_PENAGIHAN_BELUM_ADA) && (status !== Constants.PROYEK_STATUS_END)) ? (<Link to={this.props.location.pathname} onClick={(e) => this.handleTagihTermin(e,row)}>Ajukan</Link>) : ''}
                            </TableCell>
                          )
                        } else if (['target_selesai', 'tanggal_selesai', 'tanggal_penagihan'].includes(column.id)) {
                          let date = new Date(value)
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              {(value) ? `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` : '-'}
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
                {(status === Constants.PROYEK_STATUS_END) ? (
                    <div />
                  ) : (
                  <TableRow>
                    <TableCell key='input-termin' align='center'>
                      <TextField
                        id="input-termin"
                        label="Termin Ke-"
                        variant="outlined"
                        type="text"
                        fullWidth
                        value={terminKeInput || 0}
                        onChange={this.handleChangeTerminKeInput}
                      />
                    </TableCell>
                    <TableCell key='input-persentase' align='center'>
                      <TextField
                        id="input-keterangan"
                        label="Persentase"
                        variant="outlined"
                        type="text"
                        fullWidth
                        InputProps={{
                          inputComponent: PersentaseTextFormat,
                        }}
                        value={persentaseInput || 0}
                        onChange={this.handleChangePersentaseInput}
                      />
                    </TableCell>
                    <TableCell key='input-target' align='center'>
                      <TextField
                        id="date"
                        label="Tanggal Target Selesai"
                        type="date"
                        value={targetInput}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={this.handleChangeTargetInput}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell key='input-is-selesai' align='center' colSpan={2}>
                      <Button onClick={this.handleCreateTermin} style={{padding: '',fontSize: '14px'}}>Tambah Termin</Button>
                    </TableCell>
                    <TableCell key='input-termin-menu' align='center'>
                      &nbsp;
                    </TableCell>
                    <TableCell key='input-masalah-count' align='center'>
                      &nbsp;
                    </TableCell>
                    <TableCell key='input-masalah-menu' align='center'>
                      &nbsp;
                    </TableCell>
                    <TableCell key='input-tanggal-permintaan-penagihan' align='center'>
                      &nbsp;
                    </TableCell>
                    <TableCell key='input-status-penagihan' align='center'>
                      &nbsp;
                    </TableCell>
                    <TableCell key='input-penagihan-menu' align='center'>
                      &nbsp;
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={terminList.length}
              rowsPerPage={rowsPerTerminPage}
              page={terminPage}
              onChangePage={this.handleChangeTerminPage}
              onChangeRowsPerPage={this.handleChangeRowsPerTerminPage}
            />
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default TerminProyek