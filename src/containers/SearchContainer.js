import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { PLACES_BY_NAME } from '../lib/queries'
import SearchView from '../presentation/SearchView'

const SearchContainer = () => {
  const { name } = useParams()
  const { loading, error, data } = useQuery(PLACES_BY_NAME, { variables: { name } })

  if (error) throw error

  return <SearchView name={name} loading={loading} places={data && data.placesByName} />
}

export default SearchContainer
