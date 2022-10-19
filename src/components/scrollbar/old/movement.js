export default {
	initScrollbar(){
		// init scrollbar's and scroll container's height
		this.parentNode.style.overflow = 'hidden';
		this.parentNode.style.position = 'relative';

		this.rate = this.parentClientHeight / this.parentScrollHeight;

		this.scrollbarHeight = this.rate * this.$el.clientHeight;
		this.$refs.scrollbar.style.height = this.scrollbarHeight + 'px';

		this.parentScrollTopMax = this.parentScrollHeight - this.parentClientHeight;
		this.scrollbarMoveMax = this.$el.clientHeight - this.scrollbarHeight;
	},
	changeParentScrollTop(scrollTop){
		this.parentNode.scrollTop = scrollTop;
		this.$el.style.transform = 'translateY(' + this.parentNode.scrollTop + 'px)';
		this.$refs.scrollbar.style.top = (this.parentNode.scrollTop * this.scrollbarMoveMax / this.parentScrollTopMax ) + 'px'
	},
}