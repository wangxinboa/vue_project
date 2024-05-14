<template>
	<div class="details_attribute_bool">
		<div class="boolean_input"
			:data-selected="value"
			v-on:mousedown="setBool">
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			target: {
				type: Object,
			},
			keyName: {
				type: String,
			},
			value: {
				type: Boolean,
				default: false,
			},
			readonly: {
				type: Boolean,
				default: false,
			},
		},
		data(){
			return {
				bool: this.target[this.keyName]
			}
		},
		watch: {
			value(newVal){
				// console.log('watch value');
				// console.log('newVal:', newVal);
				this.bool = newVal;
			}
		},
		methods: {
			setBool(){
				if( this.readonly ){
					return;
				}
				this.target[this.keyName] = !this.target[this.keyName];
			}
		}
	}
</script>

<style lang="less">
	.details_attribute_bool{
		display: flex;
		align-items: center;
		height: 100%;
		>.boolean_input{
			position: relative;
			width: 0.14rem;
			height: 0.14rem;
			background-color: #373737;
			cursor: pointer;
			border: 0.01rem solid #2a2a2a;
			transition: box-shadow .3s, background-color .3s;;
			&:hover{
				box-shadow: 0 0 0.02rem 0.01rem rgba(255, 102, 0, .3);
				color: #ffffff;
			}
		}
		>.boolean_input:before{
			display: block;
			content: '';
			border: 0.02rem solid #20292b;
			border-left: 0;
			border-top: 0;
			height: 0.07rem;
			left: 0.04rem;
			position: absolute;
			top: 0.01rem;
			transform: rotate(45deg) scaleY(0);
			width: 0.03rem;
			transition: transform .15s ease-in .05s;
			transform-origin: center;
		}
		>.boolean_input[data-selected="true"]{
			background-color: #b1b8ba;
		}
		>.boolean_input[data-selected="true"]:before{
			transform: rotate(45deg) scaleY(1);
		}
	}
</style>