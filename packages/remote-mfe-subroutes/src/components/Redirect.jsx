export const Redirect = ({ to }) => {
  window.dispatchEvent(new CustomEvent("layout-navigate", { detail: { to } }));
  // document.location.replace(to);
  return <></>;
};
