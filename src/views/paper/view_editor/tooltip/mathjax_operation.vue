<template>
	<div class="tooltip-operation image_operation"
		:data-show="tooltipMessage.mathjaxOperationShow"
		v-on:mousedown="cancalMathjax">
		<div class="operatoin" v-on:mousedown.stop>
			<div class="mathjax_img">
				<img v-for="(mathTex, index) in tooltipMessage.mathjaxTexs"
					:src="getMathjaxBase64(mathTex)">
			</div>
			<div class="inputs" ref="inputs">
				<input v-for="(mathTex, index) in tooltipMessage.mathjaxTexs"
					class="input"
					type="text"
					v-model="tooltipMessage.mathjaxTexs[index]"/>
			</div>
			<div class="styleMessage"
				:data-show="styleMessageVisible">
				<div class="message">
					<div class="title">是否独立</div>
					<div class="content">
						<div class="checkbox"
							:data-check="!!display"
							v-on:mousedown="setStyleDisplay">
							<div class="check"></div>
						</div>
					</div>
				</div>
				<div class="message">
					<div class="title">上外间距</div>
					<div class="content">
						<input class="text" type="text" v-model="marginTop">
						<div class="unit">px</div>
					</div>
					<div class="title">右外间距</div>
					<div class="content">
						<input class="text" type="text" v-model="marginLeft">
						<div class="unit">px</div>
					</div>
				</div>
				<div class="message">
					<div class="title">下外间距</div>
					<div class="content">
						<input class="text" type="text" v-model="marginBottom">
						<div class="unit">px</div>
					</div>
					<div class="title">左外间距</div>
					<div class="content">
						<input class="text" type="text" v-model="marginRight">
						<div class="unit">px</div>
					</div>
				</div>
			</div>
			<div class="buttons">
				<div class="button"
					v-on:mouseup="setStyleMessageVisible(void 0)">样式</div>
				<div class="button"
					v-on:mouseup="addMathjax">添加</div>
				<div class="button"
					v-on:mouseup="reduceMathjax">减少</div>
				<div class="button"
					v-on:mouseup="clearMathjax">清空</div>
				<div class="button"
					v-on:mouseup="confirmMathjax">确定</div>
				<div class="button"
					v-on:mouseup="cancalMathjax">取消</div>
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		data(){
			return {
				styleMessageVisible: false,
				display: null,
				marginTop: null,
				marginLeft: null,
				marginBottom: null,
				marginRight: null,
			}
		},
		props: {
			tooltipMessage: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		watch: {
			'tooltipMessage.mathjaxStyle': function(newVal){
				console.log('newVal:', newVal);
				if( newVal ){
					this.setStyleMessageVisible(true);
					if(newVal.display){
						this.display = newVal.display;
					}
					if(newVal['margin-top']){
						this.marginTop = newVal['margin-top'].split("px")[0];
					}
					if(newVal['margin-left']){
						this.marginLeft = newVal['margin-left'].split("px")[0];
					}
					if(newVal['margin-bottom']){
						this.marginBottom = newVal['margin-bottom'].split("px")[0];
					}
					if(newVal['margin-right']){
						this.marginRight = newVal['margin-right'].split("px")[0];
					}
				}else{
					this.setStyleMessageVisible(false);
				}
			}
		},
		methods: {
			setStyleMessageVisible(visible){
				if( visible === void 0 ){
					this.styleMessageVisible = !this.styleMessageVisible;
				}else if( visible !== this.styleMessageVisible ){
					this.styleMessageVisible = visible;
				}
				// console.log('this.styleMessageVisible:', this.styleMessageVisible);
				if( this.styleMessageVisible ){
					while( this.tooltipMessage.mathjaxTexs.length > 1 ){
						// console.log('this.tooltipMessage.mathjaxTexs.length:', this.tooltipMessage.mathjaxTexs.length);
						this.tooltipMessage.mathjaxTexs.splice( length - 1, 1);
					}
				}
			},
			setStyleDisplay(){
				// console.log("setStyleDisplay:", this.display);
				if( this.display ){
					this.display = null;
				}else{
					this.display = "block";
				}
			},
			getMathjaxBase64(tex){
				// console.log('text:', tex);
				if( tex ){
					return "data:image/svg+xml;base64," + btoa( unescape(encodeURIComponent(new XMLSerializer().serializeToString( MathJax.tex2svg(tex).childNodes[0] ))) );
				}
			},
			addMathjax(){
				if( this.styleMessageVisible ){
					this.styleMessageVisible = false;
				}
				this.tooltipMessage.mathjaxTexs.push('');
			},
			reduceMathjax(){
				let length = this.tooltipMessage.mathjaxTexs.length;
				if( length > 1 ){
					this.tooltipMessage.mathjaxTexs.splice( length - 1, 1);
				}
			},
			clearMathjax(){
				this.tooltipMessage.mathjaxTexs[0] = '';
				while( this.tooltipMessage.mathjaxTexs.length > 1 ){
					this.tooltipMessage.mathjaxTexs.splice( length - 1, 1);
				}
			},
			confirmMathjax(){
				let	editor = this.tooltipMessage.editor;
				if( this.tooltipMessage.mathjaxTexs.length > 1 ){
					let doms = [];
					this.tooltipMessage.mathjaxTexs.forEach((tex)=>{
						doms.push(editor.objToDom({
							type: 'mathjax',
							data: tex
						}));
					});
					// console.log("obj:", obj);
					editor.insertElement(doms);
				}else{
					let
						obj = {
							type: 'mathjax',
							data: this.tooltipMessage.mathjaxTexs[0]
						};
					if( this.styleMessageVisible ){
						obj.style = {
							display: this.display,
							'margin-top': isNaN( parseInt(this.marginTop) ) ? this.marginTop : (this.marginTop + 'px'),
							'margin-bottom': isNaN( parseInt(this.marginBottom) ) ? this.marginBottom : (this.marginBottom + 'px'),
							'margin-left': isNaN( parseInt(this.marginLeft) ) ? this.marginLeft : (this.marginLeft + 'px'),
							'margin-right': isNaN( parseInt(this.marginRight) ) ? this.marginRight : (this.marginRight + 'px')
						}
					}
					console.log("obj:", obj);
					editor.insertElement(editor.objToDom(obj));
				}
				this.cancalMathjax();
			},
			cancalMathjax(){
				this.tooltipMessage.mathjaxOperationShow = false;
			},
		}
	}
