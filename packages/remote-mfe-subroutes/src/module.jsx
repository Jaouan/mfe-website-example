import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const mount = (container, props = {}) =>
  ReactDOM.createRoot(container).render(<App {...props} />);

export { mount };
