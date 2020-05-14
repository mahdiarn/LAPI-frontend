import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Dialog, DialogTitle, Grid, TextField, Divider, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import Progress from '../Progress/Progress'
import Input from '../Button/MainInput'
import {PinTextFormat} from '../../Shared/TextTransformer'

import {statusSPPU as statusSPPUList} from '../../Shared/Config'
import APIBuilder from '../../Shared/APIBuilder'

function AddPembayaranSPPU(props) {
  const [progressVisibility, setProgressVisibility] = useState(false)
  const [proyekWithTerminList, setProyekWithTerminList] = useState([])
  const [namaPemberiKerja, setNamaPemberiKerja] = useState('')
  const [namaProyek, setNamaProyek] = useState('')
  const [namaKetuaTimPelaksana, setNamaKetuaTimPelaksana] = useState('')
  const [selectedProyekId, setSelectedProyekId] = useState(0)
  const [selectedTerminId, setSelectedTerminId] = useState(0)
  const [selectedStatusSPPU, setSelectedStatusSPPU] = useState(0)
  const [tanggalPembayaranSPPU, setTanggalPembayaranSPPU] = useState('')
  const [jumlahPembayaranSPPU, setJumlahPembayaranSPPU] = useState('')

  const [terminList, setTerminList] = useState([])

  useEffect(() => {
    async function getProyekWithTerminList() {
      const response = await APIBuilder('sppu/proyek-with-termin')
      if (response.code === 200) {
        setProyekWithTerminList(response.payload.data)
      }
    }

    getProyekWithTerminList()
  }, []) 

  const { onClose, selectedValue, open, refreshData } = props

  const handleProyekWithTerminListSelected = async (values) => {
    if (values) {
      setSelectedProyekId(values.id)
      setNamaProyek(values.nama)
      setNamaKetuaTimPelaksana(values.nama_ketua)
      setNamaPemberiKerja(values.nama_pemberi_kerja)
      const terminResponse = await APIBuilder(`termin-proyek/proyek/${values.id}`)
      setTerminList(terminResponse.payload.data)
    } else {
      setSelectedProyekId(0)
      setNamaProyek('')
      setNamaKetuaTimPelaksana('')
      setNamaPemberiKerja('')
      setTerminList([])
    }
  }

  const handleClose = () => {
    onClose(selectedValue)
    refreshData()
  }

  const handleSubmit = async (e) => {
    setProgressVisibility(true)
    e.preventDefault()
    let payload = {
      proyek_id: selectedProyekId,
      termin_id: selectedTerminId,
      tanggal_pembayaran: tanggalPembayaranSPPU,
      jumlah_pembayaran: jumlahPembayaranSPPU,
      status_pembayaran: selectedStatusSPPU,
    }
    console.log(payload)

    const response = await APIBuilder('sppu', payload, 'POST')
    if (response.code !== 200){
      alert('Pembuatan SPPU Gagal!')
      console.log(response.payload.data)
      return
    }

    if (response.code === 200) {
      alert('Pembuatan SPPU Berhasil!')
      setSelectedProyekId(0)
      setNamaProyek('')
      setNamaPemberiKerja('')
      setNamaKetuaTimPelaksana('')
      setSelectedTerminId(0)
      setTanggalPembayaranSPPU('')
      setJumlahPembayaranSPPU('')
      setSelectedStatusSPPU(0)
      setProgressVisibility(false)
      return handleClose()
    }

  }
  
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='md' fullWidth PaperProps={{style : {padding:'1em 2em'}}}>
      <Progress visibility={progressVisibility} />
      <DialogTitle id="simple-dialog-title" align="center">Tambah Data SPPU</DialogTitle>
      <Divider />
      <form onSubmit={handleSubmit} style={{padding: '0em 1em'}}>
        <Grid container alignItems="center" justify="space-between" spacing={2}>&nbsp;</Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>NIP</Grid>
          <Grid item md={6}>
            <Autocomplete
              options={proyekWithTerminList}
              getOptionLabel={option => `P${PinTextFormat(option.pin)}`}
              renderInput={params => (
                <TextField {...params} label="NIP" variant="outlined" fullWidth />
              )}
              onChange={(event, values) => handleProyekWithTerminListSelected(values)}
            />
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Nama Proyek</Grid>
          <Grid item md={6}><Typography variant="body1">{namaProyek}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Pemberi Kerja</Grid>
          <Grid item md={6}><Typography variant="body1">{namaPemberiKerja}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Tim Pelaksana</Grid>
          <Grid item md={6}><Typography variant="body1">{namaKetuaTimPelaksana}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Termin Ke-</Grid>
          <Grid item md={6}>
            <Autocomplete
              key={namaProyek}
              options={terminList}
              getOptionLabel={option => `${option.termin_ke}`}
              renderInput={params => (
                <TextField {...params} label="Termin ke-" variant="outlined" fullWidth />
              )}
              onChange={(event, values) => {
                if (values) {
                  setSelectedTerminId(values.id)
                } else {
                  setSelectedTerminId(0)
                }
              }}
            />
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Tanggal Pembayaran</Grid>
          <Grid item md={6}><TextField type="date" id="input-tanggal-pembayaran-sppu" variant="outlined" fullWidth value={tanggalPembayaranSPPU || ''} onChange={e => setTanggalPembayaranSPPU(e.target.value)}/></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Jumlah Pembayaran</Grid>
          <Grid item md={6}><TextField id="input-jumlah-pembayaran" label="Jumlah Pembayaran" variant="outlined" type="text" fullWidth value={jumlahPembayaranSPPU || ''} onChange={e => setJumlahPembayaranSPPU(e.target.value)}/></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Status</Grid>
          <Grid item md={6}>
            <Autocomplete
              options={statusSPPUList}
              getOptionLabel={option => option.name}
              renderInput={params => (
                <TextField {...params} label="Status" variant="outlined" fullWidth />
              )}
              onChange={(event, values) => {
                if (values) {
                  setSelectedStatusSPPU(values.value)
                } else {
                  setSelectedStatusSPPU(0)
                }
              }}
            />
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container>&nbsp;</Grid>
        <Grid item container direction="row" justify="center">
          <Grid item><Input type="submit" value="Tambah SPPU" disableUnderline>Tambah SPPU</Input></Grid>
        </Grid>
        <Grid item container>&nbsp;</Grid>
      </form>
    </Dialog>
  )
}

AddPembayaranSPPU.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default AddPembayaranSPPU