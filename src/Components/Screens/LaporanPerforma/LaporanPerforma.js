import React, {useEffect} from 'react'
import {Grid, Paper, Typography} from '@material-ui/core'

import history from '../../../Shared/History'
import Authorization from '../../../Shared/Authorization'

import Navbar from '../../Navbar/Navbar'
import Button from '../../Button/MainButton'

function LaporanPerforma() {
  useEffect(() => {
    async function validateToken() {
      let isValid = await Authorization.validateToken()
      if (!isValid) return history.push('/logout')
    }
    validateToken()
  }, [])
  
  return (
    <Grid container>
      <Navbar role={Authorization.getRole()} email={Authorization.getEmail()}/>
      <Grid item container>&nbsp;</Grid>
      <Grid item container alignItems="center" justify="center">
        <Grid item>
          <Paper style={{width: '100%', padding: '1em 1.5em', marginTop: '2em'}}>
            <Grid container>
              <Grid item container alignItems="center" justify="center">
                <Grid item>
                  <Typography variant="h4">Laporan Performa</Typography>
                </Grid>
              </Grid>
              <Grid item container>
                &nbsp;
              </Grid>
              <Grid item container alignItems="center" justify="center">
                <Grid item>
                  <Button style={{padding: '0 .7em'}} onClick={() => history.push('/laporan-ppbj')}>Pengadaan Barang Jasa</Button>
                </Grid>
                <Grid item>
                  &nbsp;
                </Grid>
                <Grid item>
                  <Button style={{padding: '0 .7em'}} onClick={() => history.push('/laporan-pasca-kontrak')}>Pasca Kontrak</Button>
                </Grid>
              </Grid>
              <Grid item container>
                &nbsp;
              </Grid>
              <Grid item container alignItems="center" justify="center">
                <Grid item>
                  <Button style={{padding: '0 .7em'}} onClick={() => history.push('/laporan-grafik')}>Grafik Nilai Kontrak</Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LaporanPerforma