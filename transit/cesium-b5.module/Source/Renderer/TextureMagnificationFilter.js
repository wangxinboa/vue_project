import Enumeration from '../Core/Enumeration.js';

const TextureMagnificationFilter = {
	/**
	 * DOC_TBA
	 *
	 * @constant
	 * @type {Enumeration}
	 */
	NEAREST : new Enumeration(0x2600, "NEAREST"),

	/**
	 * DOC_TBA
	 *
	 * @constant
	 * @type {Enumeration}
	 */
	LINEAR : new Enumeration(0x2601, "LINEAR"),

	/**
	 * DOC_TBA
	 *
	 * @param textureMagnificationFilter
	 *
	 * @returns {Boolean}
	 */
	validate : function(textureMagnificationFilter) {
		return ((textureMagnificationFilter === TextureMagnificationFilter.NEAREST) ||
				(textureMagnificationFilter === TextureMagnificationFilter.LINEAR));
	}
};

export default TextureMagnificationFilter;