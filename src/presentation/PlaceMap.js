import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import useComponentSize from '@rehooks/component-size'
import ReactMapGL, { WebMercatorViewport, Source, Layer, Popup } from 'react-map-gl'

const childTypes = {
  province: ['metro', 'district'],
  metro: ['mainplace'],
  district: ['local', 'dma'],
  local: ['mainplace'],
  dma: ['mainplace'],
  mainplace: ['subplace'],
  subplace: ['sa'],
  sa: []
}

const sources = [
  { id: 'province', type: 'vector', tiles: [`${process.env.RAZZLE_TILE_ROOT}/{z}/{x}/{y}.mvt?layers=province`], maxzoom: 20 },
  { id: 'munis', type: 'vector', tiles: [`${process.env.RAZZLE_TILE_ROOT}/{z}/{x}/{y}.mvt?layers=metro,district,local,dma`], maxzoom: 20 },
  { id: 'mainplace', type: 'vector', tiles: [`${process.env.RAZZLE_TILE_ROOT}/{z}/{x}/{y}.mvt?layers=mainplace`], maxzoom: 20 },
  { id: 'subplace', type: 'vector', tiles: [`${process.env.RAZZLE_TILE_ROOT}/{z}/{x}/{y}.mvt?layers=subplace`], maxzoom: 20 },
  { id: 'sa', type: 'vector', tiles: [`${process.env.RAZZLE_TILE_ROOT}/{z}/{x}/{y}.mvt?layers=sa`], maxzoom: 20 }
]

const typeSource = {
  metro: 'munis',
  district: 'munis',
  local: 'munis',
  dma: 'munis'
}

const parentStrokeStyle = {
  type: 'line',
  layout: {
    'line-cap': 'round',
    'line-join': 'round'
  },
  paint: {
    'line-color': '#3388ff',
    'line-width': 3
  }
}

const parentFillStyle = {
  type: 'fill',
  paint: {
    'fill-color': '#3388ff',
    'fill-opacity': 0.2
  }
}

const childStrokeStyle = {
  type: 'line',
  layout: {
    'line-cap': 'round',
    'line-join': 'round'
  },
  paint: {
    'line-color': '#3388ff',
    'line-width': 1.5
  }
}

const childFillStyle = {
  type: 'fill',
  paint: {
    'fill-color': '#3388ff',
    'fill-opacity': 0
  }
}

const PlaceMap = ({ place }) => {
  const { code, children, bbox } = place

  const [viewport, setViewport] = useState({})
  // Fit to bounds, but only once we have bounds and know the size of the map
  useEffect(() => {
    if (!bbox || !viewport.height) return
    const { longitude, latitude, zoom } = new WebMercatorViewport(viewport)
      .fitBounds([[bbox[0], bbox[1]], [bbox[2], bbox[3]]], { padding: 20 })
    setViewport(viewport => ({ ...viewport, longitude, latitude, zoom }))
  }, [bbox, !viewport.height])

  const ref = useRef(null)
  const { width, height } = useComponentSize(ref)
  useEffect(() => {
    setViewport(viewport => ({ ...viewport, width, height }))
  }, [width, height])

  const [popup, setPopup] = useState()
  // hide popup on place change
  useEffect(() => { setPopup(null) }, [code])

  const typeName = place.type.name

  const layers = useMemo(() => {
    const parentSource = {
      source: typeSource[typeName] || typeName,
      'source-layer': typeName,
      filter: ['==', ['get', 'code'], code]
    }

    const layers = [
      {
        id: `pfill-${typeName}`,
        ...parentSource,
        ...parentFillStyle
      },
      {
        id: `pstroke-${typeName}`,
        ...parentSource,
        ...parentStrokeStyle
      }
    ]

    const childrenCodes = children.map(c => c.code)

    childTypes[typeName].forEach(ct => {
      const source = {
        source: typeSource[ct] || ct,
        'source-layer': ct,
        filter: ['in', ['get', 'code'], ['literal', childrenCodes]]
      }
      layers.push({
        id: `cfill-${ct}`,
        ...source,
        ...childFillStyle
      })
      layers.push({
        id: `cstroke-${ct}`,
        ...source,
        ...childStrokeStyle
      })
    })

    return layers
  }, [typeName, code]) // we ignore children here because children only change when code changes

  const handleClick = e => {
    const feature = e.features.find(f => f.layer.id.startsWith('cfill'))
    setPopup(feature ? { lngLat: e.lngLat, props: feature.properties } : null)
  }

  return (
    <div className='map-container' ref={ref}>
      <ReactMapGL
        mapStyle='https://maptiles.frith.dev/styles/basic/style.json'
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        onClick={handleClick}
      >
        {sources.map(s => <Source {...s} key={s.id} />)}
        {layers.map(l => <Layer {...l} key={`${l.id}-${code}`} />)}
        {popup && (
          <Popup
            longitude={popup.lngLat[0]}
            latitude={popup.lngLat[1]}
            closeButton={false}
          >
            <Link to={`/place/${popup.props.code}`}>{popup.props.name}</Link>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  )
}

export default (props) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  return mounted ? <PlaceMap {...props} /> : null
}