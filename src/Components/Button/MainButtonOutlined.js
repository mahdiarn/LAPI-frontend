import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const MainButtonOutlined = withStyles(theme => ({
  root: {
    fontSize: "14px",
    backgroundColor: "rgba(0,0,0,0)",
    color: "#117C9B",
    border: '1px solid #117C9B',
    '&:hover': {
      backgroundColor: "#117C9B",
      color: theme.palette.getContrastText("#117C9B"),
    },
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18,
    paddingRight: 18
  },
}))(Button)

export default MainButtonOutlined