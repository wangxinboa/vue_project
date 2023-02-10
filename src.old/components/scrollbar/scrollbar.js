export default class Scrollbar{
	constructor(container){
		this.container.style.overflow = 'hidden';
		this.container.style.position = 'relative';

		let conWidth = container.clientWidth,
				conHeight = container.clientHeight,
				conScrollWidth = container.scrollWidth,
				conScrollHeight = container.scrollHeight;

		this.conMoveMaxX = conScrollWidth - conWidth;
		this.conMoveMaxY = conScrollHeight - conHeight;

		this.scrollbarXWidth = conWidth / conScrollWidth * conWidth;
		this.scrollbarYHeight = conHeight / conScrollHeight * conHeight;

		this.scrollbarXMoveMax = conWidth - this.scrollbarXWidth;
		this.scrollbarYMoveMax = conHeight - this.scrollbarYHeight;
	}
	// 拖动页面，获得滚动条对应移动的位置
	getScrollbarLocationX( containerLocation ){
		return containerLocation / this.conMoveMaxX * this.scrollbarXMoveMax;
	}
	getScrollbarLocationY( containerLocation ){
		return containerLocation / this.conMoveMaxY * this.scrollbarYMoveMax;
	}
	// 拖动滚动条，获得容器滚动的距离
	getContainerMovedX( scrollbarMoved ){
		return scrollbarMoved / this.scrollbarXMoveMax * this.scrollbarXWidth;
	}
	getContainerMovedY( scrollbarMoved ){
		return scrollbarMoved / this.scrollbarYMoveMax * this.scrollbarYHeight;
	}
	// 点击滚动条,获得容器应该滚动到的位置
	getContainerLocationX( scrollbarDown, direction = 'y' ){
		let
			scrollLength = this.scrollbarXWidth,
			scrollbarMoveMax = this.scrollbarXMoveMax,
			conMoveMax = this.conMoveMaxX,
		conScrollTarget = scrollbarDown < scrollLength / 2 ? 0 :
										scrollbarDown > scrollLength / 2 + scrollbarMoveMax ? conMoveMax :
									( scrollbarDown - scrollLength / 2 ) * conMoveMax / scrollbarMoveMax;
		return conScrollTarget;
	}
	getContainerLocationY( scrollbarDown ){
		let
			scrollLength = this.scrollbarYHeight,
			scrollbarMoveMax = this.scrollbarYMoveMax,
			conMoveMax = this.conMoveMaxY,
			conScrollTarget = scrollbarDown < scrollLength / 2 ? 0 :
									scrollbarDown > scrollLength / 2 + scrollbarMoveMax ? conMoveMax :
									( scrollbarDown - scrollLength / 2 ) * conMoveMax / scrollbarMoveMax;
		return conScrollTarget;
	}
}