import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";
import useQueryParams from "src/hooks/useQueryParams";
import { TDadJokesQuery } from "src/types/params.types";

const useQueryConfig = () => {
  const searchParams = useQueryParams();
  const queryConfig: TDadJokesQuery = omitBy({ term: searchParams.term || "" }, isNil) as TDadJokesQuery;
  return queryConfig;
};

export default useQueryConfig;
