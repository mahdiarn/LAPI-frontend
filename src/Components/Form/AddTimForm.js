import React from 'react'

import { Grid, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

const AddTimForm = ({
    kkList,
    usulan,
    namaKetuaTim,
    setNamaKetuaTim,
    namaPMTim,
    setNamaPMTim,
    emailTim,
    setEmailTim,
    selectedKelompokKeahlianTim,
    setSelectedKelompokKeahlianTim,
    isWide = false
  }) => {
  return(
    <div>
      <Grid item container alignItems="center" justify="space-between" spacing={2}>
        <Grid item md={4}>Nama Ketua {usulan ? 'Usulan ': ''}Tim Pelaksana</Grid>
        <Grid item md={isWide? 8 : 6}><TextField id="input-nama-perusahaan" label="Nama" variant="outlined" type="text" fullWidth value={namaKetuaTim || ''} onChange={e => setNamaKetuaTim(e.target.value)}/></Grid>
        {isWide ? (<div />) : (<Grid item md={2}>&nbsp;</Grid>)}
      </Grid>
      <Grid item container alignItems="center" justify="space-between" spacing={2}>
        <Grid item md={4}>Kelompok Keahlian {usulan ? 'Usulan ': ''}Tim</Grid>
        <Grid item md={isWide? 8 : 6}>
          <Autocomplete
            options={kkList}
            getOptionLabel={option => option.nama}
            renderInput={params => (
              <TextField {...params} label="Jenis Kelompok Keahlian" variant="outlined" fullWidth />
            )}
            onChange={(event, values) => values ? setSelectedKelompokKeahlianTim(values.id) : false}
          />
        </Grid>
        {isWide ? (<div />) : (<Grid item md={2}>&nbsp;</Grid>)}
      </Grid>
      <Grid item container alignItems="center" justify="space-between" spacing={2}>
        <Grid item md={4}>Nama PM {usulan ? 'Usulan ': ''}Tim Pelaksana</Grid>
        <Grid item md={isWide? 8 : 6}><TextField id="input-nama-perusahaan" label="Nama" variant="outlined" type="text" fullWidth value={namaPMTim || ''} onChange={e => setNamaPMTim(e.target.value)}/></Grid>
        {isWide ? (<div />) : (<Grid item md={2}>&nbsp;</Grid>)}
      </Grid>
      <Grid item container alignItems="center" justify="space-between" spacing={2}>
        <Grid item md={4}>Email {usulan ? 'Usulan ': ''}Tim Pelaksana</Grid>
        <Grid item md={isWide? 8 : 6}><TextField id="input-alamat-perusahaan"  label="Email" variant="outlined" type="email" fullWidth value={emailTim || ''} onChange={e => setEmailTim(e.target.value)}/></Grid>
        {isWide ? (<div />) : (<Grid item md={2}>&nbsp;</Grid>)}
      </Grid>
      
    </div>
  )
}


export default AddTimForm