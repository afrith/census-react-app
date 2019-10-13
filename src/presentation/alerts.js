import React from 'react'
import Alert from 'react-bootstrap/Alert'

export const ErrorMessage = ({ message }) => (
  <Alert variant='danger'>
    Unfortunately an error has occurred. The technical description is as follows.

    <blockquote><pre>{message}</pre></blockquote>

    Please check your internet connection and try refreshing this page.
    If errors continue to occur please email me at <a href='mailto:adrian@adrianfrith.com'>adrian@adrianfrith.com</a> for assistance.
  </Alert>
)
