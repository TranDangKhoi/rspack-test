import useQueryConfig from "src/hooks/useQueryConfig";
import { dadJokesSchema, TDadJokesSchema } from "src/schemas/dadJokes.schemas";
import { jokesApi } from "src/apis/jokes.apis";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

const DadJokes = () => {
  const { term } = useQueryConfig();
  const navigate = useNavigate();
  const {
    ref: loadMoreRef,
    inView,
    entry,
  } = useInView({
    triggerOnce: false,
    rootMargin: "0px 0px 80px 0px",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TDadJokesSchema>({
    resolver: yupResolver(dadJokesSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const queryClient = useQueryClient();
  const isFetchingRef = useRef(false);
  const {
    data: jokesData,
    hasNextPage: jokesHasNextPage,
    fetchNextPage: jokesFetchNextPage,
    isLoading: jokesIsLoading,
  } = useInfiniteQuery({
    queryKey: ["infiniteDadJokes", { term }],
    queryFn: ({ pageParam = 1 }) => {
      return jokesApi.searchJokes({ term: term, page: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.next_page === lastPage.data.current_page) {
        return undefined;
      }
      return lastPage.data.next_page;
    },
  });

  const handleSubmitForm = handleSubmit((data) => {
    navigate({ pathname: "/", search: `?term=${data.term}` });
    queryClient.invalidateQueries({ queryKey: ["dadJokes", { term: data.term }] });
  });

  const handleLoadMore = useCallback(
    async (entries: IntersectionObserverEntry) => {
      if (entries.isIntersecting && jokesHasNextPage && !isFetchingRef.current) {
        isFetchingRef.current = true;
        await jokesFetchNextPage().finally(() => {
          isFetchingRef.current = false;
        });
      }
    },
    [jokesHasNextPage],
  );

  useEffect(() => {
    if (inView) {
      handleLoadMore(entry as IntersectionObserverEntry);
    }
  }, [inView, handleLoadMore, entry]);

  return (
    <>
      <form
        className="flex flex-col gap-1 mx-auto w-[700px] mt-6"
        onSubmit={handleSubmitForm}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-5 w-[420px] h-[50px] border border-gray-200 rounded-lg py-3 px-5">
              <span className="flex-shrink-0 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="w-full outline-none bg-transparent"
                placeholder="Enter your content..."
                {...register("term")}
                defaultValue={term}
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center px-8 py-4 font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[50px]">
            Search
          </button>
        </div>
        <span className="h-2 text-red-500 text-sm">{errors.term?.message}</span>
      </form>
      <div className="flex flex-col mt-2 mx-auto w-[1200px]">
        {jokesData?.pages.map((page) => (
          <div
            key={page.data.next_page}
            className="flex flex-col">
            {page.data.results.map((joke) => (
              <div
                key={joke.id}
                className="flex flex-col gap-2 px-3 py-4 rounded-lg">
                <span className="text-lg font-semibold">{joke.joke}</span>
              </div>
            ))}
          </div>
        ))}
        {jokesHasNextPage || jokesIsLoading ? (
          <div
            ref={loadMoreRef}
            className="flex items-center justify-center h-16">
            Loading more jokes...
          </div>
        ) : (
          <div className="flex items-center justify-center h-16">No jokes found</div>
        )}
      </div>
    </>
  );
};

export default DadJokes;
