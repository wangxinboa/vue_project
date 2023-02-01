import {
	Vector2,
} from '../libs/three.module.js';

import { isEmpty, isNumber, isInstance } from '../core/check_value.js';
import developerError from '../core/developer_error.js';

import { TerrainType } from './terrain/terrain.js';
import WebMercatorTerrain from './terrain/web_mercator.js';
import LayerManager from './layer/layer_manager.js';
import Provider from './layer/provider/provider.js';
import BingProvider from './layer/provider/bing_provider.js';
import Cartograph from './coordinates/cartograph.js';
import Camera from '../core/camera.js';
import getTile from './get_tile.js';


function createDefaultEarthOptions(){
	return {
		minLevel: 1,
		maxLevel: 19,
		terrainType: TerrainType.WebMercatorTerrain,
		provider: new BingProvider(),
		origin: new Cartograph(120.04340, 30.31806, 0)
	}
}


export default function createEarth( canvas, scene, earthOptions ){
	let
		terrain, origin,
		layerManager = new LayerManager(),
		minLevel, maxLevel,
		sseThreshold = 5,
		defaultEarthOption = createDefaultEarthOptions();

	if( isEmpty(earthOptions) ){
		earthOptions = defaultEarthOption;
	}

	switch( earthOptions.terrainType ){
		case TerrainType.WebMercatorTerrain:
			terrain = new WebMercatorTerrain();
			break;
		default:
			developerError('请输入正确的地形类型');
			break;
	}
	scene.add( terrain.tileGroup );

	if( isInstance(earthOptions.provider, Provider) ){
		layerManager.setProvider(earthOptions.provider);
	}else{
		layerManager.setProvider(defaultEarthOption.provider);
	}

	if( isInstance(earthOptions.origin, Cartograph) ){
		origin = earthOptions.origin;
	}else{
		origin = defaultEarthOption.origin;
	}
	terrain.setOrigin(origin);

	if( isNumber(earthOptions.minLevel) ){
		minLevel = earthOptions.minLevel;
	}else{
		minLevel = defaultEarthOption.minLevel;
	}

	if( isNumber(earthOptions.maxLevel) ){
		maxLevel = earthOptions.maxLevel;
	}else{
		maxLevel = defaultEarthOption.maxLevel;
	}

	if( maxLevel < minLevel ){
		developerError('瓦片最低层级比最高层级大');
	}

	let
		_camera = new Camera(),

		rootTiles = terrain.getRootTiles(layerManager),
		showTiles = new Map(),
		nowTiles = new Map(),
		baseTiles = new Map();

	// console.log('rootTiles:', rootTiles);

	let earth = {
		setMinLevel(level){
			if( level < maxLevel ){
				minLevel = level;

				rootTiles.forEach((rootTile)=>{
					rootTile.traverse((tile)=>{
						if( tile.level < minLevel ){
							return true;
						}else if( tile.level === minLevel ){
							tile.show();
						}
						return false
					});
				});
			}else{
				developerError('地图最小级别比最高级别大')
			}
		},
		update(camera){
			_camera.copy(camera);
			_camera.applyMatrix4(terrain.matrixInv);
			_camera.updateWorldMatrix();

			let tiles = getTile(minLevel, maxLevel, rootTiles, terrain.ellipse, canvas, _camera, sseThreshold);

			tiles.forEach((tile)=>{
				nowTiles.set(tile, true);
			});

			showTiles.forEach((value, tile)=>{
				if( nowTiles.has( tile ) ){
					nowTiles.delete(tile);
				}else if( tile.level !== minLevel ){
					showTiles.delete(tile);
					tile.hide();
				}
			});

			nowTiles.forEach((value, tile)=>{
				showTiles.set(tile, true);
				tile.show();
			});

			nowTiles.clear();
		},

		// 获得经纬度坐标
		getCartograph(cartesian){
			return terrain.unproject( cartesian.clone().applyMatrix4( terrain.matrixInv ) );
		},
		// 获得笛卡尔坐标
		getCartesian(cartograph){
			return terrain.project(cartograph).applyMatrix4( terrain.matrix );
		},

		setOrigin(origin){
			terrain.setOrigin(origin);
		},
		getCenter(){
			return terrain.center;
		},
		getIntersection(event, camera){
			let
				mouse = new Vector2(
					( event.offsetX / canvas.offsetWidth ) * 2 - 1,
						- ( event.offsetY / canvas.offsetHeight ) * 2 + 1
				),
				ray = camera.getMouseRay(mouse);

			return terrain.getEllipseIntersection(ray.origin, ray.direction);
		}
	}

	earth.setMinLevel(minLevel);

	return Object.freeze(earth);
}

