import React, {useEffect} from 'react'

import history from '../../../Shared/History'
import Authorization from '../../../Shared/Authorization'

import Grid from '@material-ui/core/Grid'
import Navbar from '../../Navbar/Navbar'

function Main() {
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
      <Grid item container></Grid>
    </Grid>
  );
}

export default Main