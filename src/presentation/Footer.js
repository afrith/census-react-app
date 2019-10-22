import React from 'react'

const Footer = () => (
  <div className='mt-4' style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
    This site is developed by <a href='https://adrianfrith.com/'>Adrian Frith</a>.
    This site is not affiliated with <a href='http://www.statssa.gov.za/'>Statistics South Africa</a>, nor is it affiliated with my employer.
    Statistics South Africa is the source of the basic data, while the information displayed results from my own processing of the census data.
    Population statistics were obtained from the Census 2011 Community Profile Databases, and geographical areas were calculated from the Census 2011 GIS DVD.
  </div>
)

export default Footer
