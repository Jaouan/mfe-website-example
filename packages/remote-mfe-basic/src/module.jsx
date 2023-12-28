import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const mount = (container) => {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
  return () => root.unmount();
};

export { mount };
