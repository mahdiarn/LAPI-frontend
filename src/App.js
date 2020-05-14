import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './Shared/History'
import Grid from '@material-ui/core/Grid';
import './App.css';

import MainScreen from './Components/Screens/Main/Main'
import LoginScreen from './Components/Screens/Login/Login'
import LogoutScreen from './Components/Screens/Logout/Logout'
import AkunScreen from './Components/Screens/Akun/Akun'
import DataKKHScreen from './Components/Screens/DataKKH/DataKKH'
import DaftarUserScreen from './Components/Screens/DaftarUser/DaftarUser'
import TambahUserScreen from './Components/Screens/TambahUser/TambahUser'
import TambahRoleScreen from './Components/Screens/TambahRole/TambahRole'
import DaftarPeluangScreen from './Components/Screens/DaftarPeluang/DaftarPeluang'
import DaftarProyekScreen from './Components/Screens/DaftarProyek/DaftarProyek'
import DaftarPengalamanScreen from './Components/Screens/DaftarPengalaman/DaftarPengalaman'
import DaftarPelangganScreen from './Components/Screens/DaftarPelanggan/DaftarPelanggan'
import DaftarTimScreen from './Components/Screens/DaftarTim/DaftarTim'
import DetailPeluangScreen from './Components/Screens/DetailPeluang/DetailPeluang'
import DetailProyekScreen from './Components/Screens/DetailProyek/DetailProyek'
import DaftarPermohonanPenagihanInvoice from './Components/Screens/DaftarPermohonanPenagihanInvoice/DaftarPermohonanPenagihanInvoice'
import DaftarPenagihanInvoice from './Components/Screens/DaftarPenagihanInvoice/DaftarPenagihanInvoice'
import DaftarPembayaranSPPU from './Components/Screens/DaftarPembayaranSPPU/DaftarPembayaranSPPU'
import InformasiProyekScreen from './Components/Screens/InformasiProyek/InformasiProyek'
import TerminProyekScreen from './Components/Screens/TerminProyek/TerminProyek'

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Grid
          container
          className="App"
          direction="column"
          style={{height: '100vh'}}
        >
          <Route path="/" exact component={MainScreen} />
          <Route path="/login" exact component={LoginScreen} />
          <Route path="/logout" exact component={LogoutScreen} />
          <Route path="/profile" exact component={AkunScreen} />
          <Route path="/data-kkh" exact component={DataKKHScreen} />
          <Route path="/daftar-user" exact component={DaftarUserScreen} />
          <Route path="/tambah-user" exact component={TambahUserScreen} />
          <Route path="/tambah-role" exact component={TambahRoleScreen} />
          <Route path="/daftar-peluang" exact component={DaftarPeluangScreen} />
          <Route path="/daftar-proyek" exact component={DaftarProyekScreen} />
          <Route path="/daftar-pengalaman" exact component={DaftarPengalamanScreen} />
          <Route path="/daftar-pelanggan" exact component={DaftarPelangganScreen} />
          <Route path="/daftar-tim" exact component={DaftarTimScreen} />
          <Route path="/peluang/:id" exact component={DetailPeluangScreen} />
          <Route path="/peluang/log/:id" exact component={InformasiProyekScreen} />
          <Route path="/proyek/log/:id" exact component={InformasiProyekScreen} />
          <Route path="/proyek/termin/:id" exact component={TerminProyekScreen} />
          <Route path="/proyek/:id" exact component={DetailProyekScreen} />
          <Route path="/permintaan-invoice" exact component={DaftarPermohonanPenagihanInvoice} />
          <Route path="/pembayaran-invoice" exact component={DaftarPenagihanInvoice} />
          <Route path="/pembayaran-sppu" exact component={DaftarPembayaranSPPU} />
        </Grid>
      </Router>
    );
  }
}

export default App;
