/**
 * @desc WebGl Texture implementation in JS
 * @param {Object} texture
 * @param {Array} size
 * @param {Object|Array} dimensions
 * @param {Array} output
 * @param {Object} context
 * @param {String} [type]
 */
class Texture {
	constructor(texture, size, dimensions, output, context, type = 'NumberTexture') {
		this.texture = texture;
		this.size = size;
		this.dimensions = dimensions;
		this.output = output;
		this.context = context;
		this.kernel = null;
		this.type = type;
	}

	/**
	 * @desc Converts the Texture into a JavaScript Array.
	 * @param {GPU} gpu Object
	 */
	toArray(gpu) {
		if (!gpu) throw new Error('You need to pass the GPU object for toArray to work.');
		if (this.kernel) return this.kernel(this);

		this.kernel = gpu.createKernel(function(x) {
			return x[this.thread.z][this.thread.y][this.thread.x];
		}).setOutput(this.output);

		return this.kernel(this);
	}

	/**
	 * @desc Deletes the Texture
	 */
	delete() {
		return this.context.deleteTexture(this.texture);
	}
}

module.exports = {
	Texture
};