import React from 'react'
import { useQuery } from 'react-apollo'
import { ALL_PROVINCES } from '../lib/queries'
import HomeView from '../presentation/HomeView'

const Home = () => {
  const { loading, error, data } = useQuery(ALL_PROVINCES)

  if (error) throw error

  return <HomeView loading={loading} provinces={data && data.allProvinces} />
}

export default Home
