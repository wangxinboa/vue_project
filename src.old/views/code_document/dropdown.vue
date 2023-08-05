<template>
	<div class="component-dropdown"
		tabindex="0"
		v-on:mousedown.stop="downSelfHide ? hideDropdown : null">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				parentNode: null,
				blurNeedHide: false,
				visible: false,
				height: null,
			}
		},
		props: {
			downSelfHide: {
				type: Boolean,
				default: true
			},
			trigger: {
				type: Boolean,
				default: true,
			}
		},
		watcher: {
			trigger(){
				this.hideDropdown();
			}
		},
		mounted(){
			// console.log('mounted 初始化');
			this.parentNode = this.$el.parentNode;
			this.height = this.$el.clientHeight;
			this.$el.style.height = 0;

			setTimeout(()=>{
				this.$el.style.transition = 'height .3s';
			}, 0)

      this.$el.onblur = this.onblur;
			this.$el.parentNode.addEventListener('mousedown', this.showBtnDown);
		},
		beforeDestroy(){
			// console.log('beforeDestroy 移除:', this.$el);

      this.$el.onblur = null;
			if( this.parentNode ){
				this.parentNode.removeEventListener('mousedown', this.showBtnDown);
			}else{
				console.error('移除时 parentNode 不存在');
			}
		},
		methods: {
			showBtnDown(){
				// console.log('showDtnDown');
				if( this.visible ){
					this.hideDropdown();
				}else{
					this.showDropdown();
				}
			},
			showDropdown(){
				// console.log('showDropdown');
				this.$el.style.height = `${this.height}px`;
				this.blurNeedHide = false;	// 因为 mousedown 之后一定会触发 onblur
				this.$el.focus();
				this.visible = true;
			},
			hideDropdown(){
				// console.log('hideDropdown');
				this.$el.style.height = 0;
				this.visible = false;
			},
			onblur(){
				// console.log('onblur:', this.blurNeedHide);
				if( this.blurNeedHide ){
					this.hideDropdown();
				}else{
					this.$el.focus();
					this.blurNeedHide = true;
				}
			}
		}
	}
</script>

<style lang="less">
	.component-dropdown{
		overflow: hidden;
	}
</style>
