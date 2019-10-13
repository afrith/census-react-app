import React from 'react'
import { useQuery } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ALL_PROVINCES } from '../lib/queries'

const Home = () => {
  const { loading, error, data } = useQuery(ALL_PROVINCES)

  if (error) return <p>Error. :(</p>
  if (loading) return <p>Loading...</p>

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
