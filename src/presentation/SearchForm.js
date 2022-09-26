import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

const SearchForm = ({ defaultSearchText = '' }) => {
  const [searchText, setSearchText] = useState(defaultSearchText)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (searchText.trim().length >= 3) navigate(`/search/${encodeURIComponent(searchText.trim())}`)
  }

  return (
    <Form inline className='mb-4' onSubmit={handleSubmit}>
      <Form.Group className='mr-sm-2'>
        <Form.Control
          type='text'
          name='q'
          placeholder='Enter at least three letters'
          style={{ width: '250px' }}
          value={searchText}
          onChange={event => setSearchText(event.target.value)}
        />
      </Form.Group>
      <Form.Group className='mr-sm-2'>
        {
          searchText.trim().length >= 3
            ? <Button type='submit' variant='primary'>Search</Button>
            : (
              <OverlayTrigger overlay={<Tooltip>Enter at least three letters.</Tooltip>}>
                <span className='d-inline-block'>
                  <Button type='submit' variant='primary' disabled style={{ pointerEvents: 'none' }}>Search</Button>
                </span>
              </OverlayTrigger>
            )
        }
      </Form.Group>
    </Form>
  )
}

export default SearchForm
