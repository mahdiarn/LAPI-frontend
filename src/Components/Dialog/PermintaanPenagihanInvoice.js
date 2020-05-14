import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import {
  Dialog,
  DialogTitle,
  Grid,
  Divider,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel
} from '@material-ui/core'
import Progress from '../Progress/Progress'
import Input from '../Button/MainInput'

import Constants from '../../Shared/Constants'
import {
  baseUrl
} from '../../Shared/Config'

function FormKetersediaanBeritaAcara(props) {
  const {value, changeFunction} = props

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="gender" name="gender1" value={`${value}`} onChange={e => changeFunction(Number(e.target.value))}>
        <FormControlLabel value={`${Constants.BERITA_ACARA_TIDAK_ADA}`} control={<Radio />} label="Tidak Ada" />
        <FormControlLabel value={`${Constants.BERITA_ACARA_BELUM_ADA}`} control={<Radio />} label="Belum Ada" />
        <FormControlLabel value={`${Constants.BERITA_ACARA_ADA}`} control={<Radio />} label="Ada" />
      </RadioGroup>
    </FormControl>
  )
}

FormKetersediaanBeritaAcara.propTypes = {
  changeFunction: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
}

function PermintaanPenagihanInvoice(props) {
  const [progressVisibility, setProgressVisibility] = useState(false)
  const [file, setFile] = useState({})
  const [ketersediaanBeritaAcara, setKetersediaanBeritaAcara] = useState(1)
  
  const { onClose, selectedValue, open, termin } = props
  
  const handleClose = () => {
    onClose(selectedValue)
  }

  const onChangeHandler = event => {
    setFile(event.target.files[0])
  }

  const handleSubmit = async (e) => {
    setProgressVisibility(true)
    e.preventDefault()

    if ((ketersediaanBeritaAcara === Constants.BERITA_ACARA_ADA) && (Object.keys(file).length === 0 && file.constructor === Object)) {
      alert('Harap Sertakan File')
      return setProgressVisibility(false)
    }

    // const payload = {
    //   tahapan_terakhir: selectedTahapanTerakhir,
    //   alasan: alasan,
    //   nilai_pemberi_kerja: nilaiPemberiKerja,
    //   nilai_tim_pelaksana: nilaiTimPelaksana
    // }

    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   data: JSON.stringify(payload),
    //   url: `${baseUrl}/proyek/${proyekId}/akhiri`,
    // }
    
    // axios(options).then(() => {
    //   alert('Berhasil akhiri proyek!')
    //   setProgressVisibility(false)
    // }).catch((err) => {
    //   console.log(err)
    // })
    let data = new FormData() 
    
    data.append('berita_acara_availability', ketersediaanBeritaAcara)
    if (termin.proyek_id) data.append('proyek_id', termin.proyek_id)

    if (ketersediaanBeritaAcara === Constants.BERITA_ACARA_ADA) {
      data.append('file', file)
      data.append('label', 'Berita Acara')
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      data: data,
      url: `${baseUrl}/termin-proyek/${termin.id}/request`,
    }
    
    axios(options).then(() => {
      alert('Berhasil ajukan penagihan invoice!')
      setProgressVisibility(false)
    })
    return handleClose()

    // this.handleChangeProgressVisibility(true)
    // event.preventDefault()
  
    // const response = await APIBuilder(`termin-proyek/${id}/request`)
    // if (response.code === 200) {
    //   alert('Berhasil membuat permintaan penagihan Termin!')
    // } else {
    //   alert('Gagal membuat permintaan penagihan Termin!')
    // }

    // this.handleChangeProgressVisibility(false)
    // this.refreshData()
    // return 0

    
    
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='xs' fullWidth PaperProps={{style : {padding:'1em 2em'}}}>
      <Progress visibility={progressVisibility} />
      <DialogTitle id="simple-dialog-title" align="center"><b>Ajukan Permintaan Penagihan Invoice</b></DialogTitle>
      <Divider />
      <br />
      <form onSubmit={handleSubmit} style={{padding: '0em 1em'}}>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          &nbsp;
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Termin ke-</Grid>
          <Grid item md={8}><Typography>: {termin.id}</Typography></Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Persentase Proyek</Grid>
          <Grid item md={8}><Typography>: {termin.persentase}%</Typography></Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Berita Acara</Grid>
          <Grid item md={8}>
            <FormKetersediaanBeritaAcara value={ketersediaanBeritaAcara} changeFunction={setKetersediaanBeritaAcara} />
          </Grid>
        </Grid>
        {(ketersediaanBeritaAcara === Constants.BERITA_ACARA_ADA) ? (
          <Grid item container alignItems="center" justify="space-between" spacing={2}>
            <Grid item md={4}>File</Grid>
            <Grid item md={6}><input type="file" name="file" onChange={onChangeHandler}/></Grid>
            <Grid item md={2}>&nbsp;</Grid>
          </Grid>
        ) : (
          <div />
        )}
        <Grid item container>&nbsp;</Grid>
        <Grid item container direction="row-reverse" justify="center">
          <Grid item md={4} container direction="row-reverse">
            <Input type="submit" disableUnderline value="Ajukan Permintaan Invoice" />
          </Grid>
        </Grid>
      </form>
    </Dialog>
  )
}

PermintaanPenagihanInvoice.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default PermintaanPenagihanInvoice