import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const MainButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText("#117C9B"),
    fontSize: "14px",
    backgroundColor: "#117C9B",
    '&:hover': {
      backgroundColor: "#117C9B",
    },
    borderRadius: 30,
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 28,
    paddingRight: 28
  },
}))(Button)

export default MainButton