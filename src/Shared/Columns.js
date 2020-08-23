export const daftarUserColumns = [
  { id: 'nama_lengkap', label: 'Nama Lengkap', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'password', label: 'Password', minWidth: 170 }
]

export const daftarPeluangColumns = [
  { id: 'nama', label: 'Nama Peluang', minWidth: 170 },
  { id: 'pemberi_kerja', label: 'Pemberi Kerja', minWidth: 170 },
  { id: 'klasifikasi', label: 'Klasifikasi', minWidth: 170 },
  { id: 'pengadaan', label: 'Pengadaan', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'menu', label: 'Menu', minWidth: 170 }
]

export const daftarProyekColumns = [
  { id: 'pin', label: 'PIN', minWidth: 50 },
  { id: 'nama', label: 'Nama Proyek', minWidth: 170 },
  { id: 'pemberi_kerja', label: 'Pemberi Kerja', minWidth: 170 },
  { id: 'nama_ketua', label: 'Tim Pelaksana', minWidth: 170 },
  { id: 'status', label: 'Posisi Proyek', minWidth: 150 },
  { id: 'tanggal_selesai_proyek', label: 'Status', minWidth: 150, align: 'center' },
  { id: 'menu', label: 'Menu', minWidth: 170 }
]

export const daftarPengalamanColumns = [
  { id: 'pin', label: 'PIN', minWidth: 50 },
  { id: 'nama', label: 'Nama Proyek', minWidth: 170 },
  { id: 'pemberi_kerja', label: 'Pemberi Kerja', minWidth: 170 },
  { id: 'nama_ketua', label: 'Tim Pelaksana', minWidth: 170 },
  { id: 'tahapan_terakhir', label: 'Posisi Proyek', minWidth: 150 },
  { id: 'alasan', label: 'Status', minWidth: 150, align: 'center' },
  { id: 'menu', label: 'Menu', minWidth: 170 }
]

export const daftarPelangganColumns = [
  { id: 'no', label: 'No', minWidth: 50 },
  { id: 'nama', label: 'Nama Perusahaan', minWidth: 170 },
  { id: 'jenis', label: 'Jenis Instansi', minWidth: 170 },
  { id: 'alamat', label: 'Alamat', minWidth: 170 },
  { id: 'menu', label: 'Menu', minWidth: 170 }
]

export const daftarTimColumns = [
  { id: 'no', label: 'No', minWidth: 50 },
  { id: 'nama_ketua_pm', label: 'Ketua - PM', minWidth: 170 },
  { id: 'kelompok_keahlian_nama', label: 'Kelompok Keahlian', minWidth: 170 },
  { id: 'total_active_project', label: 'Total Proyek Aktif', minWidth: 170 },
  { id: 'total_project', label: 'Total Proyek', minWidth: 150 },
  { id: 'cv', label: 'CV', minWidth: 150, align: 'center' },
  { id: 'menu', label: 'Menu', minWidth: 170 }
]

export const tenagaAhliColumns = [
  { id: 'nama', label: 'Nama Lengkap', minWidth: 170, align: 'center' },
  { id: 'posisi', label: 'Posisi', minWidth: 50, align: 'center' },
  { id: 'keahlian', label: 'Keahlian', minWidth: 50, align: 'center' },
  { id: 'is_asing', label: 'Kewarganegaraan', minWidth: 50, align: 'center' },
  { id: 'menu', label: 'Menu', minWidth: 170, align: 'center' }
]

