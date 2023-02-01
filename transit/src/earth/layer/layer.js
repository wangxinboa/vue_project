import {
	Texture,
	RawShaderMaterial
} from '../../libs/three.module.js';
import TileFS from '../../shaders/TileFS.js';
import TileVS from '../../shaders/TileVS.js';

const textureName = 'uTexture';

export default class Layer{

	constructor(){
		this.material = new RawShaderMaterial();
	}

	updateMaterial(layerManager){
		let textureNum = layerManager.providers.length;

		this.uniforms = {
			render: {
				value: false
			}
		}

		for( let i = 0; i < textureNum; i++ ){
			this.uniforms[textureName + i] = {
				value: null
			}
		}

		this.material.uniforms = this.uniforms;
		this.material.depthWrite = false;
		this.material.vertexShader = TileVS();
		this.material.fragmentShader = TileFS(textureName, textureNum);

		this.material.needsUpdate = true;
	}

	render(textures){
		// console.log('渲染图片');
		let i = 0;
		textures.forEach((texture)=>{
			let
				name = textureName + i,
				uTexture = this.uniforms[name];

			if( uTexture ){
				uTexture.value = texture;
			}else{
				this.uniforms[name] = {
					value: texture
				}
			}
			i++;
		});
		this.show();
	}
	show(){
		this.uniforms.render.value = true;
	}
	hide(){
		this.uniforms.render.value = false;
	}
}