import * as d3Selection from '../d3_package/d3-selection/index.js';
import * as d3Hierarchy from '../d3_package/d3-hierarchy/index.js';
import * as d3Shape from '../d3_package/d3-shape/index.js';

export default function Tree(svg, data){

	const
		label = (d)=>{ return d.name },
		title = (d, n) => `${n.ancestors().reverse().map(d => d.data.name).join(".")}`, // hover text
		width = svg.getAttribute('width'),
		height = svg.getAttribute('height'),

		padding = 1,
		r = 3,
		fill = "#999",

	  stroke = "#555", // stroke for links
	  strokeWidth = 1.5, // stroke width for links
	  strokeOpacity = 0.4, // stroke opacity for links

	  halo = "#fff",
	  haloWidth = 3,

		root = d3Hierarchy.hierarchy(data);// Compute labels and titles.

	// Compute labels and titles.
	const
		descendants = root.descendants(),
		L = descendants.map(d => label(d.data, d));

  // Compute the layout.
  const
  	dx = 20,
    dy = width / (root.height + padding);

  // console.log('dx:', dx, 'dy:', dy);
  d3Hierarchy.tree().nodeSize([dx, dy])(root);

  const svgSelector = d3Selection.select(svg);

  svgSelector.append("g")
      .attr("fill", "none")
      .attr("stroke", stroke)
      .attr("stroke-opacity", strokeOpacity)
      // .attr("stroke-linecap", strokeLinecap)
      // .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-width", strokeWidth)
    .selectAll("path")
      .data(root.links())
      .join("path")
        .attr("d", d3Shape.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));

	const node = svgSelector.append("g")
	    .selectAll("a")
	    .data(root.descendants())
	    .join("a")
	      // .attr("xlink:href", link == null ? null : d => link(d.data, d))
	      // .attr("target", link == null ? null : linkTarget)
	      .attr("transform", d => `translate(${d.y},${d.x})`);

  node.append("circle")
      .attr("fill", d => d.children ? stroke : fill)
      .attr("r", r);

  if (title != null) {
  	node.append("title")
      .text(d => title(d.data, d));
  }

  if (L) {
  	node.append("text")
      .attr("dy", "0.32em")
      .attr("x", d => d.children ? -6 : 6)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .attr("paint-order", "stroke")
      .attr("stroke", halo)
      .attr("stroke-width", haloWidth)
      .text((d, i) => L[i]);
  }
}