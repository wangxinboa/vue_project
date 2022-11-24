export const defineLayerProperty = function defineLayerProperty(layer, propertyName, defaultValue, onChange) {
	const existing = Object.getOwnPropertyDescriptor(layer, propertyName);
	if (!existing || !existing.set) {
		var property = layer[propertyName] == undefined ? defaultValue : layer[propertyName];
		Object.defineProperty(layer, propertyName,
			{ 
				get: () => property,
				set: (newValue) => {
					if (property !== newValue) {
						const event = { type: `${propertyName}-property-changed`, previous: {}, new: {} };
						event.previous[propertyName] = property;
						event.new[propertyName] = newValue;
						property = newValue;
						if (onChange) {
							onChange(layer, propertyName);
						}
						layer.dispatchEvent(event);
					}
				} 
			});
	}
};

function GeometryLayer(i) {
	this._attachedLayers = [];

	Object.defineProperty(this, 'id', {
		value: i,
		writable: false,
	});
}

GeometryLayer.prototype = Object.create(THREE.EventDispatcher.prototype);
GeometryLayer.prototype.constructor = GeometryLayer;

GeometryLayer.prototype.attach = function attach(layer) {
	if (!layer.update) {
		throw new Error(`Missing 'update' function -> can't attach layer ${layer.id}`);
	}
	this._attachedLayers.push(layer);
};

GeometryLayer.prototype.detach = function detach(layer) {
	const count = this._attachedLayers.length;
	this._attachedLayers = this._attachedLayers.filter(attached => attached.id != layer.id);
	return this._attachedLayers.length < count;
};

function Layer(id) {
	Object.defineProperty(this, 'id', {
		value: id,
		writable: false,
	});
}

Layer.prototype = Object.create(THREE.EventDispatcher.prototype);
Layer.prototype.constructor = Layer;

const ImageryLayers = {
	// move layer to new index
	// After the modification :
	//      * the minimum sequence will always be 0
	//      * the maximum sequence will always be layers.lenght - 1
	// the ordering of all layers (Except that specified) doesn't change
	moveLayerToIndex: function moveLayerToIndex(layer, newIndex, imageryLayers) {
		newIndex = Math.min(newIndex, imageryLayers.length - 1);
		newIndex = Math.max(newIndex, 0);
		const oldIndex = layer.sequence;

		for (const imagery of imageryLayers) {
			if (imagery.id === layer.id) {
				// change index of specified layer
				imagery.sequence = newIndex;
			} else if (imagery.sequence > oldIndex && imagery.sequence <= newIndex) {
				// down all layers between the old index and new index (to compensate the deletion of the old index)
				imagery.sequence--;
			} else if (imagery.sequence >= newIndex && imagery.sequence < oldIndex) {
				// up all layers between the new index and old index (to compensate the insertion of the new index)
				imagery.sequence++;
			}
		}
	},

	moveLayerDown: function moveLayerDown(layer, imageryLayers) {
		if (layer.sequence > 0) {
			this.moveLayerToIndex(layer, layer.sequence - 1, imageryLayers);
		}
	},

	moveLayerUp: function moveLayerUp(layer, imageryLayers) {
		const m = imageryLayers.length - 1;
		if (layer.sequence < m) {
			this.moveLayerToIndex(layer, layer.sequence + 1, imageryLayers);
		}
	},

	getColorLayersIdOrderedBySequence: function getColorLayersIdOrderedBySequence(imageryLayers) {
		const copy = Array.from(imageryLayers);
		copy.sort((a, b) => a.sequence - b.sequence);
		return copy.map(l => l.id);
	},
};

export { GeometryLayer, Layer, ImageryLayers };
