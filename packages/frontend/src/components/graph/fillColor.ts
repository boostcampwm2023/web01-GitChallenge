import { InitialDataProps } from "./parsing";

const color = [
  "#8dd3c7",
  "#ffffb3",
  "#bebada",
  "#fb8072",
  "#80b1d3",
  "#fdb462",
  "#b3de69",
  "#fccde5",
  "#d9d9d9",
  "#bc80bd",
  "#ccebc5",
  "#ffed6f",
];

type D3NodeType = d3.HierarchyNode<InitialDataProps>;
export default function fillColor(node: d3.HierarchyNode<InitialDataProps>) {
  dfs(node, 0);
}

function dfs(node: D3NodeType, colorIndex: number) {
  const { data, children } = node;
  const alreadyFilled = data.color;

  if (alreadyFilled) {
    return;
  }

  data.color = color[colorIndex];
  const leafNode = !children;

  if (leafNode) {
    return;
  }

  const [firstChild, ...restChildren] = children;
  dfs(firstChild, colorIndex);
  restChildren.forEach((child, offset) => dfs(child, colorIndex + offset + 1));
}
