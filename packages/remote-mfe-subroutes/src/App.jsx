import {
  RouterProvider,
  createBrowserRouter,
  createMemoryRouter,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { MainLayout } from "./pages/MainLayout";
import { Foo } from "./pages/Foo";
import { Bar } from "./pages/Bar";
import { Redirect } from "./components/Redirect";

const routingStrategies = {
  explicit: {
    router: createBrowserRouter,
    basePath: (routePath) => routePath ?? "/",
    notFoundElement: <Redirect to="/404" />,
  },
  implicit: {
    router: createMemoryRouter,
    basePath: () => "/",
    notFoundElement: <>(404)</>,
  },
};

const App = ({ preferImplicitRouting, routePath }) => {
  const [router, setRouter] = useState(null);

  useEffect(() => {
    const routingStrategy = preferImplicitRouting
      ? routingStrategies.implicit
      : routingStrategies.explicit;

    setRouter(
      routingStrategy.router([
        {
          path: routingStrategy.basePath(routePath),
          element: <MainLayout />,
          children: [
            {
              path: "foo",
              element: <Foo />,
            },
            {
              path: "bar",
              element: <Bar />,
            },
          ],
        },
        {
          path: "*",
          element: routingStrategy.notFoundElement,
        },
      ])
    );
  }, [preferImplicitRouting, routePath]);

  return (
    <>
      <h1>routing: {preferImplicitRouting ? "implicit" : `explicit (${routePath})`}</h1>
      {router ? <RouterProvider router={router} /> : <></>}
    </>
  );
};

export default App;
