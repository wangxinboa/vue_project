<template>
	<input class="details_attribute_number"
		type="text" name="number"
		autocomplete="off"
		:readonly="this.readonly"
		ref="input"
		v-on:input="handleInput"
		v-on:blur="handleBlurInput"
		v-on:keydown="handleKeyDownInput"
		v-on:mousedown="handleMouseDownInput"
		v-on:wheel="handleWheelInput"
		/>
</template>

<script>

	function _snap(number, step){
		const r = Math.round( number / step ) * step;
		return parseFloat( r.toPrecision( 15 ) );
	}

	function _clamp(min, max, number){
		if ( number < min ) {
			number = min;
		}
		if ( number > max ) {
			number = max;
		}
		return number;
	}

	function checkProps(defaultValue, min, max, step){

		if( typeof defaultValue !== 'number' || isNaN(defaultValue) ){
			console.warn('NumberInput 组件中 defaultValue 参数不是数字类型');
			return;
		}

		if( typeof min !== 'number' || isNaN(min) ){
			console.warn('NumberInput 组件中 min 参数不是数字类型');
			return;
		}

		if( typeof max !== 'number' || isNaN(max) ){
			console.warn('NumberInput 组件中 max 参数不是数字类型');
			return;
		}

		if( typeof step !== 'number' || isNaN(step) ){
			console.warn('NumberInput 组件中 step 参数不是数字类型');
			return;
		}

		if( min > max ){
			console.warn('NumberInput 组件中 min 大于 max');
			return;
		}
	}

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
			max: {
				type: Number,
				default: Infinity
			},
			min: {
				type: Number,
				default: -Infinity
			},
			step: {
				type: Number,
				default: 0.01,
			},
			value: {
				type: Number,
				default: -1,
			},
			readonly: {
				type: Boolean,
				default: false,
			}
		},
		watch: {
			value(newVal){

				this.setInputValue( newVal );
			}
		},
		data(){
			return {
				preScreenY: null,
			}
		},
		methods: {
			handleInput( e ){

				const value = parseFloat( e.target.value );

				if ( isNaN( value ) ){
					return;
				}

				this.setNumber( this.dealNumber(value) );
			},
			handleBlurInput( e ){

				this.setInputValue( this.target[this.keyName] );
			},
			handleKeyDownInput( e ){
				if( this.readonly ){
					return;
				}


				if( e.key === 'ArrowUp' || e.key === 'w' ){

					e.preventDefault();

					this.setNumber( this.dealNumber( this.target[this.keyName] + this.step ) );
				}else if( e.key === 'ArrowDown' ||  e.key === 's' ){

					e.preventDefault();

					this.setNumber( this.dealNumber( this.target[this.keyName] - this.step ) );
				}else if( e.key === 'Enter' ){

					e.target.blur();
					return false;
				}
			},
			handleMouseDownInput( e ){
				if( this.readonly ){
					return;
				}

				document.body.style.cursor = 'ns-resize';

				// document.body.requestPointerLock();

				this.preScreenY = e.screenY;

				document.addEventListener( 'mousemove', this.handleMouseMoveInput );
				document.addEventListener( 'mouseup', this.handleMouseUpInput );
			},
			handleMouseMoveInput(e){

				e.preventDefault();

				const
					// movementY = e.movementY       ||
					// 						e.mozMovementY    ||
					// 						e.webkitMovementY ||
					// 						0,
					// dy = movementY * this.step * (e.shiftKey ? 10 : 1),

					dy = ( e.screenY - this.preScreenY ) * this.step * (e.shiftKey ? 10 : 1),

					number = this.dealNumber( this.target[this.keyName] - dy );


				this.setNumber( number );

				this.preScreenY = e.screenY;
			},
			handleMouseUpInput(e){
				document.body.style.cursor = '';

				document.exitPointerLock();

				document.removeEventListener( 'mousemove', this.handleMouseMoveInput );
				document.removeEventListener( 'mouseup', this.handleMouseUpInput );
			},
			handleWheelInput( e ){
				if( this.readonly ){
					return;
				}

				if( this.$refs.input === this.$refs.input.ownerDocument.activeElement ){

					e.preventDefault();

					const wheel = e.wheelDelta > 0 ? -1 : 1;

					this.setNumber( this.dealNumber( this.target[this.keyName] + wheel * this.step ) );
				}
			},

			setNumber( number ){

				this.target[this.keyName] = number;
			},
			setInputValue( number ){

				this.$refs.input.value = number;
			},

			dealNumber(number){

				return _clamp( this.min, this.max, _snap( number, this.step ) );
			},
		},
		mounted(){
			this.setInputValue( this.value );
		},
		beforeDestroy(){

		}
	}
</script>

<style lane="less">
	.details_attribute_number{
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