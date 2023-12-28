import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const mount = (container, props = {}) => {
  const root = ReactDOM.createRoot(container);
  root.render(<App {...props} />);
  return () => root.unmount();
};

export { mount };
