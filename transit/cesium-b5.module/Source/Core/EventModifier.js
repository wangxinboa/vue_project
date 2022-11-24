import Enumeration from './Enumeration.js';

export default {
	/**
	 * Represents the shift key being held down.
	 *
	 * @constant
	 * @type {Enumeration}
	 */
	SHIFT : new Enumeration(0, "SHIFT"),

	/**
	 * Represents the control key being held down.
	 *
	 * @constant
	 * @type {Enumeration}
	 */
	CTRL : new Enumeration(1, "CTRL"),

	/**
	 * Represents the alt key being held down.
	 *
	 * @constant
	 * @type {Enumeration}
	 */
	ALT : new Enumeration(2, "ALT")
};