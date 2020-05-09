import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SearchForm = ({ defaultSearchText = '' }) => {
  const [searchText, setSearchText] = useState(defaultSearchText)
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    history.push(`/search/${encodeURIComponent(searchText.trim())}`)
  }

  return (
    <Form inline className='mb-4' onSubmit={handleSubmit}>
      <Form.Group className='mr-sm-2'>
        <Form.Control
          type='text'
          name='q'
          placeholder='Enter a place name'
          value={searchText}
          onChange={event => setSearchText(event.target.value)}
        />
      </Form.Group>
      <Form.Group className='mr-sm-2'>
        <Button type='submit' variant='primary'>Search</Button>
      </Form.Group>
    </Form>
  )
}

export default SearchForm
