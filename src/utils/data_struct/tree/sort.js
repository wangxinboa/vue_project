export default function(compare){
	return this.forEachBR((node)=>{
		if( node.children ){
			node.children.sort(compare);
		}
	});
	return this;
}