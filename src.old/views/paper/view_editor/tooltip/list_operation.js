
export default function listOperation(labelType){
	console.clear();
	console.log('addList labelType:', labelType);
	let 
			editor = this.editor,
			range = editor.rangeApi.getRange();
	if( range && range.collapsed ){
		let
			{ startContainer, startOffset, endContainer, endOffset } = range,
			oldBlock = editor.nodeApi.getBlock( range.startContainer ),
			block;
		// console.log("oldBlock.className === 'list':", oldBlock.className === 'list');
		console.log('startContainer:', startContainer);
		console.log('startOffset:', startOffset);
		if( oldBlock.className === 'list' ){
			let oldLabel = oldBlock.getAttribute('label');
			if( oldLabel === 'custom'  ){
				let container = editor.nodeApi.getContainer(startContainer);
				if( container.className === 'label' ){
					if( container.nextSibling.childNodes.length ){
						editor.rangeApi.setRangeOfNodeStart(container.nextSibling, true);
					}else{
						editor.rangeApi.setNewCollapsedRange(container.nextSibling, 0);
					}
				}else{
					editor.rangeApi.setNewCollapsedRange(startContainer, startOffset);
				}
			}else{
				editor.rangeApi.setNewCollapsedRange(startContainer, startOffset);
			}
			editor.resetListLabel(oldBlock, labelType);
		}else{

			block = editor.objToDom({
				type: 'list',
				label: labelType,
				data: [
					[]
				]
			});

			editor.nodeApi.insertAfter(block, oldBlock);
			editor.rangeApi.setNewCollapsedRange(block.childNodes[0].childNodes[1] , 0);
			console.log('block.childNodes[0].childNodes[1]:', block.childNodes[0].childNodes[1])
		}
	}

}