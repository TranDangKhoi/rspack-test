export type TJokesResponse = {
  current_page: number;
  limit: number;
  next_page: number;
  previous_page: number;
  results: TJokeData[];
  search_term: string;
  status: number;
  total_jokes: number;
  total_pages: number;
};

export type TJokeData = {
  id: string;
  joke: string;
};
