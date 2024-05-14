<template>
	<div class="details_attribute_color">
		<input class="color_input" type="color" name="color"
			ref="input"
			v-on:input="handleInput">
	</div>
</template>

<script>
	export default {
		props: {
			target: {
				type: Object,
				default: null,
			},
			keyName: {
				type: String,
				default: '',
			},
			value: {
				type: Object,
				default(){
					return {
						r: 1,
						g: 1,
						b: 1
					}
				},
			},
			readonly: {
				type: Boolean,
				default: false,
			},
		},
		watch: {
			value( newVal ){

				this.setInputValue( newVal );
			}
		},
		methods: {
			handleInput( e ){
				const color = e.target.value;

				this.setColor(
					parseInt(color.substr(1,2), 16) / 255,
					parseInt(color.substr(3,2), 16) / 255,
					parseInt(color.substr(5,2), 16) / 255,
				);
			},
			setColor( r, g, b ){
				if( this.readonly ){
					return;
				}
				const nowVal = this.target[this.keyName];

				nowVal.r = r;
				nowVal.g = g;
				nowVal.b = b;
			},
			setInputColor( color ){

				const int = ( color.r * 255 ) << 16 ^
					( color.g * 255 ) << 8 ^
					( color.b * 255 ) << 0;

				this.$refs.input.value = '#' + int.toString( 16 ).padStart( 6, 0 );
			}
		},
		mounted(){
			this.setInputColor( this.value );
		},
	}
</script>

<style lang="less">
	.details_attribute_color{
		padding: 0.02rem 0 0.02rem 0;
		width: 100%;
		height: 0.24rem;
		>.color_input{
			width: 0.46rem;
			height: 100%;
			// cursor: pointer;
		}
		>.color_input::-webkit-color-swatch-wrapper{
			padding: 0;
		}
	}
</style>