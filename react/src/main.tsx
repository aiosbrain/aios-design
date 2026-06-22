import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { KitchenSink } from "./KitchenSink";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KitchenSink />
  </StrictMode>,
);
