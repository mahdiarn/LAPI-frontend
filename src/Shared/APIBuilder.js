import {baseUrl} from './Config'
async function APIBuilder(endpoint, payload, method = 'GET') {
  if (method === 'GET') {
    return fetch(`${baseUrl}/${endpoint}`, {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
  } else {
    return fetch(`${baseUrl}/${endpoint}`, {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
  }
  

}

export default APIBuilder