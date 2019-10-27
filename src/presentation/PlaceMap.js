import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import bbox from '@turf/bbox'

// This is a conditional import because leaflet can't be imported on server-side,
// but this component will only ever render on client-side.
const { Map, TileLayer, GeoJSON, Popup } = process.env.BUILD_TARGET === 'client' ? require('react-leaflet') : {}

const PlaceMap = ({ geom, childGeoms }) => {
  const [popup, setPopup] = useState()

  if (process.env.BUILD_TARGET !== 'client') return <div />

  const bb = bbox(geom)
  const bounds = [[bb[1], bb[0]], [bb[3], bb[2]]]

  const onEachChild = (feature, layer) => {
    layer.on({ click: e => setPopup({ latlng: e.latlng, props: e.target.feature.properties }) })
  }

  return (
    <Map bounds={bounds}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={geom} />
      {childGeoms.features.length && <GeoJSON data={childGeoms} style={{ weight: 1.5, fillOpacity: 0 }} onEachFeature={onEachChild} />}
      {popup && (
        <Popup position={popup.latlng} onClose={() => setPopup(null)}>
          <Link to={`/place/${popup.props.code}`}>{popup.props.name}</Link>
        </Popup>
      )}
    </Map>
  )
}

export default PlaceMap