export const terminColumns = [
  { id: 'termin_ke', label: 'Termin', minWidth: 70 , align: 'center' },
  { id: 'persentase', label: 'Persentase', minWidth: 70 , align: 'center' },
  { id: 'target_selesai', label: 'Tanggal', minWidth: 170 , align: 'center' },
  { id: 'is_selesai', label: 'Selesai', minWidth: 70 , align: 'center' },
  { id: 'tanggal_selesai', label: 'Tgl Selesai', minWidth: 170 , align: 'center' },
  { id: 'termin-menu', label: 'Menu', minWidth: 70 , align: 'center' },
  { id: 'masalah_count', label: 'Masalah', minWidth: 70 , align: 'center' },
  { id: 'termin-masalah-action', label: 'Menu', minWidth: 70 , align: 'center' },
  { id: 'tanggal_penagihan', label: 'Tgl Permintaan', minWidth: 170 , align: 'center' },
  { id: 'penagihan_status', label: 'Status', minWidth: 70 , align: 'center' },
  { id: 'termin-penagihan-action', label: 'Menu', minWidth: 70 , align: 'center' }
]

export const terminSummaryColumns = [
  { id: 'termin_ke', label: 'Termin', minWidth: 35 , align: 'center' },
  { id: 'persentase', label: '%', minWidth: 35 , align: 'center' },
  { id: 'target_selesai', label: 'Tanggal', minWidth: 35 , align: 'center' },
  { id: 'is_selesai', label: 'Selesai', minWidth: 35 , align: 'center' },
  { id: 'masalah_count', label: 'Masalah', minWidth: 35 , align: 'center' },
]

export const pembayaranSummaryColumns = [
  { id: 'no', label: 'No', minWidth: 35 , align: 'center' },
  { id: 'type', label: 'Jenis', minWidth: 35 , align: 'center' },
  { id: 'tanggal', label: 'Tanggal', minWidth: 35 , align: 'center' },
  { id: 'status', label: 'Status', minWidth: 35 , align: 'center' },
  { id: 'action', label: 'Menu', minWidth: 35 , align: 'center' },
]

export const masalahColumns = [
  { id: 'message', label: 'Masalah', minWidth: 270 , align: 'center' },
  { id: 'menu', label: 'Menu', minWidth: 70 , align: 'center' },
]

export const informasiProyekColumns = [
  { id: 'created_time', label: 'Tanggal', minWidth: 150, align: 'center' },
  { id: 'status', label: 'Tahap', minWidth: 100, align: 'center' },
  { id: 'message', label: 'Informasi', minWidth: 150, align: 'center' },
  { id: 'nama_lengkap', label: 'User', minWidth: 150, align: 'center' },
]

export const informasiProyekFileColumns = [
  { id: 'label', label: 'Nama', minWidth: 100, align: 'center' },
  { id: 'created_time', label: 'Tanggal', minWidth: 150, align: 'center' },
  { id: 'nama_lengkap', label: 'User', minWidth: 150, align: 'center' }
]

export const daftarKKHColumn = [
  { id: 'created_time', label: 'Tanggal', minWidth: 170 },
  { id: 'message', label: 'Kegiatan', minWidth: 170 },
  { id: 'start_time', label: 'Jam Mulai', minWidth: 170 },
  { id: 'end_time', label: 'Jam Selesai', minWidth: 170 },
  { id: 'menu', label: 'Menu', minWidth: 170 }
]

export const daftarProyekInvoiceColumn = [
  { id: 'pin', label: 'NIP', minWidth: 70 , align: 'center' },
  { id: 'nama', label: 'Nama Proyek', minWidth: 270 , align: 'center' },
  { id: 'termin_ke', label: 'Termin Ke', minWidth: 70 , align: 'center' },
  { id: 'tanggal_penagihan', label: 'Tanggal Permintaan', minWidth: 170 , align: 'center' },
  { id: 'is_proforma', label: 'Proforma', minWidth: 70 , align: 'center' },
  { id: 'faktur_status', label: 'Faktur Pajak', minWidth: 70 , align: 'center' },
  { id: 'menu', label: 'Menu', minWidth: 70 , align: 'center' }
]

