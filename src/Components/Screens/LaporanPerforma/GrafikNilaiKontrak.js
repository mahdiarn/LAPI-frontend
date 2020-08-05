import React, {useEffect, useState} from 'react'
import {Grid, Paper, Typography} from '@material-ui/core'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import * as moment from 'moment'

import history from '../../../Shared/History'
import Authorization from '../../../Shared/Authorization'
import APIBuilder from '../../../Shared/APIBuilder'
import {RupiahFormat} from '../../../Shared/TextTransformer'

import Navbar from '../../Navbar/Navbar'

function GrafikNilaiKontrak() {
  const [lastThreeYearsAmount, setLastThreeYearsAmount] = useState([])
  let thisYear = moment().year()
  async function fetchProyekAmountByYear(year = moment().format('YYYY')) {
    let response = await APIBuilder('proyek/last-three-year-amount')
    if (response.code === 200) setLastThreeYearsAmount(response.payload.data)
  }

  useEffect(() => {
    async function validateToken() {
      let isValid = await Authorization.validateToken()
      if (!isValid) return history.push('/logout')
    }

    validateToken()
    fetchProyekAmountByYear()
  }, [])
  
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
                  <Typography variant="h4">Grafik Nilai Kontrak 3Y</Typography>
                </Grid>
              </Grid>
              <Grid item container>
                &nbsp;
              </Grid>
              <Grid item container alignItems="center" justify="center">
                <Grid item>
                  <LineChart width={(window.innerWidth > 800) ? window.innerWidth - 100 : window.innerWidth} height={400} data={lastThreeYearsAmount} >
                    <Line type="monotone" dataKey={thisYear} stroke="#8884d8" />
                    <Line type="monotone" dataKey={thisYear-1} stroke="#0d0" />
                    <Line type="monotone" dataKey={thisYear-2} stroke="#000" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="bulan" />
                    <Tooltip 
                      formatter={(value, name, props) => RupiahFormat(value)}
                    />
                  </LineChart>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GrafikNilaiKontrak