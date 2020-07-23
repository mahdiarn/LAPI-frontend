import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { Autocomplete } from '@material-ui/lab'
import PropTypes from 'prop-types'


import { Dialog, DialogTitle, Grid, TextField, Divider, Typography, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@material-ui/core'
import APIBuilder from '../../Shared/APIBuilder'
import Constants from '../../Shared/Constants'
import Progress from '../Progress/Progress'
import Input from '../Button/MainInput'

import {tenagaAhliColumns as columns} from '../../Shared/Columns'

function TimPelaksanaDetail(props) {
  const [progressVisibility, setProgressVisibility] = useState(false)
  const [tenagaKerjaVisibility, setTenagaKerjaVisibility] = useState(false)
  const [PenandatangananSP3, setPenandatangananSP3] = useState('')
  const [TenagaAhli, setTenagaAhli] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [kkList, setKKList] = useState([])
  const [nama, setNama] = useState('')
  const [kelompokKeahlian, setKelompokKeahlian] = useState(0)
  const [posisi, setPosisi] = useState('')
  const [isAsing, setIsAsing] = useState(false)
  
  const {
    onClose,
    refreshData,
    open,
    proyekId,
    ketuaTim,
    pmTim,
    kkTim,
    emailTim,
    myroute,
    penandatangananSP3,
    tenagaAhli,
    status
  } = props

  useEffect(() => {
    setPenandatangananSP3(penandatangananSP3)
    setTenagaAhli(tenagaAhli)
    getKK()
  }, [
    penandatangananSP3,
    tenagaAhli
  ])

  const getKK = async () => {
    const kkListResponse = await APIBuilder(`kk`)
    if (kkListResponse.code === 200) {
      setKKList(kkListResponse.payload.data)
    }
  }
  
  const handleClose = () => {
    onClose()
  }

  const handleRefresh = () => {
    refreshData()
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setPage(0)
    setRowsPerPage(+event.target.value)
  }

  const toggleTenagaKerjaVisibility = () => {
    setTenagaKerjaVisibility(!tenagaKerjaVisibility)
  }

  const handleSubmit = async (e) => {
    setProgressVisibility(true)
    e.preventDefault()
    const payload = {
      penandatanganan_sp3: PenandatangananSP3,
    }
    const response = await APIBuilder(`detail-proyek/${proyekId}`, payload, 'POST')
    if (response.code === 200) {
      alert('Berhasil ubah data tim pelaksana!')
    }

    setProgressVisibility(false)
    return handleClose()
  }

  const columnValue = (column, value) => {
    return value
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='md' fullWidth PaperProps={{style : {padding:'1em 2em'}}}>
      <Progress visibility={progressVisibility} />
      <Grid container alignItems="center" justify="flex-end">
        <Link to={myroute} onClick={() => {handleClose()}}>X</Link>
      </Grid>
      <DialogTitle id="simple-dialog-title" align="center">Data Tim Pelaksana</DialogTitle>
      <Divider />
      <br />
      <form onSubmit={handleSubmit} style={{padding: '0em 1em'}}>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Ketua Proyek</Grid>
          <Grid item md={6}><Typography>{ketuaTim}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>PM Tim</Grid>
          <Grid item md={6}><Typography>{pmTim}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Kelompok Keahlian</Grid>
          <Grid item md={6}><Typography>{kkTim}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Email</Grid>
          <Grid item md={6}><Typography>{emailTim}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Penandatanganan SP3</Grid>
          <Grid item md={6}><TextField id="input-sp3" label="Nama Penandatangan SP3" variant="outlined" type="text" fullWidth value={PenandatangananSP3 || ''} onChange={e => setPenandatangananSP3(e.target.value)}/></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Jumlah Tenaga Ahli</Grid>
          <Grid item md={6}><Typography>{TenagaAhli.length} Orang ({TenagaAhli.filter((el) => {return !el.isOrangAsing}).length} Indonesia; {TenagaAhli.filter((el) => {return el.isOrangAsing}).length} Asing)</Typography></Grid>
          <Grid item md={2}><Link to={myroute} onClick={() => {toggleTenagaKerjaVisibility()}}>{!tenagaKerjaVisibility ?'Lihat':'Tutup'}</Link></Grid>
        </Grid>
        {tenagaKerjaVisibility ? (
          <Grid item container alignItems="center" justify="space-between" spacing={2}>
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
                {TenagaAhli.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map(column => {
                        const value = row[column.id]
                        if ((column.id === 'menu') && (status !== Constants.PROYEK_STATUS_END)) {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              <Link to={myroute} onClick={async () => {
                                try {
                                  const removeTenagaAhli = await APIBuilder(`tenaga-ahli/${row.id}/remove`)
                                  if (removeTenagaAhli.code === 200) {
                                    handleRefresh()
                                  } else {
                                    throw removeTenagaAhli.payload.data
                                  }
                                } catch (error) {
                                  alert('Gagal hapus tenaga ahli, Message: '+error)
                                }
                              }}>
                                Hapus
                              </Link>
                            </TableCell>
                          )
                        } else if (column.id === 'keahlian') {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              {(kkList && kkList.filter(el => el.id===value).length > 0) ? kkList.filter(el => el.id===value)[0].nama : ''}
                            </TableCell>
                          )
                        } else if (column.id === 'is_asing') {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              {value ? 'Asing' : 'Indonesia'}
                            </TableCell>
                          )
                        } else {
                          return (
                            <TableCell key={column.id+value} align={column.align}>
                              { columnValue(column,value) }
                            </TableCell>
                          )
                        }
                          
                      })}
                    </TableRow>
                  )
                })}
                {(status === Constants.PROYEK_STATUS_END) ? (<div />) : (
                  <TableRow hover role="checkbox" tabIndex={-1} key='input'>
                    <TableCell key="namaInput">
                      <TextField id="input-nama" label="Nama Tenaga Ahli" variant="outlined" type="text" fullWidth value={nama || ''} onChange={e => setNama(e.target.value)}/>
                    </TableCell>
                    <TableCell key="posisiInput">
                      <TextField id="input-posisi" label="Posisi Tenaga Ahli" variant="outlined" type="text" fullWidth value={posisi || ''} onChange={e => setPosisi(e.target.value)}/>
                    </TableCell>
                    <TableCell key="kkInput">
                      <Autocomplete
                        options={kkList}
                        getOptionLabel={option => option.nama}
                        renderInput={params => (
                          <TextField {...params} label="KK" variant="outlined" fullWidth />
                        )}
                        onChange={(event, values) => setKelompokKeahlian(values.id || 0)}
                      />
                    </TableCell>
                    <TableCell key="kewarganegaraanInput">
                      <Autocomplete
                        options={[
                          {nama: "Indonesia", value: false},
                          {nama: "Asing", value: true},
                        ]}
                        getOptionLabel={option => option.nama}
                        renderInput={params => (
                          <TextField {...params} variant="outlined" fullWidth />
                        )}
                        onChange={(event, values) => (values) ? setIsAsing(values.value || 0) : (0)}
                      />
                    </TableCell>
                    <TableCell key='tambah' align='center'>
                      <Link to={myroute} onClick={async () => {
                        let payload = {
                          proyek_id: proyekId,
                          nama,
                          posisi,
                          kelompok_keahlian: kelompokKeahlian,
                          is_asing: isAsing
                        }
                        try {
                          const addTenagaAhli = await APIBuilder(`tenaga-ahli`, payload, 'POST')
                          if (addTenagaAhli.code === 200) {
                            handleRefresh()
                          } else {
                            throw addTenagaAhli.payload.data
                          }
                        } catch (error) {
                          alert('Gagal tambah tenaga ahli, Message: '+error)
                        }
                      }}>
                        Tambah
                      </Link>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={TenagaAhli.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Grid>
          
        ) : (
          <div />
        )}
        <Grid item container>&nbsp;</Grid>
        {(status === Constants.PROYEK_STATUS_END) ? (<div />) : (
          <Grid item container direction="row-reverse">
            <Grid item md={4} container direction="row-reverse"><Input type="submit" disableUnderline value="Simpan Perubahan"></Input></Grid>
          </Grid>
        )}
      </form>
    </Dialog>
  )
}

TimPelaksanaDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  refreshData: PropTypes.func.isRequired
}

export default TimPelaksanaDetail