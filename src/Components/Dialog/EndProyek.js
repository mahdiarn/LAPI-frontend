import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import {
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Divider,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import Progress from '../Progress/Progress'
import Input from '../Button/MainInput'

import Constants from '../../Shared/Constants'
import {
  baseUrl,
  tahapanTerakhir as tahapanTerakhirList
} from '../../Shared/Config'

function FormPenilaian(props) {
  const {value, changeFunction} = props

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="gender" name="gender1" value={`${value}`} onChange={e => changeFunction(Number(e.target.value))}>
        <FormControlLabel value={`${Constants.PENILAIAN_AKHIRI_PROYEK_BAIK}`} control={<Radio />} label="Baik" />
        <FormControlLabel value={`${Constants.PENILAIAN_AKHIRI_PROYEK_KURANG_BAIK}`} control={<Radio />} label="Kurang Baik" />
        <FormControlLabel value={`${Constants.PENILAIAN_AKHIRI_PROYEK_TIDAK_BAIK}`} control={<Radio />} label="Tidak Baik" />
      </RadioGroup>
    </FormControl>
  )
}

FormPenilaian.propTypes = {
  changeFunction: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
}

function EndProyek(props) {
  const [progressVisibility, setProgressVisibility] = useState(false)
  const [selectedTahapanTerakhir, setSelectedTahapanTerakhir] = useState(0)
  const [alasan, setAlasan] = useState('')
  const [nilaiPemberiKerja, setNilaiPemberiKerja] = useState(1)
  const [nilaiTimPelaksana, setNilaiTimPelaksana] = useState(1)
  
  const { onClose, selectedValue, open, proyekId, proyekName, pemberiKerjaName, status } = props
  
  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleSubmit = async (e) => {
    setProgressVisibility(true)
    e.preventDefault()

    const payload = {
      tahapan_terakhir: selectedTahapanTerakhir,
      alasan: alasan,
      nilai_pemberi_kerja: nilaiPemberiKerja,
      nilai_tim_pelaksana: nilaiTimPelaksana
    }
    console.log(payload)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      data: JSON.stringify(payload),
      url: `${baseUrl}/proyek/${proyekId}/akhiri`,
    }
    
    axios(options).then(() => {
      alert('Berhasil akhiri proyek!')
      setProgressVisibility(false)
    }).catch((err) => {
      console.log(err)
    })
    return handleClose()
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='xs' fullWidth PaperProps={{style : {padding:'1em 2em'}}}>
      <Progress visibility={progressVisibility} />
      <DialogTitle id="simple-dialog-title" align="center"><b>Anda akan mengakhiri proyek ini!</b></DialogTitle>
      <Divider />
      <br />
      <form onSubmit={handleSubmit} style={{padding: '0em 1em'}}>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          &nbsp;
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Nama</Grid>
          <Grid item md={8}><Typography>: {proyekName}</Typography></Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Pemberi Kerja</Grid>
          <Grid item md={8}><Typography>: {pemberiKerjaName}</Typography></Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Tahap Terakhir</Grid>
          <Grid item md={8}>
            <Autocomplete
              options={
                (status === Constants.PROYEK_STATUS_PEMANTAUAN) ? [{name: 'Pemantauan', value: Constants.TAHAPAN_TERAKHIR_PEMANTAUAN}] : tahapanTerakhirList
              }
              getOptionLabel={option => option.name}
              renderInput={params => (
                <TextField {...params} label="Tahapan Terakhir" variant="outlined" fullWidth />
              )}
              onChange={(event, values) => setSelectedTahapanTerakhir((values.value) ? values.value : 0)}
            />
          </Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Alasan</Grid>
          <Grid item md={8}><TextField fullWidth multiline rows={3} variant="outlined" value={alasan} onChange={e => setAlasan(e.target.value)}/></Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Pemberi Kerja</Grid>
          <Grid item md={8}>
            <FormPenilaian value={nilaiPemberiKerja} changeFunction={setNilaiPemberiKerja} />
          </Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Tim Pelaksana</Grid>
          <Grid item md={8}>
            <FormPenilaian value={nilaiTimPelaksana} changeFunction={setNilaiTimPelaksana} />
          </Grid>
        </Grid>
        <Grid item container>&nbsp;</Grid>
        <Grid item container direction="row-reverse" justify="center">
          <Grid item md={4} container direction="row-reverse">
            <Input type="submit" disableUnderline value="Akhiri Proyek" />
          </Grid>
        </Grid>
      </form>
    </Dialog>
  )
}

EndProyek.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default EndProyek