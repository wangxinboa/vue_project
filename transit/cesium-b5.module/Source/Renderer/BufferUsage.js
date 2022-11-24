import Enumeration from '../Core/Enumeration.js';

const BufferUsage = {
	/**
	 * DOC_TBA
	 *
	 * @constant
	 * @type {Enumeration}
	 */
	STREAM_DRAW : new Enumeration(0x88E0, "STREAM_DRAW"),
	/**
	 * DOC_TBA
	 *
	 * @constant
	 * @type {Enumeration}
	 */
	STATIC_DRAW : new Enumeration(0x88E4, "STATIC_DRAW"),
	/**
	 * DOC_TBA
	 *
	 * @constant
	 * @type {Enumeration}
	 */
	DYNAMIC_DRAW : new Enumeration(0x88E8, "DYNAMIC_DRAW"),

	/**
	 * DOC_TBA
	 *
	 * @param bufferUsage
	 *
	 * @returns {Boolean}
	 */
	validate : function(bufferUsage) {
		return ((bufferUsage === BufferUsage.STREAM_DRAW) ||
				(bufferUsage === BufferUsage.STATIC_DRAW) ||
				(bufferUsage === BufferUsage.DYNAMIC_DRAW));
	}
};

export default BufferUsage;