import { createRoot } from "react-dom/client";
import "./index.css";
import { StrictMode } from "react";
import { Todo } from "./projects/Todo/Todo";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Todo />
  </StrictMode>
);
