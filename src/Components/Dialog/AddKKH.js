import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Dialog, DialogTitle, Grid, TextField, Divider, Typography } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers'
import { Autocomplete } from '@material-ui/lab'
import Progress from '../Progress/Progress'
import Input from '../Button/MainInput'

import APIBuilder from '../../Shared/APIBuilder'
import Authorization from '../../Shared/Authorization'
import {hari} from '../../Shared/Config'

function AddKKH(props) {
  const [progressVisibility, setProgressVisibility] = useState(false)
  
  const [nipList, setNipList] = useState([])
  const [kegiatan, setKegiatan] = useState('')
  const [nip, setNip] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const handleStartDateChange = date => {
    setStartDate(date);
  };
  const handleEndDateChange = date => {
    setEndDate(date);
  };

  useEffect(() => {
    async function getNIPList() {
      const response = await APIBuilder(`nip/by-creator/${Authorization.getId()}`)
      if (response.code === 200) {
        let newNip = []
        response.payload.data.forEach((el) => {
          newNip.push(`P${el.pin}`)
        })
        setNipList(newNip)
      }
    }

    getNIPList()
  }, []) 

  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleSubmit = async (e) => {
    setProgressVisibility(true)
    e.preventDefault()
    if (kegiatan.length === 0) {
      alert('Isi Kegiatan!')
      return setProgressVisibility(false)
    }
    let payload = {
      kegiatan,
      nip,
      startDate,
      endDate
    }

    const response = await APIBuilder('log/kkh', payload, 'POST')
    if (response.code !== 200){
      alert('Pembuatan KKH Gagal!')
      return setProgressVisibility(false)
    }

    if (response.code === 200) {
      alert('Pembuatan KKH Berhasil!')
      setKegiatan("")
      setNip("")
      setStartDate("")
      setEndDate("")
      setProgressVisibility(false)
      return handleClose()
    }

  }
  
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='md' fullWidth PaperProps={{style : {padding:'1em 2em'}}}>
      <Progress visibility={progressVisibility} />
      <DialogTitle id="simple-dialog-title" align="center">Tambah Data Kartu Kegiatan Harian</DialogTitle>
      <Divider />
      <br />
      <form onSubmit={handleSubmit} style={{padding: '0em 1em'}}>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Tanggal</Grid>
          <Grid item md={6}><Typography>{`${(new Date()).getDate()}/${(new Date()).getMonth()+1}/${(new Date()).getFullYear()} (${hari[(new Date()).getDay()]})`}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Kegiatan</Grid>
          <Grid item md={6}><TextField id="input-nama-proyek" label="Kegiatan" multiline rows="3" variant="outlined" type="text" fullWidth value={kegiatan || ''} onChange={e => setKegiatan(e.target.value)}/></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>NIP</Grid>
          <Grid item md={6}>
            <Autocomplete
              options={nipList}
              getOptionLabel={option => option}
              renderInput={params => (
                <TextField {...params} label="NIP" variant="outlined" fullWidth />
              )}
              onChange={(event, values) => setNip(values)}
            />
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Waktu</Grid>
          <Grid item container justify="flex-start" alignItems="center" md={8} spacing={2}>
            <Grid item><MuiPickersUtilsProvider utils={DateFnsUtils}><KeyboardTimePicker  value={startDate} onChange={handleStartDateChange} /></MuiPickersUtilsProvider></Grid>
            <Grid item>Sampai</Grid>
            <Grid item><MuiPickersUtilsProvider utils={DateFnsUtils}><KeyboardTimePicker  value={endDate} onChange={handleEndDateChange}/></MuiPickersUtilsProvider></Grid>
          </Grid>
        </Grid>
        <Grid item container>&nbsp;</Grid>
        <Grid item container direction="row-reverse">
          <Grid item md={12} container justify="center"><Input type="submit" disableUnderline value="Tambah KKH" /></Grid>
        </Grid>
      </form>
    </Dialog>
  )
}

AddKKH.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default AddKKH