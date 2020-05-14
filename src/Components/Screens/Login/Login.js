import React, {useEffect, useState} from 'react'

import history from '../../../Shared/History'
import Authorization from '../../../Shared/Authorization'

import logo from '../../../Assets/logolapi.png'

import Input from '../../Button/MainInput'

import {Grid, Typography, TextField} from '@material-ui/core'

function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  useEffect(() => {
    setEmail('')
    setPassword('')
    async function validateToken() {
      let isValid = await Authorization.validateToken()
      if (isValid) return history.push('/')
    }
    validateToken()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    Authorization.login(email,password).then((auth) => { if (auth) history.push('/')} )

  }
  
  return (
    <Grid item container justify="center" alignItems="center" direction="column" style={{ marginTop:'auto', marginBottom:'auto' }}>
      <img src={logo} width="25%" alt="lapi-logo"/>
      <Grid item container style={{maxWidth: '34em', marginTop: '4em'}}>
        <Grid item container justify="center" md={12} style={{backgroundColor: '#117C9B', color: 'white', borderRadius:'30px 30px 0 0', padding: '15px'}}>
          <Typography>Sistem Informasi Manajemen Proyek</Typography>
        </Grid>
        <Grid item container md={12} style={{border: '1px solid #117C9B', borderRadius:'0 0 30px 30px', padding: '30px 20px'}}>
          <form onSubmit={handleSubmit} style={{width: '100%'}}>
            <Grid item container alignItems="center" justify="space-between">
              <Grid item>Email</Grid>
              <Grid item md={9}><TextField id="input-email" label="Email" variant="outlined" type="email" fullWidth onChange={e => setEmail(e.target.value)}/></Grid>
            </Grid>
            <Grid item container>&nbsp;</Grid>
            <Grid item container alignItems="center" justify="space-between">
              <Grid item>Password</Grid>
              <Grid item md={9}><TextField id="input-password" label="Password" variant="outlined" type="password" fullWidth onChange={e => setPassword(e.target.value)}/></Grid>
            </Grid>
            <Grid item container>&nbsp;</Grid>
            <Grid item container direction="row-reverse">
              <Grid item><Input type="submit" disableUnderline value="Login">Login</Input></Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login