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

export default []