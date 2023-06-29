<template>
	<div
		class="component-drawer"
		:class="[
			modal ? 'modal' : null,
			visible ? null : 'hidden',
		]"
		v-on:click="onCloseDrawer">
		<div
			:class="['component-drawer-wrapper', direction]"
      :style="isHorizontal ? `width: ${size}` : `height: ${size}`"
			v-on:click.stop>
			<div
				class="component-drawer-body"
        :style="isHorizontal ? `width: ${size}` : `height: ${size}`">
				<div class="component-drawer-header">
					<div class="icon-btn-container">
						<div
							class="icon-btn small close icon-guanbi"
							v-on:click="onCloseDrawer"></div>
					</div>
					<div
						class="title"
						:title="title">{{title}}</div>
				</div>
				<div class="component-drawer-content">
					<slot></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// https://github.com/ElemeFE/element/blob/dev/packages/drawer/src/main.vue
	export const directions = {
		ltr: 'ltr',
		rtl: 'rtl',
		ttb: 'ttb',
		btt: 'btt',
	}

	export default {
		props: {
	    modal: {
	      type: Boolean,
	      default: true
	    },
			direction: {
				type: String,
				default: 'rtl',
				validator(val) {
					return !!directions[val];
				}
			},
			size: {
				type: String,
				default: '4rem',
			},
			title: {
				type: String,
				default: '输入标题',
			},
			visible: {
				type: Boolean,
				default: true,
			},
		},
		data(){
			return {
				event: {
					open: 'open',
					close: 'close',
				},
			}
		},
		computed: {
		  isHorizontal() {
		    return this.direction === directions.rtl || this.direction === directions.ltr;
		  },
		},
		methods: {
			onOpenDrawer(){
				this.$emit(this.event.open);
			},
			onCloseDrawer(){
				this.$emit(this.event.close);
			}
		},
		mounted() {
			if (this.visible) {
				document.body.appendChild(this.$el);
			}
		},
		destroyed() {
			if ( this.$el && this.$el.parentNode) {
				this.$el.parentNode.removeChild(this.$el);
			}
		}
	}
</script>

<style lang="less">
	.component-drawer{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 1000;
		pointer-events: none;
		overflow: hidden;
		transition: background-color .3s;
		>.ltr,
		>.rtl{
			top: 0;
			width: 4rem;
			max-width: 100%;
			height: 100%;
			transition: width .3s;
		}
		>.ltr{
			left: 0;
			border-rigth: 0.01rem solid #707070;
		}
		>.rtl{
			right: 0;
			border-left: 0.01rem solid #707070;
		}
		>.ttb,
		>.btt{
			left: 0;
			width: 100%;
			height: 4rem;
			max-height: 100%;
			transition: height .3s;
		}
		>.ttb{
			top: 0;
			border-bottom: 0.01rem solid #707070;
		}
		>.btt{
			bottom: 0;
			border-top: 0.01rem solid #707070;
		}
		>.component-drawer-wrapper{
			position: absolute;
			background-color: #f0f0f0;
			pointer-events: auto;
			>.component-drawer-body{
				display: flex;
		    flex-direction: column;
				width: 100%;
				height: 100%;
				>.component-drawer-header{
			    display: flex;
					padding: 0.1rem 0.2rem;
					line-height: 0.3rem;
					background-color: #24292f;
					color: #ffffff;
			    >.title{
			    	padding: 0 0 0 0.2rem;
						font-size: 0.16rem;
						font-weight: 500;
			    }
				}
				>.component-drawer-content{
					width: 100%;
					height: 0;
					flex: 1;
					background-color: #191919;
				}
			}
		}
	}
	.component-drawer.modal{
		background-color: rgba(0,0,0,0.4);
		pointer-events: auto;
	}
	.component-drawer.hidden{
		background-color: rgba(0,0,0,0);
		pointer-events: none;
		>.ltr,
		>.rtl{
			width: 0 !important;
		}
		>.ttb,
		>.btt{
			height: 0 !important;
		}
	}
</style>