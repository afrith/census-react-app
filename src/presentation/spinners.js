import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

export const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div>
    <Spinner animation='border' role='status' />{' '}
    <span>{message}</span>
  </div>
)