export const daftarPembayaranInvoiceColumn = [
  { id: 'nomor', label: 'No', minWidth: 20 , align: 'center' },
  { id: 'nomor_invoice', label: 'Nomor Invoice', minWidth: 270 , align: 'center' },
  { id: 'pin', label: 'NIP', minWidth: 70 , align: 'center' },
  { id: 'nama', label: 'Nama Proyek', minWidth: 170 , align: 'center' },
  { id: 'pemberi_kerja', label: 'Pemberi Kerja', minWidth: 70 , align: 'center' },
  { id: 'invoice_created_date', label: 'Tanggal Kirim Invoice', minWidth: 70 , align: 'center' },
  { id: 'penagihan_status', label: 'Status Invoice', minWidth: 70 , align: 'center' },
  { id: 'menu', label: 'Menu', minWidth: 70 , align: 'center' }
]

export const daftarPembayaranSPPUColumn = [
  { id: 'nomor', label: 'No', minWidth: 70 , align: 'center' },
  { id: 'pin', label: 'NIP', minWidth: 70 , align: 'center' },
  { id: 'nama', label: 'Nama Proyek', minWidth: 170 , align: 'center' },
  { id: 'nama_pemberi_kerja', label: 'Pemberi Kerja', minWidth: 70 , align: 'center' },
  { id: 'tim_pelaksana', label: 'Tim Pelaksana', minWidth: 70 , align: 'center' },
  { id: 'termin_ke', label: 'Termin Ke-', minWidth: 70 , align: 'center' },
  { id: 'status', label: 'Status', minWidth: 70 , align: 'center' },
  { id: 'menu', label: 'Menu', minWidth: 70 , align: 'center' }
]

export const daftarPMColumns = [
  { id: 'id', label: 'Kode', minWidth: 25 },
  { id: 'nama_lengkap', label: 'Keterangan', minWidth: 50 }
]

export const daftarPMSummaryColumns = [
  { id: 'id', label: 'Kode', minWidth: 25 },
  { id: 'nama_lengkap', label: 'MP', minWidth: 50 },
  { id: 'pendaftaran_count', label: 'Pendaftaran', minWidth: 50 },
  { id: 'prakualifikasi_count', label: 'Prakualifikasi', minWidth: 50 },
  { id: 'proposal_count', label: 'Proposal', minWidth: 50 },
  { id: 'negosiasi_count', label: 'Negosiasi', minWidth: 50 },
  { id: 'total', label: 'Total', minWidth: 50 },
]

export const daftarNilaiProyekPerTahun = [
  { id: 'no', label: 'No', minWidth: 25 },
  { id: 'bulan', label: 'Bulan', minWidth: 50 },
  { id: 'total_nilai_proyek', label: 'Nilai Pencapaian', minWidth: 50 },
  { id: 'total_proyek', label: 'Jumlah Proyek', minWidth: 50, align: 'center' },
]

export const daftarLaporanProyekPerTahun = [
  { id: 'no', label: 'No', minWidth: 25 },
  { id: 'name', label: 'Uraian', minWidth: 50 },
  { id: 'total_proyek', label: 'Jumlah Proyek', minWidth: 50, align: 'center' },
  { id: 'total_nilai_proyek', label: 'Nilai Pencapaian', minWidth: 50 },
]

export const daftarLaporanJenisPengadaanPerTahun = [
  { id: '', label: '', minWidth: 0 },
  { id: 'pengadaan', label: 'Pengadaan', minWidth: 25 },
  { id: 'nama_pengadaan', label: 'Uraian', minWidth: 50 },
  { id: 'total_proyek', label: 'Jumlah Proyek', minWidth: 50, align: 'center' },
  { id: 'total_nilai_proyek', label: 'Nilai Pencapaian', minWidth: 50 },
]

export const daftarLaporanJenisPemberiKerjaPerTahun = [
  { id: '', label: '', minWidth: 0 },
  { id: 'jenis_pemberi_kerja', label: 'Instansi', minWidth: 25 },
  { id: 'nama_jenis_pemberi_kerja', label: 'Uraian', minWidth: 50 },
  { id: 'total_proyek', label: 'Jumlah Proyek', minWidth: 50, align: 'center' },
  { id: 'total_nilai_proyek', label: 'Nilai Pencapaian', minWidth: 50 },
]