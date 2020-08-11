import React, {useEffect, useState} from 'react'
import {Grid, Paper, Typography} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import * as moment from 'moment'

import history from '../../../../Shared/History'
import Authorization from '../../../../Shared/Authorization'
import APIBuilder from '../../../../Shared/APIBuilder'

import Navbar from '../../../Navbar/Navbar'
import Button from '../../../Button/MainButton'

import ReportProyekPerYear from '../../../Table/ReportProyekPerYear'

function LaporanRangkumanProyekTahunan() {
  const [amountByYear, setAmountByYear] = useState([])
  const [year, setYear] = useState(moment().format('YYYY'))
  async function fetchProyekAmountByYear(year = moment().format('YYYY')) {
    let payload = {
      year: year
    }
    
    let response = await APIBuilder('proyek/amount-by-year', payload, 'POST')
    if (response.code === 200) setAmountByYear(response.payload.data)
  }

  useEffect(() => {
    async function validateToken() {
      let isValid = await Authorization.validateToken()
      if (!isValid) return history.push('/logout')
    }

    validateToken()
    fetchProyekAmountByYear()
  }, [])

  useEffect(() => {
    fetchProyekAmountByYear(moment(year).format('YYYY'))
  }, [year])
  
  return (
    <Grid container>
      <Navbar role={Authorization.getRole()} email={Authorization.getEmail()}/>
      <Grid item container>&nbsp;</Grid>
      <Grid item container alignItems="center" justify="center">
        <Grid item md={12}>
          <Paper style={{padding: '1em 1.5em', marginTop: '2em'}}>
            <Grid container>
              <Grid item container alignItems="center" justify="center">
                <Grid item>
                  <Typography variant="h4">Laporan Performa Pasca Kontrak</Typography>
                </Grid>
              </Grid>
              <Grid item container>
                &nbsp;
              </Grid>
              <Grid item container alignItems="center" justify="center">
                <Grid item>
                  <Button style={{padding: '0 .7em'}} onClick={() => history.push('/laporan-pasca-kontrak')}>Rangkuman Proyek Tahunan</Button>
                </Grid>
                <Grid item>
                  &nbsp;
                </Grid>
                <Grid item>
                  <Button style={{padding: '0 .7em'}} onClick={() => history.push('/laporan-pasca-kontrak-per-bulan')}>Rangkuman Proyek Per Bulan</Button>
                </Grid>
                <Grid item>
                  &nbsp;
                </Grid>
                <Grid item>
                  <Button style={{padding: '0 .7em'}} onClick={() => history.push('/laporan-pasca-kontrak-per-kategori-lain')}>Rangkuman Proyek Per Kategori Lain</Button>
                </Grid>
              </Grid>
              <Grid item container>
                &nbsp;
              </Grid>
              <Grid item container alignItems="center" justify="center">
                <Grid item md={3} sm={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
                  <KeyboardDatePicker
                    value={year}
                    onChange={(e) => {
                      return setYear(e)
                    }}
                    format="yyyy"
                    views={["year"]}
                  />
                </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <Grid item container alignItems="center" justify="center">
                &nbsp;
              </Grid>
              <Grid item container alignItems="center" justify="center">
                <Grid item md={8} sm={12}>
                  <ReportProyekPerYear  year={year}/>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LaporanRangkumanProyekTahunan