
export const WindowKey = {

	Space: 'Space'

}

export default class WindowKeyEvent{

	constructor(){

		this.allEventsMap = new Map();
		this.events = this.events.bind(this);
		window.addEventListener('keydown', this.events);
	}

	events( e ){
		const fun = this.allEventsMap.get(e.code);

		if( fun ){
			fun();
		}
	}

	addEvent( key, fun){

		this.allEventsMap.set( key, fun );
	}

	destroy(){
		this.allEventsMap.clear();
		window.removeEventListener('keydown', this.events);
	}

}