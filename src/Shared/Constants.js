class Constants {
  static get ROW_STATE_ACTIVE() {
    return 1
  }
  static get ROW_STATE_INACTIVE() {
    return 0
  }

  static get ROLE_SUPER_USER() {
    return 1
  }
  static get ROLE_CEO() {
    return 2
  }
  static get ROLE_CFO() {
    return 3
  }
  static get ROLE_COO() {
    return 4
  }
  static get ROLE_MK3L() {
    return 5
  }
  static get ROLE_PU() {
    return 6
  }
  static get ROLE_PM() {
    return 7
  }
  static get ROLE_PC() {
    return 8
  }
  static get ROLE_PA() {
    return 9
  }
  static get ROLE_KEUANGAN() {
    return 15
  }
  
  static get PELUANG_STATUS_HOLD() {
    return 1
  }
  static get PELUANG_STATUS_ACCEPT() {
    return 2
  }
  static get PELUANG_STATUS_REJECT() {
    return 3
  }
  static get PROYEK_STATUS_PENGADAAN() {
    return 2
  }
  static get PROYEK_STATUS_PEMANTAUAN() {
    return 4
  }
  static get PROYEK_STATUS_END() {
    return 5
  }

  static get PROYEK_KLASIFIKASI_KONSULTAN() {
    return 1
  }
  static get PROYEK_KLASIFIKASI_PELATIHAN() {
    return 2
  }
  static get PROYEK_KLASIFIKASI_PENGEMBANGAN_TEKNOLOGI() {
    return 3
  }
  static get PROYEK_KLASIFIKASI_PENGUJIAN() {
    return 4
  }

  static get PROYEK_JENIS_PENGADAAN_SELEKSI_UMUM() {
    return 1
  }
  static get PROYEK_JENIS_PENGADAAN_SELEKSI_TERBATAS() {
    return 2
  }
  static get PROYEK_JENIS_PENGADAAN_PEMILIHAN_LANGSUNG() {
    return 3
  }
  static get PROYEK_JENIS_PENGADAAN_PENUNJUKAN_LANGSUNG() {
    return 4
  }
  static get PROYEK_JENIS_PENGADAAN_SWAKELOLA() {
    return 5
  }

  static get JENIS_PEMBERI_KERJA_PEMERINTAH_PUSAT() {
    return 1
  }
  static get JENIS_PEMBERI_KERJA_PEMERINTAH_DAERAH() {
    return 2
  }
  static get JENIS_PEMBERI_KERJA_BUMN_BUMD_BHMN() {
    return 3
  }
  static get JENIS_PEMBERI_KERJA_SWASTA() {
    return 4
  }
  static get JENIS_PEMBERI_KERJA_LAIN_LAIN() {
    return 5
  }

  static get INFORMASI_PEMBAWA_PEKERJAAN_KETUA_TIM() {
    return 1
  }
  static get INFORMASI_PEMBAWA_PEKERJAAN_PROJECT_MANAGER_TIM() {
    return 2
  }
  static get INFORMASI_PEMBAWA_PEKERJAAN_USER_CLIENT() {
    return 3
  }
  static get INFORMASI_PEMBAWA_PEKERJAAN_MANAJEMEN_LAPI() {
    return 4
  }
  static get INFORMASI_PEMBAWA_PEKERJAAN_MITRA() {
    return 5
  }

  static get JENIS_PENGELOLAAN_DOSEN() {
    return 1
  }
  static get JENIS_PENGELOLAAN_ALUMNI_PENSIUNAN() {
    return 2
  }
  static get JENIS_PENGELOLAAN_INTERNAL() {
    return 3
  }
  static get JENIS_PENGELOLAAN_UUK() {
    return 4
  }
  static get JENIS_PENGELOLAAN_OS() {
    return 5
  }

  static get KONSORSIUM_TRUE() {
    return 1
  }
  static get KONSORSIUM_FALSE() {
    return 2
  }

  static get LINGKUP_PROYEK_STUDY() {
    return 1
  }
  static get LINGKUP_PROYEK_INSPEKSI_DAN_PENGUJIAN() {
    return 2
  }
  static get LINGKUP_PROYEK_PERENCANAAN_DAN_PERANCANGAN() {
    return 3
  }
  static get LINGKUP_PROYEK_MANAJEMEN_PROYEK_DAN_SUPERVISI() {
    return 4
  }
  static get LINGKUP_PROYEK_SURVEY() {
    return 5
  }

  static get KEMAJUAN_PROYEK_PENDAFTARAN() {
    return 1
  }
  static get KEMAJUAN_PROYEK_PRAKUALIFIKASI() {
    return 2
  }
  static get KEMAJUAN_PROYEK_PROPOSAL() {
    return 3
  }
  static get KEMAJUAN_PROYEK_NEGOSIASI() {
    return 4
  }
  static get KEMAJUAN_PROYEK_KONTRAK() {
    return 5
  }

  static get REKAM_JEJAK_CALON_PEMBERI_KERJA_BAIK() {
    return 1
  }
  static get REKAM_JEJAK_CALON_PEMBERI_KERJA_KURANG_BAIK() {
    return 2
  }
  static get REKAM_JEJAK_CALON_PEMBERI_KERJA_TIDAK_BAIK() {
    return 3
  }
  static get REKAM_JEJAK_CALON_PEMBERI_KERJA_BARU() {
    return 4
  }

  static get REKAM_JEJAK_TIM_BAIK() {
    return 1
  }
  static get REKAM_JEJAK_TIM_KURANG_BAIK() {
    return 2
  }
  static get REKAM_JEJAK_TIM_TIDAK_BAIK() {
    return 3
  }
  static get REKAM_JEJAK_TIM_BARU() {
    return 4
  }

  static get KOMPETENSI_TIM_SESUAI() {
    return 1
  }
  static get KOMPETENSI_TIM_TIDAK_SESUAI() {
    return 2
  }

  static get LOG_STATUS_MESSAGE() {
    return 0
  }
  static get LOG_STATUS_PENDAFTARAN() {
    return 1
  }
  static get LOG_STATUS_PRAKUALIFIKASI() {
    return 2
  }
  static get LOG_STATUS_PROPOSAL() {
    return 3
  }
  static get LOG_STATUS_KLARIFIKASI_DAN_NEGOSIASI() {
    return 4
  }

  static get TERMIN_STATUS_PENAGIHAN_BELUM_ADA() {
    return 0
  }
  static get TERMIN_STATUS_PENAGIHAN_PENDING() {
    return 1
  }
  static get TERMIN_STATUS_PENAGIHAN_DITERBITKAN() {
    return 2
  }
  static get TERMIN_STATUS_PENAGIHAN_DIBAYARKAN() {
    return 3
  }

  static get FAKTUR_PAJAK_STATUS_BELUM_ADA() {
    return 1
  }
  static get FAKTUR_PAJAK_STATUS_TIDAK_ADA() {
    return 2
  }
  static get FAKTUR_PAJAK_STATUS_ADA() {
    return 3
  }

  static get TAHAPAN_TERAKHIR_PENDAFTARAN() {
    return 1
  }
  static get TAHAPAN_TERAKHIR_PRAKUALIFIKASI() {
    return 2
  }
  static get TAHAPAN_TERAKHIR_PROPOSAL() {
    return 3
  }
  static get TAHAPAN_TERAKHIR_KLARIFIKASI_DAN_NEGOSIASI() {
    return 4
  }
  static get TAHAPAN_TERAKHIR_PEMANTAUAN() {
    return 5
  }

  static get PENILAIAN_AKHIRI_PROYEK_BAIK() {
    return 1
  }
  static get PENILAIAN_AKHIRI_PROYEK_KURANG_BAIK() {
    return 2
  }
  static get PENILAIAN_AKHIRI_PROYEK_TIDAK_BAIK() {
    return 3
  }


  static get BERITA_ACARA_TIDAK_ADA() {
    return 1
  }
  static get BERITA_ACARA_BELUM_ADA() {
    return 2
  }
  static get BERITA_ACARA_ADA() {
    return 3
  }

  static get SPPU_STATUS_DRAFT() {
    return 1
  }

  static get SPPU_STATUS_TERBAYAR() {
    return 2
  }
}

export default Constants