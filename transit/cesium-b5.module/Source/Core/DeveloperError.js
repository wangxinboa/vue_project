
/**
* A 2D Cartesian point.
* <br/>
* If either <code>x</code> or <code>y</code> is undefined, then the corresponding
* component will be initialized to 0.0.
*
* @name Cartesian2
* @constructor
*
* @param {Number} x The x-coordinate for the Cartesian type.
* @param {Number} y The y-coordinate for the Cartesian type.
*
* @see Cartesian3
* @see Cartesian4
*/

export default function DeveloperError(message, parameter) {
	/**
	 * "DeveloperError" indicating that this exception was thrown due to a developer error.
	 *
	 * @constant
	 * @type String
	 */
	this.name = "DeveloperError";

	/**
	 * The explanation for why this exception was thrown.
	 *
	 * @type String
	 */
	this.message = message;

	/**
	 * The name of the function argument that caused this exception.
	 *
	 * @type String
	 */
	this.parameter = parameter;
}
