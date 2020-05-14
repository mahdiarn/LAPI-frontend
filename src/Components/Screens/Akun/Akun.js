import React from 'react'

import history from '../../../Shared/History'
import APIBuilder from '../../../Shared/APIBuilder'
import Authorization from '../../../Shared/Authorization'

import Navbar from '../../Navbar/Navbar'

import Input from '../../Button/MainInput'

import {Grid, Typography, TextField} from '@material-ui/core'

class Akun extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      password: '',
      newPassword: '',
      newPasswordConfirmation: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this)
    this.handleChangeNewPasswordConfirmation = this.handleChangeNewPasswordConfirmation.bind(this)
  }

  async componentDidMount() {
    async function validateToken() {
      let isValid = await Authorization.validateToken()
      if (!isValid) return history.push('/logout')
    }
    validateToken()
    const response = await APIBuilder('roles')
    this.setState({roleList: response.payload.data})
  }

  handleSubmit = async (event) => {
    const {password, newPassword, newPasswordConfirmation} = this.state
    event.preventDefault()
    if ((newPassword) && (newPassword !== newPasswordConfirmation)) alert ('Password dan Password Confirmation Tidak Sesuai!')
    let payload = {
      password, new_password: newPassword, new_password_confirmation: newPasswordConfirmation
    }
    const response = await APIBuilder('change-password', payload, 'POST')
    if (response.code !== 200){
      alert(response.payload.msg)
      return
    }

    alert('Berhasil Membuat User Baru!')
    return history.push('/profile')

  }
  
  handleChangePassword = (event) => {
    this.setState({password: event.target.value})
  }
  handleChangeNewPassword = (event) => {
    this.setState({newPassword: event.target.value})
  }
  handleChangeNewPasswordConfirmation = (event) => {
    this.setState({newPasswordConfirmation: event.target.value})
  }
  
  render() {
    const {password, newPassword, newPasswordConfirmation} = this.state

    return (
      <Grid item container>
        <Navbar role={Authorization.getRole()} email={Authorization.getEmail()} title={'Pengaturan Akun'}/>
        <Grid item container justify="center" alignItems="center" style={{ marginTop: '4em', padding: '0 24em'}}>
          <Grid item container md={12} style={{padding: '30px 20px'}}>
            <form onSubmit={this.handleSubmit} style={{width: '100%'}}>
              <Grid item container alignItems="center" justify="space-between">
                <Grid item>Email</Grid>
                <Grid item md={6}>{Authorization.getEmail()}</Grid>
              </Grid>
              <Grid item container>&nbsp;</Grid>
              <Grid item container alignItems="center" justify="space-between">
                <Grid item>Current Password</Grid>
                <Grid item md={6}><TextField id="input-password" label="Password" variant="outlined" type="password" fullWidth value={password} onChange={this.handleChangePassword}/></Grid>
              </Grid>
              <Grid item container>&nbsp;</Grid>
              <Grid item container alignItems="center" justify="space-between">
                <Grid item>New Password</Grid>
                <Grid item md={6}><TextField id="input-new-password" label="New Password" variant="outlined" type="password" fullWidth value={newPassword} onChange={this.handleChangeNewPassword}/></Grid>
              </Grid>
              <Grid item container>&nbsp;</Grid>
              <Grid item container alignItems="center" justify="space-between">
                <Grid item><Typography>New Password Confirmation</Typography></Grid>
                <Grid item md={6}><TextField id="input-new-password-confirmation" label="Password Confirmation" variant="outlined" type="password" fullWidth value={newPasswordConfirmation} onChange={this.handleChangeNewPasswordConfirmation}/></Grid>
              </Grid>
              <Grid item container>&nbsp;</Grid>
              <Grid item container direction="row-reverse">
                <Grid item><Input type="submit" disableUnderline value="Simpan"></Input></Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default Akun