import React from 'react'
import {Link} from 'react-router-dom'

import history from '../../../Shared/History'
import APIBuilder from '../../../Shared/APIBuilder'
import Constants from '../../../Shared/Constants'
import Authorization from '../../../Shared/Authorization'

import Navbar from '../../Navbar/Navbar'
import Button from '../../Button/MainButton'

import {
  Grid,
  Typography,
  Paper,
  Divider,
  TextField,
  Button as MUIButton  
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import UploadDialog from '../../Dialog/Upload'

import {
  klasifikasiProyek as klasifikasiProyekList,
  jenisPengadaan as jenisPengadaanList,
  informasiPembawaPekerjaan as informasiPembawaPekerjaanList,
  konsorsium,
  kemajuanProyek as kemajuanProyekList,
  jenisPengelolaan as jenisPengelolaanList,
  lingkupProyek as lingkupProyekList,
  jenisPemberiKerja as jenisPemberiKerjaList,
  rekamJejakPemberiKerja as rekamJejakPemberiKerjaList,
  rekamJejakTim as rekamJejakTimList,
  kompetensiTim as kompetensiTimList,
  baseUrl
} from '../../../Shared/Config'

class DetailPeluang extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      pcList: [],
      paList: [],
      kkList: [],
      uploadWindow: false,
      peluangName: '',
      pmName: '',
      pcName: '',
      paName: '',
      namaPemberiKerja: '',
      alamatPemberiKerja: '',
      kontakPersonelPemberiKerja: '',
      jenisPemberiKerja: 0,
      klasifikasiPeluang: 0,
      jenisPengadaanPeluang: 0,
      informasiPembawaPekerjaan: 0,
      editDetailMode: false,
      selectedKemajuanProyek: {name: '-', value: 0},
      selectedKonsorsium: {name: '-', value: 0},
      selectedJenisPengelolaan: {name: '-', value: 0},
      selectedLingkupProyek: {name: '-', value: 0},
      selectedPC: {nama_lengkap: '-', id: 0},
      selectedPA: {nama_lengkap: '-', id: 0},
      editPemberiKerjaMode: false,
      selectedRekamJejakPemberiKerja: {name: '-', value: 0},
      timTerpilih: {},
      usulanTimSatu: {},
      usulanTimDua: {},
      editTimMode: false,
      latestLogDate: '',
      latestLogMessage: '',
      uploadCvTimId: 0,
      selectedKlasifikasiProyek: {name: '-', value: 0},
      selectedJenisPengadaan: {name: '-', value: 0},
    }

    this.handleToggleUploadWindow = this.handleToggleUploadWindow.bind(this)
    this.setKlasifikasiProyek = this.setKlasifikasiProyek.bind(this)
    this.setJenisPengadaan = this.setJenisPengadaan.bind(this)
    this.setKemajuanProyek = this.setKemajuanProyek.bind(this)
    this.setKontakPersonelPemberiKerja = this.setKontakPersonelPemberiKerja.bind(this)
    this.setKonsorsium = this.setKonsorsium.bind(this)
    this.setJenisPengelolaan = this.setJenisPengelolaan.bind(this)
    this.setLingkupProyek = this.setLingkupProyek.bind(this)
    this.setPC = this.setPC.bind(this)
    this.setPA = this.setPA.bind(this)
    this.setRekamJejakPemberiKerja = this.setRekamJejakPemberiKerja.bind(this)
    this.acceptProject = this.acceptProject.bind(this)
    this.rejectProject = this.rejectProject.bind(this)
    this.acceptTimSatu = this.acceptTimSatu.bind(this)
    this.acceptTimDua = this.acceptTimDua.bind(this)
  }

  async refreshData() {
    const {id} = this.props.match.params
    const {pcList, paList} = this.state
    try{
      const response = await APIBuilder(`peluang-proyek/${id}`)
      const latestLogResponse = await APIBuilder(`log/latest/${id}`)
      let date = new Date(latestLogResponse.payload.data.created_time)
      let tim_terpilih = {
        id: response.payload.data.id_tim_terpilih,
        namaKetua: response.payload.data.nama_ketua_tim_terpilih,
        kelompokKeahlian: response.payload.data.kelompok_keahlian_tim_terpilih,
        namaPM: response.payload.data.nama_pm_tim_terpilih,
        emailTim: response.payload.data.email_tim_tim_terpilih,
        rekamJejak: response.payload.data.rekam_jejak_tim_terpilih,
        kompetensi: response.payload.data.kompetensi_tim_terpilih,
        cv: {
          id: response.payload.data.cv_tim_terpilih,
          filename: response.payload.data.filename_cv_tim_terpilih,
          extension: response.payload.data.extension_cv_tim_terpilih,
        }
      }
  
      let usulan_tim_1 = {
        id: response.payload.data.id_usulan_tim_1,
        namaKetua: response.payload.data.nama_ketua_usulan_tim_1,
        kelompokKeahlian: response.payload.data.kelompok_keahlian_usulan_tim_1,
        namaPM: response.payload.data.nama_pm_usulan_tim_1,
        emailTim: response.payload.data.email_tim_usulan_tim_1,
        rekamJejak: response.payload.data.rekam_jejak_usulan_tim_1,
        kompetensi: response.payload.data.kompetensi_usulan_tim_1,
        cv: {
          id: response.payload.data.cv_usulan_tim_1,
          filename: response.payload.data.filename_cv_usulan_tim_1,
          extension: response.payload.data.extension_cv_usulan_tim_1,
        }
      }
  
      let usulan_tim_2 = {
        id: response.payload.data.id_usulan_tim_2,
        namaKetua: response.payload.data.nama_ketua_usulan_tim_2,
        kelompokKeahlian: response.payload.data.kelompok_keahlian_usulan_tim_2,
        namaPM: response.payload.data.nama_pm_usulan_tim_2,
        emailTim: response.payload.data.email_tim_usulan_tim_2,
        rekamJejak: response.payload.data.rekam_jejak_usulan_tim_2,
        kompetensi: response.payload.data.kompetensi_usulan_tim_2,
        cv: {
          id: response.payload.data.cv_usulan_tim_2,
          filename: response.payload.data.filename_cv_usulan_tim_2,
          extension: response.payload.data.extension_cv_usulan_tim_2,
        }
      }
      this.setState({
        peluang: response.payload.data,
        pmName: response.payload.data.PM,
        pcName: (response.payload.data.PC) ? response.payload.data.PC : '',
        paName: (response.payload.data.PA) ? response.payload.data.PA : '',
        selectedPC : (pcList.filter(el => el.id===response.payload.data.PC_ID)[0]) ? pcList.filter(el => el.id===response.payload.data.PC_ID)[0] : {nama_lengkap: '-', id: 0},
        selectedPA : (paList.filter(el => el.id===response.payload.data.PA_ID)[0]) ? paList.filter(el => el.id===response.payload.data.PA_ID)[0] : {nama_lengkap: '-', id: 0},
        peluangName: response.payload.data.nama,
        klasifikasiPeluang: response.payload.data.klasifikasi,
        jenisPengadaanPeluang: response.payload.data.pengadaan,
        informasiPembawaPekerjaan: response.payload.data.informasi_pembawa_pekerjaan,
        selectedKemajuanProyek: (kemajuanProyekList.filter(el => el.value===response.payload.data.kemajuan_proyek)[0]) ? kemajuanProyekList.filter(el => el.value===response.payload.data.kemajuan_proyek)[0] : {name: '-', value: 0},
        selectedKonsorsium: (konsorsium.filter(el => el.value===response.payload.data.is_konsorsium)[0]) ? konsorsium.filter(el => el.value===response.payload.data.is_konsorsium)[0] : {name: '-', value: 0},
        selectedJenisPengelolaan: (jenisPengelolaanList.filter(el => el.value===response.payload.data.jenis_pengelolaan)[0]) ? jenisPengelolaanList.filter(el => el.value===response.payload.data.jenis_pengelolaan)[0] : {name: '-', value: 0},
        selectedLingkupProyek: (lingkupProyekList.filter(el => el.value===response.payload.data.lingkup_proyek)[0]) ? lingkupProyekList.filter(el => el.value===response.payload.data.lingkup_proyek)[0] : {name: '-', value: 0},
        namaPemberiKerja: response.payload.data.nama_pemberi_kerja,
        alamatPemberiKerja: response.payload.data.alamat_pemberi_kerja,
        jenisPemberiKerja: response.payload.data.jenis_pemberi_kerja,
        selectedRekamJejakPemberiKerja: (rekamJejakPemberiKerjaList.filter(el => el.value===response.payload.data.rekam_jejak)[0]) ? rekamJejakPemberiKerjaList.filter(el => el.value===response.payload.data.rekam_jejak)[0] : {name: '-', value: 0},
        kontakPersonelPemberiKerja: response.payload.data.kontak_personel,
        timTerpilih: tim_terpilih,
        usulanTimSatu: usulan_tim_1,
        usulanTimDua: usulan_tim_2,
        latestLogDate: isNaN(date.getDate()+1) ? `-` : `${date.getDate()+1}/${date.getMonth()+1}/${date.getFullYear()}`,
        latestLogMessage: latestLogResponse.payload.data.message || `-`,
        selectedKlasifikasiProyek: (klasifikasiProyekList.filter(el => el.value===response.payload.data.klasifikasi)[0]) ? klasifikasiProyekList.filter(el => el.value===response.payload.data.klasifikasi)[0] : {name: '-', value: 0},
        selectedJenisPengadaan: (jenisPengadaanList.filter(el => el.value===response.payload.data.pengadaan)[0]) ? jenisPengadaanList.filter(el => el.value===response.payload.data.pengadaan)[0] : {name: '-', value: 0},
      })
    } catch (error) {
      history.push('/')
    }
  }

  async componentDidMount() {
    async function validateToken() {
      let isValid = await Authorization.validateToken()
      if (!isValid) return history.push('/logout')
    }
    validateToken()
    const pcListResponse = await APIBuilder(`pc`)
    if (pcListResponse.code === 200) {
      this.setState({pcList: pcListResponse.payload.data})
    }

    const kkListResponse = await APIBuilder(`kk`)
    if (kkListResponse.code === 200) {
      this.setState({kkList: kkListResponse.payload.data})
    }

    const paListResponse = await APIBuilder(`pa`)
    if (paListResponse.code === 200) this.setState({paList: paListResponse.payload.data})
    this.refreshData()
  }

  handleToggleUploadWindow = (value) => {
    const { uploadWindow } = this.state
    this.setState({uploadWindow: !(uploadWindow), uploadCvTimId: value})
  }

  toggleDetailEditMode = async () => {
    const {
      editDetailMode,
      selectedPC,
      selectedPA,
      selectedKemajuanProyek,
      selectedJenisPengelolaan,
      selectedLingkupProyek,
      selectedKonsorsium,
      selectedKlasifikasiProyek,
      selectedJenisPengadaan,
    } = this.state
    const {id} = this.props.match.params
    if (editDetailMode) {
      const payload = {
        kemajuan_proyek: selectedKemajuanProyek.value,
        jenis_pengelolaan: selectedJenisPengelolaan.value,
        lingkup_proyek: selectedLingkupProyek.value,
        is_konsorsium: selectedKonsorsium.value,
        klasifikasi: selectedKlasifikasiProyek.value,
        pengadaan: selectedJenisPengadaan.value,
        pc: selectedPC.id,
        pa: selectedPA.id,
      }
      const response = await APIBuilder(`peluang-proyek/${id}`, payload, 'POST')
      if (response.code === 200) {
        alert('Berhasil ubah detail peluang!')
        this.refreshData()
        this.setState({editDetailMode: !editDetailMode})
      } else {
        alert('Gagal ubah detail peluang!')
      }
    } else {
      this.setState({editDetailMode: !editDetailMode})
    }
  }

  togglePemberiKerjaEditMode = async () => {
    const {editPemberiKerjaMode, kontakPersonelPemberiKerja, selectedRekamJejakPemberiKerja} = this.state
    const {id} = this.props.match.params
    
    if (editPemberiKerjaMode) {
      const payload = {
        kontak_personel: kontakPersonelPemberiKerja,
        rekam_jejak: selectedRekamJejakPemberiKerja.value
      }
      const response = await APIBuilder(`peluang-proyek/${id}`, payload, 'POST')
      if (response.code === 200) {
        alert('Berhasil ubah detail peluang!')
        this.refreshData()
      }
    }
    this.setState({editPemberiKerjaMode: !editPemberiKerjaMode})
  }

  toggleTimEditMode = async () => {
    const {
      editTimMode,
      timTerpilih,
      usulanTimSatu,
      usulanTimDua,
    } = this.state
    const {id} = this.props.match.params
    
    if (editTimMode) {
      const payload = {
        rekam_jejak_tim_terpilih: timTerpilih.rekamJejak,
        rekam_jejak_usulan_tim_1: usulanTimSatu.rekamJejak,
        rekam_jejak_usulan_tim_2: usulanTimDua.rekamJejak,
        kompetensi_tim_terpilih: timTerpilih.kompetensi,
        kompetensi_usulan_tim_1: usulanTimSatu.kompetensi,
        kompetensi_usulan_tim_2: usulanTimDua.kompetensi
      }
      const response = await APIBuilder(`peluang-proyek/${id}`, payload, 'POST')
      if (response.code === 200) {
        alert('Berhasil ubah detail peluang!')
        this.refreshData()
      }
    }
    this.setState({editTimMode: !editTimMode})
  }

  setKlasifikasiProyek = (values) => {
    this.setState({selectedKlasifikasiProyek: values})
  }

  setJenisPengadaan = (values) => {
    this.setState({selectedJenisPengadaan: values})
  }

  setKemajuanProyek = (values) => {
    this.setState({selectedKemajuanProyek: values})
  }

  setKontakPersonelPemberiKerja = (values) => {
    this.setState({kontakPersonelPemberiKerja: values})
  }

  setKonsorsium = (values) => {
    this.setState({selectedKonsorsium: values})
  }

  setJenisPengelolaan = (values) => {
    this.setState({selectedJenisPengelolaan: values})
  }

  setLingkupProyek = (values) => {
    this.setState({selectedLingkupProyek: values})
  }

  setPC = (values) => {
    this.setState({selectedPC: values})
  }

  setPA = (values) => {
    this.setState({selectedPA: values})
  }

  setRekamJejakPemberiKerja = (values) => {
    this.setState({selectedRekamJejakPemberiKerja: values})
  }

  setRekamJejakTimTerpilih = (value) => {
    const {timTerpilih} = this.state
    let tim_terpilih = timTerpilih
    tim_terpilih.rekamJejak = value
    this.setState({timTerpilih: tim_terpilih})
  }
  setKompetensiTimTerpilih = (value) => {
    const {timTerpilih} = this.state
    let tim_terpilih = timTerpilih
    tim_terpilih.kompetensi = value
    this.setState({timTerpilih: tim_terpilih})
  }

  setRekamJejakUsulanTimSatu = (value) => {
    const {usulanTimSatu} = this.state
    let usulan_tim = usulanTimSatu
    usulan_tim.rekamJejak = value
    this.setState({usulanTimSatu: usulan_tim})
  }
  setKompetensiUsulanTimSatu = (value) => {
    const {usulanTimSatu} = this.state
    let usulan_tim = usulanTimSatu
    usulan_tim.kompetensi = value
    this.setState({usulanTimSatu: usulan_tim})
  }

  setRekamJejakUsulanTimDua = (value) => {
    const {usulanTimDua} = this.state
    let usulan_tim = usulanTimDua
    usulan_tim.rekamJejak = value
    this.setState({usulanTimDua: usulan_tim})
  }
  setKompetensiUsulanTimDua = (value) => {
    const {usulanTimDua} = this.state
    let usulan_tim = usulanTimDua
    usulan_tim.kompetensi = value
    this.setState({usulanTimDua: usulan_tim})
  }

  acceptProject = async() => {
    const {timTerpilih} = this.state
    if (timTerpilih.cv.id) {
      const {id} = this.props.match.params
      const response = await APIBuilder(`peluang-proyek/${id}/accept`)
      if (response.code === 200) alert('Berhasil Acc Peluang!')
      this.refreshData()
    } else {
      alert('Tidak dapat menerima peluang, CV Belum ada')
    }
  }

  rejectProject = async() => {
    const {id} = this.props.match.params
    const response = await APIBuilder(`peluang-proyek/${id}/reject`)
    if (response.code === 200) alert('Berhasil Reject Peluang!')
    this.refreshData()
  }

  acceptTimSatu = async() => {
    const {id} = this.props.match.params
    const {usulanTimSatu} = this.state
    const response = await APIBuilder(`peluang-proyek/${id}/choose-team/${usulanTimSatu.id}`)
    if (response.code === 200) alert('Berhasil Pilih Tim!')
    this.refreshData()
  }

  acceptTimDua = async() => {
    const {id} = this.props.match.params
    const {usulanTimDua} = this.state
    const response = await APIBuilder(`peluang-proyek/${id}/choose-team/${usulanTimDua.id}`)
    if (response.code === 200) alert('Berhasil Pilih Tim!')
    this.refreshData()
  }

  render() {
    const {uploadWindow, peluangName, uploadCvTimId} = this.state
    const {id} = this.props.match.params
    const {
      pcList,
      paList,
      editDetailMode,
      pmName,
      informasiPembawaPekerjaan,
      selectedKemajuanProyek,
      selectedJenisPengelolaan,
      selectedKonsorsium,
      selectedLingkupProyek,
      namaPemberiKerja,
      alamatPemberiKerja,
      jenisPemberiKerja,
      editPemberiKerjaMode,
      kontakPersonelPemberiKerja,
      selectedRekamJejakPemberiKerja,
      timTerpilih,
      usulanTimSatu,
      usulanTimDua,
      editTimMode,
      kkList,
      latestLogDate,
      latestLogMessage,
      selectedKlasifikasiProyek,
      selectedJenisPengadaan,
      selectedPC,
      selectedPA,
    } = this.state
    const {peluang} = this.state

    let pin = (peluang) ? (peluang.pin === null) ? 'xxxx' : peluang.pin : 'xxxx'

    return (
      <Grid item container>
        <UploadDialog open={uploadWindow} onClose={() => {this.handleToggleUploadWindow(0)}} uploadCvTimId={uploadCvTimId}/>
        <Navbar role={Authorization.getRole()} email={Authorization.getEmail()} title={'Informasi Peluang'}/>
        <Grid item container justify="center" alignItems="center" style={{ marginTop: '2em', padding: '0 4em'}}>
          <Grid item container justify="center" alignItems="center">
            {(peluang) ? (peluang.status === 1) ? (
              <Typography variant="h5" style={{color: '#117C9B'}}>{`[${pmName}] P${pin} - ${peluangName}` || ''}</Typography>
            ) : (
              <div></div>
            ) : false }
            {(peluang) ? (peluang.status === 2) ? (
              <Typography variant="h5" style={{color: '#117C9B'}}>{`[${pmName}] P${pin} - ${peluangName} (Accepted)` || ''}</Typography>
            ) : (
              <div></div>
            ) : false }
            {(peluang) ? (peluang.status === 3) ? (
              <Typography variant="h5" style={{color: '#AB0000'}}>{`[${pmName}] P${pin} - ${peluangName} (Rejected)` || ''}</Typography>
            ) : (
              <div></div>
            ) : false }
          </Grid>
          <Grid item container justify="center" alignItems="center">
            &nbsp;
          </Grid>
          <Grid item container justify="center" alignItems="flex-start" spacing={1}>
            <Grid item container justify="center" alignItems="center" md={4}>
              <Paper style={{width: '100%', padding: '1em 1.5em'}}>
                <Typography variant="h5">Detail Peluang</Typography>
                <Divider />
                <Grid container alignItems="center">
                  <Grid item container md={6}>PM</Grid>
                  <Grid item container md={6}><Typography align="left">: {pmName || '-'}</Typography></Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>PC</Grid>
                  { editDetailMode ? (
                    <Grid item container md={6}>
                      <Autocomplete
                        value={selectedPC}
                        options={pcList}
                        getOptionLabel={option => option.nama_lengkap}
                        style={{width: '100%'}}
                        renderInput={params => (
                          <TextField {...params} label="PC" variant="outlined" fullWidth />
                        )}
                        onChange={(event, values) => this.setPC(values || {nama_lengkap: '-', value: 0})}
                      />
                    </Grid>
                  ) : (
                    <Grid item container md={6}><Typography align="left">: {selectedPC.nama_lengkap}</Typography></Grid>
                  )}
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>PA</Grid>
                  { editDetailMode ? (
                    <Grid item container md={6}>
                      <Autocomplete
                        value={selectedPA}
                        options={paList}
                        getOptionLabel={option => option.nama_lengkap}
                        style={{width: '100%'}}
                        renderInput={params => (
                          <TextField {...params} label="PA" variant="outlined" fullWidth />
                        )}
                        onChange={(event, values) => this.setPA(values || {nama_lengkap: '-', value: 0})}
                      />
                    </Grid>
                  ) : (
                    <Grid item container md={6}><Typography align="left">: {selectedPA.nama_lengkap}</Typography></Grid>
                  )}
                </Grid>
                <Grid container alignItems="center">
                  &nbsp;
                </Grid>
                <Divider />
                <Grid container alignItems="center">
                  <Grid item container md={6}>Klasifikasi Proyek</Grid>
                  { editDetailMode ? (
                    <Grid item container md={6}>
                      <Autocomplete
                        value={selectedKlasifikasiProyek}
                        options={klasifikasiProyekList}
                        getOptionLabel={option => option.name}
                        style={{width: '100%'}}
                        renderInput={params => (
                          <TextField {...params} label="Klasifikasi Proyek" variant="outlined" fullWidth />
                        )}
                        onChange={(event, values) => this.setKlasifikasiProyek(values || {name: '-', value: 0})}
                      />
                    </Grid>
                  ) : (
                    <Grid item container md={6}><Typography align="left">: {selectedKlasifikasiProyek.name}</Typography></Grid>
                  )}
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>Proses Pengadaan</Grid>
                  { editDetailMode ? (
                    <Grid item container md={6}>
                      <Autocomplete
                        value={selectedJenisPengadaan}
                        options={jenisPengadaanList}
                        getOptionLabel={option => option.name}
                        style={{width: '100%'}}
                        renderInput={params => (
                          <TextField {...params} label="Jenis Pengadaan" variant="outlined" fullWidth />
                        )}
                        onChange={(event, values) => this.setJenisPengadaan(values || {name: '-', value: 0})}
                      />
                    </Grid>
                  ) : (
                    <Grid item container md={6}><Typography align="left">: {selectedJenisPengadaan.name}</Typography></Grid>
                  )}
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>Informasi Pekerjaan</Grid>
                  <Grid item container md={6}><Typography align="left">: {(informasiPembawaPekerjaanList.filter(el => el.value===informasiPembawaPekerjaan)[0]) ? informasiPembawaPekerjaanList.filter(el => el.value===informasiPembawaPekerjaan)[0].name : '-'}</Typography></Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>Kemajuan Proyek</Grid>
                  { editDetailMode ? (
                    <Grid item container md={6}>
                      <Autocomplete
                        value={selectedKemajuanProyek}
                        options={kemajuanProyekList}
                        getOptionLabel={option => option.name}
                        style={{width: '100%'}}
                        renderInput={params => (
                          <TextField {...params} label="Kemajuan Proyek" variant="outlined" fullWidth />
                        )}
                        onChange={(event, values) => this.setKemajuanProyek(values || {name: '-', value: 0})}
                      />
                    </Grid>
                  ) : (
                    <Grid item container md={6}><Typography align="left">: {selectedKemajuanProyek.name}</Typography></Grid>
                  )}
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>Konsorsium</Grid>
                  { editDetailMode ? (
                    <Grid item container md={6}>
                      <Autocomplete
                        value={selectedKonsorsium}
                        options={konsorsium}
                        getOptionLabel={option => option.name}
                        style={{width: '100%'}}
                        renderInput={params => (
                          <TextField {...params} label="Konsorsium" variant="outlined" fullWidth />
                        )}
                        onChange={(event, values) => this.setKonsorsium(values || {name: '-', value: 0})}
                      />
                    </Grid>
                  ) : (
                    <Grid item container md={6}><Typography align="left">: {selectedKonsorsium.name}</Typography></Grid>
                  )}
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>Jenis Pengelolaan</Grid>
                  { editDetailMode ? (
                    <Grid item container md={6}>
                      <Autocomplete
                        value={selectedJenisPengelolaan}
                        options={jenisPengelolaanList}
                        getOptionLabel={option => option.name}
                        style={{width: '100%'}}
                        renderInput={params => (
                          <TextField {...params} label="Jenis Pengelolaan" variant="outlined" fullWidth />
                        )}
                        onChange={(event, values) => this.setJenisPengelolaan(values || {name: '-', value: 0})}
                      />
                    </Grid>
                  ) : (
                    <Grid item container md={6}><Typography align="left">: {selectedJenisPengelolaan.name}</Typography></Grid>
                  )}
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>Lingkup Proyek</Grid>
                  { editDetailMode ? (
                  <Grid item container md={6}>
                    <Autocomplete
                      value={selectedLingkupProyek}
                      options={lingkupProyekList}
                      getOptionLabel={option => option.name}
                      style={{width: '100%'}}
                      renderInput={params => (
                        <TextField {...params} label="Lingkup Proyek" variant="outlined" fullWidth />
                      )}
                      onChange={(event, values) => this.setLingkupProyek(values || {name: '-', value: 0})}
                    />
                  </Grid>
                ) : (
                  <Grid item container md={6}><Typography align="left">: {selectedLingkupProyek.name}</Typography></Grid>
                  )}
                </Grid>
                <Grid container justify="flex-end" alignItems="center">
                  &nbsp;
                </Grid>
                <Grid container justify="flex-end" alignItems="center">
                  <Grid item>{(Authorization.getRole() === 7 && peluang && peluang.status === 1) ? (<Button onClick={this.toggleDetailEditMode} style={{padding: '0 .5em'}}>{editDetailMode ? 'Simpan' : 'Edit'}</Button>) : (<div></div>)}</Grid>
                </Grid>
              </Paper>
              &nbsp;
              {((Authorization.getRole() === 4) && ((peluang) ? (peluang.status === Constants.PELUANG_STATUS_HOLD) : true) && timTerpilih.namaKetua ) ? (
                <Grid container justify="center" alignItems="center" spacing={2}>
                  <Grid item><Button onClick={this.acceptProject} style={{backgroundColor: '#65909C'}}>Accept</Button></Grid>
                  <Grid item><Button onClick={this.rejectProject} style={{backgroundColor: '#AB0000'}}>Reject</Button></Grid>
                </Grid>
              ) : (
                <div></div>
              )  }
            </Grid>
            <Grid item container justify="center" alignItems="center" md={4}>
              <Paper style={{width: '100%', padding: '1em 1.5em'}}>
                <Typography variant="h5">Pemberi Kerja</Typography>
                <Divider />
                <Grid container alignItems="center">
                  <Grid item container md={6}>Nama Perusahaan</Grid>
                  <Grid item container md={6}><Typography align="left">: {namaPemberiKerja || '-'}</Typography></Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>Alamat Perusahaan</Grid>
                  <Grid item container md={6}><Typography align="left">: {alamatPemberiKerja || '-'}</Typography></Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>Jenis Instansi</Grid>
                  <Grid item container md={6}><Typography align="left">: {(jenisPemberiKerjaList.filter(el => el.value===jenisPemberiKerja)[0]) ? jenisPemberiKerjaList.filter(el => el.value===jenisPemberiKerja)[0].name : '-'}</Typography></Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>Kontak Personal</Grid>
                  <Grid item container md={6}>
                    {editPemberiKerjaMode ? (
                      <TextField
                        label="Kontak Personel"
                        variant="outlined"
                        value={kontakPersonelPemberiKerja}
                        onChange={(e) => {this.setKontakPersonelPemberiKerja(e.target.value)}}
                        fullWidth
                      />
                    ) : (
                      <Typography align="left">: {kontakPersonelPemberiKerja || '-'}</Typography>
                    )}
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>Rekam Jejak</Grid>
                  <Grid item container md={6}>
                    {editPemberiKerjaMode ? (
                      <Autocomplete
                        value={selectedRekamJejakPemberiKerja}
                        options={rekamJejakPemberiKerjaList}
                        getOptionLabel={option => option.name}
                        style={{width: '100%'}}
                        renderInput={params => (
                          <TextField {...params} label="Rekam Jejak" variant="outlined" fullWidth />
                        )}
                        onChange={(event, values) => this.setRekamJejakPemberiKerja(values || {name: '-', value: 0})}
                      />
                    ) : (
                      <Typography align="left">: {selectedRekamJejakPemberiKerja.name}</Typography>
                    )}
                  </Grid>
                </Grid>
                <Grid container justify="flex-end" alignItems="center">
                  &nbsp;
                </Grid>
                <Grid container justify="flex-end" alignItems="center">
                  <Grid item>{(Authorization.getRole() === 7 && peluang && peluang.status === 1) ? (<Button onClick={this.togglePemberiKerjaEditMode} style={{padding: '0 .5em'}}>{editPemberiKerjaMode ? 'Simpan' : 'Edit'}</Button>) : (<div></div>)}</Grid>
                </Grid>
              </Paper>
              &nbsp;
              <Paper style={{width: '100%', padding: '1em 1.5em'}}>
                <Grid container justify="flex-end" alignItems="center">
                  <Grid item container md={6} justify="flex-end">
                    <Link to={`/peluang/log/${id}`}>Detail</Link>
                  </Grid>
                </Grid>
                <Typography variant="h5">Informasi Proyek</Typography>
                <Divider />
                <Grid container justify="flex-end" alignItems="center">
                  &nbsp;
                </Grid>
                <Grid container justify="flex-start" alignItems="center">
                  <Grid item container md={12}>{latestLogDate}</Grid>
                </Grid>
                <Grid container justify="flex-start" alignItems="center">
                  <Grid item container md={12} justify="flex-start" >{latestLogMessage}</Grid>
                </Grid>
              </Paper>
            </Grid>  
            <Grid item container justify="center" alignItems="center" md={4}>
              <Paper style={{width: '100%', padding: '1em 1.5em'}}>
                <Typography variant="h5">Usulan Tim Pelaksana</Typography>
                <Divider />
                {(timTerpilih.namaKetua) ? (
                  <div>
                    <Grid container alignItems="center" justify="flex-end">
                      <Grid item container md={6} justify="flex-end">Tim Terpilih</Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Ketua Tim</Grid>
                      <Grid item container md={6}><Typography align="left">: {timTerpilih.namaKetua || '-'}</Typography></Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>KK</Grid>
                      <Typography align="left">: {(kkList.filter(el => el.id===timTerpilih.kelompokKeahlian)[0]) ? kkList.filter(el => el.id===timTerpilih.kelompokKeahlian)[0].nama : '-'}</Typography>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>PM Tim</Grid>
                      <Grid item container md={6}><Typography align="left">: {timTerpilih.namaPM || '-'}</Typography></Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Email Tim</Grid>
                      <Grid item container md={6}><Typography align="left">: {timTerpilih.emailTim || '-'}</Typography></Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>CV Tim Ahli</Grid>
                        {editTimMode ? (
                          <Grid item container md={6} alignItems="center">
                            <MUIButton style={{border: '1px solid black', borderRadius: '15px 15px', padding: '0 .5em'}} onClick={() => {this.handleToggleUploadWindow(timTerpilih.id)}}>Upload</MUIButton>
                          </Grid>
                        ) : (
                          <Grid item container md={6} alignItems="center">
                            <Typography align="left">: {(timTerpilih.cv.id) ? 'Ada' : 'Tidak Ada'}</Typography>
                            &nbsp;&nbsp;
                            {(timTerpilih.cv.id) ? (<MUIButton style={{border: '1px solid black', borderRadius: '15px 15px', padding: '0 0'}} onClick={() => {
                              window.open(`${baseUrl}/uploads/${timTerpilih.cv.filename}.${timTerpilih.cv.extension}`, '_blank')
                            }}>
                              Lihat
                            </MUIButton>) : (<div></div>)}
                          </Grid>
                        )}
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Rekam Jejak</Grid>
                      <Grid item container md={6}>
                        {editTimMode ? (
                          <Autocomplete
                            options={rekamJejakTimList}
                            getOptionLabel={option => option.name}
                            style={{width: '100%'}}
                            renderInput={params => (
                              <TextField {...params} label="Rekam Jejak" variant="outlined" fullWidth />
                            )}
                            onChange={(event, values) => this.setRekamJejakTimTerpilih(values.value)}
                          />
                        ) : (
                          <Typography align="left">: {(rekamJejakTimList.filter(el => el.value===timTerpilih.rekamJejak)[0]) ? rekamJejakTimList.filter(el => el.value===timTerpilih.rekamJejak)[0].name : '-'}</Typography>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Kompetensi</Grid>
                      <Grid item container md={6}>
                        {editTimMode ? (
                          <Autocomplete
                            options={kompetensiTimList}
                            getOptionLabel={option => option.name}
                            style={{width: '100%'}}
                            renderInput={params => (
                              <TextField {...params} label="Kompetensi" variant="outlined" fullWidth />
                            )}
                            onChange={(event, values) => this.setKompetensiTimTerpilih(values.value)}
                          />
                        ) : (
                          <Typography align="left">: {(kompetensiTimList.filter(el => el.value===timTerpilih.kompetensi)[0]) ? kompetensiTimList.filter(el => el.value===timTerpilih.kompetensi)[0].name : '-'}</Typography>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      &nbsp;
                    </Grid>
                    <Divider />
                  </div>
                ) : (
                  <div></div>
                )}
                {(usulanTimSatu.namaKetua && !timTerpilih.namaKetua) ? (
                  <div>
                    <Grid container alignItems="center" justify="flex-end">
                      &nbsp;
                    </Grid>
                    <Grid container alignItems="flex-start" justify="flex-end">
                      {(peluang && (Authorization.getRole() === 4)) ? (peluang.status === 1) ? (
                        <Grid item container md={6} justify="flex-start"><MUIButton onClick={this.acceptTimSatu} style={{border: '1px solid grey', borderRadius: '15px 15px'}}>Pilih</MUIButton></Grid>
                      ) : (
                        <div></div>
                      ) : false }
                      <Grid item container md={6} justify="flex-end">Usulan Tim 1</Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="flex-end">
                      &nbsp;
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Ketua Tim</Grid>
                      <Grid item container md={6}><Typography align="left">: {usulanTimSatu.namaKetua || '-'}</Typography></Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>KK</Grid>
                      <Typography align="left">: {(kkList.filter(el => el.id===usulanTimSatu.kelompokKeahlian)[0]) ? kkList.filter(el => el.id===usulanTimSatu.kelompokKeahlian)[0].nama : '-'}</Typography>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>PM Tim</Grid>
                      <Grid item container md={6}><Typography align="left">: {usulanTimSatu.namaPM || '-'}</Typography></Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Email Tim</Grid>
                      <Grid item container md={6}><Typography align="left">: {usulanTimSatu.emailTim || '-'}</Typography></Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>CV Tim Ahli</Grid>
                        {editTimMode ? (
                          <Grid item container md={6} alignItems="center">
                            <MUIButton style={{border: '1px solid black', borderRadius: '15px 15px', padding: '0 .5em'}} onClick={() => {this.handleToggleUploadWindow(usulanTimSatu.id)}}>Upload</MUIButton>
                          </Grid>
                        ) : (
                          <Grid item container md={6} alignItems="center">
                            <Typography align="left">: {(usulanTimSatu.cv.id) ? 'Ada' : 'Tidak Ada'}</Typography>
                            &nbsp;&nbsp;
                            {(usulanTimSatu.cv.id) ? (<MUIButton style={{border: '1px solid black', borderRadius: '15px 15px', padding: '0 0'}} onClick={() => {
                              window.open(`${baseUrl}/uploads/${usulanTimSatu.cv.filename}.${usulanTimSatu.cv.extension}`, '_blank')
                            }}>
                              Lihat
                            </MUIButton>) : (<div></div>)}
                          </Grid>
                        )}
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Rekam Jejak</Grid>
                      <Grid item container md={6}>
                        {editTimMode ? (
                          <Autocomplete
                            options={rekamJejakTimList}
                            getOptionLabel={option => option.name}
                            style={{width: '100%'}}
                            renderInput={params => (
                              <TextField {...params} label="Rekam Jejak" variant="outlined" fullWidth />
                            )}
                            onChange={(event, values) => this.setRekamJejakUsulanTimSatu(values.value)}
                          />
                        ) : (
                          <Typography align="left">: {(rekamJejakTimList.filter(el => el.value===usulanTimSatu.rekamJejak)[0]) ? rekamJejakTimList.filter(el => el.value===usulanTimSatu.rekamJejak)[0].name : '-'}</Typography>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Kompetensi</Grid>
                      <Grid item container md={6}>
                        {editTimMode ? (
                          <Autocomplete
                            options={kompetensiTimList}
                            getOptionLabel={option => option.name}
                            style={{width: '100%'}}
                            renderInput={params => (
                              <TextField {...params} label="Kompetensi" variant="outlined" fullWidth />
                            )}
                            onChange={(event, values) => this.setKompetensiUsulanTimSatu(values.value)}
                          />
                        ) : (
                          <Typography align="left">: {(kompetensiTimList.filter(el => el.value===usulanTimSatu.kompetensi)[0]) ? kompetensiTimList.filter(el => el.value===usulanTimSatu.kompetensi)[0].name : '-'}</Typography>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      &nbsp;
                    </Grid>
                    <Divider />
                  </div>
                ) : (
                  <div></div>
                )}
                {(usulanTimDua.namaKetua && !timTerpilih.namaKetua) ? (
                  <div>
                    <Grid container alignItems="flex-start" justify="flex-end">
                      &nbsp;
                    </Grid>
                    <Grid container alignItems="flex-start" justify="flex-end">
                      {(peluang && (Authorization.getRole() === 4)) ? (peluang.status === 1) ? (  
                        <Grid item container md={6} justify="flex-start"><MUIButton onClick={this.acceptTimDua} style={{border: '1px solid grey', borderRadius: '15px 15px'}}>Pilih</MUIButton></Grid>
                      ) : (
                        <div></div>
                      ) : false }
                      <Grid item container md={6} justify="flex-end">Usulan Tim 2</Grid>
                    </Grid>
                    <Grid container alignItems="flex-start" justify="flex-end">
                      &nbsp;
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Ketua Tim</Grid>
                      <Grid item container md={6}><Typography align="left">: {usulanTimDua.namaKetua || '-'}</Typography></Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>KK</Grid>
                      <Typography align="left">: {(kkList.filter(el => el.id===usulanTimDua.kelompokKeahlian)[0]) ? kkList.filter(el => el.id===usulanTimDua.kelompokKeahlian)[0].nama : '-'}</Typography>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>PM Tim</Grid>
                      <Grid item container md={6}><Typography align="left">: {usulanTimDua.namaPM || '-'}</Typography></Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Email Tim</Grid>
                      <Grid item container md={6}><Typography align="left">: {usulanTimDua.emailTim || '-'}</Typography></Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>CV Tim Ahli</Grid>
                        {editTimMode ? (
                          <Grid item container md={6} alignItems="center">
                            <MUIButton style={{border: '1px solid black', borderRadius: '15px 15px', padding: '0 .5em'}} onClick={() => {this.handleToggleUploadWindow(usulanTimDua.id)}}>Upload</MUIButton>
                          </Grid>
                        ) : (
                          <Grid item container md={6} alignItems="center">
                            <Typography align="left">: {(usulanTimDua.cv.id) ? 'Ada' : 'Tidak Ada'}</Typography>
                            &nbsp;&nbsp;
                            {(usulanTimDua.cv.id) ? (<MUIButton style={{border: '1px solid black', borderRadius: '15px 15px',padding: '0 0'}} onClick={() => {
                              window.open(`${baseUrl}/uploads/${usulanTimDua.cv.filename}.${usulanTimDua.cv.extension}`, '_blank')
                            }}>
                              Lihat
                            </MUIButton>) : (<div></div>)}
                          </Grid>
                        )}
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Rekam Jejak</Grid>
                      <Grid item container md={6}>
                        {editTimMode ? (
                          <Autocomplete
                            options={rekamJejakTimList}
                            getOptionLabel={option => option.name}
                            style={{width: '100%'}}
                            renderInput={params => (
                              <TextField {...params} label="Rekam Jejak" variant="outlined" fullWidth />
                            )}
                            onChange={(event, values) => this.setRekamJejakUsulanTimDua(values.value)}
                          />
                        ) : (
                          <Typography align="left">: {(rekamJejakTimList.filter(el => el.value===usulanTimDua.rekamJejak)[0]) ? rekamJejakTimList.filter(el => el.value===usulanTimDua.rekamJejak)[0].name : '-'}</Typography>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Kompetensi</Grid>
                      <Grid item container md={6}>
                        {editTimMode ? (
                          <Autocomplete
                            options={kompetensiTimList}
                            getOptionLabel={option => option.name}
                            style={{width: '100%'}}
                            renderInput={params => (
                              <TextField {...params} label="Kompetensi" variant="outlined" fullWidth />
                            )}
                            onChange={(event, values) => this.setKompetensiUsulanTimDua(values.value)}
                          />
                        ) : (
                          <Typography align="left">: {(kompetensiTimList.filter(el => el.value===usulanTimDua.kompetensi)[0]) ? kompetensiTimList.filter(el => el.value===usulanTimDua.kompetensi)[0].name : '-'}</Typography>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      &nbsp;
                    </Grid>
                    <Divider />
                  </div>
                ) : (
                  <div></div>
                )}
                
                <Grid container justify="flex-end" alignItems="center">
                  &nbsp;
                </Grid>
                <Grid container justify="flex-end" alignItems="center">
                  <Grid item>{(Authorization.getRole() === 7 && peluang && peluang.status === 1) ? (<Button onClick={this.toggleTimEditMode} style={{padding: '0 .5em'}}>{editTimMode ? 'Simpan' : 'Edit'}</Button>) : (<div></div>)}</Grid>
                </Grid>
              </Paper>
            </Grid>  
          </Grid>
          <Grid item container justify="center" alignItems="center" spacing={1}>
            <Grid item container justify="center" alignItems="center" md={4}>
              &nbsp;
            </Grid>
            <Grid item container justify="center" alignItems="center" md={4}>
              &nbsp;
            </Grid>  
            <Grid item container justify="center" alignItems="center" md={4}>
              &nbsp;
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default DetailPeluang