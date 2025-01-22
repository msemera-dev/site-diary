import { gql } from "@apollo/client";

export const GET_ENTRY = gql`
  query GetEntry($id: ID!) {
    entry(id: $id) {
      id
      date
      description
      weather
      image
    }
  }
`;

export const GET_ENTRIES = gql`
  query GetEntries {
    entries {
      id
      date
      description
    }
  }
`;