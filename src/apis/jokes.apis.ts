import axios from "axios";
import { TJokesResponse } from "src/types/jokes.types";
export const jokesApi = {
  searchJokes: ({ term, page }: { term: string; page?: number }) =>
    axios.get<TJokesResponse>(`https://icanhazdadjoke.com/search`, {
      headers: {
        Accept: "application/json",
      },
      params: {
        term,
        page,
      },
    }),
};
