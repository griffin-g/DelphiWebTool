import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

export const TextWordCloud = ({ responses, minFontSize = 10, maxFontSize = 60 }) => {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      const container = svgRef.current?.parentElement;
      if (container) {
        const width = Math.max(300, container.clientWidth);
        const height = Math.min(500, Math.max(300, width * 0.7));
        setDimensions({ width, height });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      console.warn("No responses provided for word cloud");
      return;
    }

    const { width, height } = dimensions;
    const processWords = (texts) => {
      const combinedText = texts.join(" ").toLowerCase();
      
      // Stop words - not included in cloud
      const stopWords = new Set([
        "a", "and", "the", "be", "of", "can", "because", "should", "would", "could", "might", "have",
        "then", "we", "us", "you", "they", "were", "was", "have"
      ]);
      
      const words = combinedText
        .replace(/[^\w\s]/g, "") // Remove punctuation
        .split(/\s+/)
        .filter(word => 
          word.length > 2 && 
          !stopWords.has(word) && 
          /^[a-z]+$/.test(word)
        );

      const wordFreq = words.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {});
      
      // top 50 words
      // can be adjusted as necessary
      return Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 50)
        .map(([text, value]) => ({ text, value }));
    };

    const wordList = processWords(responses);

    if (!wordList.length) {
      console.warn("No words to display in the word cloud");
      return;
    }

    d3.select(svgRef.current).selectAll("*").remove();

    const fontSizeScale = d3.scaleLog()
      .domain([
        d3.min(wordList, d => d.value), 
        d3.max(wordList, d => d.value)
      ])
      .range([minFontSize, maxFontSize]);

    const colorScale = d3.scaleSequential(d3.interpolateRainbow)
      .domain([0, wordList.length]);

    const layout = cloud()
      .size([width, height])
      .words(wordList)
      .padding(3)
      .rotate(() => ~~(Math.random() * 2) * 90)
      .font("Arial")
      .fontSize(d => fontSizeScale(d.value))
      .spiral("archimedean")
      .on("end", draw);

    layout.start();

    function draw(words) {
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const tooltip = d3.select("body")
        .append("div")
        .attr("class", "word-cloud-tooltip")
        .style("position", "absolute")
        .style("padding", "8px")
        .style("background", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("border-radius", "4px")
        .style("font-size", "12px")
        .style("pointer-events", "none")
        .style("opacity", 0)
        .style("z-index", 1000);

      svg
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", d => `${d.size}px`)
        .style("font-family", "Arial")
        .style("font-weight", "bold")
        .style("fill", (d, i) => colorScale(i))
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`)
        .text(d => d.text)
        .style("cursor", "pointer")
        .on("mouseover", function(event, d) {
          d3.select(this).style("opacity", 0.7);
          tooltip.transition()
            .duration(200)
            .style("opacity", 0.9);
          tooltip.html(`${d.text}: ${d.value} occurrences`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
          d3.select(this).style("opacity", 1);
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        });
    }
    
    return () => {
      d3.select("body").selectAll(".word-cloud-tooltip").remove();
    };
  }, [responses, dimensions, minFontSize, maxFontSize]);

  return (
    <div style={{ 
      width: "100%", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      overflow: "hidden"
    }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default TextWordCloud;