<template>
	<div class="paper_view-editor">
		<div class="editor_tooltip" :data-show="editable">
			<v-tooltip
				:editor="editing"
				:anotherEditor="anotherEditor"
				:allEditors="allEditors"/>
		</div>
		<div class="editors">
			<div class="editor_container"
				ref="originalEditorContainer"
				:data-selected="editing && editing === originalEditor"
				v-on:mousedown="setEditing(originalEditor, translationEditor)">
				<div class="editorDom" ref="originalEditor"></div>
			</div>
			<div class="editor_container"
				ref="translationEditorContainer"
				:data-selected="editing && editing === translationEditor"
				v-on:mousedown="setEditing(translationEditor, originalEditor)">
				<div class="editorDom" ref="translationEditor"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import Editor from '../../../tools/simple_editor/editor.js';
	import tooltip from './tooltip/tooltip.vue';
	export default {
		components: {
			'v-tooltip': tooltip,
		},
		data(){
			return {
				originalEditor: null,
				translationEditor: null,
				editing: null,
				anotherEditor: null,
				allEditors: null,
				cache: {

				}
			}
		},
		props: {
			paper: {
				type: String,
				default: ""
			},
			layoutType: {
				type: Number,
				default: 0
			},
			editable: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			paper(newVal, oldVal){
				// console.log("paper newVal:", newVal, "oldVal:", oldVal);
				this.originalEditor.empty();
				this.translationEditor.empty();
				if( newVal ){
					// if( this.cache[newVal] && !editable ){
					// 	this.originalEditor.render(this.cache[newVal].english);
					// 	this.translationEditor.render(this.cache[newVal].chinese);
					// }else{
						let path;
						if( process.env.NODE_ENV === 'development' ){
							path = "/papers"
						}else{
							path = "/vue_project/dist/papers"
						}
						// /vue_project/dist
						this.originalEditor.loadJson(`${path}/${newVal}/english.json`, (json)=>{
							// if( !this.cache[newVal] ){
							// 	this.cache[newVal] = {}
							// }
							// this.cache[newVal].english = json;
						});
						this.translationEditor.loadJson(`${path}/${newVal}/chinese.json`, (json)=>{
							// if( !this.cache[newVal] ){
							// 	this.cache[newVal] = {}
							// }
							// this.cache[newVal].chinese = json;
						});
					// }
				}else{
					this.originalEditor.empty();
					this.translationEditor.empty();
				}
			},
			layoutType(newVal){
				let originalEditorWidth, translationEditorWidth;
				switch(newVal){
					case 0:
						originalEditorWidth = "0%";
						translationEditorWidth = "0%";
						break;
					case 1:
						originalEditorWidth = "100%";
						translationEditorWidth = "0%";
						break;
					case 2:
						originalEditorWidth = "0%";
						translationEditorWidth = "100%";
						break;
					case 3:
						originalEditorWidth = "50%";
						translationEditorWidth = "50%";
						break;
					case 4:
						originalEditorWidth = "100%";
						translationEditorWidth = "0%";
						break;
					case 5:
						originalEditorWidth = "0%";
						translationEditorWidth = "100%";
						break;
					case 6:
						originalEditorWidth = "50%";
						translationEditorWidth = "50%";
						break;
				}
				this.$refs.originalEditorContainer.style.width = originalEditorWidth;
				this.$refs.translationEditorContainer.style.width = translationEditorWidth;
			},
			editable(newVal){
				this.originalEditor.setEditable(newVal);
				this.translationEditor.setEditable(newVal);
				if( !this.editor ){
					this.setEditing(this.translationEditor, this.originalEditor);
				}
			},
		},
		methods: {
			setEditing(editor, anotherEditor){
				this.editing = editor;
				this.anotherEditor = anotherEditor;
			}
		},
		mounted(){
			this.originalEditor = new Editor(this.$refs.originalEditor);
			this.translationEditor = new Editor(this.$refs.translationEditor);
			this.allEditors = [this.originalEditor, this.translationEditor];
		}
	}
</script>

<style lang="less">
	.paper_view-editor{
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		>.editor_tooltip{
			display: flex;
	    justify-content: center;
			width: 100%;
			height: 0;
			transition: height .3s;
			overflow: hidden;
		}
		>.editor_tooltip[data-show="true"]{
			height: 0.4rem;
			overflow: visible;
		}
		>.editors{
			display: flex;
			flex: 1;
			height: 0;
			width: 100%;
			>.editor_container{
				overflow-x: hidden;
				transition: width .3s;
				>.editorDom{
					position: relative;
					border-left: 0.02rem solid #000000;
					padding: 0 0.3rem 1rem;
					width: 100%;
					min-width: 3.5rem;
					height: 100%;
					font-size: 0.16rem;
					overflow-y: auto;
					outline: none;
					transition: width .3s;
				}
			}
		}
	}
</style>