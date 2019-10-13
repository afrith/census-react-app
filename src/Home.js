import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import { ALL_PROVINCES } from './lib/queries'

const Home = () => {
  const { loading, error, data } = useQuery(ALL_PROVINCES)

  if (error) return <p>Error. :(</p>
  if (loading) return <p>Loading...</p>

  return <>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </>
}

export default Home
