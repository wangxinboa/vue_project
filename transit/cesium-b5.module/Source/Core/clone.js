
export default function clone(object) {
    if (object === null || typeof object !== 'object') {
        return object;
    }

    var temp = new object.constructor();
    for ( var key in object) {
        if (object.hasOwnProperty(key)) {
            temp[key] = clone(object[key]);
        }
    }

    return temp;
}