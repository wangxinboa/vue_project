<template>
	<input type="text" name="text"
		ref="input"
		v-on:keydown="handleKeydownInput">
</template>

<script>
	export default {
		methods: {
			handleKeydownInput( e ){

				if( e.keyCode === 13 ){// Enter
					this.$emit('confirm');
					this.$refs.input.blur();
				}
			}
		}
	}
</script>