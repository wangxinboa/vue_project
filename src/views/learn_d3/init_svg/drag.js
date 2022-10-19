
import * as d3Selection from '../d3_package/d3-selection/index.js';
import * as d3Drag from '../d3_package/d3-drag/index.js';

export default {
	startX: null,
	startY: null,
	width: null,
	height: null,

	proportion: 0.004,
	svg: null,
	svgWidth: null,
	svgHeight: null,

	init(container){
		this.dragstarted = this.dragstarted.bind(this);
		this.dragged = this.dragged.bind(this);
		this.dragended = this.dragended.bind(this);
		this.wieel = this.wieel.bind(this);

		this.svgWidth = this.width = container.clientWidth;
		this.svgHeight = this.height = container.clientHeight;

		let svg =d3Selection
				.select(container).append('svg')
		      .attr("width", this.width)
		      .attr("height", this.height)
		      .attr("viewBox", [0, 0, this.width, this.height])
					.call( d3Drag.drag()
							.on('start', this.dragstarted)
							.on('drag', this.dragged)
							.on('end', this.dragended) )
							.on('wheel', this.wieel);

		this.svg = svg._groups[0][0];

		return this.svg;
	},
	dragstarted(e){
		let viewBox = this.svg.getAttribute('viewBox').split(',');
		this.startX = parseInt(viewBox[0]);
		this.startY = parseInt(viewBox[1]);

	},
	dragged(e){
		this.startX -= e.dx / this.svgWidth * this.width;
		this.startY -= e.dy / this.svgHeight * this.height;

		this.svg.setAttribute('viewBox', [this.startX, this.startY, this.width, this.height])
	},
	dragended(){
		
	},
	wieel(e){
		let 
			x = e.x,
			y = e.y,
			scale = 1 + this.proportion * e.deltaY;

		this.startX += x / this.svgWidth * this.width * (1 - scale);
		this.startY += y / this.svgHeight * this.height * (1 - scale);

		this.width *= scale;
		this.height *= scale;

		this.svg.setAttribute('viewBox', [this.startX, this.startY, this.width, this.height]);
	},
	destroy(){

	}
}