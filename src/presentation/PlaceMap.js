import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// This is a conditional import because leaflet can't be imported on server-side,
// but this component will only ever render on client-side.
const { Map, TileLayer, Popup, withLeaflet } = process.env.BUILD_TARGET === 'client' ? require('react-leaflet') : {}
const VectorGrid = process.env.BUILD_TARGET === 'client' ? withLeaflet(require('react-leaflet-vectorgrid')) : null

const childTypes = {
  province: ['metro', 'district'],
  metro: ['mainplace'],
  district: ['local', 'dma'],
  local: ['mainplace'],
  dma: ['mainplace'],
  mainplace: ['subplace'],
  subplace: []
}

const hiddenStyle = {
  stroke: false,
  fill: false
}

const PlaceMap = ({ place }) => {
  const { code, children, bbox } = place

  const [popup, setPopup] = useState()
  useEffect(() => { setPopup(null) }, [code]) // hide popup on place change

  if (process.env.BUILD_TARGET !== 'client') return <div />
  const bounds = [[bbox[1], bbox[0]], [bbox[3], bbox[2]]] // swap X-Y

  const typeName = place.type.name
  const layers = [typeName, ...childTypes[typeName]]

  const objLayerStyle = properties => properties.code === code ? {
    stroke: true,
    weight: 3,
    color: '#3388ff',
    fill: false
  } : hiddenStyle

  const childrenCodes = children.map(c => c.code)

  const childLayerStyle = properties => childrenCodes.includes(properties.code) ? {
    stroke: true,
    weight: 1.5,
    color: '#3388ff',
    fill: true,
    fillOpacity: 0.2
  } : hiddenStyle

  const styles = {}
  styles[typeName] = objLayerStyle
  childTypes[typeName].forEach(type => { styles[type] = childLayerStyle })

  const gridOptions = {
    type: 'protobuf',
    url: `${process.env.RAZZLE_TILE_ROOT}/{z}/{x}/{y}.mvt?layers=${layers.join(',')}`,
    subdomains: 'a', // dummy
    vectorTileLayerStyles: styles,
    zIndex: 801,
    interactive: true,
    onClick: e => {
      const props = e.layer.properties
      if (props.code !== code) {
        setPopup({ latlng: e.latlng, props: props })
      }
    }
  }

  return (
    <Map bounds={bounds}>
      <VectorGrid key={code} {...gridOptions} />
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      {popup && (
        <Popup position={popup.latlng} onClose={() => setPopup(null)}>
          <Link to={`/place/${popup.props.code}`}>{popup.props.name}</Link>
        </Popup>
      )}
    </Map>
  )
}

export default PlaceMap