</script>


<style lang="less">
	.tooltip-operation.image_operation{
		display: flex;
		justify-content: center;
		align-items: center;
		>.operatoin{
			display: flex;
			flex-direction: column;
			width: 70%;
			max-width: 100%;
			min-width: 3.5rem;
			height: 70%;
			max-height: 100%;
			min-height: 3.3rem;
			border-radius: 0.1rem;
			background-color: #ffffff;

			>.mathjax_img{
		    display: flex;
		    padding: 0.2rem 0.3rem;
		    width: 100%;
		    overflow: auto;
		    >img{
		    	min-height: 0.2rem;
		    	max-height: 0.5rem;
		    }
			}
			>.inputs{
				padding: 0 0.3rem 0.2rem;
				width: 100%;
				flex: 1;
				min-height: 0.4rem;
				overflow: auto;
				>.input{
					margin: 0 0 0.04rem 0;
					padding: 0.04rem;
					width: 100%;
					height: 0.36rem;
					line-height: 0.24rem;
					font-size: 0.2rem;
					border-width: 0.02rem;
					border-style: dashed;
					border-color: #434343;
					border-radius: 0.04rem;
				}
			}
			>.styleMessage{
				padding: 0 0.3rem;
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 0;
				transition: height .3s;
				overflow: hidden;
				>.message{
					display: flex;
			    flex-flow: wrap;
					height: 0.4rem;
					line-height: 0.4rem;
					>.title{
						//min-width: 0.56rem;
						font-size: 0.14rem;
					}
					>.content{
						display: flex;
						align-items: center;
						padding: 0 0.1rem;
						min-width: 1rem;
						height: 100%;
						font-size: 0.18rem;
						>.checkbox{
							display: flex;
							justify-content: center;
							align-items: center;
					    width: 0.14rem;
					    height: 0.14rem;
					    border-radius: 50%;
							border-width: 0.01rem;
							border-style: solid;
							border-color: #dcdfe6;
					    background-color: #ffffff;
					    transition: background-color .3s, border-color .3s;
					    cursor: pointer;
					    >.check{
					    	width: 0;
					    	height: 0;
					    	border-radius: 50%;
					    	background-color: #ffffff;
					    	transition: width .3s, height .3s;
					    }
						}
						>.checkbox[data-check="true"]{
							border-color: #525252;
					    background-color: #525252;
					    >.check{
					    	width: 0.04rem;
					    	height: 0.04rem;
					    }
						}
						>.text{
							padding: 0.02rem 0.06rem;
							width: 0.8rem;
							border-width: 0.01rem;
							border-style: solid;
							border-color: #dcdfe6;
							border-radius: 0.04rem;
							font-size: 0.18rem;
						}
						>.unit{
							padding: 0 0.1rem;
						}
					}
				}
			}
			>.styleMessage[data-show="true"]{
				height: 1.2rem;

			}
			>.buttons{
				padding: 0.1rem 0;
				width: 100%;
				height: 0.6rem;
				display: flex;
				justify-content: center;
				>.button{
					position: relative;
					padding: 0 0.1rem;
					height: 100%;
					text-align: center;
					line-height: 0.4rem;
					font-size: 0.18rem;
			    border-radius: 0.04rem;
					cursor: pointer;
					transition: background-color .3s;
					&:hover{
						background-color: #d4d4d4;
					}
					>input{
						position: absolute;
						top: 0;
						left: 0;
						font-size: 0;
						opacity: 0;
						width: 100%;
						height: 100%;
						cursor: pointer;
					}
				}
			}
		}
	}
</style>