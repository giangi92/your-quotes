export interface Quote {
  text: string;
  insert: Date;
}

export interface GetQuotesResponse {
  quotes: Quote[];
}
