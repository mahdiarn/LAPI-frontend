import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import { Dialog, DialogTitle, Grid, TextField, Divider, Typography } from '@material-ui/core'
import APIBuilder from '../../Shared/APIBuilder'
import Constants from '../../Shared/Constants'
import Progress from '../Progress/Progress'
import Input from '../Button/MainInput'
import RupiahTextFormat from '../TextFormat/RupiahTextFormat'
import {RupiahFormat} from '../../Shared/TextTransformer'

function PrefinancingDetail(props) {
  const [progressVisibility, setProgressVisibility] = useState(false)
  const [keterangan, setKeterangan] = useState('')
  const [tanggalPemberianInput, setTanggalPemberianInput] = useState('')
  const [nilaiPrefinancingInput, setNilaiPrefinancingInput] = useState(0)
  const [nilaiTerbayarkanInput, setNilaiTerbayarkanInput] = useState(0)
  const [keteranganInput, setKeteranganInput] = useState('')

  const {
    onClose,
    refreshData,
    open,
    proyekId,
    myroute,
    nilaiPrefinancing,
    nilaiTerbayarkanPrefinancing,
    tanggalPemberianPrefinancing,
    keteranganPrefinancing,
    status
  } = props

  useEffect(() => {
    let tanggalPemberian = tanggalPemberianPrefinancing ? new Date(tanggalPemberianPrefinancing) : null
    setNilaiPrefinancingInput(nilaiPrefinancing || 0)
    setNilaiTerbayarkanInput(nilaiTerbayarkanPrefinancing || 0)
    if (tanggalPemberian) {
      let formattedDate = `${tanggalPemberian.getFullYear()}-${tanggalPemberian.getMonth()+1 < 10 ? '0' : ''}${tanggalPemberian.getMonth()+1}-${tanggalPemberian.getDate()}`
      setTanggalPemberianInput(formattedDate)
    } else {
      setTanggalPemberianInput('')
    }
    setKeteranganInput(keteranganPrefinancing || '')
  }, [
    nilaiPrefinancing,
    nilaiTerbayarkanPrefinancing,
    tanggalPemberianPrefinancing,
    keteranganPrefinancing
  ])

  const handleClose = () => {
    onClose()
  }

  const handleRefresh = () => {
    refreshData()
  }

  const handleNilaiPrefinancingInput = (event) => {
    setNilaiPrefinancingInput(event.target.value)
  }
  const handleNilaiTerbayarkanInput = (event) => {
    setNilaiTerbayarkanInput(event.target.value)
  }
  
  const handleSubmit = async (e) => {
    setProgressVisibility(true)
    e.preventDefault()
    const payload = {
      tanggal_pemberian_prefinancing: tanggalPemberianInput,
      nilai_prefinancing: nilaiPrefinancingInput,
      nilai_terbayarkan_prefinancing: nilaiTerbayarkanInput,
      keterangan_prefinancing: keteranganInput,
      proyek_id: proyekId
    }
    const response = await APIBuilder(`detail-proyek/${proyekId}`, payload, 'POST')
    if (response.code === 200) {
      alert('Berhasil ubah data prefinancing!')
    } else {
      alert('Gagal ubah data prefinancing!')
    }

    setProgressVisibility(false)
    handleRefresh()
    return handleClose()
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='md' fullWidth PaperProps={{style : {padding:'1em 2em'}}}>
      <Progress visibility={progressVisibility} />
      <Grid container alignItems="center" justify="flex-end">
        <Link to={myroute} onClick={() => {handleClose()}}>X</Link>
      </Grid>
      <DialogTitle id="simple-dialog-title" align="center">Data Prefinancing</DialogTitle>
      <Divider />
      <br />
      <form onSubmit={handleSubmit} style={{padding: '0em 1em'}}>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Tanggal Pemberian</Grid>
          <Grid item md={6}>
            <TextField
              id="date"
              label="Tanggal Pemberian"
              type="date"
              value={tanggalPemberianInput}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setTanggalPemberianInput(e.target.value)
              }}
              fullWidth
            />
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Nilai Prefinancing</Grid>
          <Grid item md={6}>
            <TextField
              label="Nilai Prefinancing"
              value={nilaiPrefinancingInput}
              onChange={handleNilaiPrefinancingInput}
              id="input-prefinancing"
              InputProps={{
                inputComponent: RupiahTextFormat,
              }}
              fullWidth
            />
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Nilai Terbayarkan</Grid>
          <Grid item md={6}>
            <TextField
              label="Nilai Terbayarkan"
              value={nilaiTerbayarkanInput}
              onChange={handleNilaiTerbayarkanInput}
              id="input-terbayar"
              InputProps={{
                inputComponent: RupiahTextFormat,
              }}
              fullWidth
            />  
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Sisa Nilai</Grid>
          <Grid item md={6}><Typography>{RupiahFormat(nilaiPrefinancingInput - nilaiTerbayarkanInput)}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Keterangan</Grid>
          <Grid item md={6}><TextField id="input-keterangan" label="Keterangan" variant="outlined" type="text" fullWidth value={keterangan || ''} onChange={e => setKeterangan(e.target.value)}/></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
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

PrefinancingDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  refreshData: PropTypes.func.isRequired
}

export default PrefinancingDetail