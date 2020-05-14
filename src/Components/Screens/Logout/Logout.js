import React from 'react'

import history from '../../../Shared/History'
import Authorization from '../../../Shared/Authorization'

function Logout () {
  Authorization.logout()
  history.push('/login')
  return (<div />)
}

export default Logout