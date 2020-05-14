import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'


import { Dialog, DialogTitle, Grid, TextField, Divider, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@material-ui/core'
import APIBuilder from '../../Shared/APIBuilder'
import Progress from '../Progress/Progress'

import {masalahColumns as columns} from '../../Shared/Columns'
import Constants from '../../Shared/Constants'

function MasalahDetail(props) {
  const [progressVisibility, setProgressVisibility] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [masalah, setMasalah] = useState([])
  const [message, setMessage] = useState('')
  
  const {
    onClose,
    open,
    myroute,
    terminId,
    status
  } = props

  const refreshMasalah = async () => {

    const masalahResponse = await APIBuilder(`termin-proyek/${terminId}/masalah`)
    if (masalahResponse){
      if(masalahResponse.code === 200) {
        setMasalah(masalahResponse.payload.data)
      }
    }

  }

  useEffect(() => {
    refreshMasalah()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    terminId
  ])
  
  const handleClose = () => {
    onClose()
  }

  const handleRefresh = () => {
    refreshMasalah()
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setPage(0)
    setRowsPerPage(+event.target.value)
  }

  const columnValue = (column, value) => {
    return value
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let payload = {
      termin_id: terminId,
      message
    }
    setProgressVisibility(true)
    try {
      const addMasalah = await APIBuilder(`termin-proyek/${terminId}/masalah`, payload, 'POST')
      if (addMasalah.code === 200) {
        handleRefresh()
        setProgressVisibility(false)
      } else {
        throw addMasalah.payload.data
      }
    } catch (error) {
      alert('Gagal tambah masalah, Message: '+error)
      setProgressVisibility(false)
      console.log(error)
    }
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='md' fullWidth PaperProps={{style : {padding:'1em 2em'}}}>
      <Progress visibility={progressVisibility} />
      <Grid container alignItems="center" justify="flex-end">
        <Link to={myroute} onClick={() => {handleClose()}}>X</Link>
      </Grid>
      <DialogTitle id="simple-dialog-title" align="center">Data Masalah</DialogTitle>
      <Divider />
      <br />
      <form onSubmit={handleSubmit} style={{padding: '0em 1em'}}>
        <Grid item container alignItems="center" justify="space-between" spacing={2}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {masalah.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map(column => {
                      const value = row[column.id]
                      if ((column.id === 'menu') && (status !== Constants.PROYEK_STATUS_END)) {
                        return (
                          <TableCell key={column.id+value} align={column.align}>
                            <Link to={myroute} onClick={async () => {
                              try {
                                const removeMasalah = await APIBuilder(`termin-proyek/masalah/${row.id}/remove`)
                                if (removeMasalah.code === 200) {
                                  handleRefresh()
                                } else {
                                  throw removeMasalah.payload.data
                                }
                              } catch (error) {
                                alert('Gagal hapus tenaga masalah, Message: '+error)
                                console.log(error)
                              }
                            }}>
                              Hapus
                            </Link>
                          </TableCell>
                        )
                      } else {
                        return (
                          <TableCell key={column.id+value} align={column.align}>
                            { columnValue(column,value) }
                          </TableCell>
                        )
                      }
                        
                    })}
                  </TableRow>
                )
              })}
              {(status === Constants.PROYEK_STATUS_END) ? (<div />) : (
                <TableRow hover role="checkbox" tabIndex={-1} key='input'>
                  <TableCell key="masalahInput">
                    <TextField id="input-masalah" label="Masalah" variant="outlined" type="text" fullWidth value={message || ''} onChange={e => setMessage(e.target.value)}/>
                  </TableCell>
                  <TableCell key='tambah' align='center'>
                    <Link to={myroute} onClick={handleSubmit}>
                      Tambah
                    </Link>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={masalah.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>
        <Grid item container>&nbsp;</Grid>
      </form>
    </Dialog>
  )
}

MasalahDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default MasalahDetail