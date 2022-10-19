export function paste(div, e){
	e.preventDefault();
	let selection = document.getSelection(),
			range;
	if( selection.type !== 'None' ){
		range = selection.getRangeAt(0);
	}

	if( range ){
		if( range.startContainer !== range.endContainer ){
			throw new Error('range 选择出错');
		}
		let string = (e.clipboardData || window.clipboardData).getData('text');
		string = string.replace(/\n/g, ' ');
		if( range.startContainer === div ){
			let text = document.createTextNode(string);
			this.$refs.label.appendChild(text);
			range.setStart(text, text.length);
			range.setEnd(text, text.length);
		}else if( range.startContainer === div.childNodes[0] ){
			if( range.collapsed ){
				range.startContainer.insertData(range.startOffset, string);
			}else{
				range.startContainer.replaceData(range.startOffset, range.endOffset - range.startOffset ,string);
			}
			let startOffset = range.startOffset;
			range.setStart(div.childNodes[0], startOffset + string.length);
			range.setEnd(div.childNodes[0], startOffset + string.length );
		}
	}
}


export function startEdit(div){
	let 
		selection = document.getSelection(),
		range = document.createRange();

	if( div.childNodes.length > 0 ){
		if( div.childNodes.length === 1 && div.childNodes[0].nodeType === Node.TEXT_NODE ){
			let text = div.childNodes[0]
			range.setStart(text, text.length);
			range.setEnd(text, text.length);
			selection.removeAllRanges();
			selection.addRange(range);
		}else{
			console.log('格式出错');
		}
	}else{
		range.setStart(div, 0);
		range.setEnd(div, 0);
		selection.removeAllRanges();
		selection.addRange(range);
	}
}

export function keydown(div, e, callback){
	switch( e.keyCode ){
		case 13:
			e.preventDefault();
			callback.finishEdit();
			break;
		default:
			break;
	}

}

export function getValue(div){
	if( div.childNodes.length === 0 ){
		return '';
	}else if( div.childNodes.length === 1 && div.childNodes[0].nodeType === Node.TEXT_NODE ){
		return div.childNodes[0].nodeValue;
	}
}

