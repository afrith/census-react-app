import React from 'react'
import { useQuery } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ALL_PROVINCES } from '../lib/queries'
import { LoadingSpinner } from '../presentation/spinners'

const Home = () => {
  const { loading, error, data } = useQuery(ALL_PROVINCES)

  if (error) throw error
  if (loading) return <LoadingSpinner />

  return <>
    <Helmet>
      <title>Census 2011</title>
    </Helmet>
    <ul>
      {data.allProvinces.map(({ code, name }) => (
        <li key={code}>
          <Link to={`/place/${code}`}>{name}</Link>
        </li>
      ))}
    </ul>
  </>
}

export default Home
