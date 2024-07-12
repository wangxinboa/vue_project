import * as THREE from '@third_party/three.js/build/three.module.js';

import { OrbitControls } from '@third_party/three.js/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '@third_party/three.js/examples/jsm/loaders/GLTFLoader.js';


export default class ThreeEditorController{

	constructor(){

		let
			iframeSrc = 'http://localhost:8080/su7/',

			_iframe = null,
			renderer = null,
			scenes = null,
			camera = null,

			isRun = false,
			// views
			selectedNodeShowDetails = null;

		function render(){

			renderer.render( scenes[0], camera );

			if( isRun ){

				requestAnimationFrame(render)
			}
		}

		return {
			iframeSrc,
			get renderer(){
				return renderer;
			},
			set renderer( val ){
				return renderer = val;
			},
			get scenes(){
				return scenes;
			},
			set scenes( val ){
				return scenes = val;
			},
			get camera(){
				return camera;
			},
			set camera( val ){
				return camera = val;
			},

			selectedNodeShowDetails,

			initIframe( iframe ){

				_iframe = iframe;
			},

			initCanvas( parameters = {} ){

				const { canvas } = parameters;

				this.renderer = new THREE.WebGLRenderer( parameters );
				this.scenes = [new THREE.Scene()];
				this.camera = new THREE.PerspectiveCamera( 75, canvas.clientWidth / canvas.clientHeight, 1, 1000 );

				const ambient = new THREE.AmbientLight( 0xffffff );
				this.scenes[0].add( ambient );

				const orbitControls = new OrbitControls(camera, renderer.domElement);

				isRun = true;
				render();
				// this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
			},



			loadGLTFFile( file ){
				console.log('loadGLTFFile');
				console.log('file:', file);

				const url = URL.createObjectURL(file);

				new GLTFLoader().load(url, (gltf)=>{

						console.log('gltf:', gltf);

						this.scenes[0].add( gltf.scene );

						console.log('this.scenes:', this.scenes);

						URL.revokeObjectURL( url );
				});
			},

			get stopRender(){

				return _iframe?.stopRender;
			},
			set stopRender( val ){

				_iframe.stopRender = val;
			},

			refreshScenes(){

				if( _iframe ){

					const
						{ special, scene, camera, renderer } = _iframe,
						scenes = [];

						window.special = special;

					if( scene ){
						scenes.push( scene );
					}

					this.renderer = renderer;
					this.scenes = scenes;
					this.camera = camera;
				}else {

					this.scenes = [this.scenes[0]]
				}
			},

			intersectScene(e){

				// if( event.button !== 0 ){
				// 	return ;
				// }

				// pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				// pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

				// raycaster.setFromCamera( pointer, this.camera );

				// const intersect = raycaster.intersectObject( this.scene );

				// console.log('this.scene:', this.scene);

				// console.log('intersect:', intersect);
				// if( intersect.length > 0 ){

				// 	this.selectedNodeShowDetails = intersect[0].object;
				// }else{
				// 	console.log('无接触点');
				// }
			},
		}
	}
}