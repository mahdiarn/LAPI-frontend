/* eslint-disable no-throw-literal */
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as moment from 'moment'

import { Dialog, DialogTitle, Grid, TextField, Divider, Typography } from '@material-ui/core'
import { Alert, Autocomplete } from '@material-ui/lab'
import APIBuilder from '../../Shared/APIBuilder'
import Progress from '../Progress/Progress'
import Button from '../Button/MainButton'
import {statusSPPU as statusSPPUList} from '../../Shared/Config'

function PembayaranSPPUDetail(props) {
  const [progressVisibility, setProgressVisibility] = useState(false)

  const [alertLunasiPenagihan, setAlertLunasiPenagihan] = useState(false)
  const [namaProyek, setNamaProyek] = useState(0)
  const [namaPemberiKerja, setNamaPemberiKerja] = useState(0)
  const [namaKetuaTimPelaksana, setNamaKetuaTimPelaksana] = useState(0)
  const [selectedTerminId, setSelectedTerminId] = useState(0)
  const [selectedStatusSPPU, setSelectedStatusSPPU] = useState(0)
  const [tanggalPembayaranSPPU, setTanggalPembayaranSPPU] = useState('')
  const [jumlahPembayaranSPPU, setJumlahPembayaranSPPU] = useState('')

  const {
    onClose,
    refreshData,
    open,
    myroute,
    value,
    terminList
  } = props

  
  
  useEffect(() => {

    setNamaProyek(value.nama)
    setNamaPemberiKerja(value.nama_pemberi_kerja)
    setNamaKetuaTimPelaksana(value.nama_ketua)
    setTanggalPembayaranSPPU(moment(value.tanggal_pembayaran).format('YYYY-MM-DD'))
    setJumlahPembayaranSPPU(value.jumlah_pembayaran)
    setSelectedTerminId(value.termin_id)
    setSelectedStatusSPPU(value.status)
  }, [value]) 

  const handleClose = () => {
    handleRefresh()
    onClose(value)
  }

  const handleRefresh = () => {
    refreshData()
  }

  
  
  const handleSubmit = async (e, isCetakInvoice = false) => {
    setProgressVisibility(true)
    e.preventDefault()
    try {
      const payload = {
        termin_id: selectedTerminId,
        tanggal_pembayaran: tanggalPembayaranSPPU,
        jumlah_pembayaran: jumlahPembayaranSPPU,
        status_pembayaran: selectedStatusSPPU
      }
      
      const response = await APIBuilder(`sppu/${value.id}/update`, payload, 'POST')
      if (response.code === 200) {
        alert('Berhasil ubah data sppu!')
        setAlertLunasiPenagihan(true)
      } else {
        throw "failed"
      }
      return setProgressVisibility(false)
    } catch (err) {
      switch (err) {
        case "failed":
        default:
          alert('Gagal ubah data sppu!')
      }
      setProgressVisibility(false)
    }
    
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='md' fullWidth PaperProps={{style : {padding:'1em 2em'}}}>
      <Progress visibility={progressVisibility} />
      <Grid container alignItems="center" justify="flex-end">
        <Link to={myroute} onClick={() => {handleClose()}}>X</Link>
      </Grid>
      <DialogTitle id="simple-dialog-title" align="center">Pembayaran SPPU</DialogTitle>
      <Divider />
      <Grid container alignItems="center" justify="flex-end">
        &nbsp;
      </Grid>
      <form onSubmit={handleSubmit} style={{padding: '0em 1em'}}>
      <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Nama Proyek</Grid>
          <Grid item md={6}><Typography variant="body1">{namaProyek}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Pemberi Kerja</Grid>
          <Grid item md={6}><Typography variant="body1">{namaPemberiKerja}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Tim Pelaksana</Grid>
          <Grid item md={6}><Typography variant="body1">{namaKetuaTimPelaksana}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Termin Ke-</Grid>
          <Grid item md={6}>
            <Autocomplete
              value={(terminList.filter((el) => (el.id === selectedTerminId)))[0]}
              options={terminList}
              getOptionLabel={option => {
                return `${option.termin_ke}`
              }}
              renderInput={params => (
                <TextField {...params} label="Termin ke-" variant="outlined" fullWidth />
              )}
              onChange={(event, values) => {
                if (values) {
                  setSelectedTerminId(values.id)
                } else {
                  setSelectedTerminId(0)
                }
              }}
            />
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Tanggal Pembayaran</Grid>
          <Grid item md={6}><TextField type="date" id="input-tanggal-pembayaran-sppu" variant="outlined" fullWidth value={tanggalPembayaranSPPU || ''} onChange={e => setTanggalPembayaranSPPU(e.target.value)}/></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Jumlah Pembayaran</Grid>
          <Grid item md={6}><TextField id="input-jumlah-pembayaran" label="Jumlah Pembayaran" variant="outlined" type="text" fullWidth value={jumlahPembayaranSPPU || ''} onChange={e => setJumlahPembayaranSPPU(e.target.value)}/></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Status</Grid>
          <Grid item md={6}>
            <Autocomplete
              value={(statusSPPUList.filter((el) => (el.value === selectedStatusSPPU)))[0]}
              options={statusSPPUList}
              getOptionLabel={option => {
                return option.name
              }}
              renderInput={params => (
                <TextField {...params} label="Status" variant="outlined" fullWidth />
              )}
              onChange={(event, values) => {
                if (values) {
                  setSelectedStatusSPPU(values.value)
                } else {
                  setSelectedStatusSPPU(value.status)
                }
              }}
            />
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container>&nbsp;</Grid>
        <Grid item container direction="row-reverse">
        <Grid item md={4} container direction="row-reverse"><Button style={{padding: '1.5em 1em', height: '2em'}} onClick={(e) => {handleSubmit(e)}}><Typography variant="caption" style={{fontSize:'14px'}}>Simpan Perubahan</Typography></Button></Grid>
        </Grid>
      </form>
      <Grid item container>&nbsp;</Grid>
      {
        alertLunasiPenagihan ? (
          <Alert variant="filled" severity="success" style={{position:'fixed', top:0, left:0, right:0}} onClose={() => {setAlertLunasiPenagihan(!alertLunasiPenagihan)}}>
            Berhasil ubah data pembayaran SPPU!
          </Alert>
        ) : (
          <div />
        )
      }
      
      <Grid item container>&nbsp;</Grid>
    </Dialog>
  )
}

PembayaranSPPUDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  refreshData: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired
}

export default PembayaranSPPUDetail