import { useRoutes } from "react-router-dom";
import DadJokes from "src/pages/DadJokes";
import DadJokesVirtualScroll from "src/pages/DadJokesVirtualScroll";

export const useRouteElements = () => {
  const routers = useRoutes([
    {
      path: "/",
      element: <DadJokesVirtualScroll></DadJokesVirtualScroll>,
    },
  ]);
  return routers;
};
