<template>
	<div id="codeDocument-codeView">
		<div class="code" 
			v-if="codeString">
			<div class="code_line"
				v-for="(codeLineString, index) in codeString">
				<div class="line line_index"
					:style="{
						width: (codeStringLineDigit * 10 + 22) + 'px',
						'min-width': (codeStringLineDigit * 10 + 22) + 'px'
					}">{{index}}</div>
				<div class="line line_string">{{codeLineString}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			analyseResult: {
				type: Object
			},
		},
		data(){
			return {
				codeString: null,
				codeStringLineDigit: null,
			}
		},
		methods: {
			setCodeString(selectedFile){
				this.codeString = selectedFile.file.split('\n');

				let length = this.codeString.length;

				this.codeStringLineDigit = 0;
				do{
					length = (length - length % 10) / 10;
					this.codeStringLineDigit ++;
				}while( length > 0 )
			}
		},
		watch: {
			"analyseResult.selectedFile": function(newVal){
				if( newVal && newVal.file ){
					this.setCodeString(newVal);
					// console.log('this.codeStringLineDigit:', this.codeStringLineDigit);
				}else{
					this.codeString = this.codeStringLineDigit = null;
				}
			}
		},
		mounted(){
			if( this.analyseResult.selectedFile ){
				this.setCodeString(this.analyseResult.selectedFile);
			}
		}
	}
</script>

<style lang="less">
	#codeDocument-codeView{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: #232323;
		color: #d3d3d3;
    >.code_operation{
    	width: 100%;
    	height: 0.4rem;
    	min-height: 0.4rem;
    	background-color: #494949;
    }
    >.code{
			flex: 1;
			overflow: auto;
	    border-right: 0.02rem solid #000000;
			>.code_line{
				display: flex;
				width: 100%;
				cursor: pointer;
				transition: background-color .3s;
				&:hover{
					background-color: #616161;
				}
				>.line{
					padding: 0 0.1rem;
					min-height: 0.24rem;
					line-height: 0.24rem;
					font-size: 0.16rem;
				}
				>.line_index{
			    border-right: 0.02rem solid #000000;
					text-align: right;
					color: #b0b0b0;
			    font-family: 'Helvetica Neue';
				}
				>.line_string{
					flex: 1;
					white-space: pre-wrap;
				}
			}
			>.code_line[data-selected]{
				background-color: #616161;
			}
    }
	}
</style>