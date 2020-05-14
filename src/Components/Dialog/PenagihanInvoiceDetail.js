/* eslint-disable no-throw-literal */
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as moment from 'moment'

import { Dialog, DialogTitle, Grid, Divider, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import APIBuilder from '../../Shared/APIBuilder'
import Progress from '../Progress/Progress'
import Button from '../Button/MainButton'
import {RupiahFormat} from '../../Shared/TextTransformer'
import Constants from '../../Shared/Constants'

function PenagihanInvoiceDetail(props) {
  const [progressVisibility, setProgressVisibility] = useState(false)

  const [alertLunasiPenagihan, setAlertLunasiPenagihan] = useState(false)

  const {
    onClose,
    refreshData,
    open,
    myroute,
    value
  } = props

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
      
      const response = await APIBuilder(`termin-proyek/${value.id}/flag-lunas`)
      if (response.code === 200) {
        alert('Berhasil ubah data permohonan penagihan invoice!')
        setAlertLunasiPenagihan(true)
      } else {
        throw "failed"
      }
      return setProgressVisibility(false)
    } catch (err) {
      switch (err) {
        case "failed":
        default:
          alert('Gagal menandai pelunasan!')
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
      <DialogTitle id="simple-dialog-title" align="center">Penagihan Invoice</DialogTitle>
      <Divider />
      <Grid container alignItems="center" justify="flex-end">
        &nbsp;
      </Grid>
      <form onSubmit={handleSubmit} style={{padding: '0em 1em'}}>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Nama Proyek</Grid>
          <Grid item md={6}>
            {value.nama ? value.nama : '-'}
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Lokasi</Grid>
          <Grid item md={6}>
            {value.lokasi_proyek ? value.lokasi_proyek : '-'}
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Pemberi Kerja</Grid>
          <Grid item md={6}>
            {value.pemberi_kerja ? value.pemberi_kerja : '-'}
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Alamat Pelanggan</Grid>
          <Grid item md={6}>
            {value.alamat_pemberi_kerja ? value.alamat_pemberi_kerja : '-'}
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Tanggal Penagihan</Grid>
          <Grid item md={6}>
            {value.invoice_created_date ? (moment(value.invoice_created_date).format('YYYY-MM-DD')) : '-'}
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Nomor Kontrak</Grid>
          <Grid item md={6}>
            {value.nomor_kontrak ? value.nomor_kontrak : '-'}
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Jumlah Nilai Kontrak</Grid>
          <Grid item md={6}><Typography>{RupiahFormat(value.nilai_proyek)}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Jumlah Penagihan (Termin ke-{value.termin_ke})</Grid>
          <Grid item md={6}><Typography>{RupiahFormat(value.nilai_proyek * value.persentase / 100)}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container>&nbsp;</Grid>
        <Grid item container direction="row-reverse">
          {(value.penagihan_status === Constants.TERMIN_STATUS_PENAGIHAN_DITERBITKAN) ? (
            <Grid item md={4} container direction="row-reverse"><Button style={{padding: '1.5em 1em', height: '2em'}} onClick={(e) => {handleSubmit(e)}}><Typography variant="caption" style={{fontSize:'14px'}}>Tandai Lunas</Typography></Button></Grid>
          ) : (<div />)}
        </Grid>
      </form>
      <Grid item container>&nbsp;</Grid>
      {
        alertLunasiPenagihan ? (
          <Alert variant="filled" severity="success" style={{position:'fixed', top:0, left:0, right:0}} onClose={() => {setAlertLunasiPenagihan(!alertLunasiPenagihan)}}>
            Berhasil ubah status penagihan invoice!
          </Alert>
        ) : (
          <div />
        )
      }
      
      <Grid item container>&nbsp;</Grid>
    </Dialog>
  )
}

PenagihanInvoiceDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  refreshData: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired
}

export default PenagihanInvoiceDetail