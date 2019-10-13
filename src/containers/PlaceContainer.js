import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-apollo'
import { Helmet } from 'react-helmet'
import { PLACE_BY_CODE } from '../lib/queries'
import { LoadingSpinner } from '../presentation/spinners'

const Place = () => {
  const { code } = useParams()
  const { loading, error, data } = useQuery(PLACE_BY_CODE, { variables: { code } })

  if (error) throw error
  if (loading) return <LoadingSpinner />

  return <>
    <Helmet>
      <title>Census 2011: {data.placeByCode.type.descrip}: {data.placeByCode.name}</title>
    </Helmet>
    <Link to='/'>Home</Link>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </>
}

export default Place
