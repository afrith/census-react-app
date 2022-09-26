import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { PLACE_BY_CODE } from '../lib/queries'
import BigmapView from '../presentation/BigmapView'
import { WarningMessage } from '../presentation/alerts'

const PlaceContainer = () => {
  const { code } = useParams()
  const { loading, error, data } = useQuery(PLACE_BY_CODE, { variables: { code } })

  if (error) throw error

  // This occurs if the place code is wrong
  if (data && !data.placeByCode) {
    return <WarningMessage message={`Error: no place found with the code ${code}.`} />
  }

  return (
    <BigmapView
      loading={loading}
      place={data && data.placeByCode}
    />
  )
}

export default PlaceContainer
