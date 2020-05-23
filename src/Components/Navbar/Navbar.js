import React, { useEffect, useState } from 'react'

import history from '../../Shared/History'

import logo from '../../Assets/logolapi.png'
import notification from '../../Assets/icon-notification.png'
import home from '../../Assets/icon-home.png'
import profile from '../../Assets/icon-profile.png'

import Button from '../Button/MainButton'
import NotificationButton from '../Button/NotificationButton'
import NotificationButtonRead from '../Button/NotificationButtonRead'
import { Typography, Grid, IconButton, Paper, Link, Divider} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import Popper from '@material-ui/core/Popper'
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state'
import Fade from '@material-ui/core/Fade'

import {routesSuperUser, routesPM, routesMK3L, routesKeuangan, routesProfile} from '../../Shared/Config'
import APIBuilder from '../../Shared/APIBuilder'
import Constants from '../../Shared/Constants'

const style = {
  padding:20,
  borderColor: 'black',
  backgroundColor: "#F5F5F5",
  color: "#117C9B"
}

const logoStyle = {
  width: "75%"
}

const iconStyle = {
  width: "75%"
}

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const linksContainer = {
  width: "100%"
}

const links = {
  padding: 20
}

function Navbar({email, role, title}){
  const [notificationList, setNotificationList] = useState([])
  useEffect(() => {
    async function getNotificationList() {
      const response = await APIBuilder('notification')
      if (response.code === 200) {
        setNotificationList(response.payload.data)
      }
    }
    getNotificationList()
  }, []) 
  
  const route = (route) => route.map((item) => {
    return (
      <Link onClick={() => {history.push(item.url)}} key={item.name+'-key'}>
        {`\u00A0${item.name}\u00A0`}
      </Link>
    )
  })

  function routesFilter(role) {
    if ((history.location.pathname === '/profile') || (history.location.pathname === '/data-kkh')) {
      return route(routesProfile)
    } else {
      switch(role) {
        case Constants.ROLE_SUPER_USER:
          return route(routesSuperUser)
        case Constants.ROLE_COO:
          return route(routesPM)
        case Constants.ROLE_MK3L:
          return route(routesMK3L)
        case Constants.ROLE_PM:
          return route(routesPM)
        case Constants.ROLE_KEUANGAN:
          return route(routesKeuangan)
        default:
          break
      }
    }
  }

  const classes = useStyles()

  const changeUnreadNotification = async (e) => {
    history.push(`/proyek/${e.proyek_id}`)
    await APIBuilder(`notification/${e.id}/read`)
  }
  return(
    <Grid container>
      <Grid item container style={style} alignItems="center">
        <Grid item container md={6}  alignItems="center">
          <Grid item md={3}>
            <img src={logo} alt="lapi-logo" style={logoStyle}/>
          </Grid>
          <Grid item md={6}>
            <Typography variant="h5">
              { title || 'Menu Utama'}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container md={6} justify="flex-end" alignItems="center">
          <Grid item container md={9} direction="row" justify="flex-end">
            <IconButton onClick={() => {history.push('/')}}>
              <img src={home} alt="home-icon" style={iconStyle}/>
            </IconButton>
            <PopupState variant="popper" popupId="demo-popup-popper">
              {popupState => (
                <div>
                  <IconButton {...bindToggle(popupState)}>
                    <img src={notification} alt="notification-icon" style={iconStyle}/>
                    {(notificationList.filter((e) => e.is_read === 0)).length}
                  </IconButton>
                  <Popper {...bindPopper(popupState)} transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper style={{maxHeight:'100px', overflowY:'scroll'}}>
                          {notificationList.map((e) => {
                            if (e.is_read) {
                              return (<div key={`${e.id}${e.proyek_id}`}>
                                <NotificationButtonRead onClick={() => {history.push(`/proyek/${e.proyek_id}`)}}>
                                  <Typography className={classes.typography} variant="caption">{e.message}</Typography>
                                </NotificationButtonRead>
                                <Divider />
                              </div>)
                            } else {
                              return (<div key={`${e.id}${e.proyek_id}`}>
                                <NotificationButton onClick={() => {
                                  changeUnreadNotification(e)
                                }}>
                                  <Typography className={classes.typography}  variant="caption">{e.message}</Typography>
                                </NotificationButton>
                                <Divider />
                              </div>)
                            }
                          })}
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </div>
              )}
            </PopupState>
            <IconButton onClick={() => {history.push('/profile')}}>
              <img src={profile} alt="profile-icon" style={iconStyle}/>
            </IconButton>
          </Grid>
          <Grid item md={3}>
            <Button onClick={() => {history.push('/logout')}}>Logout</Button>
          </Grid>
        </Grid>  
      </Grid>
      <Grid item container>
        <Paper style={linksContainer}>
          <Grid container style={links}>
            { routesFilter(role) }
          </Grid>
        </Paper>
      </Grid>
    </Grid>  
  )
}

export default Navbar