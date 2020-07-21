import jwt from 'jsonwebtoken'
import APIBuilder from './APIBuilder'
import history from './History'

export default class Authorization {
  
  static getToken() {
    return localStorage.getItem('token')
  }

  static setToken(token) {
    if (token) return localStorage.setItem('token', token)
  }

  static async validateToken() {
    const response = await APIBuilder('validate-token')
    
    let error = response.error
    return (!error)
  }

  static getRole() {
    if (jwt.decode(Authorization.getToken())) {
       return (jwt.decode(Authorization.getToken()).role)
    } else {
      Authorization.logout()
    }
  }

  static getEmail() {
    if (jwt.decode(Authorization.getToken())) {
      return (jwt.decode(Authorization.getToken()).email)
    } else {
      Authorization.logout()
    }
  }

  static getFullName() {
    if (jwt.decode(Authorization.getToken())) {
      return (jwt.decode(Authorization.getToken()).nama_lengkap)
    } else {
      Authorization.logout()
    }
  }

  static getId() {
    if (jwt.decode(Authorization.getToken())) {
      return (jwt.decode(Authorization.getToken()).id)
    } else {
      Authorization.logout()
    }
  }

  static logout() {
    localStorage.removeItem('token')
    history.push('/login')
  }

  static async login(email, password) {
    const response = await APIBuilder('login', {email,password}, 'POST')
    if (response.code !== 200){
      alert('Email / password tidak dikenali')
      return false
    } else {
      Authorization.setToken(response.payload.token)
      alert('Login Berhasil!')
      return true
    }
  }
}