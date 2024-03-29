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

function EditKKH(props) {
  const [progressVisibility, setProgressVisibility] = useState(false)
  
  const [nipList, setNipList] = useState([])
  const [kegiatan, setKegiatan] = useState('')
  const [nip, setNip] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const { onClose, selectedValue, open, selectedKKH } = props

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
        newNip.push(``)
        response.payload.data.forEach((el) => {
          newNip.push(`P${el.pin}`)
        })
        setNipList(newNip)
      }
    }

    let start_date = new Date()
    if (
      (selectedKKH.start_time) &&
      (selectedKKH.start_time !== '-')
    ) {
      start_date.setHours(selectedKKH.start_time.split(':')[0])
      start_date.setMinutes(selectedKKH.start_time.split(':')[1])
      start_date.setSeconds(0)
    }

    let end_date = new Date()
    if (
      (selectedKKH.end_time) &&
      (selectedKKH.end_time !== '-')
    ){
      end_date.setHours(selectedKKH.end_time.split(':')[0])
      end_date.setMinutes(selectedKKH.end_time.split(':')[1])
      end_date.setSeconds(0)
    }

    if (selectedKKH.kegiatan) {
      setKegiatan(selectedKKH.kegiatan)
    }

    setStartDate(start_date)
    setEndDate(end_date)

    getNIPList()
    if (selectedKKH.nip) {
      let parsedNIP = "P" + selectedKKH.nip
      setNip(parsedNIP)
    }
  }, [selectedKKH]) 

  const handleClose = () => {
    setNip('')
    onClose(selectedValue)
  }

  const handleSubmit = async (e) => {
    setProgressVisibility(true)
    e.preventDefault()
    let payload = {
      kegiatan,
      nip,
      startDate,
      endDate
    }

    const response = await APIBuilder(`log/kkh/${selectedKKH.id}`, payload, 'POST')
    if (response.code !== 200){
      alert('Perubahan KKH Gagal!')
      setProgressVisibility(false)
    }

    if (response.code === 200) {
      alert('Perubahan KKH Berhasil!')
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
      <DialogTitle id="simple-dialog-title" align="center">Ubah Data Kartu Kegiatan Harian</DialogTitle>
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
              value={nip || ""}
              options={nipList}
              getOptionLabel={option => option}
              renderInput={params => (
                <TextField {...params} label="NIP" variant="outlined" fullWidth />
              )}
              onChange={(event, values) => {
                return setNip(values)
              }}
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
          <Grid item md={12} container justify="center"><Input type="submit" disableUnderline value="Ubah KKH" /></Grid>
        </Grid>
      </form>
    </Dialog>
  )
}

EditKKH.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedKKH: PropTypes.object.isRequired
}

export default EditKKH