import React from 'react'
import Container from 'react-bootstrap/Container'
import Footer from './Footer'
import { WarningMessage } from './alerts'

const Layout = ({ children }) => (
  <Container className='py-3'>
    <WarningMessage message={<>This site shows results from Census 2001. You might be looking for the <a href='https://census2011.adrianfrith.com/'>Census 2011 site</a> which has more recent information.</>} />
    {children}
    <Footer />
  </Container>
)

export default Layout
