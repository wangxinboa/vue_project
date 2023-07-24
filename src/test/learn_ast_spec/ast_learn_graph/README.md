type AstLG = {

	nodes: AstLNode[];
	nodesMap: Map<AstLNode.type, AstLNode>;

	cacheCode: string[];
	cacheCodeIndex: number;
}

tyep AstLNode = {

	graph: AstLG;

	type: string; 				// 节点类型
	keyMsgs: KeyMsg[];		// 各个属性信息
	nodesMap: Map<AstLNode.type, AstLNode>;
}

tyep AstKeyMsg = {

	AstLG: AstLG;

	key: string; 								// 键值
	isArray: boolean;
	intro: string; 							// 文字说明
	dataType: SimpleDataTypes; 	// 类型说明，是取指还是取数据类型
	value: KeyValue;

	codeTemplate: string[]; 		// 代码模板
}

const SimpleDataTypeFlag = {
	TYPE: 'TYPE';
	VALUE: 'VALUE';
}

const PropertyValueTypeFlag = {
	Ast: 'Ast',
	Simple: 'Simple',
	Object: 'Object'
}

<!-- 数组、对象、简单数据 -->
tyep AstKeyData = {
	data
}



