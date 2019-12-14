import React from 'react'

import history from '../../Shared/History'

import logo from '../../Assets/logolapi.png'
import notification from '../../Assets/icon-notification.png'
import home from '../../Assets/icon-home.png'
import profile from '../../Assets/icon-profile.png'

import Button from '../Button/MainButton'
import { Typography, Grid, IconButton, Paper, Link} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';

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

const routes = [
  {name: 'a', url: '/'}
]


function Navbar(){
  
  const a = routes.map((item) => {
    return (
      <Link href="#" onClick={() => {history.push(item.url)}} key={item.name+'-key'}>
        {item.name}
      </Link>
    )
  })

  const classes = useStyles()
  return(
    <Grid container>
      <Grid item container style={style} alignItems="center">
        <Grid item container md={6}  alignItems="center">
          <Grid item md={3}>
            <img src={logo} alt="lapi-logo" style={logoStyle}/>
          </Grid>
          <Grid item md={3}>
            <Typography variant="h5">
              Menu Utama
            </Typography>
          </Grid>
        </Grid>
        <Grid item container md={6} justify="flex-end" alignItems="center">
          <Grid item container md={9} direction="row" justify="flex-end">
            <IconButton variant="contained" color="primary">
              <img src={home} alt="home-icon" style={iconStyle}/>
            </IconButton>
            <PopupState variant="popper" popupId="demo-popup-popper">
              {popupState => (
                <div>
                  <IconButton variant="contained" color="primary" {...bindToggle(popupState)}>
                    <img src={notification} alt="notification-icon" style={iconStyle}/>
                  </IconButton>
                  <Popper {...bindPopper(popupState)} transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                          <Typography className={classes.typography}>Notification.</Typography>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </div>
              )}
            </PopupState>
            <IconButton variant="contained" color="primary">
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
            {a}
          </Grid>
        </Paper>
      </Grid>
    </Grid>  
  )
}

export default Navbar