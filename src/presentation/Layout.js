import React from 'react'
import Container from 'react-bootstrap/Container'
import Footer from './Footer'

const Layout = ({ children }) => (
  <Container className='py-3'>
    {children}
    <Footer />
  </Container>
)

export default Layout
