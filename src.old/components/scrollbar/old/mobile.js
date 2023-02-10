import simpleAnimation from '../../utils/timer/animation/simple_animation.js';

export default {
	mobileInit(){
		this.parentNode.addEventListener('touchstart', this.parentTouchStart);
		this.parentNode.addEventListener('touchend', this.parentTouchend);
		document.addEventListener('touchend', this.docTouchend);

		this.scrollbarNode.addEventListener('touchstart', this.scrollbarTouchstart);
		this.scrollbarContainerNode.addEventListener('touchstart', this.scrollbarContainerTouchstart);
	},
	mobileDestroyed(){
		this.parentNode.removeEventListener('touchstart', this.parentTouchStart);
		this.parentNode.removeEventListener('touchend', this.parentTouchend);
		document.removeEventListener('touchend', this.docTouchend);

		this.scrollbarNode.removeEventListener('touchstart', this.scrollbarTouchstart);
		this.scrollbarContainerNode.removeEventListener('touchstart', this.scrollbarContainerTouchstart);
	},
	// 通过拖动滚动条开始滚动页面
	scrollbarTouchstart(e){
		e.stopPropagation();

		this.startPageY = e.targetTouches[0].pageY;
		this.startScrollTop = this.parentNode.scrollTop;

		document.addEventListener('touchmove', this.docTouchmove, { passive: false });
	},
	docTouchmove(e){
		let offset = e.targetTouches[0].pageY - this.startPageY;
		this.changeParentScrollTop(this.startScrollTop + offset * this.parentScrollTopMax / this.scrollbarMoveMax);

		if( Math.round(this.parentNode.scrollTop) >= this.parentScrollTopMax || this.parentNode.scrollTop <= 0 ){
			this.startPageY = e.targetTouches[0].pageY;
			this.startScrollTop = this.parentNode.scrollTop;
		}
		e.preventDefault();
	},
	docTouchend(e){
		if( this.startPageY !== null ){
			document.removeEventListener('touchmove', this.docTouchmove, { passive: false });
			this.startPageY = null;
			this.startScrollTop = null;
		}
	},
	// 点击滚动条父容器进行滚动
	scrollbarContainerTouchstart(e){
		e.stopPropagation();

		let 
				offsetY = e.targetTouches[0].clientY - this.scrollbarContainerNode.getBoundingClientRect().top,
				startScrollTop = this.parentNode.scrollTop,
				targetScrollTop = 
								offsetY < this.scrollbarHeight / 2 ? 0 :
								offsetY > ( this.scrollbarMoveMax + this.scrollbarHeight / 2 ) ? this.parentScrollTopMax :
								( offsetY - this.scrollbarHeight / 2 ) * this.parentScrollTopMax / this.scrollbarMoveMax,
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
	// 在在父容器上进行拖拽滚动
	parentTouchStart(e){
		if( this.startTouchPageY === null ){
			this.startTouchPageY = e.targetTouches[0].pageY;
			this.startTouchScrollTop = this.parentNode.scrollTop;
			this.parentNode.addEventListener('touchmove', this.parentTouchmove, { passive: false });
		}
	},
	parentTouchmove(e){
		let offset = e.targetTouches[0].pageY - this.startTouchPageY;
		this.changeParentScrollTop(this.startTouchScrollTop - offset * this.parentScrollTopMax / this.scrollbarMoveMax);

		e.stopPropagation();
		if( Math.round(this.parentNode.scrollTop) >= this.parentScrollTopMax || this.parentNode.scrollTop <= 0 ){
			this.startTouchPageY = e.targetTouches[0].pageY;
			this.startTouchScrollTop = this.parentNode.scrollTop;
		}

		if( (offset < 0 && Math.round(this.parentNode.scrollTop) >= this.parentScrollTopMax) ||
				(offset > 0 && this.parentNode.scrollTop === 0) ){
			return true;
		}else{
			if( e.cancelable ){
				e.preventDefault();
			}
		}
	},
	parentTouchend(e){
		if( this.startTouchPageY!== null ){
			this.startTouchPageY = null;
			this.startTouchScrollTop = null;
			this.parentNode.removeEventListener('touchmove', this.parentTouchmove, { passive: false });
		}
	}
}