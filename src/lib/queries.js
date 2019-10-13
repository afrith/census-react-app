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
  }
}
`