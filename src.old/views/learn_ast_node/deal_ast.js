export function getNewNode(nodeType, parent){
	let node = {
		nodeType,
		children: [],
		code: '',
		selected: false,
		edit: false
	};

	Object.defineProperty(node, "parent", {
		value: parent,
		enumerable: false,
		writable: true
	});

	return node;
}

export function outputAstMessage(astMessage){
	let
		dealedMessage = {
			astTree: astMessage.astTree
		},
		eleLink = document.createElement('a');

	eleLink.download = 'astMessage.json';
	eleLink.style.display = 'none';
		// 字符内容转变成blob地址
	var blob = new Blob([JSON.stringify(dealedMessage, null, 4)]);
	eleLink.href = URL.createObjectURL(blob);
	// 触发点击
	// document.body.appendChild(eleLink);
	document.body.appendChild(eleLink);
	eleLink.click();
	// 然后移除
	document.body.removeChild(eleLink);
}

export function initAstMessageJson(json){
	// console.log('json:', json);
	json.selectedAstNode = [];

	// 为每个树节点添加父节点
	let 
		stack = [json.astTree],
		treeNode;

	while(stack.length > 0){
		let treeNode = stack.pop();

		treeNode.children.forEach((child)=>{

			Object.defineProperty(child, "parent", {
				value: treeNode,
				enumerable: false,
				writable: true
			});

			stack.push(child);

		});
	}

	return json;
}