import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";
import useQueryParams from "src/hooks/useQueryParams";
import { TDadJokesSchema } from "src/schemas/dadJokes.schemas";

const useQueryConfig = () => {
  const searchParams = useQueryParams();
  const queryConfig: TDadJokesSchema = omitBy({ term: searchParams.term || "" }, isNil) as TDadJokesSchema;
  return queryConfig;
};

export default useQueryConfig;
