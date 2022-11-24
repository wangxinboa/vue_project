import Capabilities from '../Core/System/Capabilities.js';

function c3DEngine(viewerDiv, renderer) {
    var NOIE = !Capabilities.isInternetExplorer();
    this.viewerDiv = viewerDiv;

    this.width = (renderer ? renderer.domElement : viewerDiv).clientWidth;
    this.height = (renderer ? renderer.domElement : viewerDiv).clientHeight;

    this.positionBuffer = null;
    this._nextThreejsLayer = 0;

    this.fullSizeRenderTarget = new THREE.WebGLRenderTarget(this.width, this.height);
    this.fullSizeRenderTarget.texture.minFilter = THREE.LinearFilter;
    this.fullSizeRenderTarget.texture.generateMipmaps = false;

    this.renderView = function renderScene(view) {
        this.renderer.setViewport(0, 0, this.width, this.height);
        this.renderer.clear();
        this.renderer.render(view.scene, view.camera.camera3D);
    }.bind(this);

    this.onWindowResize = function onWindowResize() {
        this.width = this.viewerDiv.clientWidth;
        this.height = this.viewerDiv.clientHeight;
        this.fullSizeRenderTarget.setSize(this.width, this.height);
        this.renderer.setSize(this.viewerDiv.clientWidth, this.height);
    }.bind(this);

    //
    // Create canvas
    //
    var canvas = document.createElement('canvas');

    //
    // Create renderer
    //
    this.renderer = renderer || new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        logarithmicDepthBuffer: this.gLDebug || NOIE,
    });

    Capabilities.updateCapabilities(this.renderer);

    this.renderer.setClearColor(0x030508);
    this.renderer.autoClear = false;
    this.renderer.sortObjects = false;

    if (!renderer) {
        this.renderer.setPixelRatio(viewerDiv.devicePixelRatio);
        this.renderer.setSize(viewerDiv.clientWidth, viewerDiv.clientHeight);
        viewerDiv.appendChild(this.renderer.domElement);
    }
}

c3DEngine.prototype.getWindowSize = function getWindowSize() {
    return new THREE.Vector2(this.width, this.height);
};

c3DEngine.prototype.getRenderer = function getRenderer() {
    return this.renderer;
};

c3DEngine.prototype.renderViewTobuffer = function renderViewTobuffer(view, buffer, x, y, width, height) {
    // TODO Deallocate render texture
    const current = this.renderer.getRenderTarget();
    this.renderer.setRenderTarget(buffer);
    this.renderer.setViewport(0, 0, buffer.width, buffer.height);
    this.renderer.setScissor(x, y, width, height);
    this.renderer.setScissorTest(true);
    this.renderer.clearTarget(buffer, true, true, false);
    this.renderer.render(view.scene, view.camera.camera3D, buffer);
    this.renderer.setScissorTest(false);
    var pixelBuffer = new Uint8Array(4 * width * height);
    this.renderer.readRenderTargetPixels(buffer, x, y, width, height, pixelBuffer);
    this.renderer.setRenderTarget(current);

    return pixelBuffer;
};

c3DEngine.prototype.getUniqueThreejsLayer = function getUniqueThreejsLayer() {
    // console.log('getUniqueThreejsLayer');
    // We use three.js Object3D.layers feature to manage visibility of
    // geometry layers; so we need an internal counter to assign a new
    // one to each new geometry layer.
    // Warning: only 32 ([0, 31]) different layers can exist.
    if (this._nextThreejsLayer > 31) {
        // eslint-disable-next-line no-console
        console.warn('Too much three.js layers. Starting from now all of them will use layerMask = 31');
        this._nextThreejsLayer = 31;
    }

    const result = this._nextThreejsLayer++;

    return result;
};

export default c3DEngine;
