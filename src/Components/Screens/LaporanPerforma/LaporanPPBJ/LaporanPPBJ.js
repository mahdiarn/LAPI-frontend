import React, {useEffect, useState} from 'react'
import {Grid, Paper, Typography} from '@material-ui/core'

import history from '../../../../Shared/History'
import Authorization from '../../../../Shared/Authorization'
import APIBuilder from '../../../../Shared/APIBuilder'

import Navbar from '../../../Navbar/Navbar'
import Button from '../../../Button/MainButton'

import PMListTable from '../../../Table/PMList'
import PMReportTable from '../../../Table/PMReport'

function LaporanPPBJ() {
  const [pmList, setPMList] = useState([])
  const [pmSummaryList, setPMSummaryList] = useState([])
  useEffect(() => {
    async function validateToken() {
      let isValid = await Authorization.validateToken()
      if (!isValid) return history.push('/logout')
    }
    async function fetchPMList() {
      let response = await APIBuilder('pm')
      if (response.code === 200) setPMList(response.payload.data)
    }

    async function fetchPMSummaries() {
      let response = await APIBuilder('pm/summaries')
      if (response.code === 200) setPMSummaryList(response.payload.data)
    }
    validateToken()
    fetchPMList()
    fetchPMSummaries()
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
                  <Typography variant="h4">Laporan Performa PPBJ</Typography>
                </Grid>
              </Grid>
              <Grid item container>
                &nbsp;
              </Grid>
              <Grid item container alignItems="center" justify="center">
                <Grid item>
                  <Button style={{padding: '0 .7em'}} onClick={() => history.push('/laporan-ppbj')}>Rangkuman Per Tahap</Button>
                </Grid>
                <Grid item>
                  &nbsp;
                </Grid>
                <Grid item>
                  <Button style={{padding: '0 .7em'}} onClick={() => history.push('/laporan-ppbk-nilai-kontrak')}>Perolehan Nilai Kontrak</Button>
                </Grid>
              </Grid>
              <Grid item container>
                &nbsp;
              </Grid>
              <Grid item container alignItems="flex-start" justify="space-between">
                <Grid item>
                  <PMListTable pmList={pmList}/>
                </Grid>

                <Grid item>
                  <PMReportTable pmSummaryList={pmSummaryList}/>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LaporanPPBJ