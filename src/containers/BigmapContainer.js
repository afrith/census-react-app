import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-apollo'
import { GEOM_BY_CODE } from '../lib/queries'
import { makeFeatureCollectionFromPlaceArray } from '../lib/geom'
import BigmapView from '../presentation/BigmapView'

const PlaceContainer = () => {
  const { code } = useParams()
  const { loading, error, data } = useQuery(GEOM_BY_CODE, { variables: { code } })

  const childGeoms = data && makeFeatureCollectionFromPlaceArray(data.placeByCode.children)

  if (error) throw error

  return (
    <BigmapView
      loading={loading}
      place={data && data.placeByCode}
      geom={data && data.placeByCode.geom}
      childGeoms={childGeoms}
    />
  )
}

export default PlaceContainer
