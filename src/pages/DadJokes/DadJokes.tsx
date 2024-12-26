import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { dadJokesSchema, TDadJokesSchema } from "src/schemas/dadJokes.schemas";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { jokesApi } from "src/apis/jokes.apis";
import { useCallback, useEffect, useRef, useState } from "react";

const DadJokes = () => {
  const [term, setTerm] = useState("");
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
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

  const {
    data: jokesData,
    hasNextPage: jokesHasNextPage,
    fetchNextPage: jokesFetchNextPage,
    isFetchingNextPage: jokesIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["infiniteDadJokes", { term }],
    queryFn: ({ pageParam = 1 }) => jokesApi.searchJokes({ term, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.next_page === null) {
        return undefined;
      }
      return lastPage.data.next_page;
    },
  });

  const handleSubmitForm = handleSubmit((data) => {
    setTerm(data.term);
    queryClient.invalidateQueries({ queryKey: ["dadJokes", { term: data.term }] });
  });

  const handleLoadMore = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && jokesHasNextPage && !jokesIsFetchingNextPage) {
        jokesFetchNextPage();
      }
    },
    [jokesHasNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleLoadMore, {
      rootMargin: "0px 0px 80px 0px",
      threshold: 1.0,
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleLoadMore]);

  return (
    <>
      <form
        className="flex flex-col gap-4 mx-auto w-[700px] mt-6"
        onSubmit={handleSubmitForm}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-5 w-[360px] border border-gray-200 rounded-lg py-3 px-5">
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
              />
            </div>
            <span className="h-4 text-red-500">{errors.term?.message}</span>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center px-8 py-4 font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]">
            Search
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-4">
        {jokesData?.pages.map((page, index) => (
          <div
            key={index}
            className="flex flex-col">
            {page.data.results.map((joke) => (
              <div
                key={joke.id}
                className="flex flex-col gap-2 p-4 border border-gray-200 rounded-lg">
                <span className="text-lg font-semibold">{joke.joke}</span>
              </div>
            ))}
          </div>
        ))}
        {jokesHasNextPage && (
          <div
            ref={loadMoreRef}
            className="flex items-center justify-center h-16">
            Loading...
          </div>
        )}
      </div>
    </>
  );
};

export default DadJokes;
