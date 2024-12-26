import { useRoutes } from "react-router-dom";
import DadJokes from "src/pages/DadJokes";
import Loading from "src/pages/Loading";
import TailwindComponent from "src/pages/TailwindComponent";

export const useRouteElements = () => {
  const routers = useRoutes([
    {
      path: "/",
      element: <DadJokes></DadJokes>,
    },
  ]);
  return routers;
};
