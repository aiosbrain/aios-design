/**
 * @schema 2.11
 * @input spacing: number = 46
 */
const spacing = Math.max(40, pencil.input.spacing);
const cols = Math.floor(pencil.width / spacing) + 1;
const rows = Math.floor(pencil.height / spacing) + 1;
const nodes = [];
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (nodes.length >= 1000) break;
    nodes.push({ type: "ellipse", name: "d", x: c * spacing, y: r * spacing, width: 3, height: 3, fill: "#1a1a1a12" });
  }
}
return nodes;
