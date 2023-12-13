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

  const transparentRectPosition = "translate(95, 40)";

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
    // 요기 바꿔보심 돼여
    .attr("fill", "transparent")
    .style("cursor", "pointer")
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
    .attr("id", (tooltipData: TooltipProps) => tooltipData.id)
    .each(() => {
      const currentValueNode: d3.Selection<
        SVGTSpanElement | null,
        unknown,
        HTMLElement,
        undefined
      > = d3.select("#value");

      if (!currentValueNode.empty() && currentValueNode.node()) {
        const tspanMaxWidth = 110;
        const originalText = currentValueNode.text();
        if (currentValueNode.node()!.getComputedTextLength() < tspanMaxWidth) {
          return;
        }

        let start = 0;
        let end = tspanMaxWidth;
        let mid;
        while (start < end) {
          mid = Math.floor((start + end) / 2);
          const truncatedText = `${originalText.slice(0, mid)}...`;
          currentValueNode.text(truncatedText); // Set text here for width calculation
          const textWidth =
            currentValueNode?.node()?.getComputedTextLength() || 0;
          if (textWidth > tspanMaxWidth) {
            end = mid;
          } else {
            start = mid + 1;
          }
        }
        const truncatedText = `${originalText.slice(0, start - 1)}...`;
        currentValueNode.text(truncatedText);
      }
    });
}
