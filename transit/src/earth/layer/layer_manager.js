
import developerError from '../../core/developer_error.js';
import LayerLoader from './layer_loader.js';


export default class LayerManager{

	constructor(){
		this.providers = [];
		this.layerLoader = new LayerLoader()
												.onLoad(this.onLoadImage.bind(this))
												.onError(this.onLoadImageError.bind(this));

		this.waitStack = [];

		this.loadingTile;
		this.loadingProviderIndex;

		this.baseMap = new Map();
		this.loadedMap = new Map();
		this.loadedErrorMap = new Map();
	}

	setProvider(provider){
		if( this.providers.length === 0 ){
			this.providers.push(provider);
		}else{
			this.providers = [provider];
		}
	}

	addProvider(provider){
		this.providers.push(provider);
	}

	loadingBaseTileLayer(tile){
		this.baseMap.set(tile, true);
		this.load(tile);
	}

	load(tile){
		if( this.providers.length > 0 ){
			this.waitStack.push(tile);
			// console.log(this.waitStack.length)
			if( !this.loadingTile ){
				// console.log('开始加载地图瓦片');
				this.loadTile();
			}
		}else{
			developerError('没有添加地图图层');
		}
	}

	loadTile(){
		this.loadingTile = this.waitStack.pop();
		if( this.loadingTile ){
			// console.log('加载瓦片:', this.loadingTile.order)
			if( this.loadedMap.has(this.loadingTile) ){
				// console.log('瓦片已经加载过了');
				this.loadingTile.layer.show();
				this.loadTile();
			}else{
				this.loadingProviderIndex = 0;
				this.requestImage();
			}
		}
	}

	requestImage(){
		let 
			provider = this.providers[this.loadingProviderIndex],
			tile = this.loadingTile,
			url = provider.getUrl(tile.column, tile.row, tile.level);

		if( tile.hasProviderImage(provider) ){
			this.requestNextImage();
		}else{
			this.layerLoader.loadImage(url);
		}
	}

	requestNextImage(){
		if( this.loadingProviderIndex === this.providers.length - 1 ){// 瓦片全部图片加载完
			// console.log('瓦片全部图片加载完', this.loadingTile.order);

			this.loadedMap.set( this.loadingTile, true );
			this.loadingTile.render();
			
			if( this.waitStack.length === 0 ){// 全部瓦片加载完成
				this.loadingTile = null;
			}else{// 加载下一个瓦片
				this.loadTile();
			}
		}else{// 加载下一张图片
			this.loadingProviderIndex ++;
			this.requestImage();
		}
	}

	onLoadImage(img){
		this.loadingTile.saveImage(this.providers[this.loadingProviderIndex], img);
		this.requestNextImage();
	}

	onLoadImageError(){
		// console.error('加载图片失败');
		this.requestNextImage();
	}
}