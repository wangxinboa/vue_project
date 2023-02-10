<template>
	<div id="paper">
		<div class="header">
			<div class="title">
				<div class="iconfont icon-paper"></div>
				<div class="text">论文解析</div>
				<div class="text" :v-if="selectedPaper" >{{selectedPaper}}</div>
			</div>
		</div>

		<div class="main">
			<div class="bar">
				<div
					:data-selected="paperListVisible"
					class="item-btn"
					title="论文列表"
					v-on:mousedown="setPaperListVisible()">列</div>

				<div
					:data-show="!!paperList[selectedPaperIndex]"
					class="item-btn editor_layout"
					title="视图布局"
					>
					视
					<div class="layout">
						<div v-for="(layout, index) in layoutTypes"	
							class="layout_button"
							:title="layout.title"
							:data-selected="layoutType === index"
							v-on:mousedown="setLayoutType(index)">{{layout.type}}</div>
					</div>
				</div>

				<div
					:data-selected="editable"
					:data-show="!!paperList[selectedPaperIndex] && paperList[selectedPaperIndex].allowChange"
					class="item-btn editable"
					title="编辑"
					v-on:mousedown="setEditable()">编</div>
			</div>

			<div class="items">

				<div v-if="!selectedPaper" class="noSelectedPaper">还未选择论文</div>

				<div class="item list" :data-show="paperListVisible"
					v-on:mousedown="setPaperListVisible(false)">
					<div v-for="(paper, index) in paperList"
						:data-selected="selectedPaperIndex === index"
						class="paper-name"
						v-on:mousedown.stop="setPaper(index)">
						<div class="name">{{paper.name}}</div>
					</div>
				</div>

				<div class="item pdf" ref="pdf">
					<v-viewPdf :paper="selectedPaper"/>
				</div>
				<div class="item editor" ref="editor">
					<v-viewEditor
						:layoutType="layoutType"
						:editable="editable"
						:paper="selectedPaper"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import paperList from './json/paper_list.json';
	import viewEditor from './view_editor/view_editor.vue';
	import viewPdf from './view_pdf/view_pdf.vue';

	export default {
		components: {
			'v-viewEditor': viewEditor,
			'v-viewPdf': viewPdf,
		},
		data(){
			return {
				paperList,
				paperListVisible: false,

				selectedPaperIndex: null,
				selectedPaper: null,

				layoutTypes: [
					{ type: "P", title: "只展示pdf" },
					{ type: "原", title: "只展示原始富文本" },
					{ type: "译", title: "只展示翻译富文本" },
					{ type: "富", title: "不展示pdf,只展示富文本" },
					{ type: "F", title: "不展示翻译富文本,只展示pdf和原始富文本" },
					{ type: "S", title: "不展示原始富文本,只展示pdf和翻译富文本" },
					{ type: "全", title: "全部都展示" },
				],
				layoutType: null,

				editable: false,

				needWatch: true,
			}
		},
		watch: {
			$route(){
				// console.log('watch $route:', this.needWatch);
				if( this.needWatch ){
					this.watchRoute();
				}else{
					this.needWatch = true;
				}
			}
		},
		methods: {
			setPaperListVisible(visible){
				// console.log("setListVisible visible:", visible, "\nthis.listVisible:", this.listVisible);
				if( typeof visible === "boolean" ){
					if( this.paperListVisible !== visible ){
						this.paperListVisible = visible;
					}
				}else{
					this.paperListVisible = !this.paperListVisible
				}
			},
			setPaper(paperIndex, changeRoute = true){
				// console.log("setPaper paperIndex:", paperIndex, "\nthis.selectedPaperIndex:", this.selectedPaperIndex);
				if( typeof paperIndex === "number" &&
						this.paperList[paperIndex] &&
						this.selectedPaperIndex !== paperIndex ){

					this.selectedPaperIndex = paperIndex;
					if( !paperList[paperIndex].allowChange && this.editable ){
						this.editable = false;
					}
					if( this.layoutType === null ){
						this.setLayoutType(5, false);
					}
					if( this.paperListVisible ){
						this.paperListVisible = false;
					}

					setTimeout(()=>{
						if( this.selectedPaperIndex === paperIndex ){
							this.selectedPaper = paperList[paperIndex].name;
						}
					}, 300);
				}else{
					if( this.editable ){
						this.editable = false;
					}
					this.selectedPaperIndex = this.selectedPaper = null;
				}
				if( changeRoute ){
					this.setRoute();
				}
			},
			setLayoutType(typeIndex, changeRoute = true){
				// console.log("setLayoutType typeIndex:", typeIndex, "\nthis.layoutType:", this.layoutType);
				if( typeof typeIndex === "number" && typeIndex !== this.layoutType ){
					this.layoutType = typeIndex;
					let pdfWidth, editorWidth;
					switch( typeIndex ){
						case 0:
							pdfWidth = '100%';
							editorWidth = "0";
							break;
						case 1:
							pdfWidth = '0';
							editorWidth = "100%";
							break;
						case 2:
							pdfWidth = '0';
							editorWidth = "100%";
							break;
						case 3:
							pdfWidth = '0';
							editorWidth = "100%";
							break;
						case 4:
							pdfWidth = '50%';
							editorWidth = "50%";
							break;
						case 5:
							pdfWidth = '50%';
							editorWidth = "50%";
							break;
						case 6:
							pdfWidth = '34%';
							editorWidth = "66%";
							break;
					}
					this.$refs.pdf.style.width = pdfWidth;
					this.$refs.editor.style.width = editorWidth;
					if( changeRoute ){
						this.setRoute();
					}
				}
			},
			setEditable(editable, changeRoute = true){
				// console.log("setEditable editable:", editable, "\nthis.editable:", this.editable);
				if( typeof editable === "boolean" ){
					if( editable !== this.editable ){
						this.editable = editable;
					}
				}else{
					this.editable = !this.editable;
				}
				if( changeRoute ){
					this.setRoute();
				}
			},
			setRoute(){
				this.needWatch = false;
				let query = {};
				if( this.paperList[this.selectedPaperIndex] ){
					query.paperId = this.selectedPaperIndex;
					query.layoutType = this.layoutType;
					if( this.editable ){
						query.editable = true;
					};
				}
				this.$router.push({ query });
			},
			watchRoute(){
				// console.log('watchRoute query:', this.$route.query);
				let { paperId, layoutType, editable } = this.$route.query,
						replaceQuery;
				// console.log('paperId:', paperId, 'layoutType:', layoutType, 'editable:', editable);
				if( paperId !== void 0 ){
					// console.log('paperId !== void 0')
					paperId = parseInt(paperId);
					// console.log('paperId:', paperId);
					if( paperId >= 0 && paperId <= paperList.length - 1 ){

						let needReplace = false,
								replaceQuery;

						layoutType = parseInt(layoutType);
						if( layoutType < 0 || layoutType > 6 ){
							layoutType = 5;
							needReplace = true;
							this.needWatch = false;
							replaceQuery = { paperId, layoutType }
						}

						if( editable === "true" ){
							// console.log(`${editable} === "true"`, editable === "true");
							// console.log(paperList);
							// console.log(`paperList[${paperId}]:`, paperList[paperId]);
							// console.log(`paperList[${paperId}].allowChange:`, paperList[paperId].allowChange);
							if( paperList[paperId].allowChange ){
								// console.log('论文允许修改:', paperList[paperId].allowChange);
								editable = true;
								if( needReplace ){
									replaceQuery.editable = editable;
								}
							}else{
								// console.log('论文不允许修改:', paperList[paperId].allowChange);
								editable = false;
								if( needReplace ){
									replaceQuery.editable = editable;
								}else{
									needReplace = true;
									this.needWatch = false;
									replaceQuery = { paperId, layoutType };
								}
							}
						}else{
							editable = false;
						}
						// console.log('验证过后的 paperId:', paperId, 'layoutType:', layoutType, 'editable:', editable);

						if( this.selectedPaperIndex !== paperId ){
							this.setPaper(paperId, false);
						}
						this.setLayoutType(layoutType, false);
						this.setEditable(editable, false);
						if( needReplace ){
							this.$router.replace({ query: replaceQuery });
						}

						// console.log("this.layoutType:", this.layoutType, "this.editable:", this.editable)
					}else{
						this.setPaper(null, false);
						this.$router.replace({ query: {} });
					}
				}
			}
		},
		mounted(){
			this.watchRoute();
		}
	}
