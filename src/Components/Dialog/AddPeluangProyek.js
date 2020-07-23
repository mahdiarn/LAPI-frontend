import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Dialog, DialogTitle, Grid, TextField, Divider } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import Progress from '../Progress/Progress'
import Input from '../Button/MainInput'
import Button from '../Button/MainButtonOutlined'
import AddPemberiKerjaChildForm from '../Form/AddPemberiKerjaChildForm'
import AddTimForm from '../Form/AddTimForm'

import {klasifikasiProyek as klasifikasiProyekList, jenisPengadaan as jenisPengadaanList, informasiPembawaPekerjaan as informasiPembawaPekerjaanList} from '../../Shared/Config'
import APIBuilder from '../../Shared/APIBuilder'
import Constants from '../../Shared/Constants'

function AddPeluangProyek(props) {
  const [progressVisibility, setProgressVisibility] = useState(false)
  
  const [kkList, setKKList] = useState([])
  const [timList, setTimList] = useState([])
  const [pemberiKerjaList, setPemberiKerjaList] = useState([])
  const [namaProyek, setNamaProyek] = useState('')

  const [selectedPemberiKerja, setSelectedPemberiKerja] = useState(0)
  const [addPemberiKerjaFormVisibility, setAddPemberiKerjaFormVisibility] = useState(false)
  const [namaPemberiKerja, setNamaPemberiKerja] = useState('')
  const [alamatPemberiKerja, setAlamatPemberiKerja] = useState('')
  const [selectedJenisPemberiKerja, setSelectedJenisPemberiKerja] = useState(1)

  const [selectedKlasifikasiProyek, setSelectedKlasifikasiProyek] = useState(1)
  const [selectedProsesPengadaan, setSelectedProsesPengadaan] = useState(1)
  const [selectedInformasiPembawaPekerjaan, setSelectedInformasiPembawaPekerjaan] = useState(1)

  const [selectedTim, setSelectedTim] = useState(0)
  const [addTimFormVisibility, setAddTimFormVisibility] = useState(false)
  const [namaKetuaTim, setNamaKetuaTim] = useState('')
  const [namaPMTim, setNamaPMTim] = useState('')
  const [emailTim, setEmailTim] = useState('')
  const [selectedKelompokKeahlianTim, setSelectedKelompokKeahlianTim] = useState(1)

  const [selectedUsulanTimSatu, setSelectedUsulanTimSatu] = useState(0)
  const [addUsulanTimSatuFormVisibility, setAddUsulanTimSatuFormVisibility] = useState(false)
  const [namaKetuaUsulanTimSatu, setNamaKetuaUsulanTimSatu] = useState('')
  const [namaPMUsulanTimSatu, setNamaPMUsulanTimSatu] = useState('')
  const [emailUsulanTimSatu, setEmailUsulanTimSatu] = useState('')
  const [selectedKelompokKeahlianUsulanTimSatu, setSelectedKelompokKeahlianUsulanTimSatu] = useState(1)

  const [selectedUsulanTimDua, setSelectedUsulanTimDua] = useState(0)
  const [addUsulanTimDuaFormVisibility, setAddUsulanTimDuaFormVisibility] = useState(false)
  const [namaKetuaUsulanTimDua, setNamaKetuaUsulanTimDua] = useState('')
  const [namaPMUsulanTimDua, setNamaPMUsulanTimDua] = useState('')
  const [emailUsulanTimDua, setEmailUsulanTimDua] = useState('')
  const [selectedKelompokKeahlianUsulanTimDua, setSelectedKelompokKeahlianUsulanTimDua] = useState(1)
  useEffect(() => {
    async function getPemberiKerjaList() {
      const response = await APIBuilder('pemberi-kerja')
      if (response.code === 200) {
        setPemberiKerjaList(response.payload.data)
      }
    }

    async function getKKList() {
      let kkResponse = await APIBuilder('kk')
      if (kkResponse.code === 200) {
        setKKList(kkResponse.payload.data)
      }
    }

    async function getTimList() {
      let timResponse = await APIBuilder('tim')
      if (timResponse.code === 200 && (!timResponse.error)) {
        setTimList(timResponse.payload.data)
      }
    }
    getPemberiKerjaList()
    getKKList()
    getTimList()
    setNamaProyek('')
  }, []) 

  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleSubmit = async (e) => {
    setProgressVisibility(true)
    e.preventDefault()
    let payload = {
      nama: namaProyek,
      pemberi_kerja: selectedPemberiKerja,
      klasifikasi: selectedKlasifikasiProyek,
      pengadaan: selectedProsesPengadaan,
      pembawa_pekerjaan: selectedInformasiPembawaPekerjaan,
      tim: selectedTim,
      usulan_tim_satu: selectedUsulanTimSatu,
      usulan_tim_dua: selectedUsulanTimDua,
      nama_pemberi_kerja: namaPemberiKerja,
      alamat_pemberi_kerja: alamatPemberiKerja,
      jenis_instansi: selectedJenisPemberiKerja,
      nama_ketua_tim: namaKetuaTim,
      kelompok_keahlian_tim: selectedKelompokKeahlianTim,
      nama_pm_tim: namaPMTim,
      email_tim: emailTim,
      nama_ketua_usulan_tim_satu: namaKetuaUsulanTimSatu,
      kelompok_keahlian_usulan_tim_satu: selectedKelompokKeahlianUsulanTimSatu,
      nama_pm_usulan_tim_satu: namaPMUsulanTimSatu,
      email_usulan_tim_satu: emailUsulanTimSatu,
      nama_ketua_usulan_tim_dua: namaKetuaUsulanTimDua,
      kelompok_keahlian_usulan_tim_dua: selectedKelompokKeahlianUsulanTimDua,
      nama_pm_usulan_tim_dua: namaPMUsulanTimDua,
      email_usulan_tim_dua: emailUsulanTimDua
    }

    const response = await APIBuilder('peluang-proyek', payload, 'POST')
    if (response.code !== 200){
      alert('Pembuatan Proyek Gagal! ' + response.payload.data)
      return setProgressVisibility(false)
    }

    if (response.code === 200) {
      alert('Pembuatan Proyek Berhasil!')
      setNamaProyek("")
      setSelectedPemberiKerja(0)
      setSelectedKlasifikasiProyek(0)
      setSelectedProsesPengadaan(0)
      setSelectedInformasiPembawaPekerjaan(0)
      setSelectedTim(0)
      setSelectedUsulanTimSatu(0)
      setSelectedUsulanTimDua(0)
      setNamaPemberiKerja("")
      setAlamatPemberiKerja("")
      setSelectedJenisPemberiKerja(0)
      setNamaKetuaTim("")
      setSelectedKelompokKeahlianTim(0)
      setNamaPMTim("")
      setEmailTim("")
      setNamaKetuaUsulanTimSatu("")
      setSelectedKelompokKeahlianUsulanTimSatu(0)
      setNamaPMUsulanTimSatu("")
      setEmailUsulanTimSatu("")
      setNamaKetuaUsulanTimDua("")
      setSelectedKelompokKeahlianUsulanTimDua(0)
      setNamaPMUsulanTimDua("")
      setEmailUsulanTimDua("")
      setProgressVisibility(false)
      return handleClose()
    }

  }

  const toggleAddPemberiKerjaForm = () => {
    setSelectedPemberiKerja(0)
    setAddPemberiKerjaFormVisibility(!addPemberiKerjaFormVisibility)
  }

  const toggleAddTimForm = () => {
    setSelectedTim(0)
    setAddTimFormVisibility(!addTimFormVisibility)
  }

  const toggleAddUsulanTimSatuForm = () => {
    setSelectedUsulanTimSatu(0)
    setAddUsulanTimSatuFormVisibility(!addUsulanTimSatuFormVisibility)
  }

  const toggleAddUsulanTimDuaForm = () => {
    setSelectedUsulanTimDua(0)
    setAddUsulanTimDuaFormVisibility(!addUsulanTimDuaFormVisibility)
  }
  
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='md' fullWidth PaperProps={{style : {padding:'1em 2em'}}}>
      <Progress visibility={progressVisibility} />
      <DialogTitle id="simple-dialog-title">Tambah Data Peluang</DialogTitle>
      <Divider />
      <br />
      <form onSubmit={handleSubmit} style={{padding: '0em 1em'}}>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Nama Proyek</Grid>
          <Grid item md={6}><TextField id="input-nama-proyek" label="Nama Proyek" variant="outlined" type="text" fullWidth value={namaProyek || ''} onChange={e => setNamaProyek(e.target.value)}/></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>{addPemberiKerjaFormVisibility ? 'Tambah ' : ''}Pemberi Kerja</Grid>
          <Grid item md={6}>
            {!addPemberiKerjaFormVisibility ? (<Autocomplete
              options={pemberiKerjaList}
              getOptionLabel={option => option.nama}
              renderInput={params => (
                <TextField {...params} label="Pemberi Kerja" variant="outlined" fullWidth />
              )}
              onChange={(event, values) => setSelectedPemberiKerja(values.id)}
            />) : (<div></div>) }
          </Grid>
          <Grid item md={2}><Button onClick={toggleAddPemberiKerjaForm}>{ addPemberiKerjaFormVisibility ? `Batal Tambah Data` : `Tambah Data`}</Button></Grid>
        </Grid>
        { 
          addPemberiKerjaFormVisibility ? 
            <AddPemberiKerjaChildForm
              namaPemberiKerja={namaPemberiKerja}
              setNamaPemberiKerja={setNamaPemberiKerja}
              alamatPemberiKerja={alamatPemberiKerja}
              setAlamatPemberiKerja={setAlamatPemberiKerja}
              selectedJenisPemberiKerja={selectedJenisPemberiKerja}
              setSelectedJenisPemberiKerja={setSelectedJenisPemberiKerja}
            />
          : ''
        }
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Klasifikasi Proyek</Grid>
          <Grid item md={6}>
            <Autocomplete
              options={klasifikasiProyekList}
              getOptionLabel={option => option.name}
              renderInput={params => (
                <TextField {...params} label="Klasifikasi Proyek" variant="outlined" fullWidth />
              )}
              onChange={(event, values) => setSelectedKlasifikasiProyek(values.value)}
            />
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Proses Pengadaan</Grid>
          <Grid item md={6}>
            <Autocomplete
              options={jenisPengadaanList}
              getOptionLabel={option => option.name}
              renderInput={params => (
                <TextField {...params} label="Proses Pengadaan" variant="outlined" fullWidth />
              )}
              onChange={(event, values) => setSelectedProsesPengadaan(values.value)}
            />
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Informasi Pembawa Pekerjaan</Grid>
          <Grid item md={6}>
            <Autocomplete
              options={informasiPembawaPekerjaanList}
              getOptionLabel={option => option.name}
              renderInput={params => (
                <TextField {...params} label="Informasi Pembawa Pekerjaan" variant="outlined" fullWidth />
              )}
              onChange={(event, values) => setSelectedInformasiPembawaPekerjaan(values.value)}
            />
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        {
          ((selectedInformasiPembawaPekerjaan === Constants.INFORMASI_PEMBAWA_PEKERJAAN_MANAJEMEN_LAPI) || (selectedInformasiPembawaPekerjaan === Constants.INFORMASI_PEMBAWA_PEKERJAAN_USER_CLIENT)) ? (
          <div>
            <Grid item container alignItems="center" justify="space-between" spacing={2}>
              <Grid item md={4}>{addUsulanTimSatuFormVisibility ? 'Tambah ' : ''}Usulan Tim 1</Grid>
              <Grid item md={6}>
                {addUsulanTimSatuFormVisibility ? '' : (
                  <Autocomplete
                    options={timList}
                    getOptionLabel={option => `Ketua ${option.nama_ketua} - KK ${kkList.filter(el => el.id===option.kelompok_keahlian)[0].nama} - PM ${option.nama_pm}`}
                    renderInput={params => (
                      <TextField {...params} label="Usulan Tim 1" variant="outlined" fullWidth />
                    )}
                    onChange={(event, values) => setSelectedUsulanTimSatu(values.id)}
                  />
                )}
              </Grid>
              <Grid item md={2}><Button onClick={toggleAddUsulanTimSatuForm}>{ addUsulanTimSatuFormVisibility ? `Batal Tambah Data` : `Tambah Data`}</Button></Grid>
            </Grid>
            { 
              addUsulanTimSatuFormVisibility ? 
                <AddTimForm
                  kkList={kkList}
                  usulan={true}
                  namaKetuaTim={namaKetuaUsulanTimSatu}
                  setNamaKetuaTim={setNamaKetuaUsulanTimSatu}
                  namaPMTim={namaPMUsulanTimSatu}
                  setNamaPMTim={setNamaPMUsulanTimSatu}
                  emailTim={emailUsulanTimSatu}
                  setEmailTim={setEmailUsulanTimSatu}
                  selectedKelompokKeahlianTim={selectedKelompokKeahlianUsulanTimSatu}
                  setSelectedKelompokKeahlianTim={setSelectedKelompokKeahlianUsulanTimSatu}
                />
              : ''
            }
            <Grid item container alignItems="center" justify="space-between" spacing={2}>
              <Grid item md={4}>{addUsulanTimDuaFormVisibility ? 'Tambah ' : ''}Usulan Tim 2</Grid>
              <Grid item md={6}>
                {addUsulanTimDuaFormVisibility ? '' : (
                  <Autocomplete
                    options={timList}
                    getOptionLabel={option => `Ketua ${option.nama_ketua} - KK ${kkList.filter(el => el.id===option.kelompok_keahlian)[0].nama} - PM ${option.nama_pm}`}
                    renderInput={params => (
                      <TextField {...params} label="Usulan Tim 2" variant="outlined" fullWidth />
                    )}
                    onChange={(event, values) => setSelectedUsulanTimDua(values.id)}
                  />
                )}
              </Grid>
              <Grid item md={2}><Button onClick={toggleAddUsulanTimDuaForm}>{ addUsulanTimDuaFormVisibility ? `Batal Tambah Data` : `Tambah Data`}</Button></Grid>
            </Grid>
            { 
              addUsulanTimDuaFormVisibility ? 
                <AddTimForm
                  kkList={kkList}
                  usulan={true}
                  namaKetuaTim={namaKetuaUsulanTimDua}
                  setNamaKetuaTim={setNamaKetuaUsulanTimDua}
                  namaPMTim={namaPMUsulanTimDua}
                  setNamaPMTim={setNamaPMUsulanTimDua}
                  emailTim={emailUsulanTimDua}
                  setEmailTim={setEmailUsulanTimDua}
                  selectedKelompokKeahlianTim={selectedKelompokKeahlianUsulanTimDua}
                  setSelectedKelompokKeahlianTim={setSelectedKelompokKeahlianUsulanTimDua}
                />
              : ''
            }
          </div>
        
        ) : (
          <div>
            <Grid item container alignItems="center" justify="space-between" spacing={2}>
              <Grid item md={4}>{addTimFormVisibility ? 'Tambah ' : ''}Tim</Grid>
              <Grid item md={6}>
                {addTimFormVisibility ? '' : (
                  <Autocomplete
                    options={timList}
                    getOptionLabel={option => `Ketua ${option.nama_ketua} - KK ${kkList.filter(el => el.id===option.kelompok_keahlian)[0].nama} - PM ${option.nama_pm}`}
                    renderInput={params => (
                      <TextField {...params} label="Tim" variant="outlined" fullWidth />
                    )}
                    onChange={(event, values) => setSelectedTim(values.id)}
                  />
                )}
              </Grid>
              <Grid item md={2}><Button onClick={toggleAddTimForm}>{ addTimFormVisibility ? `Batal Tambah Data` : `Tambah Data`}</Button></Grid>
            </Grid>
            { 
              addTimFormVisibility ? 
                <AddTimForm
                  kkList={kkList}
                  namaKetuaTim={namaKetuaTim}
                  setNamaKetuaTim={setNamaKetuaTim}
                  namaPMTim={namaPMTim}
                  setNamaPMTim={setNamaPMTim}
                  emailTim={emailTim}
                  setEmailTim={setEmailTim}
                  selectedKelompokKeahlianTim={selectedKelompokKeahlianTim}
                  setSelectedKelompokKeahlianTim={setSelectedKelompokKeahlianTim}
                />
              : ''
            }
          </div>
        )}
        <Grid item container>&nbsp;</Grid>
        <Grid item container direction="row-reverse">
          <Grid item md={4} container direction="row-reverse"><Input type="submit" disableUnderline>Tambah Peluang</Input></Grid>
        </Grid>
      </form>
    </Dialog>
  )
}

AddPeluangProyek.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default AddPeluangProyek