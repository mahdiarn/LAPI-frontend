import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import { Dialog, DialogTitle, Grid, TextField, Divider } from '@material-ui/core'
import Progress from '../Progress/Progress'
import Input from '../Button/MainInput'

import {
  baseUrl
} from '../../Shared/Config'


function Upload(props) {
  const [progressVisibility, setProgressVisibility] = useState(false)
  const [file, setFile] = useState({})
  const [label, setLabel] = useState('')
  
  const { onClose, selectedValue, open, uploadCvTimId, proyekId } = props
  
  const handleClose = () => {
    onClose(selectedValue)
  }

  const onChangeHandler = event => {
    setFile(event.target.files[0])
  }

  const handleSubmit = async (e) => {
    setProgressVisibility(true)
    e.preventDefault()

    let data = new FormData() 
    data.append('asdf', "0")
    data.append('file', file)
    data.append('label', label)
    if (uploadCvTimId) data.append('tim_id', uploadCvTimId)
    if (proyekId) data.append('proyek_id', proyekId)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      data: data,
      url: `${baseUrl}/file`,
    }
    
    axios(options).then(() => {
      alert('Berhasil upload file!')
      setProgressVisibility(false)
    })
    return handleClose()
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='md' fullWidth PaperProps={{style : {padding:'1em 2em'}}}>
      <Progress visibility={progressVisibility} />
      <DialogTitle id="simple-dialog-title">Upload file</DialogTitle>
      <Divider />
      <br />
      <form onSubmit={handleSubmit} style={{padding: '0em 1em'}}>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Nama File</Grid>
          <Grid item md={6}><TextField id="input-nama-file" label="Nama File" variant="outlined" type="text" fullWidth value={label || ''} onChange={e => setLabel(e.target.value)}/></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>File</Grid>
          <Grid item md={6}><input type="file" name="file" onChange={onChangeHandler}/></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container>&nbsp;</Grid>
        <Grid item container direction="row-reverse">
          <Grid item md={4} container direction="row-reverse"><Input type="submit" disableUnderline value="Upload File">Upload File</Input></Grid>
        </Grid>
      </form>
    </Dialog>
  )
}

Upload.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default Upload