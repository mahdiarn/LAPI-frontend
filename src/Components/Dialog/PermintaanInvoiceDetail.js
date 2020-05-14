/* eslint-disable no-throw-literal */
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import { Dialog, DialogTitle, Grid, TextField, Divider, Typography, Checkbox, Select, FormControlLabel, MenuItem } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import APIBuilder from '../../Shared/APIBuilder'
import Progress from '../Progress/Progress'
import Input from '../Button/MainInput'
import Button from '../Button/MainButton'
import PersentaseNilaiKontrakTextFormat from '../TextFormat/PersentaseNilaiKontrakTextFormat'
import PersentaseTextFormat from '../TextFormat/PersentaseTextFormat'
import {RupiahFormat} from '../../Shared/TextTransformer'
import Constants from '../../Shared/Constants'
import {baseUrl} from '../../Shared/Config'

function PermintaanInvoiceDetail(props) {
  const [progressVisibility, setProgressVisibility] = useState(false)
  const [persentaseNilaiKontrakInput, setPersentaseNilaiKontrakInput] = useState(0)
  const [persentasePajakInput, setPersentasePajakInput] = useState(10)
  const [urlFile, setUrlFile] = useState('')
  const [invoiceNumberInput, setInvoiceNumberInput] = useState(0)
  const [kodeInput, setKodeInput] = useState('')
  const [labelInput, setLabelInput] = useState('')
  const [workInput, setWorkInput] = useState('')
  const [attentionInput, setAttentionInput] = useState('')
  const [proformaChecked, setProformaChecked] = useState(false)
  const [fakturStatus, setFakturStatus] = useState(0)

  const [addressOneInput, setAddressOneInput] = useState('')
  const [addressTwoInput, setAddressTwoInput] = useState('')
  const [addressThreeInput, setAddressThreeInput] = useState('')
  const [addressFourInput, setAddressFourInput] = useState('')
  
  const [invoiceUrl, setInvoiceUrl] = useState('')

  const [alertCetakInvoice, setAlertCetakInvoice] = useState(false)

  const {
    onClose,
    refreshData,
    open,
    myroute,
    value
  } = props

  useEffect(() => {
    setPersentaseNilaiKontrakInput(value.persentase || 0)
    setUrlFile((`${baseUrl}/uploads/${value.filename}.${value.extension}`) || "")
    setFakturStatus(value.faktur_status || 0)
    setProformaChecked((value.is_proforma) ? true : false)
    getInvoiceNumber()
  }, [value.persentase, value.is_proforma, value.faktur_status, value.filename, value.extension])

  const getInvoiceNumber = async() => {
    const response = await APIBuilder('counter/invoice')
    console.log(response)
    if (response.code === 200) setInvoiceNumberInput(response.payload.data + 1)
  }

  const handleClose = () => {
    handleRefresh()
    onClose(value)
  }

  const handleRefresh = () => {
    refreshData()
  }

  const handleChangeFakturStatus = (event) => {
    setFakturStatus(event.target.value)
  }

  const handlePersentaseNilaiKontrakInput = (event) => {
    setPersentaseNilaiKontrakInput(Number(event.target.value))
  }

  const handlePersentasePajakInput = (event) => {
    setPersentasePajakInput(Number(event.target.value))
  }

  const handleKodeInput = (event) => {
    setKodeInput(event.target.value)
  }

  const handleLabelInput = (event) => {
    setLabelInput(event.target.value)
  }

  const handleWorkInput = (event) => {
    setWorkInput(event.target.value)
  }

  const handleAttentionInput = (event) => {
    setAttentionInput(event.target.value)
  }

  const handleAddressOneInput = (event) => {
    setAddressOneInput(event.target.value)
  }
  const handleAddressTwoInput = (event) => {
    setAddressTwoInput(event.target.value)
  }
  const handleAddressThreeInput = (event) => {
    setAddressThreeInput(event.target.value)
  }
  const handleAddressFourInput = (event) => {
    setAddressFourInput(event.target.value)
  }
  const handleInvoiceNumberInput = (event) => {
    setInvoiceNumberInput(event.target.value)
  }

  const transformBeritaAcaraStatus = (status) => {
    switch (status) {
      case Constants.BERITA_ACARA_TIDAK_ADA:
        return 'Tidak Ada'
      case Constants.BERITA_ACARA_BELUM_ADA:
        return 'Belum Ada'
      case Constants.BERITA_ACARA_ADA:
        return 'Ada'
      default:
        return '-'
    }
  }
  
  const handleSubmit = async (e, isCetakInvoice = false) => {
    setProgressVisibility(true)
    e.preventDefault()
    try {
      if ((persentaseNilaiKontrakInput>100) || (persentaseNilaiKontrakInput <= 0)) {
        throw "invalid-percentage"
      }
      const payload = {
        is_proforma: proformaChecked,
        faktur_status: fakturStatus,
        persentase_nilai_kontrak: persentaseNilaiKontrakInput,
        is_cetak_invoice: isCetakInvoice
      }
      if (isCetakInvoice) {
        if (
          (!invoiceNumberInput) ||
          (!attentionInput) ||
          (!labelInput) ||
          (!workInput) ||
          (!kodeInput) ||
          (
            (
              (persentasePajakInput>100) ||
              (persentasePajakInput <= 0)
            )
          ) ||
          (!addressOneInput)
        ) {
          throw "insufficent-input-cetak"
        }
        payload.invoice_number = invoiceNumberInput
        payload.attention = attentionInput
        payload.invoice_label = labelInput
        payload.invoice_work = workInput
        payload.invoice_code = kodeInput
        payload.invoice_tax_percentage = persentasePajakInput
        payload.address_one = addressOneInput
        payload.address_two = addressTwoInput
        payload.address_three = addressThreeInput
        payload.address_four = addressFourInput
      }
      
      const response = await APIBuilder(`termin-proyek/${value.id}/update`, payload, 'POST')
      if (response.code === 200) {
        alert('Berhasil ubah data permohonan penagihan invoice!')
        setInvoiceUrl(response.payload.url)
        setAlertCetakInvoice(true)
      } else {
        throw "failed"
      }

      if (isCetakInvoice) {
        setProgressVisibility(false)
        console.log(response)
      } else {
        setProgressVisibility(false)
        handleRefresh()
        return handleClose()
      }
    } catch (err) {
      switch (err) {
        case "invalid-percentage":
          alert('Nilai persentase harus di antara 1 sampai 100!')
          break
        case "insufficent-input-cetak":
            alert('Tolong lengkapi form cetak invoice!')
            break
        case "failed":
        default:
          alert('Gagal ubah data permohonan penagihan invoice!')
      }
      setProgressVisibility(false)
    }
    
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='md' fullWidth PaperProps={{style : {padding:'1em 2em'}}}>
      <Progress visibility={progressVisibility} />
      <Grid container alignItems="center" justify="flex-end">
        <Link to={myroute} onClick={() => {handleClose()}}>X</Link>
      </Grid>
      <DialogTitle id="simple-dialog-title" align="center">Permintaan Invoice</DialogTitle>
      <Divider />
      <br />
      <form onSubmit={handleSubmit} style={{padding: '0em 1em'}}>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Tanggal Permintaan</Grid>
          <Grid item md={6}>
            {(value.tanggal_penagihan) ? `${(new Date(value.tanggal_penagihan)).getDate()}/${(new Date(value.tanggal_penagihan)).getMonth()+1}/${(new Date(value.tanggal_penagihan)).getFullYear()}` : '-'}
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Berita Acara</Grid>
          <Grid item md={6}>
            {transformBeritaAcaraStatus(value.berita_acara_status)} {(urlFile.length > 0) ? (
              <Link to={myroute} onClick={() => {window.open(`${urlFile}`,`_blank`)}}>(Lihat File)</Link>
            ) : (
              <div />
            )}
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>% Penagihan</Grid>
          <Grid item md={6}>
            <TextField
              value={persentaseNilaiKontrakInput}
              defaultValue={value.persentase}
              onChange={handlePersentaseNilaiKontrakInput}
              id="input-terbayar"
              InputProps={{
                inputComponent: PersentaseNilaiKontrakTextFormat,
              }}
            />  
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Jumlah Penagihan</Grid>
          <Grid item md={6}><Typography>{RupiahFormat(value.nilai_proyek * persentaseNilaiKontrakInput / 100)}</Typography></Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>No. Invoice</Grid>
          <Grid item md={6}>
            -
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Proforma</Grid>
          <Grid item md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={proformaChecked}
                  onChange={() => setProformaChecked(!proformaChecked)}
                  value="proformaChecked"
                  color="primary"
                />
              }
              label="Ya"
            />
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Faktur Pajak</Grid>
          <Grid item md={6}>
            <Select
              id="faktur-select"
              value={fakturStatus}
              onChange={handleChangeFakturStatus}
            >
              <MenuItem value={Constants.FAKTUR_PAJAK_STATUS_BELUM_ADA}>Belum Ada</MenuItem>
              <MenuItem value={Constants.FAKTUR_PAJAK_STATUS_TIDAK_ADA}>Tidak Ada</MenuItem>
              <MenuItem value={Constants.FAKTUR_PAJAK_STATUS_ADA}>Ada</MenuItem>
            </Select>
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <DialogTitle id="simple-dialog-title" align="center">Form Cetak Invoice</DialogTitle>
        <Divider />
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Nomor Invoice</Grid>
          <Grid item md={6}>
            <TextField
              value={invoiceNumberInput}
              onChange={handleInvoiceNumberInput}
              id="input-nomor-invoice"
            />  
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>% Pajak</Grid>
          <Grid item md={6}>
            <TextField
              value={persentasePajakInput}
              onChange={handlePersentasePajakInput}
              id="input-persentase-pajak"
              InputProps={{
                inputComponent: PersentaseTextFormat,
              }}
            />  
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Kode (cth: SPK, Kontrak, dll.)</Grid>
          <Grid item md={6}>
            <TextField
              value={kodeInput}
              onChange={handleKodeInput}
              id="input-kode"
            />  
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Label (cth: termin II/terakhir-50% nilai kontrak)</Grid>
          <Grid item md={6}>
            <TextField
              value={labelInput}
              onChange={handleLabelInput}
              id="input-kode"
            />  
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Pekerjaan (cth: Jasa a)</Grid>
          <Grid item md={6}>
            <TextField
              value={workInput}
              onChange={handleWorkInput}
              id="input-work"
            />  
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Attention (cth: Bagian Keuangan)</Grid>
          <Grid item md={6}>
            <TextField
              value={attentionInput}
              onChange={handleAttentionInput}
              id="input-attention"
            />  
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Alamat Invoice (Baris satu)</Grid>
          <Grid item md={6}>
            <TextField
              value={addressOneInput}
              onChange={handleAddressOneInput}
              id="input-attention"
            />  
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Alamat Invoice (Baris dua)</Grid>
          <Grid item md={6}>
            <TextField
              value={addressTwoInput}
              onChange={handleAddressTwoInput}
              id="input-attention"
            />  
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Alamat Invoice (Baris tiga)</Grid>
          <Grid item md={6}>
            <TextField
              value={addressThreeInput}
              onChange={handleAddressThreeInput}
              id="input-attention"
            />  
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Grid item md={4}>Alamat Invoice (Baris empat)</Grid>
          <Grid item md={6}>
            <TextField
              value={addressFourInput}
              onChange={handleAddressFourInput}
              id="input-attention"
            />  
          </Grid>
          <Grid item md={2}>&nbsp;</Grid>
        </Grid>
        <Grid item container>&nbsp;</Grid>
        <Grid item container direction="row-reverse">
          <Grid item md={4} container direction="row-reverse"><Button style={{padding: '1.5em 1em', height: '2em'}} onClick={(e) => {handleSubmit(e,true)}}><Typography variant="caption" style={{fontSize:'14px'}}>Cetak Invoice</Typography></Button></Grid>
        </Grid>
        <Grid item container>&nbsp;</Grid>
        <Grid item container direction="row-reverse">
          <Grid item md={4} container direction="row-reverse"><Input type="submit" disableUnderline value="Simpan Perubahan"></Input></Grid>
        </Grid>
      </form>
      <Grid item container>&nbsp;</Grid>
      {
        alertCetakInvoice ? (
          <Alert variant="filled" severity="success" style={{position:'fixed', top:0, left:0, right:0}} onClose={() => {setAlertCetakInvoice(!alertCetakInvoice)}}>
            Berhasil cetak invoice! klik <a href={`${baseUrl}/${invoiceUrl}`} rel="next noopener noreferrer" target="_blank">di sini</a> untuk melihatnya
          </Alert>
        ) : (
          <div />
        )
      }
      
      <Grid item container>&nbsp;</Grid>
    </Dialog>
  )
}

PermintaanInvoiceDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  refreshData: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired
}

export default PermintaanInvoiceDetail