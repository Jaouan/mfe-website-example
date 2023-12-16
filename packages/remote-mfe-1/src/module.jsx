import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const mount = (container) => ReactDOM.createRoot(container).render(<App />);

export { mount };
