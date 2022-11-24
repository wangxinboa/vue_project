import Enumeration from './Enumeration.js';

export default {
    /**
     * Represents that an object is not contained within the frustum.
     *
     * @constant
     * @type {Enumeration}
     */
    OUTSIDE : new Enumeration(-1, "OUTSIDE"),

    /**
     * Represents that an object intersects one of the frustum's planes.
     *
     * @constant
     * @type {Enumeration}
     */
    INTERSECTING : new Enumeration(0, "INTERSECTING"),

    /**
     * Represents that an object is fully within the frustum.
     *
     * @constant
     * @type {Enumeration}
     */
    INSIDE : new Enumeration(1, "INSIDE")
};
