import { createSlice } from "@reduxjs/toolkit";
import { quotesDAO } from "../dao/quotesDAO";

export interface IquotesManagerState {
  quotes: string[];
  randomQuote: string;
}

const initialState: IquotesManagerState = {
  quotes: [],
  randomQuote: "",
};

let lastShownQuote = "";

export const quotesManager = createSlice({
  name: "quotesManager",
  initialState,
  reducers: {
    loadQuotes: (state, action) => {
      state.quotes = action.payload;
      quotesDAO.setQuotes(state.quotes);
    },
    addQuote: (state, action: { payload: { quote: string } }) => {
      state.quotes.push(action.payload.quote);
      quotesDAO.setQuotes(state.quotes);
      quotesDAO.addQuote(action.payload.quote, new Date());
    },
    deleteQuote: (state, action) => {},
    getRandom: (state) => {
      if (state.quotes.length > 0) {
        const randomQuoteFromList = state.quotes.filter(
          (quote) => quote !== lastShownQuote
        )[Math.floor(Math.random() * (state.quotes.length - 1))];
        state.randomQuote = randomQuoteFromList;

        lastShownQuote = randomQuoteFromList;
        return state;
      }
      return undefined;
    },
  },
});

export const { loadQuotes, addQuote, deleteQuote, getRandom } =
  quotesManager.actions;

export default quotesManager.reducer;
