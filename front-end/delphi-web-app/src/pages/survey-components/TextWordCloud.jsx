import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

export const TextWordCloud = ({ responses }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      console.warn("No responses provided for word cloud");
      return;
    }

    const width = 600; // SVG width
    const height = 400; // SVG height

    // Process words and calculate frequencies
    const processWords = (texts) => {
      const combinedText = texts.join(" ").toLowerCase();
      const stopWords = new Set(["the", "be", "to", "of", "and", "a", "in"]);
      
      const words = combinedText
        .replace(/[^\w\s]/g, "") // Remove punctuation
        .split(/\s+/)
        .filter(
          (word) => word.length > 2 && !stopWords.has(word) && /^[a-z]+$/.test(word)
        );

      const wordFreq = words.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(wordFreq).map(([text, value]) => ({ text, value }));
    };

    const wordList = processWords(responses);

    if (!wordList.length) {
      console.warn("No words to display in the word cloud");
      return;
    }

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const layout = cloud()
      .size([width, height])
      .words(wordList)
      .padding(5)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .font("Arial")
      .fontSize((d) => Math.sqrt(d.value) * 10)
      .on("end", draw);

    layout.start();

    function draw(words) {
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`); // Centering

      svg
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style("fill", () => `hsl(${Math.random() * 360}, 80%, 50%)`)
        .attr("text-anchor", "middle") // Center words
        .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
        .text((d) => d.text);
    }
  }, [responses]);

  return (
    <div style={{ 
      width: "100%", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <svg ref={svgRef} />
    </div>
  );
};


export default TextWordCloud;
