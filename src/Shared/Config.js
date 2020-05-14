import Constants from './Constants'

export default []
export const routesPM = [
  {name: 'Daftar Peluang', url: '/daftar-peluang'},
  {name: 'Daftar Proyek', url: '/daftar-proyek'},
]

export const routesMK3L = [
  {name: 'Daftar Peluang', url: '/daftar-peluang'},
  {name: 'Daftar Proyek', url: '/daftar-proyek'},
  {name: 'Daftar Pelanggan', url: '/daftar-pelanggan'},
  {name: 'Daftar Tim', url: '/daftar-tim'},
]

export const routesSuperUser = [
  {name: 'Daftar User', url: '/daftar-user'},
  {name: 'Tambah User', url: '/tambah-user'},
  {name: 'Tambah Role', url: '/tambah-role'},
]

export const routesKeuangan = [
  {name: 'Permintaan Invoice', url: '/permintaan-invoice'},
  {name: 'Pembayaran Invoice', url: '/pembayaran-invoice'},
  {name: 'Pembayaran SPPU', url: '/pembayaran-sppu'},
]

export const routesProfile = [
  {name: 'Data KKH', url: '/data-kkh'},
  {name: 'Pengaturan Akun', url: '/profile'},
]

export const klasifikasiProyek = [
  {name: '-', value: 0},
  {name: 'Konsultan', value: Constants.PROYEK_KLASIFIKASI_KONSULTAN},
  {name: 'Pelatihan', value: Constants.PROYEK_KLASIFIKASI_PELATIHAN},
  {name: 'Pengembangan Teknologi', value: Constants.PROYEK_KLASIFIKASI_PENGEMBANGAN_TEKNOLOGI},
  {name: 'Pengujian', value: Constants.PROYEK_KLASIFIKASI_PENGUJIAN},
]

export const jenisPengadaan = [
  {name: '-', value: 0},
  {name: 'Pemilihan Langsung', value: Constants.PROYEK_JENIS_PENGADAAN_PEMILIHAN_LANGSUNG},
  {name: 'Penunjukan Langsung', value: Constants.PROYEK_JENIS_PENGADAAN_PENUNJUKAN_LANGSUNG},
  {name: 'Seleksi Terbatas', value: Constants.PROYEK_JENIS_PENGADAAN_SELEKSI_TERBATAS},
  {name: 'Seleksi Umum', value: Constants.PROYEK_JENIS_PENGADAAN_SELEKSI_UMUM},
  {name: 'Swakelola', value: Constants.PROYEK_JENIS_PENGADAAN_SWAKELOLA},
]

export const jenisPemberiKerja = [
  {name: '-', value: 0},
  {name: 'Pemerintah Pusat', value: Constants.JENIS_PEMBERI_KERJA_PEMERINTAH_PUSAT},
  {name: 'Pemerintah Daerah', value: Constants.JENIS_PEMBERI_KERJA_PEMERINTAH_DAERAH},
  {name: 'BUMN / BUMD / BHMN', value: Constants.JENIS_PEMBERI_KERJA_BUMN_BUMD_BHMN},
  {name: 'Swasta', value: Constants.JENIS_PEMBERI_KERJA_SWASTA},
  {name: 'Lain - Lain', value: Constants.JENIS_PEMBERI_KERJA_LAIN_LAIN},
]

export const informasiPembawaPekerjaan = [
  {name: '-', value: 0},
  {name: 'Ketua Tim', value: Constants.INFORMASI_PEMBAWA_PEKERJAAN_KETUA_TIM},
  {name: 'Project Manager Tim', value: Constants.INFORMASI_PEMBAWA_PEKERJAAN_PROJECT_MANAGER_TIM},
  {name: 'User / Klien', value: Constants.INFORMASI_PEMBAWA_PEKERJAAN_USER_CLIENT},
  {name: 'Manajemen PT LAPI ITB (Direksi/Pekerja)', value: Constants.INFORMASI_PEMBAWA_PEKERJAAN_MANAJEMEN_LAPI},
  {name: 'Mitra', value: Constants.INFORMASI_PEMBAWA_PEKERJAAN_MITRA}, 
]

export const jenisPengelolaan = [
  {name: '-', value: 0},
  {name: 'Dosen', value: Constants.JENIS_PENGELOLAAN_DOSEN},
  {name: 'Alumni / Pensiunan', value: Constants.JENIS_PENGELOLAAN_ALUMNI_PENSIUNAN},
  {name: 'Internal', value: Constants.JENIS_PENGELOLAAN_INTERNAL},
  {name: 'UUK', value: Constants.JENIS_PENGELOLAAN_UUK},
  {name: 'OS', value: Constants.JENIS_PENGELOLAAN_OS}
]

