import React from 'react'
import {Link} from 'react-router-dom'
import * as moment from 'moment'
import 'moment/locale/id'

import history from '../../../Shared/History'
import APIBuilder from '../../../Shared/APIBuilder'
import { baseUrl } from '../../../Shared/Config'

import {PinTextFormat, RupiahFormat} from '../../../Shared/TextTransformer'
import Authorization from '../../../Shared/Authorization'

import Navbar from '../../Navbar/Navbar'
import Button from '../../Button/MainButton'

import {
  Grid,
  Typography,
  Paper,
  Divider,
  TextField,
  Button as MUIButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@material-ui/core'

import { Alert } from '@material-ui/lab'

import PemberiKerjaDetailDialog from '../../Dialog/PemberiKerjaDetail'
import TimPelaksanaDetailDialog from '../../Dialog/TimPelaksanaDetail'
import PrefinancingDetailDialog from '../../Dialog/PrefinancingDetail'
import PenagihanInvoiceDetailDialog from '../../Dialog/PenagihanInvoiceDetail'
import PembayaranSPPUDetailDialog from '../../Dialog/PembayaranSPPUDetail'

import {terminSummaryColumns as terminColumns, pembayaranSummaryColumns as pembayaranColumns} from '../../../Shared/Columns'
import Constants from '../../../Shared/Constants'

class DetailProyek extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      kkList: [],
      tenagaAhli: [],
      termin: [],
      uploadWindow: false,
      pemberiKerjaDetailWindow: false,
      timPelaksanaDetailWindow: false,
      prefinancingDetailWindow: false,
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
      editKontrakSP3Mode: false,
      selectedKemajuanProyek: 0,
      selectedKonsorsium: 0,
      selectedJenisPengelolaan: 0,
      selectedLingkupProyek: 0,
      selectedPC: 0,
      selectedPA: 0,
      editPemberiKerjaMode: false,
      selectedRekamJejakPemberiKerja: false,
      timTerpilih: {},
      editTimMode: false,
      latestLogDate: '',
      latestLogMessage: '',
      bidangProyek: '',
      lokasiProyek: '',
      nilaiProyek: 0,
      mfProyek: 0,
      lingkupProyek: '',
      kompetitorProyek: '',
      terminPage: 0,
      pembayaranPage: 0,
      rowsPerTerminPage: 5,
      rowsPerPembayaranPage: 5,
      nomorKontrakInput: '',
      tanggalKontrakInput: '',
      amandemenKontrakInput: '',
      nomorSP3Input: '',
      tanggalSP3Input: '',
      tanggalMulaiProyekInput: '',
      tanggalSelesaiProyekInput: '',
      tanggalSelesaiKontrakInput: '',
      tanggalSelesaiAmandemenInput: '',
      cetakSP3Mode: false,
      pembayaranList: [],
      invoiceDetailWindow: false,
      sppuDetailWindow:false,
      selectedInvoice: {},
      selectedSPPU: {},
      terminList: [],
      latestSP3SLFNumber: 0,
      namaPihakKeduaInput: '',
      lokasiPihakKeduaInput: '',
      namaPemilikRekeningInput: '',
      nomorRekeningInput: '',
      namaBankInput: '',
      alamatBankInput: '',
      alertCetakSP3: false,
      sp3Url: ''
    }

    this.handleTogglePemberiKerjaDetailWindow = this.handleTogglePemberiKerjaDetailWindow.bind(this)
    this.handleToggleTimPelaksanaDetailWindow = this.handleToggleTimPelaksanaDetailWindow.bind(this)
    this.handleTogglePrefinancingDetailWindow = this.handleTogglePrefinancingDetailWindow.bind(this)
    this.handleToggleInvoiceDetailWindow = this.handleToggleInvoiceDetailWindow.bind(this)
    this.handleToggleSPPUDetailWindow = this.handleToggleSPPUDetailWindow.bind(this)
    this.handleChangeTerminPage = this.handleChangeTerminPage.bind(this)
    this.handleChangeRowsPerTerminPage = this.handleChangeRowsPerTerminPage.bind(this)
    this.handleChangePembayaranPage = this.handleChangePembayaranPage.bind(this)
    this.handleChangeRowsPerPembayaranPage = this.handleChangeRowsPerPembayaranPage.bind(this)
    this.handleToggleCetakSP3 = this.handleToggleCetakSP3.bind(this)
    this.generateSP3SLF = this.generateSP3SLF.bind(this)
    this.generateSP3 = this.generateSP3.bind(this)
    this.refreshData = this.refreshData.bind(this)
  }

  async refreshData() {
    const {id} = this.props.match.params
    try{
      const response = await APIBuilder(`detail-proyek/${id}`)
      const latestLogResponse = await APIBuilder(`log/latest/${id}`)
      const pembayaranInvoiceResponse = await APIBuilder(`termin-proyek/penagihan-by-proyek-id/${id}`)
      const pembayaranSPPUResponse = await APIBuilder(`sppu/by-proyek-id/${id}`)
      const terminResponse = await APIBuilder(`termin-proyek/proyek/${id}`)
      const latestSP3SLFNumberResponse = await APIBuilder(`counter/sp3-slf`)
      
      let pembayaranSPPUTemp = pembayaranSPPUResponse.payload.data.map((el) => {
        let element = {
          type : 'sppu',
          status: el.status,
          tanggal: el.tanggal_pembayaran,
          id: el.id,
          value: {
            nama: el.nama,
            nama_pemberi_kerja: el.nama_pemberi_kerja,
            nama_ketua: el.nama_ketua,
            tanggal_pembayaran: el.tanggal_pembayaran,
            jumlah_pembayaran: el.jumlah_pembayaran,
            termin_id: el.termin_id,
            status: el.status,
          }
        }
        return element
      })

      let pembayaranInvoiceTemp = pembayaranInvoiceResponse.payload.data.map((el) => {
        let element = {
          type : 'invoice',
          status: el.penagihan_status,
          tanggal: el.tanggal_penagihan,
          id: el.id,
          value: {
            nama: el.nama,
            lokasi_proyek: el.lokasi_proyek,
            pemberi_kerja: el.pemberi_kerja,
            alamat_pemberi_kerja: el.alamat_pemberi_kerja,
            invoice_created_Date: el.invoice_created_date,
            nomor_kontrak: el.nomor_kontrak,
            nilai_proyek: el.nilai_proyek,
            persentase: el.persentase,
            termin_ke: el.termin_ke,
            penagihan_status: el.penagihan_status
          }
        }
        return element
      })

      let pembayaranListTemp = pembayaranSPPUTemp.concat(pembayaranInvoiceTemp)
      pembayaranListTemp.sort((a,b) => {
        var keyA = new Date(a.tanggal),
        keyB = new Date(b.tanggal);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      })
      let date = new Date(latestLogResponse.payload.data.created_time)
      let tim_terpilih = {
        id: response.payload.data.proyek.id_tim_terpilih,
        namaKetua: response.payload.data.proyek.nama_ketua_tim_terpilih,
        kelompokKeahlian: response.payload.data.proyek.kelompok_keahlian_tim_terpilih,
        namaPM: response.payload.data.proyek.nama_pm_tim_terpilih,
        emailTim: response.payload.data.proyek.email_tim_tim_terpilih,
        rekamJejak: response.payload.data.proyek.rekam_jejak_tim_terpilih,
        kompetensi: response.payload.data.proyek.kompetensi_tim_terpilih,
        cv: {
          id: response.payload.data.proyek.cv_tim_terpilih,
          filename: response.payload.data.proyek.filename_cv_tim_terpilih,
          extension: response.payload.data.proyek.extension_cv_tim_terpilih,
        }
      }
  
      this.setState({
        proyek: response.payload.data.proyek,
        pmName: response.payload.data.proyek.PM,
        pcName: (response.payload.data.proyek.PC) ? response.payload.data.proyek.PC : '',
        paName: (response.payload.data.proyek.PA) ? response.payload.data.proyek.PA : '',
        selectedPC : (response.payload.data.proyek.PC_ID) ? response.payload.data.proyek.PC_ID : 0,
        selectedPA : (response.payload.data.proyek.PA_ID) ? response.payload.data.proyek.PA_ID : 0,
        proyekName: response.payload.data.proyek.nama,
        klasifikasiPeluang: response.payload.data.proyek.klasifikasi,
        jenisPengadaanPeluang: response.payload.data.proyek.pengadaan,
        informasiPembawaPekerjaan: response.payload.data.proyek.informasi_pembawa_pekerjaan,
        selectedKemajuanProyek: response.payload.data.proyek.kemajuan_proyek,
        selectedKonsorsium: response.payload.data.proyek.is_konsorsium,
        selectedJenisPengelolaan: response.payload.data.proyek.jenis_pengelolaan,
        selectedLingkupProyek: response.payload.data.proyek.lingkup_proyek,
        namaPemberiKerja: response.payload.data.proyek.nama_pemberi_kerja,
        alamatPemberiKerja: response.payload.data.proyek.alamat_pemberi_kerja,
        jenisPemberiKerja: response.payload.data.proyek.jenis_pemberi_kerja,
        selectedRekamJejakPemberiKerja: response.payload.data.proyek.rekam_jejak,
        kontakPersonelPemberiKerja: response.payload.data.proyek.kontak_personel,
        timTerpilih: tim_terpilih,
        latestLogDate: moment(date).format('DD/MM/YYYY'),
        latestLogMessage: latestLogResponse.payload.data.message,
        bidangProyek: response.payload.data.proyek.bidang_proyek,
        lokasiProyek: response.payload.data.proyek.lokasi_proyek,
        nilaiProyek: response.payload.data.proyek.nilai_proyek,
        mfProyek: response.payload.data.proyek.mf_proyek,
        lingkupProyek: response.payload.data.proyek.lingkup_proyek,
        kompetitorProyek: response.payload.data.proyek.kompetitor_proyek,
        tenagaAhli: response.payload.data.tenaga_ahli,
        termin: terminResponse.payload.data,
        pembayaranList: pembayaranListTemp,
        terminList: terminResponse.payload.data,
        nomorSP3Input: latestSP3SLFNumberResponse.payload.data + 1,
        nomorKontrakInput: response.payload.data.proyek.nomor_kontrak ? response.payload.data.proyek.nomor_kontrak : '',
        tanggalKontrakInput: response.payload.data.proyek.tanggal_kontrak ? moment(response.payload.data.proyek.tanggal_kontrak).format('YYYY-MM-DD') : '',
        amandemenKontrakInput: response.payload.data.proyek.amandemen_kontrak ? moment(response.payload.data.proyek.amandemen_kontrak).format('YYYY-MM-DD') : '',
        tanggalSP3Input: response.payload.data.proyek.tanggal_sp3 ? moment(response.payload.data.proyek.tanggal_sp3).format('YYYY-MM-DD') : '',
        tanggalMulaiProyekInput: response.payload.data.proyek.tanggal_mulai_proyek ? moment(response.payload.data.proyek.tanggal_mulai_proyek).format('YYYY-MM-DD') : '',
        tanggalSelesaiProyekInput: response.payload.data.proyek.tanggal_selesai_proyek ? moment(response.payload.data.proyek.tanggal_selesai_proyek).format('YYYY-MM-DD') : '',
        tanggalSelesaiKontrakInput: response.payload.data.proyek.tanggal_selesai_kontrak ? moment(response.payload.data.proyek.tanggal_selesai_kontrak).format('YYYY-MM-DD') : '',
        tanggalSelesaiAmandemenInput: response.payload.data.proyek.tanggal_selesai_amandemen ? moment(response.payload.data.proyek.tanggal_selesai_amandemen).format('YYYY-MM-DD') : '',

      })
      if(response.payload.data.proyek.status === Constants.PELUANG_STATUS_HOLD) {
        history.push(`/peluang/${id}`)
      }
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
    moment.locale('id')

    const kkListResponse = await APIBuilder(`kk`)
    if (kkListResponse.code === 200) {
      this.setState({kkList: kkListResponse.payload.data})
    }
    this.refreshData()
  }

  handleTogglePemberiKerjaDetailWindow = () => {
    const { pemberiKerjaDetailWindow } = this.state
    this.setState({pemberiKerjaDetailWindow: !(pemberiKerjaDetailWindow)})
  }

  handleToggleTimPelaksanaDetailWindow = () => {
    const { timPelaksanaDetailWindow } = this.state
    this.setState({timPelaksanaDetailWindow: !(timPelaksanaDetailWindow)})
  }

  handleTogglePrefinancingDetailWindow = () => {
    const { prefinancingDetailWindow } = this.state
    this.setState({prefinancingDetailWindow: !(prefinancingDetailWindow)})
  }

  handleToggleInvoiceDetailWindow = () => {
    const { invoiceDetailWindow } = this.state
    this.setState({invoiceDetailWindow: !(invoiceDetailWindow)})
  }

  handleToggleSPPUDetailWindow = () => {
    const { sppuDetailWindow } = this.state
    this.setState({sppuDetailWindow: !(sppuDetailWindow)})
  }

  handleToggleCetakSP3 = () => {
    const { cetakSP3Mode } = this.state
    this.setState({cetakSP3Mode: !(cetakSP3Mode)})
  }

  toggleDetailEditMode = async () => {
    const {editDetailMode, bidangProyek, lokasiProyek, nilaiProyek, mfProyek, lingkupProyek, kompetitorProyek} = this.state
    const {id} = this.props.match.params
    if (editDetailMode) {
      const payload = {
        bidang_proyek: bidangProyek,
        lokasi_proyek: lokasiProyek,
        nilai_proyek: nilaiProyek,
        mf_proyek: mfProyek,
        lingkup_proyek: lingkupProyek,
        kompetitor_proyek: kompetitorProyek
      }
      const response = await APIBuilder(`detail-proyek/${id}`, payload, 'POST')
      if (response.code === 200) {
        alert('Berhasil ubah detail proyek!')
        this.refreshData()
      }
    }
    this.setState({editDetailMode: !editDetailMode})
  }

  toggleKontrakSP3EditMode = async () => {
    const {
      editKontrakSP3Mode,
      nomorKontrakInput,
      tanggalKontrakInput,
      amandemenKontrakInput,
      nomorSP3Input,
      tanggalSP3Input,
      tanggalMulaiProyekInput,
      tanggalSelesaiProyekInput,
      tanggalSelesaiKontrakInput,
      tanggalSelesaiAmandemenInput
    } = this.state
    const {id} = this.props.match.params
    if (editKontrakSP3Mode) {
      const payload = {
        nomor_kontrak: nomorKontrakInput,
        tanggal_kontrak: tanggalKontrakInput,
        amandemen_kontrak: amandemenKontrakInput,
        nomor_sp3: nomorSP3Input,
        tanggal_sp3: tanggalSP3Input,
        tanggal_mulai_proyek: tanggalMulaiProyekInput,
        tanggal_selesai_proyek: tanggalSelesaiProyekInput,
        tanggal_selesai_kontrak: tanggalSelesaiKontrakInput,
        tanggal_selesai_amandemen: tanggalSelesaiAmandemenInput,
      }
      const response = await APIBuilder(`detail-proyek/${id}`, payload, 'POST')
      if (response.code === 200) {
        alert('Berhasil ubah detail Kontrak dan SP3!')
        this.refreshData()
        this.setState({editKontrakSP3Mode: !editKontrakSP3Mode})
      } else {
        alert('Gagal ubah detail Kontrak dan SP3!')
      }
    } else {
      this.setState({editKontrakSP3Mode: !editKontrakSP3Mode})
    }
  }

  togglePemberiKerjaEditMode = async () => {
    const {editPemberiKerjaMode, kontakPersonelPemberiKerja, selectedRekamJejakPemberiKerja} = this.state
    const {id} = this.props.match.params
    
    if (editPemberiKerjaMode) {
      const payload = {
        kontak_personel: kontakPersonelPemberiKerja,
        rekam_jejak: selectedRekamJejakPemberiKerja
      }
      const response = await APIBuilder(`detail-proyek/${id}`, payload, 'POST')
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
    } = this.state
    const {id} = this.props.match.params
    
    if (editTimMode) {
      const payload = {
        rekam_jejak_tim_terpilih: timTerpilih.rekamJejak,
        kompetensi_tim_terpilih: timTerpilih.kompetensi,
      }
      const response = await APIBuilder(`detail-proyek/${id}`, payload, 'POST')
      if (response.code === 200) {
        alert('Berhasil ubah detail peluang!')
        this.refreshData()
      }
    }
    this.setState({editTimMode: !editTimMode})
  }

  setBidangProyek = (event) => {
    this.setState({bidangProyek: event.target.value})
  }

  setLokasiProyek = (event) => {
    this.setState({lokasiProyek: event.target.value})
  }

  setNilaiProyek = (event) => {
    this.setState({nilaiProyek: event.target.value})
  }

  setMfProyek = (event) => {
    this.setState({mfProyek: event.target.value})
  }

  setLingkupProyek = (event) => {
    this.setState({lingkupProyek: event.target.value})
  }

  setKompetitorProyek = (event) => {
    this.setState({kompetitorProyek: event.target.value})
  }

  setNomorKontrak = (event) => {
    this.setState({nomorKontrakInput: event.target.value})
  }
  setTanggalKontrak = (event) => {
    this.setState({tanggalKontrakInput: event.target.value})
  }
  setAmandemenKontrak = (event) => {
    this.setState({amandemenKontrakInput: event.target.value})
  }
  setNomorSP3 = (event) => {
    this.setState({nomorSP3Input: event.target.value})
  }
  setTanggalSP3 = (event) => {
    this.setState({tanggalSP3Input: event.target.value})
  }
  setTanggalMulaiProyek = (event) => {
    this.setState({tanggalMulaiProyekInput: event.target.value})
  }
  setTanggalSelesaiProyek = (event) => {
    this.setState({tanggalSelesaiProyekInput: event.target.value})
  }
  setTanggalSelesaiKontrak = (event) => {
    this.setState({tanggalSelesaiKontrakInput: event.target.value})
  }
  setTanggalSelesaiAmandemen = (event) => {
    this.setState({tanggalSelesaiAmandemenInput: event.target.value})
  }
  setLatestSP3SLFNumber = (event) => {
    this.setState({latestSP3SLFNumber: event.target.value})
  }

  setNamaPihakKeduaInput = (event) => {
    this.setState({namaPihakKeduaInput: event.target.value})
  }
  setLokasiPihakKeduaInput = (event) => {
    this.setState({lokasiPihakKeduaInput: event.target.value})
  }
  setNamaPemilikRekeningInput = (event) => {
    this.setState({namaPemilikRekeningInput: event.target.value})
  }
  setNomorRekeningInput = (event) => {
    this.setState({nomorRekeningInput: event.target.value})
  }
  setNamaBankInput = (event) => {
    this.setState({namaBankInput: event.target.value})
  }
  setAlamatBankInput = (event) => {
    this.setState({alamatBankInput: event.target.value})
  }
  setAlerCetakSP3 = (event) => {
    this.setState({alertCetakSP3: event.target.value})
  }

  handleChangeTerminPage = (event, newTerminPage) => {
    this.setState({
      terminPage: newTerminPage
    })
  }

  handleChangeRowsPerTerminPage = (event) => {
    this.setState({
      terminPage: 0,
      rowsPerTerminPage: +event.target.value
    })
  }

  handleChangePembayaranPage = (event, newPembayaranPage) => {
    this.setState({
      pembayaranPage: newPembayaranPage
    })
  }

  handleChangeRowsPerPembayaranPage = (event) => {
    this.setState({
      pembayaranPage: 0,
      rowsPerPembayaranPage: +event.target.value
    })
  }

  columnValue = (column, value) => {
    if (column.id === 'status') {
      switch (value) {
        case Constants.LOG_STATUS_MESSAGE:
          return '-'
        case Constants.LOG_STATUS_PENDAFTARAN:
          return 'Pendaftaran'
        case Constants.LOG_STATUS_PRAKUALIFIKASI:
          return 'Prakualifikasi'
        case Constants.LOG_STATUS_PROPOSAL:
          return 'Proposal'
        case Constants.LOG_STATUS_KLARIFIKASI_DAN_NEGOSIASI:
          return 'Klarifikasi & Negosiasi'    
        default:
          return ''
      }
    } else if (column.id === 'is_selesai') {
      switch(value) {
        case 0:
          return '-'
        default:
          return 'Selesai'
      }
    } else if (column.id === 'penagihan_status') {
      switch(value) {
        case Constants.TERMIN_STATUS_PENAGIHAN_DITERBITKAN:
          return 'Diterbitkan'
        case Constants.TERMIN_STATUS_PENAGIHAN_PENDING:
          return 'Pending'
        case Constants.TERMIN_STATUS_PENAGIHAN_BELUM_ADA:
        default:
          return 'Belum Ada'
      }
    } else {
      return value || '-'
    }
  }

  generateSP3SLF = async () => {
    const {
      proyek,
      namaPihakKeduaInput,
      lokasiPihakKeduaInput,
      namaPemilikRekeningInput,
      nomorRekeningInput,
      namaBankInput,
      alamatBankInput
    } = this.state;
    try{
      if (isNaN(proyek.nomor_sp3)) {
        // eslint-disable-next-line no-throw-literal
        throw 'sp3-number-invalid'
      }

      let payload = {
        nip: proyek.pin,
        nomor_sp3: proyek.nomor_sp3,
        nama_pihak_kedua: namaPihakKeduaInput,
        lokasi_pihak_kedua: lokasiPihakKeduaInput,
        nama_proyek: proyek.nama,
        pemilik_proyek: proyek.nama_pemberi_kerja,
        nomor_kontrak: proyek.nomor_kontrak,
        periode_kontrak_start: proyek.tanggal_kontrak,
        periode_kontrak_end: proyek.tanggal_selesai_kontrak,
        nilai_kontrak: proyek.nilai_proyek,
        nama_pemilik_rekening: namaPemilikRekeningInput,
        nomor_rekening: nomorRekeningInput,
        nama_bank: namaBankInput,
        alamat_bank: alamatBankInput
      }
      const response = await APIBuilder(`sp3/slf/${proyek.id}`, payload, 'POST')
      if (response.code === 200) {
        alert('Berhasil generate SP3 SLF!')
        this.setState({sp3Url: response.payload.url, alertCetakSP3: true})
        this.refreshData()
      }
    } catch (err) {
      if (err === 'sp3-number-invalid') {
        alert('Nomor SP3 harus angka')
      } else {
        alert ('Gagal Mencetak SP3 SLF!')
      }
    }
  }

  generateSP3 = async () => {
    const {
      proyek,
      namaPihakKeduaInput,
      lokasiPihakKeduaInput,
      namaPemilikRekeningInput,
      nomorRekeningInput,
      namaBankInput,
      alamatBankInput
    } = this.state;
    try{

      let payload = {
        nip: proyek.pin,
        nomor_sp3: proyek.nomor_sp3,
        nama_pihak_kedua: namaPihakKeduaInput,
        lokasi_pihak_kedua: lokasiPihakKeduaInput,
        nama_proyek: proyek.nama,
        pemilik_proyek: proyek.nama_pemberi_kerja,
        nomor_kontrak: proyek.nomor_kontrak,
        periode_kontrak_start: proyek.tanggal_kontrak,
        periode_kontrak_end: proyek.tanggal_selesai_kontrak,
        nilai_kontrak: proyek.nilai_proyek,
        nama_pemilik_rekening: namaPemilikRekeningInput,
        nomor_rekening: nomorRekeningInput,
        nama_bank: namaBankInput,
        alamat_bank: alamatBankInput
      }
      const response = await APIBuilder(`sp3/${proyek.id}`, payload, 'POST')
      if (response.code === 200) {
        alert('Berhasil generate SP3!')
        this.setState({sp3Url: response.payload.url, alertCetakSP3: true})
        this.refreshData()
      }
    } catch (err) {
      alert ('Gagal Mencetak SP3!')
    }
  }

  authorizedToEditProyek(role) {
    switch (role) {
      case Constants.ROLE_PM:
      case Constants.ROLE_PC:
      case Constants.ROLE_PA:
        return true;
      default:
        return false
    }
  }

  render() {
    const {proyekName} = this.state
    const {pemberiKerjaDetailWindow, timPelaksanaDetailWindow, prefinancingDetailWindow} = this.state
    const {id} = this.props.match.params
    const {
      editDetailMode,
      pmName,
      namaPemberiKerja,
      alamatPemberiKerja,
      jenisPemberiKerja,
      editPemberiKerjaMode,
      timTerpilih,
      editTimMode,
      kkList,
      latestLogDate,
      latestLogMessage
    } = this.state

    const {
      bidangProyek,
      lokasiProyek,
      nilaiProyek,
      mfProyek,
      lingkupProyek,
      kompetitorProyek
    } = this.state

    const {
      termin,
      terminPage,
      rowsPerTerminPage,
      pembayaranPage,
      rowsPerPembayaranPage
    } = this.state

    const  {
      editKontrakSP3Mode
    } = this.state

    const {proyek} = this.state
    const {tenagaAhli} = this.state

    let pin = (proyek) ? (proyek.pin === null) ? 'xxxx' : proyek.pin : ''

    const {
      nomorKontrakInput,
      tanggalKontrakInput,
      amandemenKontrakInput,
      nomorSP3Input,
      tanggalSP3Input,
      tanggalMulaiProyekInput,
      tanggalSelesaiProyekInput,
      tanggalSelesaiKontrakInput,
      tanggalSelesaiAmandemenInput,
      cetakSP3Mode,
      pembayaranList,
      invoiceDetailWindow,
      sppuDetailWindow,
      selectedInvoice,
      selectedSPPU,
      terminList,
      namaPihakKeduaInput,
      lokasiPihakKeduaInput,
      namaPemilikRekeningInput,
      nomorRekeningInput,
      namaBankInput,
      alamatBankInput,
      alertCetakSP3,
      sp3Url,
    } = this.state

    return (
      <Grid item container>
        {
          alertCetakSP3 ? (
            <Alert variant="filled" severity="success" style={{position:'fixed', top:0, left:0, right:0, zIndex: 999}} onClose={this.setAlerCetakSP3}>
              Berhasil cetak sp3! klik <a href={`${baseUrl}/${sp3Url}`} rel="next noopener noreferrer" target="_blank">di sini</a> untuk melihatnya
            </Alert>
          ) : (
            <div />
          )
        }
        <PemberiKerjaDetailDialog
          open={pemberiKerjaDetailWindow}
          onClose={() => {this.handleTogglePemberiKerjaDetailWindow()}}
          namaPerusahaan={namaPemberiKerja}
          alamatPerusahaan={alamatPemberiKerja}
          jenisInstansi={jenisPemberiKerja}
          proyekId={id}
          emailPemberiKerja={proyek ? proyek.email_pemberi_kerja : ''}
          teleponPemberiKerja={proyek ? proyek.telepon_pemberi_kerja : ''}
          faxPemberiKerja={proyek ? proyek.fax_pemberi_kerja : ''}
          kontakPersonelPemberiKerja={proyek ? proyek.kontak_personel_pemberi_kerja : ''}
          penandatangananKontrakPemberiKerja={proyek ? proyek.penandatanganan_kontrak_pemberi_kerja : ''}
          npwpPemberiKerja={proyek ? proyek.npwp_pemberi_kerja : ''}
          status={proyek ? proyek.status : 0}
          myroute={this.props.location.pathname}
        />
        <TimPelaksanaDetailDialog
          open={timPelaksanaDetailWindow}
          onClose={() => {this.handleToggleTimPelaksanaDetailWindow()}}
          refreshData={() => {this.refreshData()}}
          ketuaTim={timTerpilih.namaKetua}
          pmTim={timTerpilih.namaPM}
          kkTim={(kkList.filter(el => el.id===timTerpilih.kelompokKeahlian)[0]) ? kkList.filter(el => el.id===timTerpilih.kelompokKeahlian)[0].nama : '-'}
          emailTim={timTerpilih.emailTim}
          proyekId={id}
          penandatangananSP3={proyek ? proyek.penandatanganan_sp3 : ''}
          tenagaAhli={tenagaAhli}
          status={proyek ? proyek.status : 0}
          myroute={this.props.location.pathname}
        />
        <PrefinancingDetailDialog
          open={prefinancingDetailWindow}
          onClose={() => {this.handleTogglePrefinancingDetailWindow()}}
          refreshData={() => {this.refreshData()}}
          proyekId={id}
          nilaiPrefinancing={proyek ? proyek.nilai_prefinancing : 0}
          nilaiTerbayarkanPrefinancing={proyek ? proyek.nilai_terbayarkan_prefinancing : 0}
          tanggalPemberianPrefinancing={proyek ? proyek.tanggal_pemberian_prefinancing : ''}
          keteranganPrefinancing={proyek ? proyek.keterangan_prefinancing : ''}
          status={proyek ? proyek.status : 0}
          myroute={this.props.location.pathname}
        />
        <PenagihanInvoiceDetailDialog
          open={invoiceDetailWindow}
          onClose={(e) => {this.handleToggleInvoiceDetailWindow(e)}}
          value={selectedInvoice}
          refreshData={() => {this.refreshData()}}
          myroute={this.props.location.pathname}
        />
        <PembayaranSPPUDetailDialog
          open={sppuDetailWindow}
          onClose={(e) => {this.handleToggleSPPUDetailWindow(e)}}
          value={selectedSPPU}
          refreshData={() => {this.refreshData()}}
          terminList={terminList}
          myroute={this.props.location.pathname}
        />
        <Navbar role={Authorization.getRole()} email={Authorization.getEmail()} title={'Informasi Proyek'}/>
        <Grid item container justify="center" alignItems="center" style={{ marginTop: '2em', padding: '0 4em'}}>
          <Grid item container justify="center" alignItems="center">
            {(proyek) ? ((proyek.status === Constants.PROYEK_STATUS_PEMANTAUAN) || (proyek.status === Constants.PROYEK_STATUS_END)) ? (
              <Typography variant="h5" style={{color: (proyek.status === Constants.PROYEK_STATUS_PEMANTAUAN) ? '#117C9B' : (proyek.status === Constants.PROYEK_STATUS_END) ? '#AB0000' : '#000' }}>{`[${pmName}] P${PinTextFormat(pin)} - ${proyekName} ${(proyek.status === Constants.PROYEK_STATUS_END) ? `(Berakhir)` : ''}` || ''}</Typography>
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
                <Typography variant="h5">Detail Proyek</Typography>
                <Divider />
                <Grid container alignItems="center">
                  <Grid item container md={6}>Bidang Proyek</Grid>
                  <Grid item container md={6}>
                    { editDetailMode ? (
                      <TextField label="Bidang" variant="outlined" fullWidth value={bidangProyek} onChange={this.setBidangProyek}/>
                    ) : (
                      <Typography align="left">: {bidangProyek || '-'}</Typography>
                    ) }
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>Lokasi Proyek</Grid>
                  <Grid item container md={6}>
                    { editDetailMode ? (
                      <TextField label="Lokasi" variant="outlined" fullWidth value={lokasiProyek} onChange={this.setLokasiProyek}/>
                    ) : (
                      <Typography align="left">: {lokasiProyek || '-'}</Typography>
                    ) }
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>Nilai Proyek</Grid>
                  <Grid item container md={6}>
                    { editDetailMode ? (
                      <TextField label="Nilai" variant="outlined" fullWidth value={nilaiProyek} onChange={this.setNilaiProyek}/>
                    ) : (
                      <Typography align="left">: {RupiahFormat(nilaiProyek)}</Typography>
                    ) }
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>MF</Grid>
                  <Grid item container md={6}>
                    { editDetailMode ? (
                      <TextField label="MF" variant="outlined" fullWidth value={mfProyek} onChange={this.setMfProyek}/>
                    ) : (
                      <Typography align="left">: {RupiahFormat(mfProyek)}</Typography>
                    ) }
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>Lingkup Proyek</Grid>
                  <Grid item container md={6}>
                    { editDetailMode ? (
                      <TextField label="Lingkup" variant="outlined" fullWidth value={lingkupProyek} onChange={this.setLingkupProyek}/>
                    ) : (
                      <Typography align="left">: {lingkupProyek || '-'}</Typography>
                    ) }
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>Kompetitor</Grid>
                  <Grid item container md={6}>
                    { editDetailMode ? (
                      <TextField label="Kompetitor" variant="outlined" fullWidth value={kompetitorProyek} onChange={this.setKompetitorProyek}/>
                    ) : (
                      <Typography align="left">: {kompetitorProyek || '-'}</Typography>
                    ) }
                  </Grid>
                </Grid>
                
                <Grid container justify="flex-end" alignItems="center">
                  &nbsp;
                </Grid>
                <Grid container justify="flex-end" alignItems="center">
                  <Grid item>{(this.authorizedToEditProyek(Authorization.getRole()) && proyek && proyek.status === 4) ? (<Button onClick={this.toggleDetailEditMode} style={{padding: '0 0'}}>{editDetailMode ? 'Simpan' : 'Edit'}</Button>) : (<div></div>)}</Grid>
                </Grid>
              </Paper>
              &nbsp;
              <Paper style={{width: '100%', padding: '1em 1.5em'}}>
                {((Authorization.getRole() === Constants.ROLE_MK3L) && (proyek && proyek.status !== Constants.PROYEK_STATUS_END)) ? (
                  <Grid container justify="flex-end" alignItems="center">
                    <Grid item container md={6} justify="flex-end">
                      <Link to={this.props.location.pathname} onClick={() => {this.handleToggleCetakSP3()}}>{cetakSP3Mode ? `Informasi Kontrak & SP3` : `Cetak SP3`}</Link>
                    </Grid>
                  </Grid>
                ) : (
                  <div />
                )}
                { !cetakSP3Mode ? (
                  <div>
                    <Typography variant="h5">Kontrak &amp; SP3</Typography>
                    <Divider />
                    <Grid container alignItems="center">
                      <Grid item container md={6}>No. Kontrak</Grid>
                      <Grid item container md={6}>{ editKontrakSP3Mode ? (<TextField label="No. Kontrak" variant="outlined" fullWidth value={nomorKontrakInput} onChange={this.setNomorKontrak}/>) : (<Typography align="left">: {proyek ? proyek.nomor_kontrak || '-' : '-'}</Typography>)}</Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={2}>&nbsp;</Grid>
                      <Grid item container md={4}><Typography align="right">Tanggal Kontrak</Typography></Grid>
                      <Grid item container md={6}>{ editKontrakSP3Mode ? (<TextField type="date" variant="outlined" fullWidth value={tanggalKontrakInput} onChange={this.setTanggalKontrak}/>) : (<Typography align="left">: {(proyek && proyek.tanggal_kontrak) ? moment(proyek.tanggal_kontrak).format('YYYY-MM-DD') || '-' : '-'}</Typography>)}</Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={2}>&nbsp;</Grid>
                      <Grid item container md={4}><Typography align="right">Amandemen</Typography></Grid>
                      <Grid item container md={6}>{ editKontrakSP3Mode ? (<TextField variant="outlined" type="date" fullWidth value={amandemenKontrakInput} onChange={this.setAmandemenKontrak}/>) : (<Typography align="left">: {(proyek && proyek.amandemen_kontrak) ? moment(proyek.amandemen_kontrak).format('YYYY-MM-DD') || '-' : '-'}</Typography>)}</Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>No. SP3</Grid>
                      <Grid item container md={6}>{ editKontrakSP3Mode ? (<TextField label="No. SP3" variant="outlined" fullWidth value={nomorSP3Input} onChange={this.setNomorSP3}/>) : (<Typography align="left">: {proyek ? proyek.nomor_sp3 || '-' : '-'}</Typography>)}</Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={2}>&nbsp;</Grid>
                      <Grid item container md={4}><Typography align="right">Tanggal SP3</Typography></Grid>
                      <Grid item container md={6}>{ editKontrakSP3Mode ? (<TextField variant="outlined" type="date" fullWidth value={tanggalSP3Input} onChange={this.setTanggalSP3}/>) : (<Typography align="left">: {(proyek && proyek.tanggal_sp3) ? moment(proyek.tanggal_sp3).format('YYYY-MM-DD') || '-' : '-'}</Typography>)}</Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Tgl Mulai Proyek</Grid>
                      <Grid item container md={6}>{ editKontrakSP3Mode ? (<TextField variant="outlined" type="date" fullWidth value={tanggalMulaiProyekInput} onChange={this.setTanggalMulaiProyek}/>) : (<Typography align="left">: {(proyek && proyek.tanggal_mulai_proyek) ? moment(proyek.tanggal_mulai_proyek).format('YYYY-MM-DD') || '-' : '-'}</Typography>)}</Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Tgl Selesai Proyek</Grid>
                      <Grid item container md={6}>{ editKontrakSP3Mode ? (<TextField variant="outlined" type="date" fullWidth value={tanggalSelesaiProyekInput} onChange={this.setTanggalSelesaiProyek}/>) : (<Typography align="left">: {(proyek && proyek.tanggal_selesai_proyek) ? moment(proyek.tanggal_selesai_proyek).format('YYYY-MM-DD') || '-' : '-'}</Typography>)}</Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={2}>&nbsp;</Grid>
                      <Grid item container md={4}><Typography align="right">Kontrak</Typography></Grid>
                      <Grid item container md={6}>{ editKontrakSP3Mode ? (<TextField variant="outlined" type="date" fullWidth value={tanggalSelesaiKontrakInput} onChange={this.setTanggalSelesaiKontrak}/>) : (<Typography align="left">: {(proyek && proyek.tanggal_selesai_kontrak) ? moment(proyek.tanggal_selesai_kontrak).format('YYYY-MM-DD') || '-' : '-'}</Typography>)}</Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={2}>&nbsp;</Grid>
                      <Grid item container md={4}><Typography align="right">Amandemen</Typography></Grid>
                      <Grid item container md={6}>{ editKontrakSP3Mode ? (<TextField variant="outlined" type="date" fullWidth value={tanggalSelesaiAmandemenInput} onChange={this.setTanggalSelesaiAmandemen}/>) : (<Typography align="left">: {(proyek && proyek.tanggal_selesai_amandemen) ? moment(proyek.tanggal_selesai_amandemen).format('YYYY-MM-DD') || '-' : '-'}</Typography>)}</Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Sisa Hari</Grid>
                      <Grid item container md={6}><Typography align="left">: {proyek ? (
                        (moment(proyek.tanggal_selesai_proyek).locale('id').diff(moment(), 'days') > 0) ?
                          `${moment(proyek.tanggal_selesai_proyek).locale('id').diff(moment(), 'days')} Hari`
                        :
                          '0 Hari'
                        ) : '-'}
                      </Typography></Grid>
                    </Grid>
                    <Grid container justify="flex-end" alignItems="center">
                      <Grid item>{(Authorization.getRole() === 5 && proyek && proyek.status === 4) ? (<Button onClick={this.toggleKontrakSP3EditMode} style={{padding: '0 0'}}>{editKontrakSP3Mode ? 'Simpan' : 'Edit'}</Button>) : (<div></div>)}</Grid>
                    </Grid>
                    <br />
                  </div>
                ) : (
                  <div>
                    <Typography variant="h5">Form Cetak SP3</Typography>
                    <Divider />
                    
                    <br />
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Nomor SP3</Grid>
                      <Grid item container md={6}><Typography variant="body1">{proyek.nomor_sp3}</Typography></Grid>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Nama Pihak Kedua</Grid>
                      <Grid item container md={6}><TextField variant="outlined" type="text" fullWidth value={namaPihakKeduaInput} onChange={this.setNamaPihakKeduaInput}/></Grid>
                    </Grid>
                    <br />
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Lokasi Pihak Kedua</Grid>
                      <Grid item container md={6}><TextField variant="outlined" type="text" fullWidth value={lokasiPihakKeduaInput} onChange={this.setLokasiPihakKeduaInput}/></Grid>
                    </Grid>
                    <br />
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Nama Pemilik Rekening</Grid>
                      <Grid item container md={6}><TextField variant="outlined" type="text" fullWidth value={namaPemilikRekeningInput} onChange={this.setNamaPemilikRekeningInput}/></Grid>
                    </Grid>
                    <br />
                    <Grid container alignItems="center">
                      <Grid item container md={6}>No. Rekening</Grid>
                      <Grid item container md={6}><TextField variant="outlined" type="text" fullWidth value={nomorRekeningInput} onChange={this.setNomorRekeningInput}/></Grid>
                    </Grid>
                    <br />
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Nama Bank</Grid>
                      <Grid item container md={6}><TextField variant="outlined" type="text" fullWidth value={namaBankInput} onChange={this.setNamaBankInput}/></Grid>
                    </Grid>
                    <br />
                    <Grid container alignItems="center">
                      <Grid item container md={6}>Alamat Bank</Grid>
                      <Grid item container md={6}><TextField variant="outlined" type="text" fullWidth value={alamatBankInput} onChange={this.setAlamatBankInput}/></Grid>
                    </Grid>
                    <br />
                    <Grid container justify="flex-end" alignItems="center">
                      <Grid item>{(Authorization.getRole() === Constants.ROLE_MK3L && proyek && proyek.status === 4) ? (<Button onClick={this.generateSP3}>{'Cetak SP3'}</Button>) : (<div></div>)}</Grid>
                    </Grid>
                    <br />
                    <Grid container justify="flex-end" alignItems="center">
                      <Grid item>{(Authorization.getRole() === Constants.ROLE_MK3L && proyek && proyek.status === 4) ? (<Button onClick={this.generateSP3SLF}>{'Cetak SP3 (Draft SLF)'}</Button>) : (<div></div>)}</Grid>
                    </Grid>
                    <br />
                  </div>
                )}
              </Paper>
            </Grid>
            <Grid item container justify="center" alignItems="center" md={4}>
              <Paper style={{width: '100%', padding: '1em 1.5em'}}>
                <Grid container justify="flex-end" alignItems="center">
                  <Grid item container md={6} justify="flex-end">
                    <Link to={this.props.location.pathname} onClick={() => {this.handleTogglePemberiKerjaDetailWindow()}}>Detail</Link>
                  </Grid>
                </Grid>
                <Typography variant="h5">Pemberi Kerja</Typography>
                <Divider />
                <Grid container alignItems="center">
                  <Grid item container md={12}><Typography align="left">{namaPemberiKerja || '-'}</Typography></Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={12}><Typography align="left">{alamatPemberiKerja || '-'}</Typography></Grid>
                </Grid>
              </Paper>
              &nbsp;
              <Paper style={{width: '100%', padding: '1em 1.5em'}}>
                <Grid container justify="flex-end" alignItems="center">
                  <Grid item container md={6} justify="flex-end">
                    <Link to={this.props.location.pathname} onClick={() => {this.handleToggleTimPelaksanaDetailWindow()}}>Detail</Link>
                  </Grid>
                </Grid>
                <Typography variant="h5">Tim Pelaksana</Typography>
                <Divider />
                <Grid container alignItems="center">
                  <Grid item container md={6}>Ketua Proyek</Grid>
                  <Grid item container md={6}><Typography align="left">: {timTerpilih.namaKetua || '-'}</Typography></Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>PM Tim</Grid>
                  <Grid item container md={6}><Typography align="left">: {timTerpilih.namaPM || '-'}</Typography></Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item container md={6}>KK</Grid>
                  <Typography align="left">: {(kkList.filter(el => el.id===timTerpilih.kelompokKeahlian)[0]) ? kkList.filter(el => el.id===timTerpilih.kelompokKeahlian)[0].nama : '-'}</Typography>
                </Grid>
                <Divider />
                <Grid container alignItems="center">
                  <Grid item container md={6}>Prefinancing</Grid>
                    <Grid item container md={6} alignItems="center">
                      <Typography align="left">: {(proyek) ? (proyek.tanggal_pemberian_prefinancing) ? 'Ada' : 'Tidak Ada' : 'Tidak Ada'}</Typography>
                      &nbsp;&nbsp;
                      <MUIButton style={{border: '1px solid black', borderRadius: '15px 15px', padding: '0 0'}} onClick={() => {
                        this.handleTogglePrefinancingDetailWindow()
                      }}>
                        Ubah
                      </MUIButton>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end" alignItems="center">
                  &nbsp;
                </Grid>
                <Grid container justify="flex-end" alignItems="center">
                  <Grid item>{(this.authorizedToEditProyek(Authorization.getRole()) && proyek && proyek.status === 1) ? (<Button onClick={this.togglePemberiKerjaEditMode} style={{padding: '0 0'}}>{editPemberiKerjaMode ? 'Simpan' : 'Edit'}</Button>) : (<div></div>)}</Grid>
                </Grid>
              </Paper>
              &nbsp;
              <Paper style={{width: '100%', padding: '1em 1.5em', boxSizing: 'border-box'}}>
                <Grid container justify="flex-end" alignItems="center">
                  <Grid item container md={6} justify="flex-end">
                    <Link to={`/proyek/log/${id}`}>Detail</Link>
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
              <Paper style={{width: '100%', padding: '1em 1.5em', boxSizing: 'border-box'}}>
                <Grid container justify="flex-end" alignItems="center">
                  <Grid item container md={6} justify="flex-end">
                    <Link to={`/proyek/termin/${id}`}>Detail</Link>
                  </Grid>
                </Grid>
                <Typography variant="h5">Termin Proyek</Typography>
                <Divider />
                <Paper style={{overflowX: 'auto'}}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {terminColumns.map(column => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {termin.slice(terminPage * rowsPerTerminPage, terminPage * rowsPerTerminPage + rowsPerTerminPage).map((row, index) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {terminColumns.map(column => {
                              const value = row[column.id]
                              const penagihanStatus = row['penagihan_status']
                              if (column.id === "termin_ke") {
                                return (
                                  <TableCell key={column.id+value} align={column.align}>
                                    { value }
                                  </TableCell>
                                )
                              } else if (column.id === "persentase") {
                                return (
                                  <TableCell key={column.id+value} align={column.align}>
                                    { value }&#37;
                                  </TableCell>
                                )
                              } else if (column.id === 'termin-menu') {
                                return (
                                  <TableCell key={column.id+index} align={column.align}>
                                    <Link to={this.props.location.pathname} onClick={(e) => this.handleRemoveTermin(e,row.id)}>Hapus</Link>
                                    <br />
                                    <Link to={this.props.location.pathname} onClick={(e) => this.handleFinishTermin(e,row.id)}>Selesai</Link>
                                  </TableCell>
                                )
                              } else if (column.id === 'termin-masalah-action') {
                                return (
                                  <TableCell key={column.id+index} align={column.align}>
                                    <Link to={this.props.location.pathname} onClick={(e) => this.selectMasalahDetail(row.id)}>Detail</Link>
                                  </TableCell>
                                )
                              } else if (column.id === 'masalah_count') {
                                return (
                                  <TableCell key={column.id+index} align={column.align}>
                                    {value || 0}
                                  </TableCell>
                                )
                              } else if (column.id === 'termin-penagihan-action') {
                                return (
                                  <TableCell key={column.id+index} align={column.align}>
                                    {(penagihanStatus === Constants.TERMIN_STATUS_PENAGIHAN_DITERBITKAN) ? (<Link>Lihat</Link>) : ''}
                                    {(penagihanStatus === Constants.TERMIN_STATUS_PENAGIHAN_PENDING) ? '-' : ''}
                                    {(penagihanStatus === Constants.TERMIN_STATUS_PENAGIHAN_BELUM_ADA) ? (<Link to={this.props.location.pathname} onClick={(e) => this.handleTagihTermin(e,row.id)}>Ajukan</Link>) : ''}
                                  </TableCell>
                                )
                              } else if (['target_selesai', 'tanggal_selesai', 'tanggal_penagihan'].includes(column.id)) {
                                let date = new Date(value)
                                return (
                                  <TableCell key={column.id+value} align={column.align}>
                                    {(value) ? `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` : '-'}
                                  </TableCell>
                                )
                              } else {
                                return (
                                  <TableCell key={column.id+value} align={column.align}>
                                    { this.columnValue(column,value) }
                                  </TableCell>
                                )
                              }
                            })}
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </Paper>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  count={termin.length}
                  rowsPerPage={rowsPerTerminPage}
                  page={terminPage}
                  onChangePage={this.handleChangeTerminPage}
                  onChangeRowsPerPage={this.handleChangeRowsPerTerminPage}
                />
                <Grid container justify="flex-end" alignItems="center">
                  &nbsp;
                </Grid>
                <Grid container justify="flex-end" alignItems="center">
                  <Grid item>{(this.authorizedToEditProyek(Authorization.getRole()) && proyek && proyek.status === 1) ? (<Button onClick={this.toggleTimEditMode} style={{padding: '0 0'}}>{editTimMode ? 'Simpan' : 'Edit'}</Button>) : (<div></div>)}</Grid>
                </Grid>
              </Paper>
              &nbsp;
              <Paper style={{width: '100%', padding: '1em 1.5em'}}>
                <Typography variant="h5">Pembayaran</Typography>
                <Divider />
                <Paper style={{overflowX: 'auto'}}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {pembayaranColumns.map(column => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pembayaranList.slice(terminPage * rowsPerPembayaranPage, terminPage * rowsPerPembayaranPage + rowsPerPembayaranPage).map((row, index) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {pembayaranColumns.map(column => {
                              const value = row[column.id]
                              // eslint-disable-next-line no-unused-vars
                              const penagihanStatus = row['penagihan_status']
                              if (column.id === "no") {
                                return (
                                  <TableCell key={column.id+value} align={column.align}>
                                    { index + 1 }
                                  </TableCell>
                                )
                              } else if (column.id === "type") {
                                let code = 'INV'
                                if (value === 'sppu') {
                                  code = 'SPPU'
                                }
                                return (
                                  <TableCell key={column.id+value} align={column.align}>
                                    {code}
                                  </TableCell>
                                )
                              }  else if (column.id === "tanggal") {
                                return (
                                  <TableCell key={column.id+value} align={column.align}>
                                    {moment(value).format('YYYY-MM-DD')}
                                  </TableCell>
                                )
                              } else if (column.id === 'status') {
                                let status = ''
                                if ((row['type'] === 'invoice') && (value === Constants.TERMIN_STATUS_PENAGIHAN_DITERBITKAN)) {
                                  status = 'Ditagih'
                                }
                                if ((row['type'] === 'invoice') && (value === Constants.TERMIN_STATUS_PENAGIHAN_DIBAYARKAN)) {
                                  status = 'Lunas'
                                }
                                if ((row['type'] === 'sppu') && (value === Constants.SPPU_STATUS_DRAFT)) {
                                  status = 'Ditagih'
                                }
                                if ((row['type'] === 'sppu') && (value === Constants.SPPU_STATUS_TERBAYAR)) {
                                  status = 'Lunas'
                                }
                                return (
                                  <TableCell key={column.id+index} align={column.align}>
                                    {status}
                                  </TableCell>
                                )
                              } else if (column.id === 'action') {
                                const onInvoice = (e) => {
                                  this.setState({selectedInvoice: row.value})
                                  this.handleToggleInvoiceDetailWindow(e);
                                }
                                const onSPPU = (e) => {
                                  this.setState({selectedSPPU: row.value})
                                  this.handleToggleSPPUDetailWindow(e);
                                }
                                return (
                                  <TableCell key={column.id+index} align={column.align}>
                                    <Link to={this.props.location.pathname} onClick={(e) => {
                                      if (row['type'] === 'invoice') {
                                        onInvoice(e)
                                      } else {
                                        onSPPU(e)
                                      }
                                    }}>Detail</Link>
                                  </TableCell>
                                )
                              } else {
                                return (
                                  <TableCell key={column.id+value} align={column.align}>
                                    -
                                  </TableCell>
                                )
                              }
                            })}
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </Paper>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  count={pembayaranList.length}
                  rowsPerPage={rowsPerPembayaranPage}
                  page={pembayaranPage}
                  onChangePage={this.handleChangePembayaranPage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPembayaranPage}
                />
                <Grid container justify="flex-end" alignItems="center">
                  &nbsp;
                </Grid>
                <Grid container justify="flex-end" alignItems="center">
                  <Grid item>{(this.authorizedToEditProyek(Authorization.getRole()) && proyek && proyek.status === 1) ? (<Button onClick={this.toggleTimEditMode} style={{padding: '0 0'}}>{editTimMode ? 'Simpan' : 'Edit'}</Button>) : (<div></div>)}</Grid>
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

export default DetailProyek