export const Redirect = ({ to }) => {
  window.dispatchEvent(
    new CustomEvent("layout-navigate", { detail: { to, replace: true } })
  );
  return <></>;
};
