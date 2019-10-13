import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-apollo'
import { PLACES_BY_NAME } from '../lib/queries'

const SearchContainer = () => {
  const { name } = useParams()
  const { loading, error, data } = useQuery(PLACES_BY_NAME, { variables: { name } })

  if (error) throw error

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default SearchContainer