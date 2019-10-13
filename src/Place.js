import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-apollo'
import { PLACE_BY_CODE } from './lib/queries'

const Place = () => {
  const { code } = useParams()
  const { loading, error, data } = useQuery(PLACE_BY_CODE, { variables: { code } })

  if (error) return <p>Error. :(</p>
  if (loading) return <p>Loading...</p>

  return <>
    <Link to='/'>Home</Link>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </>
}

export default Place
