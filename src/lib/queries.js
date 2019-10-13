import gql from 'graphql-tag'

export const ALL_PROVINCES = gql`
query {
  allProvinces {
    id code name population area
  }
}`

export const PLACE_BY_CODE = gql`
query ($code: String!) {
  placeByCode(code: $code) {
    id
    code
    name
    type { id name descrip }
    fullParents { code name }
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

export const PLACES_BY_NAME = gql`
query ($name: String!) {
  placesByName(name: $name) {
    id
    code
    name
    type { id descrip }
    province { id name }
    population
    area
  }
}
`
