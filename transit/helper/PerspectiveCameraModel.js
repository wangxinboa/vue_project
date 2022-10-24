import {
	Vector3,
	Camera,
	BufferGeometry,
	MeshBasicMaterial,
	Mesh,
	Float32BufferAttribute,
	DoubleSide

} from 'three';

const _vector = /*@__PURE__*/ new Vector3();
let _camera = /*@__PURE__*/ new Camera();

export default class PerspectiveCameraModel extends Mesh {
	constructor(perspectiveCamera){
		let 
			geometry = new BufferGeometry(),
			material = new MeshBasicMaterial({
				transparent: true,
				opacity: 0.4,
				color: 0xffff00,
				side: DoubleSide
			}),

			vertices = [
				// near
				0,0,0, 0,0,0, 0,0,0, 0,0,0,
				// far
				0,0,0, 0,0,0, 0,0,0, 0,0,0,
			],
			indices = [1,0,3, 0,2,3, 5,7,4, 7,6,4],

			project ;



		geometry.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		geometry.setIndex( indices );
		super(geometry, material);
		this.type = 'PerspectiveCameraModel';
		this.camera = perspectiveCamera;

		this.camera.updateProjectionMatrix();
		this.camera.matrixWorld.matrixAutoUpdate = false;

		this.geometry = geometry;
		this.material = material;
		this.update();
	}
	update(){
		const position = this.geometry.getAttribute('position');
		// _camera = this.camera;

		updatePosition(position, this.camera, 0, -1, 1, -1);
		updatePosition(position, this.camera, 1, 1, 1, -1);
		updatePosition(position, this.camera, 2, -1, -1, -1);
		updatePosition(position, this.camera, 3, 1, -1, -1);

		updatePosition(position, this.camera, 4, -1, 1, 1);
		updatePosition(position, this.camera, 5, 1, 1, 1);
		updatePosition(position, this.camera, 6, -1, -1, 1);
		updatePosition(position, this.camera, 7, 1, -1, 1);

		position.needsUpdate = true;

		// console.log('position:', position);
	}
	dispose(){
		this.geometry.dispose();
		this.material.dispose();
	}
}

function updatePosition(position, camera, index, x, y, z){
	// console.log('camera:', camera);
	_vector.set( x, y, z ).unproject( camera );
	// console.log('x:', _vector.x, 'y:', _vector.y, 'z:', _vector.z);
	// _vector.applyMatrix4(camera.matrixWorld);
	console.log('x:', _vector.x, 'y:', _vector.y, 'z:', _vector.z);
	position.setXYZ( index, _vector.x, _vector.y, _vector.z );
}


