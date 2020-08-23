import Constants from './Constants'
export const CodeToJenisPengadaan = (code) => {
  switch (code) {
    case Constants.PROYEK_JENIS_PENGADAAN_SELEKSI_UMUM:
      return 'Seleksi Umum'
    case Constants.PROYEK_JENIS_PENGADAAN_SELEKSI_TERBATAS:
      return 'Seleksi Terbatas'
    case Constants.PROYEK_JENIS_PENGADAAN_PEMILIHAN_LANGSUNG:
      return 'Pemilihan Langsung'
    case Constants.PROYEK_JENIS_PENGADAAN_PENUNJUKAN_LANGSUNG:
      return 'Penunjukan Langsung'
    case Constants.PROYEK_JENIS_PENGADAAN_SWAKELOLA:
      return 'Swakelola'
    default:
      return ''
  }
}

export const CodeToJenisPemberiKerja = (code) => {
  switch(code) {
    case Constants.JENIS_PEMBERI_KERJA_PEMERINTAH_PUSAT:
      return "Pemerintah Pusat"
    case Constants.JENIS_PEMBERI_KERJA_PEMERINTAH_DAERAH:
      return "Pemerintah Daerah"
    case Constants.JENIS_PEMBERI_KERJA_BUMN_BUMD_BHMN:
      return "BUMN BUMD BHMN"
    case Constants.JENIS_PEMBERI_KERJA_SWASTA:
      return "Swasta"
    case Constants.JENIS_PEMBERI_KERJA_LAIN_LAIN:
      return "Lain - lain"
    default:
      return ''
  }
}

export default []