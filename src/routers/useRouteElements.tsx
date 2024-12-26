import { useRoutes } from "react-router-dom";
import DadJokes from "src/pages/DadJokes";

export const useRouteElements = () => {
  const routers = useRoutes([
    {
      path: "/",
      element: <DadJokes></DadJokes>,
    },
  ]);
  return routers;
};
