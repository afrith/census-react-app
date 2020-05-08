import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-apollo'
import { PLACE_BY_CODE } from '../lib/queries'
import BigmapView from '../presentation/BigmapView'

const PlaceContainer = () => {
  const { code } = useParams()
  const { loading, error, data } = useQuery(PLACE_BY_CODE, { variables: { code } })

  if (error) throw error

  return (
    <BigmapView
      loading={loading}
      place={data && data.placeByCode}
    />
  )
}

export default PlaceContainer
