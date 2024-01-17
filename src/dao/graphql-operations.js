import gql from "graphql-tag";

export const GET_QUOTES = gql`
  query {
    quotes {
      _id
      insert
      text
    }
  }
`;

export const ADD_QUOTE = gql`
  mutation addQuote($quote: QuoteInsertInput!) {
    insertOneQuote(data: $quote) {
      insert
      text
    }
  }
`;
