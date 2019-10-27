import React from 'react'
import Container from 'react-bootstrap/Container'

const Layout = ({ children }) => (
  <Container className='py-3'>
    {children}
  </Container>
)

export default Layout
