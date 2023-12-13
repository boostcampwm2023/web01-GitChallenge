import * as d3 from "d3";

import color from "../../design-system/tokens/color";

import { InitialDataProps } from "./parsing";

interface TooltipProps {
  text: string;
  value: string;
  id: string;
}

export default function renderTooltip(
  svg: d3.Selection<SVGGElement | null, unknown, null, undefined>,
  d: d3.HierarchyPointNode<InitialDataProps>,
) {
  const tooltipStyle = {
    width: 220,
    height: 40,
    borderRadius: 5,
    position: `translate(${d.x - 110},${d.y - 60})`,
  };

  const transparentRectPosition = "translate(85, 40)";

  const tooltipDataFormat = [
    {
      text: "Commit Hash: ",
      value: d.data.id.slice(0, 7),
      id: "text",
    },
    {
      text: "Commit Message: ",
      value: d.data.message,
      id: "value",
    },
  ];

  // hover 시 보이는 툴팁
  const tooltip = svg
    .select("#node")
    .append("g")
    .attr("id", "tooltip")
    .attr("tabindex", 0)
    .attr("transform", tooltipStyle.position);

  tooltip
    .append("rect")
    .attr("width", tooltipStyle.width)
    .attr("height", tooltipStyle.height)
    .attr("rx", tooltipStyle.borderRadius)
    .attr("ry", tooltipStyle.borderRadius)
    .attr("fill", color.$semantic.bgDefault)
    .attr("stroke", color.$scale.grey300);

  // 투명한 네모를 위에 위치시키기
  tooltip
    .append("rect")
    .attr("width", 30)
    .attr("height", 30)
    // 요기나
    .attr("fill", "transparent")
    // 요기 바꿔보심 돼여
    // .attr("stroke", color.$scale.grey300)
    .attr("transform", transparentRectPosition);

  tooltip
    .append("text")
    .attr("x", 0)
    .attr("y", 16.5)
    .selectAll("tspan")
    .data(tooltipDataFormat)
    .enter()
    .append("tspan")
    .attr("x", 6)
    .attr("dy", (_: TooltipProps, index: number) => index * 15) // Adjust the line height as needed
    .text((tooltipData: TooltipProps) => tooltipData.text)
    .attr("fill", color.$scale.grey600)
    .append("tspan")
    .attr("fill", color.$scale.grey700)
    .text((tooltipData: TooltipProps) => tooltipData.value)
    .attr("id", (tooltipData: TooltipProps) => tooltipData.id);
}
