


export function showChildren(){
	this.isExpand = true;
	this.childrenShow = true;

	this.$nextTick(()=>{

		let childrenDom = this.$refs.children;

		childrenDom.style.height = null;
		let height = childrenDom.clientHeight;
		childrenDom.style.height = 0;

		setTimeout(()=>{
			childrenDom.style.height = `${height}px`;
		}, 0);

		setTimeout(()=>{
			childrenDom.style.height = null;//	300 是 css transition 的数据
		}, 300);

	})
}

export function hideChildren(){
	this.isExpand = false;

	let childrenDom = this.$refs.children,
			height = childrenDom.clientHeight;
	
	childrenDom.style.height = `${height}px`;

	setTimeout(()=>{
		childrenDom.style.height = 0;
	}, 0);

	setTimeout(()=>{
		this.childrenShow = false;
	}, 300);
}