</script>

<style lang="less">
	#paper{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		>.header{
			width: 100%;
			height: 0.5rem;
			background-color: #24292f;
			>.title{
				display: flex;
				padding-left: 0.1rem;
				height: 100%;
				>div{
					color: #ffffff;
					line-height: 0.5rem;
				}
				>.iconfont{
					font-size: 0.16rem;
				}
				>.text{
					padding-left: 0.08rem;
					font-size: 0.14rem;
				}
			}
		}

		>.main{
			display: flex;
			height: 0;
			flex: 1;
			>.bar{
				padding: 0.54rem 0 0 0;
				display: flex;
				flex-direction: column;
				width: 0.4rem;
				height: 100%;
				background-color: #333333;
				>.item-btn{
					width: 100%;
					height: 0.4rem;
					color: #ffffff;
					line-height: 0.4rem;
					font-size: 0.26rem;
					text-align: center;
					cursor: pointer;
					transition: background-color .3s;
					&:hover{
						background-color: #ff0000;
					}
				}
				>.item-btn[data-selected="true"]{
					background-color: #cc0000;
				}
				>.item-btn.editor_layout{
					position: relative;
					height: 0;
					overflow: hidden;
					transition: height .3s, background-color .3s;
					>.layout{
						position: absolute;
						left: 100%;
						top: -0.4rem;
						padding: 0.4rem 0.4rem 0.4rem 0;
						width: 0;
						height: 1.2rem;;
						display: flex;
						overflow: hidden;
						z-index: 3;
						transition: width .3s;
						pointer-events: none;
						>.layout_button{
							width: 0;
							height: 100%;
							overflow: hidden;
							opacity: 0;
							background-color: #333333;
							transition: width .3s, opacity .3s, background-color .3s;
							&:hover{
								background-color: #ff0000;
							}
						}
						>.layout_button[data-selected="true"]{
							background-color: #cc0000;
						}
					}
					&:hover{
						>.layout{
							width: 3.2rem;
							pointer-events: initial;
							>.layout_button{
								width: 0.4rem;
								opacity: 1;
							}
						}
					}
				}
				>.item-btn.editor_layout[data-show="true"]{
					overflow: visible;
					height: 0.4rem;
				}
				>.item-btn.editable{
					height: 0;
					overflow: hidden;
					transition: height .3s, background-color .3s;
				}
				>.item-btn.editable[data-show="true"]{
					height: 0;
					height: 0.4rem;
				}
			}
			>.items{
				position: relative;
				flex: 1;
				width: 0;
				display: flex;
				>.item{
					height: 100%;
					overflow: hidden;
				}
				>.list{
					position: absolute;
					left: 0;
					top: 0;
					width: 0;
					padding: 0.2rem 0;
					background-color: rgba(73, 73, 73, 0.86);
					transition: width .3s, padding .3s;
					z-index: 3;
					>.paper-name{
						display: flex;
						width: 100%;
				    height: 0.36rem;
				    line-height: 0.36rem;
				    font-size: 0.2rem;
				    color: #ffffff;
				    white-space: nowrap;
				    cursor: pointer;
						transition: background-color .3s;
						&:hover{
							background-color: #ff0000;
						}
						>.name{
							padding-left: 0.1rem;
							padding-right: 0.1rem;
						}
					}
					>.paper-name[data-selected="true"]{
						background-color: #cc0000;
					}
				}
				>.list[data-show="true"]{
					width: 100%;
					padding: 0.2rem 0.1rem;
				}
				>.noSelectedPaper{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
			    align-items: center;
			    font-size: 0.5rem;
			    letter-spacing: 0.1rem;
			    background-color: #ffffff;
			    z-index: 1;
				}
				>.pdf{
					width: 50%;
					transition: width .3s;
				}
				>.editor{
					width: 50%;
					transition: width .3s;
				}
			}
		}
	}
</style>