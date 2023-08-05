import now from '../basic/now.js'

export default function simpleAnimation({
	delay = 0,
	duration = 1000,
	onStart = ()=>{},
	onUpdate = ()=>{},
	onComplete = ()=>{},
}){
	let
		startTime = now() + delay,
		endTime = startTime + duration,
		hasStart = false,
		percentage = 0,
		animationId = requestAnimationFrame(doAnimation)

	function doAnimation(){

		let time = now();
		percentage = time < startTime ? -1 : 
								time === startTime ? 0 : 
								time >= endTime ? 1:
								(time - startTime) / duration;

	if( percentage === 1 ){
			onUpdate(percentage);
			onComplete( percentage );
			cancelAnimationFrame(animationId)
		}else{
			if( percentage >= 0 ){
				if( !hasStart ){
					onStart(percentage);
					hasStart = true;
				}
				onUpdate(percentage);
			}
			animationId = requestAnimationFrame(doAnimation)
		}
	}

	let controls = {
		cancelAnimation(){
			cancelAnimationFrame(animationId);
		},
		addDuration(add){
			endTime += add;
		}
	}

	return controls;
}