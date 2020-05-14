import React from 'react'

import { Grid, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import { jenisPemberiKerja as jenisPemberiKerjaList } from '../../Shared/Config'

const AddPemberiKerjaChildForm = ({namaPemberiKerja, setNamaPemberiKerja, alamatPemberiKerja, setAlamatPemberiKerja, selectedJenisPemberiKerja, setSelectedJenisPemberiKerja}) => {
  return(
    <div>
      <Grid item container alignItems="center" justify="space-between" spacing={2}>
        <Grid item md={4}>Nama Pemberi Kerja</Grid>
        <Grid item md={6}><TextField id="input-nama-perusahaan" label="Nama Perusahaan" variant="outlined" type="text" fullWidth value={namaPemberiKerja || ''} onChange={e => setNamaPemberiKerja(e.target.value)}/></Grid>
        <Grid item md={2}>&nbsp;</Grid>
      </Grid>
      <Grid item container alignItems="center" justify="space-between" spacing={2}>
        <Grid item md={4}>Alamat Pemberi Kerja</Grid>
        <Grid item md={6}><TextField id="input-alamat-perusahaan" multiline rows="3" label="Alamat Perusahaan" variant="outlined" type="text" fullWidth value={alamatPemberiKerja || ''} onChange={e => setAlamatPemberiKerja(e.target.value)}/></Grid>
        <Grid item md={2}>&nbsp;</Grid>
      </Grid>
      <Grid item container alignItems="center" justify="space-between" spacing={2}>
        <Grid item md={4}>Jenis Instansi</Grid>
        <Grid item md={6}>
          <Autocomplete
            options={jenisPemberiKerjaList}
            getOptionLabel={option => option.name}
            renderInput={params => (
              <TextField {...params} label="Jenis Instansi" variant="outlined" fullWidth />
            )}
            onChange={(event, values) => setSelectedJenisPemberiKerja(values.value)}
          />
        </Grid>
        <Grid item md={2}>&nbsp;</Grid>
      </Grid>
    </div>
  )
}


export default AddPemberiKerjaChildForm