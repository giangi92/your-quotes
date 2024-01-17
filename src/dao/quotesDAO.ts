import { client } from "..";
import { DAO } from "./DAO";
import { ADD_QUOTE } from "./graphql-operations";

export const quotesDAO = {
  getQuotes: (): string[] => {
    const quotes = DAO.getItem("quotes") as unknown as string[];
    if (quotes && quotes.length > 0) return quotes;
    return [];
  },
  addQuote: (quote: string, dateInsert: Date) => {
    client.mutate({
      mutation: ADD_QUOTE,
      variables: { quote: { text: quote, insert: dateInsert } },
    });
  },
  setQuotes: (quotes: string[]) => {
    DAO.setItem("quotes", quotes);
  },
};
