import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { FixedSizeList as List } from "react-window";

const fetchJokes = async ({ pageParam = 1 }) => {
  const response = await axios.get("https://icanhazdadjoke.com/search", {
    headers: { Accept: "application/json" },
    params: { page: pageParam, limit: 10 },
  });
  return response.data;
};

const InfiniteScrollList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["jokes"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchJokes({ pageParam }),
    getNextPageParam: (lastPage: any) =>
      lastPage.current_page < lastPage.total_pages ? lastPage.current_page + 1 : undefined,
  });

  const jokes = data?.pages.flatMap((page: any) => page.results) || [];

  return (
    <List
      height={400}
      itemCount={jokes.length + (hasNextPage ? 1 : 0)}
      itemSize={50}
      width="100%"
      onItemsRendered={({ visibleStopIndex }) => {
        if (visibleStopIndex >= jokes.length - 1 && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}>
      {({ index, style }) =>
        index < jokes.length ? <div style={style}>{jokes[index].joke}</div> : <div style={style}>Loading...</div>
      }
    </List>
  );
};

export default InfiniteScrollList;
