import { gql } from "@apollo/client";

export const CREATE_ENTRY = gql`
  mutation CreateEntry($date: String!, $description: String!, $weather: String, $image: String!) {
    createEntry(date: $date, description: $description, weather: $weather, image: $image) {
      id
    }
  }
`;