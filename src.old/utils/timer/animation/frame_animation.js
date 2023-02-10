
export default function frameAnimation({
	frame = 60,
	delay = 0,
	onStart = ()=>{},
	onUpdate = ()=>{},
	onComplete = ()=>{},
}){
	let
		startFrame = delay,
		endFrame = delay + frame,
		nowFrame = 0,
		hasStart = false,
		animationId = requestAnimationFrame(doAnimation)

	function doAnimation(){

		if( nowFrame >= endFrame ){
			onUpdate(nowFrame);
			onComplete( nowFrame );
			cancelAnimationFrame(animationId);
		}else if(nowFrame >= startFrame){
			if( !hasStart ){
				onStart(nowFrame);
				hasStart = true;
			}
			onUpdate(nowFrame);
			animationId = requestAnimationFrame(doAnimation)
		}
		nowFrame++
	}

	let controls = {
		cancelAnimation(){
			cancelAnimationFrame(animationId);
		},
		addFrame(add){
			endFrame += add;
		}
	}

	return controls;
}