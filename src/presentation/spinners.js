import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

export const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className='d-flex flex-row align-items-center'>
    <Spinner animation='border' role='status' />
    <span className='pl-2'>{message}</span>
  </div>
)
