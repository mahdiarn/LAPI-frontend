import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Dialog, DialogTitle, Grid, TextField, Divider } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import Progress from '../Progress/Progress'
import Input from '../Button/MainInput'

import {jenisInformasi as jenisInformasiList} from '../../Shared/Config'
import APIBuilder from '../../Shared/APIBuilder'

function AddLog(props) {
  const [progressVisibility, setProgressVisibility] = useState(false)

  const [informasi, setInformasi] = useState('')
  const [selectedJenisInformasi, setSelectedJenisInformasi] = useState(0)

  const { onClose, selectedValue, open, proyekId } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleSubmit = async (e) => {
    setProgressVisibility(true)
    e.preventDefault()
    let payload = {
      proyek_id: proyekId,
      message: informasi,
      status: selectedJenisInformasi
    }

    const response = await APIBuilder('log', payload, 'POST')
    if (response.code === 200) alert('Pembuatan Informasi Berhasil!')
    setProgressVisibility(false)
    return handleClose()
  }
  
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='md' fullWidth PaperProps={{style : {padding:'1em 2em'}}}>
      <Progress visibility={progressVisibility} />
      <DialogTitle id="simple-dialog-title">Tambah Data Informasi</DialogTitle>
      <Divider />
      <br />
      <form onSubmit={handleSubmit} style={{padding: '0em 1em'}}>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Jenis Informasi</Grid>
          <Grid item md={8}>
            <Autocomplete
              options={jenisInformasiList}
              getOptionLabel={option => option.name}
              renderInput={params => (
                <TextField {...params} label="Jenis Informasi" variant="outlined" fullWidth />
              )}
              onChange={(event, values) => setSelectedJenisInformasi(values.value)}
            />
          </Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Pesan</Grid>
          <Grid item md={8}><TextField id="input-informasi" multiline rows={3} label="Informasi" variant="outlined" type="text" fullWidth value={informasi || ''} onChange={e => setInformasi(e.target.value)}/></Grid>
        </Grid>
        <Grid item container>&nbsp;</Grid>
        <Grid item container direction="row-reverse">
          <Grid item md={4} container direction="row-reverse"><Input type="submit" disableUnderline>Tambah Informasi</Input></Grid>
        </Grid>
      </form>
    </Dialog>
  )
}

AddLog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default AddLog