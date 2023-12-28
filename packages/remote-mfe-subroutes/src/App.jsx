import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createMemoryRouter,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { MainLayout } from "./pages/MainLayout/MainLayout";
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
    notFoundElement: <Navigate to="/" />,
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
            {
              path: "*",
              element: routingStrategy.notFoundElement,
            },
          ],
        },
        /* Leave global router handle others paths. */
        {
          path: "*",
          element: <></>,
        },
      ])
    );
  }, [preferImplicitRouting, routePath]);

  return (
    <>
      {preferImplicitRouting ? (
        <>
          <h2>Implicit routing</h2>
          <div>Navigation uses in-memory path.</div>
          <div>Error routes to default route.</div>
        </>
      ) : (
        <>
          <h2>Explicit routing</h2>
          <div>Navigation uses browser path.</div>
          <div>Error routes to /404.</div>
          <div>Base path: {routePath}</div>
        </>
      )}
      {router ? <RouterProvider router={router} /> : <></>}
    </>
  );
};

export default App;