export const lingkupProyek = [
  {name: '-', value: 0},
  {name: 'Study', value: Constants.LINGKUP_PROYEK_STUDY},
  {name: 'Inspeksi dan Pengujian', value: Constants.LINGKUP_PROYEK_INSPEKSI_DAN_PENGUJIAN},
  {name: 'Perencanaan dan Perancangan', value: Constants.LINGKUP_PROYEK_PERENCANAAN_DAN_PERANCANGAN},
  {name: 'Manajemen Proyek dan Supervisi', value: Constants.LINGKUP_PROYEK_MANAJEMEN_PROYEK_DAN_SUPERVISI},
  {name: 'Survey', value: Constants.LINGKUP_PROYEK_SURVEY}
]

export const konsorsium = [
  {name: '-', value: 0},
  {name: 'Ya', value: Constants.KONSORSIUM_TRUE},
  {name: 'Tidak', value: Constants.KONSORSIUM_FALSE},
]

export const kemajuanProyek = [
  {name: '-', value: 0},
  {name: 'Pendaftaran', value: Constants.KEMAJUAN_PROYEK_PENDAFTARAN},
  {name: 'Prakualifikasi', value: Constants.KEMAJUAN_PROYEK_PRAKUALIFIKASI},
  {name: 'Proposal', value: Constants.KEMAJUAN_PROYEK_PROPOSAL},
  {name: 'Negosiasi', value: Constants.KEMAJUAN_PROYEK_NEGOSIASI},
  {name: 'Kontrak', value: Constants.KEMAJUAN_PROYEK_KONTRAK}
]

export const rekamJejakPemberiKerja = [
  {name: '-', value: 0},
  {name: 'Baik', value: Constants.REKAM_JEJAK_CALON_PEMBERI_KERJA_BAIK},
  {name: 'Kurang Baik', value: Constants.REKAM_JEJAK_CALON_PEMBERI_KERJA_KURANG_BAIK},
  {name: 'Tidak Baik', value: Constants.REKAM_JEJAK_CALON_PEMBERI_KERJA_TIDAK_BAIK},
  {name: 'Pemberi Kerja Baru', value: Constants.REKAM_JEJAK_CALON_PEMBERI_KERJA_BARU}
]

export const rekamJejakTim = [
  {name: '-', value: 0},
  {name: 'Baik', value: Constants.REKAM_JEJAK_TIM_BAIK},
  {name: 'Kurang Baik', value: Constants.REKAM_JEJAK_TIM_KURANG_BAIK},
  {name: 'Tidak Baik', value: Constants.REKAM_JEJAK_TIM_TIDAK_BAIK},
  {name: 'Tim Baru', value: Constants.REKAM_JEJAK_TIM_BARU}
]

export const kompetensiTim = [
  {name: '-', value: 0},
  {name: 'Sesuai', value: Constants.KOMPETENSI_TIM_SESUAI},
  {name: 'Tidak Sesuai', value: Constants.KOMPETENSI_TIM_TIDAK_SESUAI},
]

export const jenisInformasi = [
  {name: '-', value: Constants.LOG_STATUS_MESSAGE},
  {name: 'Pendaftaran', value: Constants.LOG_STATUS_PENDAFTARAN},
  {name: 'Prakualifikasi', value: Constants.LOG_STATUS_PRAKUALIFIKASI},
  {name: 'Proposal', value: Constants.LOG_STATUS_PROPOSAL},
  {name: 'Klarifikasi dan Negosiasi', value: Constants.LOG_STATUS_KLARIFIKASI_DAN_NEGOSIASI}
]

export const tahapanTerakhir = [
  {name: 'Pendaftaran', value: Constants.TAHAPAN_TERAKHIR_PENDAFTARAN},
  {name: 'Prakualifikasi', value: Constants.TAHAPAN_TERAKHIR_PRAKUALIFIKASI},
  {name: 'Proposal', value: Constants.TAHAPAN_TERAKHIR_PROPOSAL},
  {name: 'Klarifikasi dan Negosiasi', value: Constants.TAHAPAN_TERAKHIR_KLARIFIKASI_DAN_NEGOSIASI}
]

export const statusSPPU = [
  {name: 'Draft', value: Constants.SPPU_STATUS_DRAFT},
  {name: 'Terbayar', value: Constants.SPPU_STATUS_TERBAYAR},
]

export const hari = [
  'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
]

export const baseUrl = "http://localhost:8081"