
import { downloadText } from '@utils/download.js';

// 将节点转化为可提取的对象信息
function nodeToMessage(node){
	let message = {};

	switch( node.type ){
		case 'Scene':
		case 'Object3D':
		case 'Group':
		case 'Mesh':
			message = {
				type: node.type,
				name: node.name,
				position: node.position,
				rotation: {
					_x: node.rotation._x,
					_y: node.rotation._y,
					_z: node.rotation._z,
					_order: node.rotation._order,
				},
				scale: node.scale,
				children: [],
			}
			if( node.geometry ){
				message.geometry = node.geometry.toJSON();
				delete message.geometry.uuid;
				delete message.geometry.metadata;
				delete message.geometry.data.boundingSphere;
			}
			break;

		default:
			console.error('unknow node type:', node);
			break;
	}

	if( node.children ){
		node.children.forEach((chilNode)=>{

			message.children.push( nodeToMessage(chilNode) );
		});
	}
	return message;
}


export default function downloadScene( node ){
	console.log('downloadScene');
	console.log('node:', node);
	// downloadText(
	// 	node.name ? `${node.name}.json` : `${node.type}.json`,
	// 	JSON.stringify( nodeToMessage( node ) )
	// );
}