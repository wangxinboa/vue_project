import MathExt from '../Math/MathExtended.js';
import { UNIT } from './Coordinates.js';
import Extent from './Extent.js';


function Projection() {
    // Constructor

}

Projection.prototype.WGS84ToY = function WGS84ToY(latitude) {
    return 0.5 - Math.log(Math.tan(MathExt.PI_OV_FOUR + latitude * 0.5)) * MathExt.INV_TWO_PI;
};

Projection.prototype.YToWGS84 = function YToWGS84(y) {
    return 2 * (Math.atan(Math.exp(-(y - 0.5) / MathExt.INV_TWO_PI)) - MathExt.PI_OV_FOUR);
};

Projection.prototype.WGS84ToOneSubY = function WGS84ToOneSubY(latitude) {
    // TODO remove me
    return 0.5 + Math.log(Math.tan(MathExt.PI_OV_FOUR + latitude * 0.5)) * MathExt.INV_TWO_PI;
};

Projection.prototype.WGS84LatitudeClamp = function WGS84LatitudeClamp(latitude) {
    // var min = -68.1389  / 180 * Math.PI;
    var min = -86 / 180 * Math.PI;
    var max = 84 / 180 * Math.PI;

    latitude = Math.max(min, latitude);
    latitude = Math.min(max, latitude);

    return latitude;
};

Projection.prototype.getCoordWMTS_WGS84 = function getCoordWMTS_WGS84(tileCoord, bbox, tileMatrixSet) {
    // TODO: PM, WGS84G are hard-coded reference to IGN's TileMatrixSet
    if (tileMatrixSet === 'PM') {
        return this.WMTS_WGS84ToWMTS_PM(tileCoord, bbox);
    } else if (tileMatrixSet === 'WGS84G') {
        return [tileCoord];
    } else {
        throw new Error(`Unsupported TileMatrixSet '${tileMatrixSet}'`);
    }
};

Projection.prototype.getAllCoordsWMTS = function getAllCoordsWMTS(tileCoord, bbox, tileMatrixSets) {
    var tilesMT = [];

    for (var key in tileMatrixSets) {
        if (Object.prototype.hasOwnProperty.call(tileMatrixSets, key)) {
            tilesMT[key] = this.getCoordsWMTS(tileCoord, bbox, key);
        }
    }

    return tilesMT;
};

Projection.prototype.getCoordsWMTS = function getCoordsWMTS(tileCoord, bbox, tileMatrixSet) {
    var box = this.getCoordWMTS_WGS84(tileCoord, bbox, tileMatrixSet);
    var tilesMT = [];

    for (var row = box[0].row; row < box[1].row + 1; row++) {
        tilesMT.push(new Extent(`WMTS:${tileMatrixSet}`, box[0].zoom, row, box[0].col));
    }

    return tilesMT;
};


/**
 *
 * @param {type} cWMTS
 * @param {type} bbox
 * @returns {Array} coord WMTS array in pseudo mercator
 */
Projection.prototype.WMTS_WGS84ToWMTS_PM = function WMTS_WGS84ToWMTS_PM(cWMTS, bbox) {
    var wmtsBox = [];
    var level = cWMTS.zoom + 1;
    var nbRow = Math.pow(2, level);

    // var sY      = this.WGS84ToY(this.WGS84LatitudeClamp(-Math.PI*0.5)) - this.WGS84ToY(this.WGS84LatitudeClamp(Math.PI*0.5));
    var sizeRow = 1.0 / nbRow;

    var yMin = this.WGS84ToY(this.WGS84LatitudeClamp(bbox.north(UNIT.RADIAN)));
    var yMax = this.WGS84ToY(this.WGS84LatitudeClamp(bbox.south(UNIT.RADIAN)));

    let maxRow;

    const min = yMin / sizeRow;
    const max = yMax / sizeRow;

    const minRow = Math.floor(min);
    // ]N; N+1] => N
    maxRow = Math.ceil(max) - 1;
    // make sure we don't exceed boundaries
    maxRow = Math.min(maxRow, nbRow - 1);

    var minCol = cWMTS.col;
    var maxCol = minCol;

    for (let r = maxRow; r >= minRow; r--) {
        for (let c = minCol; c <= maxCol; c++) {
            wmtsBox.push(new Extent('WMTS:PM', level, r, c));
        }
    }

    return wmtsBox;
};

Projection.prototype.WGS84toWMTS = function WGS84toWMTS(bbox) {
    const dim = bbox.dimensions(UNIT.RADIAN);

    var zoom = Math.floor(Math.log(MathExt.PI / dim.y) / MathExt.LOG_TWO + 0.5);

    var nY = Math.pow(2, zoom);
    var nX = 2 * nY;

    var uX = MathExt.TWO_PI / nX;
    var uY = MathExt.PI / nY;

    const center = bbox.center();
    var col = Math.floor((MathExt.PI + center.longitude(UNIT.RADIAN)) / uX);
    var row = Math.floor(nY - (MathExt.PI_OV_TWO + center.latitude(UNIT.RADIAN)) / uY);

    return new Extent('WMTS:WGS84G', zoom, row, col);
};

Projection.prototype.UnitaryToLongitudeWGS84 = function UnitaryToLongitudeWGS84(u, bbox) {
    const dim = bbox.dimensions(UNIT.RADIAN);
    return bbox.west(UNIT.RADIAN) + u * dim.x;
};

Projection.prototype.UnitaryToLatitudeWGS84 = function UnitaryToLatitudeWGS84(v, bbox) {
    const dim = bbox.dimensions(UNIT.RADIAN);
    return bbox.south(UNIT.RADIAN) + v * dim.y;
};



export default Projection;
