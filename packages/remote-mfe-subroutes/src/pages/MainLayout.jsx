import { Link, Outlet } from "react-router-dom";

export const MainLayout = () => (
  <>
    Main layout
    <nav>
      <Link to="foo">Foo</Link> <Link to="bar">Bar</Link>{" "}
      <Link to="foobar">Simulate 404</Link>
    </nav>
    <Outlet />
  </>
);
