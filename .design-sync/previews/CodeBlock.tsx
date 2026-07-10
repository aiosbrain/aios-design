import { CodeBlock } from "@aios-alpha/ui";

export const Basic = () => (
  <CodeBlock
    className="max-w-lg"
    filename="tokens.css"
    status="static"
    code={`:root {
  --aios-bg: #fafaf9;
  --aios-fg: #111110;
  --aios-font-display: "Instrument Serif", serif;
}`}
  />
);
