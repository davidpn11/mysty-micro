import ReactDOM from "react-dom/client";
import { mount } from "./bootstrap";
import { Standalone } from "./shared_npm/Standalone";

// function Root() {
//   return <div>This is the root</div>;
// }

const root = document.getElementById("settings-mf");

ReactDOM.createRoot(root!).render(<Standalone mount={mount} />);
