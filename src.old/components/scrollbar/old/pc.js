import simpleAnimation from '../../utils/timer/animation/simple_animation.js';

export default {
	// pc端初始化
	pcInit(){
		document.addEventListener('mouseup', this.docMouseUp);

		this.parentNode.onwheel = this.parentWheel;

		this.scrollbarNode.addEventListener('mousedown', this.scrollbarMouseDown);
		this.scrollbarContainerNode.addEventListener('mousedown', this.scrollbarContainerMouseDown);
	},
	// pc端销毁
	pcDestroyed(){
		document.removeEventListener('mouseup', this.docMouseUp);

		this.parentNode.onwheel = null;

		this.scrollbarNode.removeEventListener('mousedown', this.scrollbarMouseDown);
		this.scrollbarContainerNode.removeEventListener('mousedown', this.scrollbarContainerMouseDown);
	},
	// 通过拖动滚动条开始滚动页面
	scrollbarMouseDown(e){
		e.stopPropagation();
		if( this.scrollbarContainerAnimation ){
			this.scrollbarContainerAnimation.cancelAnimation();
			this.scrollbarContainerAnimation = null;
		}
		if( this.startPageY === null ){
			document.addEventListener('mousemove', this.docMouseMove);
			this.startPageY = e.pageY;
			this.startScrollTop = this.parentNode.scrollTop;
		}
	},
	docMouseMove(e){
		let offset = e.pageY - this.startPageY;

		this.changeParentScrollTop(this.startScrollTop + offset * this.parentScrollTopMax / this.scrollbarMoveMax);

		if( Math.round(this.parentNode.scrollTop) >= this.parentScrollTopMax || this.parentNode.scrollTop <= 0 ){
			this.startPageY = e.pageY;
			this.startScrollTop = this.parentNode.scrollTop;
		}
	},
	docMouseUp(){
		if( this.startPageY !== null ){
			document.removeEventListener('mousemove', this.docMouseMove);
			this.startPageY = null;
			this.startScrollTop = null;
		}
	},
	// 点击滚动条父容器进行滚动
	scrollbarContainerMouseDown(e){
		e.stopPropagation();
		let 
				startScrollTop = this.parentNode.scrollTop,
				targetScrollTop = 
								e.offsetY < this.scrollbarHeight / 2 ? 0 :
								e.offsetY > ( this.scrollbarMoveMax + this.scrollbarHeight / 2 ) ? this.parentScrollTopMax :
								( e.offsetY - this.scrollbarHeight / 2 ) * this.parentScrollTopMax / this.scrollbarMoveMax,
				offsetScrollTop = targetScrollTop - startScrollTop;

		this.scrollbarContainerAnimation = simpleAnimation({
			duration: 100,
			onUpdate: (percentage)=>{
				this.changeParentScrollTop( startScrollTop + offsetScrollTop * percentage )
			},
			onComplete: (percentage)=>{
				this.scrollbarContainerAnimation = null;
			},
		});
	},
	// 拖动页面进行滚动页面(摆烂，能用就行)
	parentWheel(e){
		if( this.scrollbarContainerAnimation ){
			this.scrollbarContainerAnimation.cancelAnimation();
			this.scrollbarContainerAnimation = null;
		}
		let delta = e.deltaY * 0.8;
		this.changeParentScrollTop( this.parentNode.scrollTop + delta );

		if( (delta > 0 && Math.round(this.parentNode.scrollTop) >= this.parentScrollTopMax) ||
				(delta < 0 && this.parentNode.scrollTop === 0) ){
			return true;
		}else{
			e.stopPropagation();
			return false;
		}
	},
}