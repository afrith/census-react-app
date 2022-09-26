import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { PLACE_BASIC_BY_CODE, PLACE_BY_CODE } from '../lib/queries'
import PlaceView from '../presentation/PlaceView'
import { WarningMessage } from '../presentation/alerts'

const PlaceContainer = () => {
  const { code } = useParams()

  // This fetches only name, code, type, and only if the data is already in the cache.
  const { data: basicData } = useQuery(PLACE_BASIC_BY_CODE, { variables: { code }, fetchPolicy: 'cache-only' })
  // This fetches the full place data, excluding the geometries.
  const { loading: fullLoading, error, data: fullData } = useQuery(PLACE_BY_CODE, { variables: { code } })

  // We ignore the error from the cache fetch because it throws on a cache miss.
  if (error) throw error

  // This occurs if the place code is wrong
  if (fullData && !fullData.placeByCode) {
    return <WarningMessage message={`Error: no place found with the code ${code}.`} />
  }

  // Merge the (potential) cached basicData, and the queried full data.
  // The code check is because Apollo returns old data for the previous place while the new place data is fetching.
  const place = {
    ...((fullData && fullData.placeByCode.code === code) ? fullData.placeByCode : {}),
    ...((basicData && basicData.placeByCode.code === code) ? basicData.placeByCode : {})
  }

  return (
    <PlaceView
      loading={fullLoading}
      place={place}
    />
  )
}

export default PlaceContainer
