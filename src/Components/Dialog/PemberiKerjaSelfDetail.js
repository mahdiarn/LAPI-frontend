import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'


import { Dialog, DialogTitle, Grid, Divider, Typography } from '@material-ui/core'
import APIBuilder from '../../Shared/APIBuilder'

import {
  jenisPemberiKerja as jenisPemberiKerjaList
} from '../../Shared/Config'


function PemberiKerjaSelfDetail(props) {
  const [pemberiKerja, setPemberiKerja] = useState({})
  
  const {
    onClose,
    open,
    pemberiKerjaId,
    myroute,
  } = props

  const refreshPemberiKerja = async () => {

    const pemberiKerjaResponse = await APIBuilder(`pemberi-kerja/${pemberiKerjaId}`)
    if (pemberiKerjaResponse){
      if(pemberiKerjaResponse.code === 200) {
        setPemberiKerja(pemberiKerjaResponse.payload.data)
      }
    }

  }

  useEffect(() => {
    refreshPemberiKerja(pemberiKerjaId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pemberiKerjaId
  ])
  
  const handleClose = () => {
    onClose()
  }

  const assignJenisPemberiKerjaName = () => {
    if (pemberiKerja && jenisPemberiKerjaList.filter(
      (el) => {
        return (el.value === pemberiKerja.jenis)
      })[0]) {
      return jenisPemberiKerjaList.filter((el) => {return (el.value === pemberiKerja.jenis)})[0].nama
    } else {
      return '-'
    }
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='md' fullWidth PaperProps={{style : {padding:'1em 2em'}}}>
      <Grid container alignItems="center" justify="flex-end">
        <Link to={myroute} onClick={() => {handleClose()}}>X</Link>
      </Grid>
      <DialogTitle id="simple-dialog-title" align="center">{pemberiKerja ? pemberiKerja.nama : '-'}</DialogTitle>
      <Divider />
      <br />
      <form style={{padding: '0em 1em'}}>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Jenis Instansi</Grid>
          <Grid item md={6}><Typography>{(pemberiKerja) ? (assignJenisPemberiKerjaName()) : '-'}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Alamat Perusahaan</Grid>
          <Grid item md={6}><Typography>{pemberiKerja ? pemberiKerja.alamat : '-'}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Jumlah Proyek</Grid>
          <Grid item md={6}><Typography>{pemberiKerja ? pemberiKerja.total_proyek : '-'} {pemberiKerja ? (<Link to={`/daftar-proyek/${pemberiKerja.nama}`}>Lihat</Link>) : '' }</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Rekam Jejak</Grid>
          <Grid item md={6}><Typography>Baik ({pemberiKerja ? pemberiKerja.total_penilaian_baik : 0}) ; Kurang Baik ({pemberiKerja ? pemberiKerja.total_penilaian_kurang_baik : 0}) ; Tidak Baik ({pemberiKerja ? pemberiKerja.total_penilaian_tidak_baik : 0})</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
      </form>
      <Grid item container alignItems="center" justify="space-between" spacing={2}>&nbsp;</Grid>
      <Grid item container alignItems="center" justify="space-between" spacing={2}>&nbsp;</Grid>
    </Dialog>
  )
}

PemberiKerjaSelfDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default PemberiKerjaSelfDetail