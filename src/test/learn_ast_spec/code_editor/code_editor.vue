<template>
	<div class="ace_editor" ref="aceContainer"></div>
</template>

<script>
	export default {
		data(){
			return {
				aceEditor: null,
				events: {
					capturecode: 'capturecode',
				},
			}
		},
		methods: {
			initAceEditor(){
				this.aceEditor = ace.edit(this.$refs.aceContainer, {
				  theme: "ace/theme/tomorrow_night_eighties",
				  mode: "ace/mode/javascript",
				  showPrintMargin: false,
				  wrap: true,
				});
				this.aceEditor.session.on('change', (delta)=>{
					this.$emit(this.events.capturecode, this.aceEditor.getValue());
				});
			},
			destroyAceEditor(){
		    this.aceEditor.destroy();
		    this.aceEditor.container.remove();
			},
		},
		mounted(){
			this.initAceEditor();
		},
		beforeDestroy(){
			this.destroyAceEditor();
		}
	}
</script>

<style lang="less">
	.ace_editor{
		width: 100%;
		height: 100%;
	}
</style>