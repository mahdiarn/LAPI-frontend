import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'

const MainInput = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText("#117C9B"),
    fontSize: "14px",
    backgroundColor: "#117C9B",
    '&:hover': {
      backgroundColor: "#117C9B",
    },
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18,
    paddingRight: 18,
    cursor: 'pointer'
  },
}))(Input)

export default MainInput