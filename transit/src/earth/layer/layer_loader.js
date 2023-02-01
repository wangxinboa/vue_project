

export default class LayerLoader{
	constructor(){
		this.onload = null;
		this.onerror = null;

	}
	loadImage(url){
		let img = new Image();
		img.crossOrigin = "anonymous";
		img.src = url;

		img.onload = () => {
			this.onload(img);
		}
		img.onerror = () => {
			this.onerror();
		}
		// return img;
	}
	onLoad(onload){
		this.onload = onload;
		return this;
	}
	onError(onerror){
		this.onerror = onerror;
		return this;
	}

}