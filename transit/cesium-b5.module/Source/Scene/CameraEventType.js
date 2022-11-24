import Enumeration from '../Core/Enumeration.js';


/**
 * DOC_TBA
 *
 * @exports CameraEventType
 */
export default {
	/**
	 * DOC_TBA
	 *
	 * @constant
	 * @type {Enumeration}
	 */
	LEFT_DRAG : new Enumeration(0, "LEFT_DRAG"),

	/**
	 * DOC_TBA
	 *
	 * @constant
	 * @type {Enumeration}
	 */
	RIGHT_DRAG : new Enumeration(1, "RIGHT_DRAG"),

	/**
	 * DOC_TBA
	 *
	 * @constant
	 * @type {Enumeration}
	 */
	MIDDLE_DRAG : new Enumeration(2, "MIDDLE_DRAG"),

	/**
	 * DOC_TBA
	 *
	 * @constant
	 * @type {Enumeration}
	 */
	WHEEL : new Enumeration(3, "WHEEL")
};
