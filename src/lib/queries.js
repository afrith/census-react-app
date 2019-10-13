import gql from 'graphql-tag'

export const ALL_PROVINCES = gql`
query {
  allProvinces {
    id code name
  }
}`
