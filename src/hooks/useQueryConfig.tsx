import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";
import useQueryParams from "src/hooks/useQueryParams";

const useQueryConfig = () => {
  const searchParams = useQueryParams();
  const queryConfig = omitBy({ term: searchParams.term || "" }, isNil);
  return queryConfig;
};

export default useQueryConfig;
