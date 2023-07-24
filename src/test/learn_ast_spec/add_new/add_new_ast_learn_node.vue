<template>
	<div class="fill add_new_ast_learn_node">
		<div class="code_ast_container">
			<v-codeAstNode
				:astNode="astNode"/>
		</div>
		<div class="code_editor_container">
			<v-codeEditor
				v-on:change="getCodeAst"
				:code="testCode"/>
		</div>
	</div>
</template>

<script>
	import VCodeEditor from '../code_editor/code_editor';
	import VCodeAstNode from './code_ast_node/code_ast_node';


	import { jsCodeStrToAst } from '../utils.js';

	export default {
		components: {
			"v-codeAstNode": VCodeAstNode,
			"v-codeEditor": VCodeEditor,
		},
		data(){
			return {
				events: {
					change: 'change',
				},
				astNode: null,
				testCode: `import { B3DMLoaderBase } from '../base/B3DMLoaderBase.js';
import { DefaultLoadingManager, Matrix4 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class B3DMLoader extends B3DMLoaderBase {

	constructor( manager = DefaultLoadingManager ) {

		super();
		this.manager = manager;
		this.adjustmentTransform = new Matrix4();

	}

	parse( buffer ) {

		const b3dm = super.parse( buffer );
		const gltfBuffer = b3dm.glbBytes.slice().buffer;
		return new Promise( ( resolve, reject ) => {

			const manager = this.manager;
			const fetchOptions = this.fetchOptions;
			const loader = manager.getHandler( 'path.gltf' ) || new GLTFLoader( manager );

			if ( fetchOptions.credentials === 'include' && fetchOptions.mode === 'cors' ) {

				loader.setCrossOrigin( 'use-credentials' );

			}

			if ( 'credentials' in fetchOptions ) {

				loader.setWithCredentials( fetchOptions.credentials === 'include' );

			}

			if ( fetchOptions.headers ) {

				loader.setRequestHeader( fetchOptions.headers );

			}

			// GLTFLoader assumes the working path ends in a slash
			let workingPath = this.workingPath;
			if ( ! /[\\/]$/.test( workingPath ) && workingPath.length ) {

				workingPath += '/';

			}

			const adjustmentTransform = this.adjustmentTransform;

			loader.parse( gltfBuffer, workingPath, model => {

				const { batchTable, featureTable } = b3dm;
				const { scene } = model;

				const rtcCenter = featureTable.getData( 'RTC_CENTER' );
				if ( rtcCenter ) {

					scene.position.x += rtcCenter[ 0 ];
					scene.position.y += rtcCenter[ 1 ];
					scene.position.z += rtcCenter[ 2 ];

				}

				model.scene.updateMatrix();
				model.scene.matrix.multiply( adjustmentTransform );
				model.scene.matrix.decompose( model.scene.position, model.scene.quaternion, model.scene.scale );

				model.batchTable = batchTable;
				model.featureTable = featureTable;

				scene.batchTable = batchTable;
				scene.featureTable = featureTable;

				resolve( model );

			}, reject );

		} );

	}

}`
			}
		},

		methods: {
			getCodeAst(codeStr){
				// console.log('codeStr:', codeStr);
				let astNode = jsCodeStrToAst(codeStr);
				this.astNode = [astNode];
				this.$emit(this.events.change, astNode);
			}
		}

	}
</script>

<style lang="less">
	.add_new_ast_learn_node{
		display: flex;
		>.code_ast_container{
			display: flex;
			flex-direction: column;
			width: 3rem;
			height: 100%;
			>.code_ast_header{
				width: 100%;
				height: 0.3rem;
			}
		}
		>.code_editor_container{
			width: 0;
			flex: 1;
			height: 100%;
		}
	}
</style>