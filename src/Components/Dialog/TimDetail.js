import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'


import { Dialog, DialogTitle, Grid, Divider, Typography } from '@material-ui/core'

function TimDetail(props) {
  const {
    onClose,
    open,
    tim,
    myroute,
  } = props
  
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='md' fullWidth PaperProps={{style : {padding:'1em 2em'}}}>
      <Grid container alignItems="center" justify="flex-end">
        <Link to={myroute} onClick={() => {handleClose()}}>X</Link>
      </Grid>
      <DialogTitle id="simple-dialog-title" align="center">Data Tim Pelaksana</DialogTitle>
      <Divider />
      <br />
      <form style={{padding: '0em 1em'}}>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Ketua Tim</Grid>
          <Grid item md={6}><Typography>{tim.nama_ketua}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>PM Tim</Grid>
          <Grid item md={6}><Typography>{tim.nama_pm}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Kelompok Keahlian</Grid>
          <Grid item md={6}><Typography>{tim.kelompok_keahlian} ({tim.nama_kelompok_keahlian})</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Jumlah Proyek</Grid>
          <Grid item md={6}><Typography>{tim.total_project}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Email Tim</Grid>
          <Grid item md={6}><Typography>{tim.email_tim}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Alamat Tim</Grid>
          <Grid item md={6}><Typography>{tim.alamat_tim || '-'}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Kontak Tim</Grid>
          <Grid item md={6}><Typography>{tim.kontak_tim || '-'}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container>&nbsp;</Grid>
      </form>
    </Dialog>
  )
}

TimDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  refreshData: PropTypes.func.isRequired
}

export default TimDetail