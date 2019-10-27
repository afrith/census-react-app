import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-apollo'
import { PLACE_BY_CODE, GEOM_BY_CODE } from '../lib/queries'
import { makeFeatureCollectionFromPlaceArray } from '../lib/geom'
import PlaceView from '../presentation/PlaceView'

const PlaceContainer = () => {
  const { code } = useParams()
  const { loading, error, data } = useQuery(PLACE_BY_CODE, { variables: { code } })
  const { loading: geomLoading, error: geomError, data: geomData } = useQuery(GEOM_BY_CODE, { variables: { code }, ssr: false })

  if (error) throw error
  if (geomError) throw geomError

  return (
    <PlaceView
      loading={loading}
      place={data && data.placeByCode}
      geomLoading={geomLoading}
      geom={geomData && geomData.placeByCode.geom}
      childGeoms={geomData && makeFeatureCollectionFromPlaceArray(geomData.placeByCode.children)}
    />
  )
}

export default PlaceContainer
