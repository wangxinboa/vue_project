import Camera from '../Renderer/Camera.js';
import MainLoop from './MainLoop.js';
import c3DEngine from '../Renderer/c3DEngine.js';
import { STRATEGY_MIN_NETWORK_TRAFFIC } from './Layer/LayerUpdateStrategy.js';
import { GeometryLayer, Layer, defineLayerProperty } from './Layer/Layer.js';
import Scheduler from './Scheduler/Scheduler.js';

function View(crs, viewerDiv, options = {}) {
    this.referenceCrs = crs;

    this.mainLoop = options.mainLoop || new MainLoop(new Scheduler(), new c3DEngine(viewerDiv, options.renderer));

    this.scene = options.scene3D || new THREE.Scene();
    if (!options.scene3D) {
        this.scene.autoUpdate = false;
    }

    this.camera = new Camera(
        this.mainLoop.gfxEngine.getWindowSize().x,
        this.mainLoop.gfxEngine.getWindowSize().y,
        options);

    this._layers = [];

    this.viewerDiv = viewerDiv;
    window.addEventListener('resize', () => {
        this.mainLoop.gfxEngine.onWindowResize();
        this.camera.resize(this.viewerDiv.clientWidth, this.viewerDiv.clientHeight);
        this.camera.update();
        this.notifyChange(true);
    }, false);

    this.onAfterRender = () => {};

    this._changeSources = new Set();
}

View.prototype = Object.create(THREE.EventDispatcher.prototype);
View.prototype.constructor = View;

const _syncThreejsLayer = function _syncThreejsLayer(layer, view) {
    // if (layer.visible) {
    //     view.camera.camera3D.layers.enable(layer.threejsLayer);
    // } else {
    //     view.camera.camera3D.layers.disable(layer.threejsLayer);
    // }
};

function _preprocessLayer(view, layer, provider) {
    if (!(layer instanceof Layer) && !(layer instanceof GeometryLayer)) {
        const nlayer = new Layer(layer.id);
        delete layer.id;
        layer = Object.assign(nlayer, layer);
    }

    if (!layer.updateStrategy) {
        layer.updateStrategy = {
            type: STRATEGY_MIN_NETWORK_TRAFFIC,
        };
    }

    if (provider) {
        if (provider.tileInsideLimit) {
            layer.tileInsideLimit = provider.tileInsideLimit.bind(provider);
        }

        if (provider.tileTextureCount) {
            layer.tileTextureCount = provider.tileTextureCount.bind(provider);
        }

        if (provider.preprocessDataLayer) {
            provider.preprocessDataLayer(layer);
        }
    }

    // probably not the best place to do this
    if (layer.type == 'color') {
        defineLayerProperty(layer, 'frozen', false);
        defineLayerProperty(layer, 'visible', true);
        defineLayerProperty(layer, 'opacity', 1.0);
        defineLayerProperty(layer, 'sequence', 0);
    } else if (layer.type == 'elevation') {
        defineLayerProperty(layer, 'frozen', false);
    } else if (layer.type == 'geometry' || layer.type == 'debug') {
        layer.threejsLayer = view.mainLoop.gfxEngine.getUniqueThreejsLayer();
        defineLayerProperty(layer, 'visible', true, () => _syncThreejsLayer(layer, view));
        _syncThreejsLayer(layer, view);
    }
    return layer;
}

View.prototype.addLayer = function addLayer(layer, parentLayer) {
    layer = _preprocessLayer(this, layer, this.mainLoop.scheduler.getProtocolProvider(layer.protocol));
    if (parentLayer) {
        parentLayer.attach(layer);
    } else {
        if (typeof (layer.update) !== 'function') {
            throw new Error('Cant add GeometryLayer: missing a update function');
        }
        if (typeof (layer.preUpdate) !== 'function') {
            throw new Error('Cant add GeometryLayer: missing a preUpdate function');
        }

        this._layers.push(layer);
    }

    this.notifyChange(true);
    return layer;
};

/**
 * Notifies the scene it needs to be updated due to changes exterior to the
 * scene itself (e.g. camera movement).
 * non-interactive events (e.g: texture loaded)
 * @param {boolean} needsRedraw - indicates if notified change requires a full scene redraw.
 * @param {*} changeSource
 */
View.prototype.notifyChange = function notifyChange(needsRedraw, changeSource) {
    this._changeSources.add(changeSource);
    this.mainLoop.scheduleViewUpdate(this, needsRedraw);
};

View.prototype.getLayers = function getLayers(filter) {
    const result = [];
    for (const geometryLayer of this._layers) {
        if (!filter || filter(geometryLayer)) {
            result.push(geometryLayer);
        }
        for (const attached of geometryLayer._attachedLayers) {
            if (!filter || filter(attached, geometryLayer)) {
                result.push(attached);
            }
        }
    }
    return result;
};

export default View;
