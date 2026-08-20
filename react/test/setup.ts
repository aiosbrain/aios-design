// Unmount between tests. Without this, every render stacks up in document.body and an
// assertion about "what this component renders" silently reads the whole suite's markup —
// which is how a colour-literal assertion passes by accident (or fails by accident).
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(cleanup);
