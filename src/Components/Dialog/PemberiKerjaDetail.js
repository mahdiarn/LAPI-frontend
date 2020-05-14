import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'


import { Dialog, DialogTitle, Grid, TextField, Divider, Typography } from '@material-ui/core'
import APIBuilder from '../../Shared/APIBuilder'
import Constants from '../../Shared/Constants'
import Progress from '../Progress/Progress'
import Input from '../Button/MainInput'
import NPWPTextFormat from '../TextFormat/NPWPTextFormat'

import {
  jenisPemberiKerja as jenisPemberiKerjaList
} from '../../Shared/Config'

function PemberiKerjaDetail(props) {
  const [progressVisibility, setProgressVisibility] = useState(false)
  const [emailKontak, setEmailKontak] = useState('')
  const [teleponKontak, setTeleponKontak] = useState('')
  const [faxKontak, setFaxKontak] = useState('')
  const [kontakPersonal, setKontakPersonal] = useState('')
  const [penandatangananKontrak, setPenandatangananKontrak] = useState('')
  const [NPWP, setNPWP] = useState('') 
  
  const {
    onClose,
    open,
    proyekId,
    namaPerusahaan,
    alamatPerusahaan,
    jenisInstansi,
    myroute,
    emailPemberiKerja,
    teleponPemberiKerja,
    faxPemberiKerja,
    kontakPersonalPemberiKerja,
    penandatangananKontrakPemberiKerja,
    npwpPemberiKerja,
    status,
  } = props

  useEffect(() => {
    setEmailKontak(emailPemberiKerja)
    setTeleponKontak(teleponPemberiKerja)
    setFaxKontak(faxPemberiKerja)
    setKontakPersonal(kontakPersonalPemberiKerja)
    setPenandatangananKontrak(penandatangananKontrakPemberiKerja)
    setNPWP(npwpPemberiKerja)
  }, [
    emailPemberiKerja,
    teleponPemberiKerja,
    faxPemberiKerja,
    kontakPersonalPemberiKerja,
    penandatangananKontrakPemberiKerja,
    npwpPemberiKerja
  ])
  
  const handleClose = () => {
    onClose()
  }

  const handleSubmit = async (e) => {
    setProgressVisibility(true)
    e.preventDefault()
    const payload = {
      email_pemberi_kerja: emailKontak,
      telepon_pemberi_kerja: teleponKontak,
      fax_pemberi_kerja: faxKontak,
      kontak_personal_pemberi_kerja: kontakPersonal,
      penandatanganan_kontrak_pemberi_kerja: penandatangananKontrak,
      npwp_pemberi_kerja: NPWP
    }
    const response = await APIBuilder(`detail-proyek/${proyekId}`, payload, 'POST')
    if (response.code === 200) {
      alert('Berhasil ubah detail proyek!')
      
    }
  
    // HANDLE TOGGLE
    setProgressVisibility(false)
    return handleClose()
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='md' fullWidth PaperProps={{style : {padding:'1em 2em'}}}>
      <Progress visibility={progressVisibility} />
      <Grid container alignItems="center" justify="flex-end">
        <Link to={myroute} onClick={() => {handleClose()}}>X</Link>
      </Grid>
      <DialogTitle id="simple-dialog-title" align="center">Data Pemberi Kerja</DialogTitle>
      <Divider />
      <br />
      <form onSubmit={handleSubmit} style={{padding: '0em 1em'}}>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Nama Perusahaan</Grid>
          <Grid item md={6}><Typography>{namaPerusahaan}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Jenis Instansi</Grid>
          <Grid item md={6}><Typography>{jenisPemberiKerjaList.filter((el) => {return el.value===jenisInstansi})[0].name}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>AlamatPerusahaan</Grid>
          <Grid item md={6}><Typography>{alamatPerusahaan}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Email Kontak</Grid>
          <Grid item md={6}><TextField id="input-email-kontak" label="Email" variant="outlined" type="email" fullWidth value={emailKontak || ''} onChange={e => setEmailKontak(e.target.value)}/></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Telepon</Grid>
          <Grid item md={6}><TextField id="input-telepon-kontak" label="Telepon" variant="outlined" type="text" fullWidth value={teleponKontak || ''} onChange={e => setTeleponKontak(e.target.value)}/></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Fax</Grid>
          <Grid item md={6}><TextField id="input-fax-kontak" label="Fax" variant="outlined" type="text" fullWidth value={faxKontak || ''} onChange={e => setFaxKontak(e.target.value)}/></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Kontak Personal</Grid>
          <Grid item md={6}><TextField id="input-kontak-personal" label="Nama Kontak Personal" variant="outlined" type="text" fullWidth value={kontakPersonal || ''} onChange={e => setKontakPersonal(e.target.value)}/></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Penandatanganan Kontrak</Grid>
          <Grid item md={6}><TextField id="input-penandatangan-kontrak" label="Nama Penandatangan" variant="outlined" type="text" fullWidth value={penandatangananKontrak || ''} onChange={e => setPenandatangananKontrak(e.target.value)}/></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>NPWP</Grid>
          <Grid item md={6}>
            <TextField
              id="input-npwp"
              InputProps={{
                inputComponent: NPWPTextFormat,
              }}
              fullWidth
              variant="outlined"
              label="NPWP"
              value={NPWP}
              onChange={e => setNPWP(e.target.value)}
            />
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container>&nbsp;</Grid>
        {(status === Constants.PROYEK_STATUS_END) ? (<div/>) : (
          <Grid item container direction="row-reverse">
            <Grid item md={4} container direction="row-reverse"><Input type="submit" disableUnderline value="Simpan Perubahan"></Input></Grid>
          </Grid>
        )}
      </form>
    </Dialog>
  )
}

PemberiKerjaDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default PemberiKerjaDetail