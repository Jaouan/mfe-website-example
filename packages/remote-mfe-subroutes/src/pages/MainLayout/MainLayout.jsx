import { Link, Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

export const MainLayout = () => (
  <>
    <nav className={styles.navbar}>
      <Link to="foo">Foo</Link> <Link to="bar">Bar</Link>{" "}
      <Link to="foobar">Simulate 404</Link>
    </nav>
    <Outlet />
  </>
);
