import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const NotificationButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText('rgba(120,120,120,1)'),
    fontSize: "12px",
    backgroundColor: "rgba(120,120,120,1)",
    '&:hover': {
      backgroundColor: "#117C9B",
      color: theme.palette.getContrastText("#117C9B"),
    },
    borderRadius: 0,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15
  },
}))(Button)

export default NotificationButton