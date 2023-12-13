import * as d3 from "d3";
import React, { RefObject, useEffect, useRef } from "react";

import color from "../../design-system/tokens/color";
import { QuizGitGraphCommit } from "../../types/quiz";

import fillColor from "./fillColor";
import { InitialDataProps, parsingMultipleParents } from "./parsing";
import renderTooltip from "./renderTooltip";

const { grey500 } = color.$scale;

const DURATION = 200;

type AddedLineType = {
  source: d3.HierarchyPointNode<InitialDataProps>;
  target: d3.HierarchyPointNode<InitialDataProps>;
};

function renderD3(svgRef: RefObject<SVGGElement>, data: InitialDataProps[]) {
  const { parsedData, additionalLinks } = parsingMultipleParents(data);
  const addedLine: AddedLineType[] = [];

  // Select the root of the tree and bind the data
  const svg = d3.select(svgRef.current);

  if (!parsedData.length) {
    svg.select("#link").selectAll("*").remove();
    svg.select("#node").selectAll("*").remove();
    return;
  }

  // Stratify the data
  const stratify = d3
    .stratify<InitialDataProps>()
    .parentId((d) => d.parentId)
    .id((d) => d.id);

  const rootNode = stratify(parsedData);

  // Create a tree layout
  const treeLayout = d3.tree<InitialDataProps>().size([280, 200]);

  // Apply the tree layout to the hierarchical data
  const treeData = treeLayout(rootNode);
  fillColor(treeData);

  additionalLinks.forEach(({ id, parentId }) => {
    const sourceNode = treeData.descendants().filter((d) => d.id === id)[0];
    const targetNode = treeData
      .descendants()
      .filter((d) => d.id === parentId)[0];

    addedLine.push({
      source: sourceNode,
      target: targetNode,
    });
  });

  // Draw edges (links) between nodes
  svg
    .select("#link")
    .selectAll("line")
    .data([...treeData.links(), ...addedLine])
    .join(
      (enter) => enter.append("line").style("opacity", 0),
      (update) => update,
      (exit) =>
        exit.transition().duration(DURATION).style("opacity", 0).remove(),
    )
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y)
    .attr("stroke", grey500)
    .attr("stroke-width", 1)
    .transition()
    .duration(DURATION)
    .style("opacity", 1);

  svg
    .select("#node")
    .selectAll("circle")
    .data(treeData.descendants())
    .join(
      (enter) => enter.append("circle").style("opacity", 0),
      (update) => update,
      (exit) =>
        exit.transition().duration(DURATION).style("opacity", 0).remove(),
    )
    .on("mouseover", (event, d) => {
      const existingTooltip = svg.select("#tooltip");
      if (existingTooltip.empty()) {
        renderTooltip(svg, d);
      }
    })
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 13)
    .attr("stroke", grey500)
    .attr("stroke-width", 1)
    .transition()
    .duration(DURATION)
    .style("opacity", 1)
    .style("cursor", "pointer")
    .attr(
      "fill",
      (d: d3.HierarchyPointNode<InitialDataProps>) => d.data?.color ?? "",
    );

  svg.select("#node").on("mouseout", (event) => {
    const hoverTooltip =
      event.relatedTarget.nodeName === "rect" ||
      event.relatedTarget.nodeName === "tspan";
    if (!hoverTooltip) {
      svg.select("#tooltip").remove();
    }
  });
}

interface GraphProps {
  data: QuizGitGraphCommit[];
  className?: string;
}

export function Graph({ data, className = "" }: GraphProps) {
  const gRef = useRef<SVGGElement>(null);

  useEffect(() => {
    renderD3(gRef, data);
  }, [data]);

  return (
    <div className={className}>
      <svg width="100%">
        <g ref={gRef} transform="translate(100,70)">
          <g id="link" />
          <g id="node" />
        </g>
      </svg>
    </div>
  ); // Replace with your actual JSX
}
