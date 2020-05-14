import React from 'react'

import { CircularProgress } from '@material-ui/core'

const Progress = ({visibility}) => {
  if (visibility){
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 99999,
        position: 'fixed',
        top: '0',
        left: '0'
      }}>
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)'
        }}>
          <CircularProgress />
        </div>
      </div>
    )
  } else {
    return (<div></div>)
  }
}
export default Progress