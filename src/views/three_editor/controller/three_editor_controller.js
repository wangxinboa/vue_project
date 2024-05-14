
export default class ThreeEditorController{

	constructor(){

		let
			iframeSrc = 'http://localhost:8080/iframe/',

			_iframe = null,
			renderer = null,
			scenes = null,
			camera = null,

			// views
			selectedNodeShowDetails = null;


		return {
			iframeSrc,
			renderer,
			scenes,
			camera,

			selectedNodeShowDetails,

			initIframe( iframe ){

				_iframe = iframe;
			},

			get stopRender(){

				return _iframe?.stopRender;
			},
			set stopRender( val ){

				_iframe.stopRender = val;
			},

			refreshScenes(){

				const
					{ effectComposer, scene, camera, renderer } = _iframe,
					scenes = [];


				window.effectComposer = effectComposer;

				// if( effectComposer ){
				// 	scenes.push( effectComposer );
				// }

				if( scene ){
					scenes.push( scene );
				}

				this.renderer = renderer;
				this.scenes = scenes;
				this.camera = camera;
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