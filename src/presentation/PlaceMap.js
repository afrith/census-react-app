import React from 'react'
import bbox from '@turf/bbox'

// This is a conditional import because leaflet can't be imported on server-side,
// but this component will only ever render on client-side.
const { Map, TileLayer, GeoJSON } = process.env.BUILD_TARGET === 'client' ? require('react-leaflet') : {}

const PlaceMap = ({ geom }) => {
  const bb = bbox(geom)
  const bounds = [[bb[1], bb[0]], [bb[3], bb[2]]]

  return (
    <Map bounds={bounds}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={geom} />
    </Map>
  )
}

export default PlaceMap
