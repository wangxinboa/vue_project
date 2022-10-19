<template>
	<transition 
		name='message-fade'
		@after-leave='handleAfterLeave'>
		<div
			class='message' 
			:style='positionStyle'
			v-show='visible'
			v-on:mouseenter='clearTimer'
			v-on:mouseleave='startTimer'>
			message
		</div>
	</transition>
</template>

<script>
	export default {
		data(){
			return {
				visible: false,
				duration: 3000,
				timer: null,
				onClose: null,
				verticalOffset: 20
			}
		},
		computed: {
			positionStyle(){
				return {
					'top': `${ this.verticalOffset }px`
				}
			}
		},
		methods: {
			handleAfterLeave(){
				this.$destroy(true);
				this.$el.parentNode.removeChild( this.$el );
			},
			startTimer(){
				if ( this.duration > 0 ){
					this.timer = setTimeout(()=>{
						this.close();
					}, this.duration);
				}
			},
			clearTimer(){
				if( this.timer ){
					clearTimeout(this.timer);
					this.timer = null;
				}
			},
			close(){
				if ( typeof this.onClose === 'function' ){
					this.onClose();
				}
				this.visible = false;
			}
		},
		mounted(){
			document.body.appendChild( this.$el );
			this.visible = true;

			this.startTimer();
		}
	}
</script>

<style lang="less">
	.message{
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		transition: opacity 0.3s, transform 0.3s, top 0.4s;
	}
	.message-fade-enter,
	.message-fade-leave-active{
		opacity: 0;
		transform: translate(-50%, -100%);
	}
</style>