<template>
	<input class="details_attribute_text"
		type="text" name="text"
		autocomplete="off"
		:readonly="this.readonly"
		ref="input"
		v-on:input="handleInput"
		v-on:blur="handleBlurInput"
		v-on:keydown="handleKeyDownInput"
		/>
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
				type: String,
				default: '',
			},
			readonly: {
				type: Boolean,
				default: false,
			},
		},
		watch: {
			value(newVal){

				this.setInputValue( newVal );
			}
		},
		methods: {
			handleInput( e ){

				this.setValue( e.target.value );
			},
			handleBlurInput( e ){

				this.setInputValue( this.target[this.keyName] );
			},
			handleKeyDownInput( e ){
				if( this.readonly ){
					return;
				}
				if( e.key === 'Enter' ){

					e.target.blur();
					return false;
				}
			},

			setValue( value ){

				this.target[this.keyName] = value;
			},
			setInputValue( value ){

				this.$refs.input.value = value;
			},
		},
		mounted(){
			this.$refs.input.value = this.value;
		},

	}
</script>

<style lang="less">
	.details_attribute_text{
		width: 100%;
		height: 0.24rem;
		padding: 0 0.06rem 0 0.06rem;
		line-height: 0.24rem;
		background-color: #373737;
		border: 0.01rem solid #2a2a2a;
		border-radius: 0.02rem;
		font-size: 0.12rem;
		color: #cccccc;
		transition: box-shadow .3s, color .3s;
		&:hover{
			box-shadow: 0 0 0.02rem 0.01rem rgba(255, 102, 0, .3);
			color: #ffffff;
		}
		&:focus{
			box-shadow: 0 0 0.02rem 0.01rem rgba(255, 102, 0, .3);
		}
	}
</style>