import React, {useEffect, useState} from 'react'

import history from '../../../Shared/History'
import APIBuilder from '../../../Shared/APIBuilder'
import Authorization from '../../../Shared/Authorization'

import Navbar from '../../Navbar/Navbar'

import Input from '../../Button/MainInput'

import {Grid, Typography, TextField} from '@material-ui/core'

function TambahRole() {
  const [newRole, setNewRole] = useState()
  useEffect(() => {
    async function validateToken() {
      let isValid = await Authorization.validateToken()
      if (!isValid) return history.push('/logout')
    }
    validateToken()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await APIBuilder('create-role', {role: newRole}, 'POST')
    if (response.code !== 200){
      alert('Pembuatan Role Gagal!')
      return
    }

    alert('Berhasil Membuat Role Baru!')
    return history.push('/tambah-role')

  }
  
  return (
    <Grid item container>
      <Navbar role={Authorization.getRole()} email={Authorization.getEmail()} title={'Tambah Role'}/>
      <Grid item container justify="center" alignItems="center" style={{ marginTop: '4em', padding: '0 24em'}}>
        <Grid item container justify="center" md={12} style={{ padding: '15px'}}>
          <Typography>Isi Form di Bawah Ini</Typography>
        </Grid>
        <Grid item container md={12} style={{padding: '30px 20px'}}>
          <form onSubmit={handleSubmit} style={{width: '100%'}}>
            <Grid item container alignItems="center" justify="space-between">
              <Grid item>Role</Grid>
              <Grid item md={9}><TextField id="input-role" label="Role Name" variant="outlined" type="text" fullWidth value={newRole || ''} onChange={e => setNewRole(e.target.value)}/></Grid>
            </Grid>
            <Grid item container>&nbsp;</Grid>
            <Grid item container direction="row-reverse">
              <Grid item><Input type="submit" disableUnderline>Tambah Role</Input></Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TambahRole