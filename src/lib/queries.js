import gql from 'graphql-tag'

export const ALL_PROVINCES = gql`
query {
  allProvinces {
    code name population area type { name descrip }
  }
}`

export const PLACE_BASIC_BY_CODE = gql`
query ($code: String!) {
  placeByCode(code: $code) {
    code
    name
    type { name descrip }
  }
}
`

export const PLACE_BY_CODE = gql`
query ($code: String!) {
  placeByCode(code: $code) {
    code
    name
    type { name descrip }
    fullParents { code name type { name descrip } }
    children { code name type { name descrip } population area }
    population
    households
    area
    demographics {
      name
      values { label value }
    }
  }
}
`

export const GEOM_BY_CODE = gql`
query ($code: String!) {
  placeByCode(code: $code) {
    code
    name
    type { name descrip }
    fullParents { code name }
    geom
    children { code name geom }
  }
}
`

export const PLACES_BY_NAME = gql`
query ($name: String!) {
  placesByName(name: $name) {
    code
    name
    type { name descrip }
    province { code name }
    population
    area
  }
}
`
