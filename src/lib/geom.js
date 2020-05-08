export const makeFeatureFromPlace = place => ({
  type: 'Feature',
  id: place.code,
  properties: { code: place.code, name: place.name },
  geometry: place.geom
})
