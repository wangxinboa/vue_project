<template>
	<div class="code_editor fill" ref="aceContainer"></div>
</template>

<script>
	export default {
		data(){
			return {
				aceEditor: null,
				events: {
					onchange: 'onchange',
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
					this.$emit(this.events.onchange, this.aceEditor.getValue());
				});
			},
			destroyAceEditor(){
		    this.aceEditor.destroy();
		    this.aceEditor.container.remove();
			},
		},
		mounted(){
			this.initAceEditor();
			this.aceEditor.setValue(`let a = aa;`);
		},
		beforeDestroy(){
			this.destroyAceEditor();
		}
	}
</script>

<style lang="less">
	.code_editor{
		
	}
</style>