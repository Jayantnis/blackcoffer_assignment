import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const IndexChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define chart dimensions
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([innerHeight, 0]);

    // Draw bars
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.category))
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => innerHeight - yScale(d.value))
      .attr('fill', 'steelblue');

    // Add axes
    const xAxis = d3.axisBottom(xScale);
    svg.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.append('g')
      .call(yAxis);

  }, [data]);

  return (
    <svg ref={svgRef} width={600} height={400}>
      {/* SVG content will be drawn here */}
    </svg>
  );
};

export default IndexChart;
