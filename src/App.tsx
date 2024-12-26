import { useRouteElements } from "src/routers/useRouteElements";
import "./App.css";

const App = () => {
  const routeElements = useRouteElements();
  return <div>{routeElements}</div>;
};

export default App;
