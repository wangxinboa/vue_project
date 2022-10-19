// eachBreathRoot 广度优先，从根部开始遍历
export function eachBR(callback){
	let
		node = this,
		index = -1,
		children,
		row = [node],
		i = 0,
		nextRow = [];

	while(node = row[i++]){
		callback(node, ++index);
		if(children = node.children){
			for(let j = 0, len = children.length; j < len; j++){
				nextRow.push(children[j]);
			}
		}
		if( row.length === i ){
			row = nextRow;
			i = 0;
			nextRow = [];
		}
	}
	return this;
}

// eachBreathBottom 广度优先，从底部开始遍历
export function eachBB(callback){
	let
		node = this,
		index = -1,
		children,
		i = 0,
		row = [node],
		nextRow = [],
		rows = [];

	while(node = row[i++]){
		if(children = node.children){
			for(let j = 0, len = children.length; j < len; j++){
				nextRow.push(children[j]);
			}
		}
		if( row.length === i ){
			rows.push(row);
			row = nextRow;
			i = 0;
			nextRow = [];
		}
	}

	while(row = rows.pop()){
		row.forEach((node)=>{
			callback(node, ++index);
		})
	}

	return this;
}