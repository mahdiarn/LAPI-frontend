import React from 'react'

import history from '../../../Shared/History'
import APIBuilder from '../../../Shared/APIBuilder'
import Authorization from '../../../Shared/Authorization'

import Navbar from '../../Navbar/Navbar'

import Input from '../../Button/MainInput'

import {Grid, Typography, TextField, FormControl, InputLabel, MenuItem, Select} from '@material-ui/core'

class TambahUser extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      newRole: '',
      newName: '',
      newEmail: '',
      roleList: []
    }

    this.handleChangeNewName = this.handleChangeNewName.bind(this)
    this.handleChangeNewEmail = this.handleChangeNewEmail.bind(this)
    this.handleChangeNewRole = this.handleChangeNewRole.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    const {newName, newEmail, newRole} = this.state
    event.preventDefault()
    if (!newRole) return alert('Isi role!')
    if (!newName) return alert('Isi nama lengkap!')
    if (!newEmail) return alert('Isi email!')
    const response = await APIBuilder('create-user', {nama_lengkap: newName, email: newEmail, role: newRole}, 'POST')
    if (response.code !== 200){
      alert('Pembuatan User Gagal!')
      return
    }

    alert('Berhasil Membuat User Baru!')
    this.setState({newName: '',newEmail: '', newRole: ''})
    return history.push('/tambah-user')

  }
  
  handleChangeNewName = (event) => {
    this.setState({newName: event.target.value})
  }

  handleChangeNewEmail = (event) => {
    this.setState({newEmail: event.target.value})
  }

  handleChangeNewRole = (event) => {
    this.setState({newRole: event.target.value})
  }
  
  render() {
    const {newRole, newName, newEmail, roleList} = this.state

    

    const rolesView = roleList.map((item) => {
      return (
        <MenuItem value={item.id} key={`role-${item.id}`}>{item.nama}</MenuItem>
      )
    })

    return (
      <Grid item container>
        <Navbar role={Authorization.getRole()} email={Authorization.getEmail()} title={'Tambah User'}/>
        <Grid item container justify="center" alignItems="center" style={{ marginTop: '4em', padding: '0 24em'}}>
          <Grid item container justify="center" md={12} style={{ padding: '15px'}}>
            <Typography>Isi Form di Bawah Ini</Typography>
          </Grid>
          <Grid item container md={12} style={{padding: '30px 20px'}}>
            <form onSubmit={this.handleSubmit} style={{width: '100%'}}>
              <Grid item container alignItems="center" justify="space-between">
                <Grid item>Nama Lengkap</Grid>
                <Grid item md={9}><TextField id="input-nama" label="Nama" variant="outlined" type="text" fullWidth value={newName} onChange={this.handleChangeNewName}/></Grid>
              </Grid>
              <Grid item container alignItems="center" justify="space-between">
                <Grid item>Email</Grid>
                <Grid item md={9}><TextField id="input-email" label="Email" variant="outlined" type="email" fullWidth value={newEmail} onChange={this.handleChangeNewEmail}/></Grid>
              </Grid>
              <Grid item container>&nbsp;</Grid>
              <Grid item container alignItems="center" justify="space-between">
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={newRole}
                    onChange={this.handleChangeNewRole}
                    fullWidth
                  >
                    { rolesView }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item container>&nbsp;</Grid>
              <Grid item container direction="row-reverse">
                <Grid item><Input type="submit" disableUnderline>Tambah User</Input></Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default TambahUser