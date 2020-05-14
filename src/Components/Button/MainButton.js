import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const MainButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText("#117C9B"),
    fontSize: "16px",
    backgroundColor: "#117C9B",
    '&:hover': {
      backgroundColor: "#117C9B",
    },
    borderRadius: 30,
    paddingTop: 17,
    paddingBottom: 17,
    paddingLeft: 32,
    paddingRight: 32
  },
}))(Button)

export default MainButton