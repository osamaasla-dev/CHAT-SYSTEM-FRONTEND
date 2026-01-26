import { Routes, Route } from "react-router-dom";
import { routes, type RouteContent } from "./routes";

function renderRoutes(routeArray: RouteContent[]) {
  return routeArray.map(({ key, index, path, Element, children }) => {
    if (index) {
      return <Route key={key} index element={<Element />} />;
    }

    return (
      <Route key={key} path={path} element={<Element />}>
        {children && renderRoutes(children)}
      </Route>
    );
  });
}

export default function App() {
  return <Routes>{renderRoutes(routes)}</Routes>;
}
