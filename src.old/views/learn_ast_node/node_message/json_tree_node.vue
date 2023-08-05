<template>
	<div class="component-json-node">
		<div class="node-content" >
			<div :class="{
					expand: true,
					leaf: isLeaf,
					expanded: isExpand && !isLeaf,
				}"
				v-on:mousedown.stop="handleExpand"> › </div>
			<div class="label"
				v-on:mousedown="copyKeyName">
				{{ getLabel() }}
			</div>
		</div>
		<div class="children"
			ref="children"
			v-if="!isLeaf">
			<component-json-node
				v-for="(child, name) in data"
				v-if="(typeof data === 'object' && !Array.isArray(data) && data.type && ast[data.type] ? ast[data.type][name] : true)"
				:key="name"
				:data = "child"
				:keyName="name"
				/>
		</div>
	</div>
</template>

<script>
	import ast from './ast.json';

	export default {
		name: 'component-json-node',
		props: {
			data: {
				type: [Object, Array, String, Number, Boolean],
			},
			keyName: {
				type: [String, Number],
				default: '',
			}
		},
		data(){
			return {
				ast,
				// isLeaf: null,
				isLeaf: this.getIsLeaf(),
				isExpand: true,
			}
		},
		watch: {
			data(){
				this.isLeaf = this.getIsLeaf();
			}
		},
		methods: {
			handleExpand(){
				if( this.isLeaf ){
					return;
				}
				this.isExpand = !this.isExpand;
				let height ;
				if( this.isExpand ){
					this.$refs.children.style.height = null;
					height = this.$refs.children.clientHeight;
					this.$refs.children.style.height = 0;
					setTimeout(()=>{
						this.$refs.children.style.height = `${height}px`;
					}, 0);
					setTimeout(()=>{
						this.$refs.children.style.height = null;//	300 是 css transition 的数据
					}, 300);
				}else{
					height = this.$refs.children.clientHeight;
					this.$refs.children.style.height = `${height}px`;
					setTimeout(()=>{
						this.$refs.children.style.height = 0;
					}, 0);
				}
			},
			getLabel(){
				let dataLabel = "",
						dataType = "";
				

				if( typeof this.keyName === "string" ){
					dataLabel = this.keyName;
					if( this.data && this.data.type ){
						dataLabel += ': ' + this.data.type;
					}
				}else{
					dataLabel = this.data.type;
				}

				this.data === null ? dataType = ': null' :
				this.data === void 0 ? dataType = ': undefined' : 
				Array.isArray(this.data) ? dataType = `-Array [${this.data.length}]` :
				typeof this.data === 'object' ? dataType = `-Object {${Object.keys(this.data).length}}` :
				dataType = `: ${this.data}`

				return `${dataLabel}${dataType}`;
			},
			copyKeyName(){
				console.log('this.data:', this.data);
				console.log('this.keyName:', this.keyName);
				console.log('this.data.type:', this.data.type);
				let textarea = document.createElement('textarea');
				textarea.style.position = 'absolute';
				textarea.style.opacity = 0;

				document.body.appendChild(textarea);
		    textarea.value = this.keyName;
		    textarea.select();		// 选择对象
		    document.execCommand("Copy");	// 执行浏览器复制命令

				document.body.removeChild(textarea);
			},
			getIsLeaf(){
				return Array.isArray(this.data) ? this.data.length === 0 :
								((typeof this.data) === "object" && this.data !== null) ? Object.keys(this.data) === 0 :
								true
			}
		},
		created(){
				// console.log('data:', this.data);
			// console.log(JSON.stringify(this.data, null, 4))
			// console.log('this.keyName:', this.keyName);
			// console.log('this.data:', this.data);
			// for( let key in this.data ){
			// 	console.log(`this.data[${key}]:`, this.data[key]);
			// 	console.log(`ast[${this.data.type}][${key}]`, ast[this.data.type][key]);
			// }
			// console.log((typeof this.data) !== "object");
			// console.log('this.data:', this.data);
			// console.log('this.keyName:', this.keyName);
		}
	}
</script>

<style lang="less">
	.component-json-node{
		>.node-content{
			position: relative;
			display: flex;
			height: 0.3rem;
			line-height: 0.3rem;
			font-size: 0.14rem;
			transition: background-color .3s, height .3s;
	    cursor: pointer;
	    >.expand{
	    	width: 0.3rem;
	    	height: 0.3rem;
		    text-align: center;
        transition: transform .3s ease-in-out, opacity .3s ease-in-out, width .3s;
	    }
	    >.expand.expanded{
		    transform: rotate(90deg);
	    }
	    >.expand.leaf{
	    	opacity: 0;
	    	pointer-events: none;
		    transform: rotate(90deg);
	    }
	    >.label{
				line-height: 0.3rem;
				white-space:nowrap;
	    }
		}
		>.node-content[data-selected="true"]{
			background-color: #272727;
	    >.btns{
	    	background-color: #272727;
	    }
		}
		>.node-content[data-hide="true"]{

			height: 0;
		}
		>.children{
			margin: 0 0 0 0.16rem;
			transition: height .3s;
	    border-left: 0.01rem solid #666666;
	    overflow-y: hidden;
	    overflow-x: initial;
		}
	}
</style>