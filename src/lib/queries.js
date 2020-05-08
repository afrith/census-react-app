import gql from 'graphql-tag'

export const ALL_PROVINCES = gql`
query {
  allProvinces {
    code name population area type { id descrip }
  }
}`

export const PLACE_BASIC_BY_CODE = gql`
query ($code: String!) {
  placeByCode(code: $code) {
    code
    name
    type { id name descrip }
  }
}
`

export const PLACE_BY_CODE = gql`
query ($code: String!) {
  placeByCode(code: $code) {
    code
    name
    type { id name descrip }
    fullParents { code name type { id descrip } }
    children { code name type { id descrip } population area }
    population
    households
    area
    demographics {
      name
      values { label value }
    }
    bbox
  }
}
`

export const PLACES_BY_NAME = gql`
query ($name: String!) {
  placesByName(name: $name) {
    code
    name
    type { id descrip }
    province { code name }
    population
    area
  }
}
`
