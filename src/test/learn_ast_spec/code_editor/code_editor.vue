<template>
	<div class="code_editor fill" ref="aceContainer"></div>
</template>

<script>
	export default {
		props: {
			defaultCode: {
				type: String,
				default: '',
			},
			isWrap: {
				type: Boolean,
				default: false,
			},
			readOnly: {
				type: Boolean,
				default: false,
			}
		},
		data(){
			return {
				events: {
					change: 'change',
				},
				aceEditor: null,
				range: new ace.Range(0,0,0,0),
			}
		},
		watch: {
			defaultCode(newVal, oldVal){
				this.aceEditor.setValue(newVal);
			}
		},
		methods: {
			initAceEditor(){
				this.aceEditor = ace.edit(this.$refs.aceContainer, {
				  theme: "ace/theme/tomorrow_night_eighties",
				  mode: "ace/mode/javascript",
				  showPrintMargin: false,
				  wrap: this.isWrap,			// 自动换行
				});
				this.aceEditor.setReadOnly(this.readOnly); // 是否只读
				this.aceEditor.session.on('change', (delta)=>{
					this.$emit(this.events.change, this.getValue());
				});
				if( this.defaultCode ){
					this.setValue(this.defaultCode);
				}
			},
			destroyAceEditor(){
		    this.aceEditor.destroy();
		    this.aceEditor.container.remove();
			},

			getValue(){
				return this.aceEditor.getValue();
			},
			setValue(value){
				this.aceEditor.setValue(value);
			},

			setRange(startRow, startColumn, endRow, endColumn){
				// console.log('this.range:', this.range);
				this.range.setStart(startRow, startColumn);
				this.range.setEnd(endRow, endColumn);
				this.aceEditor.selection.setRange(this.range);
			}
		},
		mounted(){
			this.initAceEditor();
		},
		beforeDestroy(){
			this.destroyAceEditor();
		}
	}
</script>