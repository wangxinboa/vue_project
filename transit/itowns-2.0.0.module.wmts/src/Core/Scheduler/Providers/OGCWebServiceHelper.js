import Fetcher from './Fetcher.js';
import CacheRessource from './CacheRessource.js';
import Projection from '../../Geographic/Projection.js';
import Extent from '../../Geographic/Extent.js';


export const SIZE_TEXTURE_TILE = 256;

// CacheRessource is necessary for neighboring PM textures
// The PM textures overlap several tiles WGS84, it is to avoid net requests
// Info : THREE.js have cache image https://github.com/mrdoob/three.js/blob/master/src/loaders/ImageLoader.js#L25
const cache = CacheRessource();
const cachePending = new Map();
const projection = new Projection();

export default {
    getColorTextureByUrl(url, networkOptions) {
        const cachedTexture = cache.getRessource(url);

        if (cachedTexture) {
            return Promise.resolve(cachedTexture);
        }

        const { texture, promise } = (cachePending.has(url)) ?
            cachePending.get(url) :
            Fetcher.texture(url, networkOptions);

        texture.generateMipmaps = false;
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearFilter;
        texture.anisotropy = 16;


        cachePending.set(url, { texture, promise });

        return promise.then(() => {
            if (!cache.getRessource(url)) {
                cache.addRessource(url, texture);
            }
            cachePending.delete(url);
            return texture;
        });
    },
    computeTileMatrixSetCoordinates(tile, tileMatrixSet) {
        // Are WMTS coordinates ready?
        if (!tile.wmtsCoords) {
            tile.wmtsCoords = {};
        }

        tileMatrixSet = tileMatrixSet || 'WGS84G';
        if (!(tileMatrixSet in tile.wmtsCoords)) {
            const tileCoord = projection.WGS84toWMTS(tile.extent);

            tile.wmtsCoords[tileMatrixSet] =
                projection.getCoordWMTS_WGS84(tileCoord, tile.extent, tileMatrixSet);
        }
    },
    WMTS_WGS84Parent(cWMTS, levelParent, pitch) {
        const diffLevel = cWMTS.zoom - levelParent;
        const diff = Math.pow(2, diffLevel);
        const invDiff = 1 / diff;

        const r = (cWMTS.row - (cWMTS.row % diff)) * invDiff;
        const c = (cWMTS.col - (cWMTS.col % diff)) * invDiff;

        if (pitch) {
            pitch.x = cWMTS.col * invDiff - c;
            pitch.y = cWMTS.row * invDiff - r;
            pitch.z = invDiff;
        }

        return new Extent(cWMTS.crs(), levelParent, r, c);
    },
};
