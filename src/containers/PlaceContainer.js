import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-apollo'
import { PLACE_BY_CODE, GEOM_BY_CODE } from '../lib/queries'
import PlaceView from '../presentation/PlaceView'

const PlaceContainer = () => {
  const { code } = useParams()
  const { loading, error, data } = useQuery(PLACE_BY_CODE, { variables: { code } })
  const { loading: geomLoading, error: geomError, data: geomData } = useQuery(GEOM_BY_CODE, { variables: { code }, ssr: false })

  const childGeoms = geomData && {
    type: 'FeatureCollection',
    features: geomData.placeByCode.children.map(c => ({
      type: 'Feature',
      id: c.code,
      properties: { code: c.code, name: c.name },
      geometry: c.geom
    }))
  }

  if (error) throw error
  if (geomError) throw geomError

  return (
    <PlaceView
      loading={loading}
      place={data && data.placeByCode}
      geomLoading={geomLoading}
      geom={geomData && geomData.placeByCode.geom}
      childGeoms={childGeoms}
    />
  )
}

export default PlaceContainer
