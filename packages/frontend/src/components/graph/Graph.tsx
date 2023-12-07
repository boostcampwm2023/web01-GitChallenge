import * as d3 from "d3";
import React, { RefObject, useEffect, useRef, useState } from "react";

import color from "../../design-system/tokens/color";

import { deletedData, initialData, newMockData } from "./data";
import fillColor from "./fillColor";
import { InitialDataProps, parsingMultipleParents } from "./parsing";

const { grey500 } = color.$scale;

type AddedLineType = {
  source: d3.HierarchyPointNode<InitialDataProps>;
  target: d3.HierarchyPointNode<InitialDataProps>;
};

function renderD3(svgRef: RefObject<SVGGElement>, data: InitialDataProps[]) {
  const { parsedData, additionalLinks } = parsingMultipleParents(data);
  const addedLine: AddedLineType[] = [];

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

  // Select the root of the tree and bind the data
  const svg = d3.select(svgRef.current);

  // Add text next to each node
  svg
    .selectAll("text")
    .data(treeData.descendants())
    .join(
      (enter) => enter.append("text").style("opacity", 0),
      (update) => update,
      (exit) => exit.transition().duration(1000).style("opacity", 0).remove(),
    )
    .text((d) => d.data.message)
    .attr("x", (d) => d.x + 20)
    .attr("y", (d) => d.y + 5)
    .transition()
    .duration(1000)
    .style("opacity", 1);

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
    .selectAll("line")
    .data([...treeData.links(), ...addedLine])
    .join(
      (enter) => enter.append("line").style("opacity", 0),
      (update) => update,
      (exit) => exit.transition().duration(1000).style("opacity", 0).remove(),
    )
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y)
    .attr("stroke", grey500)
    .attr("stroke-width", 1)
    .transition()
    .duration(1000)
    .style("opacity", 1);

  svg
    .selectAll("circle")
    .data(treeData.descendants())
    .join(
      (enter) => enter.append("circle").style("opacity", 0),
      (update) => update,
      (exit) => exit.transition().duration(1000).style("opacity", 0).remove(),
    )
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 13)
    .attr("stroke", grey500)
    .attr("stroke-width", 1)
    .transition()
    .duration(1000)
    .style("opacity", 1)
    .attr(
      "fill",
      (d: d3.HierarchyPointNode<InitialDataProps>) => d.data?.color ?? "",
    );
}

interface GraphProps {
  className?: string;
}

export function Graph({ className }: GraphProps) {
  const [data, setData] = useState(initialData);
  const gRef = useRef<SVGGElement>(null);

  useEffect(() => {
    renderD3(gRef, data);
  }, [data]);

  const handleNewData = () => {
    setData(newMockData);
  };

  const handleDelete = () => {
    setData(deletedData);
  };

  return (
    <div className={className}>
      <svg width="100%">
        <g ref={gRef} transform="translate(100,70)" />
      </svg>
      <button type="button" onClick={handleNewData}>
        click
      </button>
      <button type="button" onClick={handleDelete}>
        delete
      </button>
    </div>
  ); // Replace with your actual JSX
}
