export const makeFeatureCollectionFromPlaceArray = placeArray => ({
  type: 'FeatureCollection',
  features: placeArray.map(c => ({
    type: 'Feature',
    id: c.code,
    properties: { code: c.code, name: c.name },
    geometry: c.geom
  }))
})
