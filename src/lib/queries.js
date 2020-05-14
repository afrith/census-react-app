import gql from 'graphql-tag'

const type = 'type { name descrip }'

export const ALL_PROVINCES = gql`
query {
  allProvinces: places(type: "province") {
    code name population area ${type}
  }
}`

export const PLACE_BASIC_BY_CODE = gql`
query ($code: String!) {
  placeByCode: place(code: $code) {
    code
    name
    ${type}
  }
}
`

export const PLACE_BY_CODE = gql`
query ($code: String!) {
  placeByCode: place(code: $code) {
    code
    name
    ${type}
    fullParents { code name ${type} }
    children { code name ${type} population area }
    population
    households
    area
    variables {
      variable { id name }
      values { label value }
    }
    bbox
  }
}
`

export const PLACES_BY_NAME = gql`
query ($name: String!) {
  placesByName: places(name: $name) {
    code
    name
    ${type}
    province { code name }
    population
    area
  }
}
`
