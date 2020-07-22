import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Dialog, DialogTitle, Grid, Divider, Typography } from '@material-ui/core'
import Progress from '../Progress/Progress'
import Input from '../Button/MainInput'
import Button from '../Button/MainButton'

import APIBuilder from '../../Shared/APIBuilder'

function AddUser(props) {
  const [progressVisibility, setProgressVisibility] = useState(false)
  const { onClose, selectedValue, open, role, name, email } = props
  
  useEffect(() => {
    
  }, [role, name, email]) 


  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleSubmit = async (e) => {
    setProgressVisibility(true)
    e.preventDefault()
    
    const response = await APIBuilder('create-user', {nama_lengkap: name, email: email, role: role}, 'POST')
    if (response.code !== 200){
      alert('Pembuatan User Gagal!')
      return
    }

    alert('Berhasil Membuat User Baru!')
    return window.location.reload();

  }
  
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='md' fullWidth PaperProps={{style : {padding:'1em 2em'}}}>
      <Progress visibility={progressVisibility} />
      <DialogTitle id="simple-dialog-title" align="center">Konfirmasi</DialogTitle>
      <Divider />
      <br />
      <form onSubmit={handleSubmit} style={{padding: '0em 1em'}}>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={12}><Typography align="center">Apakah data sudah terisi dengan benar?</Typography></Grid>
        </Grid>
        <Grid item container>&nbsp;</Grid>
        <Grid item container direction="row-reverse" spacing={2}>
          <Grid item><Button onClick={handleClose} style={{backgroundColor: '#AB0000'}}>Tidak</Button></Grid>
          <Grid item><Input type="submit" disableUnderline value="YA" /></Grid>
        </Grid>
      </form>
    </Dialog>
  )
}

AddUser.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default AddUser