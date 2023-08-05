

export default function setHeaderParagraph(type){
	console.clear();
	console.log('setHeaderParagraph type:', type);
	let 
			editor = this.editor,
			range = editor.rangeApi.getRange();
	if( range ){
		let
			{ startContainer, startOffset, endContainer, endOffset } = range,
			oldBlock = editor.nodeApi.getBlock( range.startContainer ),
			block;

		switch (type){
			case 'h1':
			case 'h2':
			case 'h3':
			case 'h4':
				block = editor.objToDom({
					type: 'header',
					level: type,
				});
					break;
			case 'paragraph':
				block = editor.objToDom({
					type: 'paragraph',
				});
				break;
		}

		if( startContainer === oldBlock ){
			startContainer = block;
		}
		if( endContainer === oldBlock ){
			endContainer = block;
		}

		editor.nodeApi.appendChildren(block, oldBlock.childNodes);
		editor.nodeApi.insertAfter(block, oldBlock);
		editor.editorDom.removeChild(oldBlock);
		editor.rangeApi.setNewRange(startContainer, startOffset, endContainer, endOffset);
	}
}