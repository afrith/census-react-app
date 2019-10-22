import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

export const LoadingSpinner = () => (
  <div>
    <Spinner animation='border' role='status' />{' '}
    <span>Loading...</span>
  </div>
)
