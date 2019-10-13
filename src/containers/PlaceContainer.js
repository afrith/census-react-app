import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-apollo'
import { PLACE_BY_CODE } from '../lib/queries'
import PlaceView from '../presentation/PlaceView'

const Place = () => {
  const { code } = useParams()
  const { loading, error, data } = useQuery(PLACE_BY_CODE, { variables: { code } })

  if (error) throw error

  return <PlaceView loading={loading} place={data && data.placeByCode} />
}

export default Place
