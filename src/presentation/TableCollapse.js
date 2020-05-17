import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

const TableCollapse = ({ children, keyForId }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className='pb-2'>
        <Button
          variant='secondary'
          onClick={() => setOpen(open => !open)}
          aria-controls={`collapse-text-${keyForId}`}
          aria-expanded={open}
        >
          {open ? 'Hide table' : 'Show table'}
        </Button>
      </div>
      <Collapse in={open}>
        <div id={`collapse-text-${keyForId}`}>
          {children}
        </div>
      </Collapse>
    </>
  )
}

export default TableCollapse
