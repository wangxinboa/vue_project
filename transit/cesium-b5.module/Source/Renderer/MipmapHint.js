import Enumeration from '../Core/Enumeration.js';

const MipmapHint = {
	/**
	 * DOC_TBA
	 *
	 * @constant
	 * @type {Enumeration}
	 */
	DONT_CARE : new Enumeration(0x1100, "DONT_CARE"),

	/**
	 * DOC_TBA
	 *
	 * @constant
	 * @type {Enumeration}
	 */
	FASTEST : new Enumeration(0x1101, "FASTEST"),

	/**
	 * DOC_TBA
	 *
	 * @constant
	 * @type {Enumeration}
	 */
	NICEST : new Enumeration(0x1102, "NICEST"),

	/**
	 * DOC_TBA
	 *
	 * @param mipmapHint
	 *
	 * @returns {Boolean}
	 */
	validate : function(mipmapHint) {
		return ((mipmapHint === MipmapHint.DONT_CARE) ||
				(mipmapHint === MipmapHint.FASTEST) ||
				(mipmapHint === MipmapHint.NICEST));
	}
};

export default MipmapHint;