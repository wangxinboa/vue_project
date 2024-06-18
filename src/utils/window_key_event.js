
export const WindowKey = {

	Space: 'Space'
}

class WindowKeydownEventOperations{

	operationMap = new Map();

	addOperation( key, callback ){

		if( typeof WindowKey[key] !== 'string' ){

			throw new Error(`还没有准备该事件的执行 ${ key }`);
		}

		if( this.operationMap.has( key ) ){

			throw new Error(`目前每个事件只能添加注册一次执行函数`);
		}else{

			this.operationMap.set( key, callback );
		}
	}

	execute( key ){

		this.operationMap.get( key )();
	}
}

let nowOperations = null;

const windowKeydownEventOperationsMap = new Map();

window.addEventListener('keydown', windowKeydownEvent);
function windowKeydownEvent( e ){

	// console.log('windowKeydownEvent')
	// console.log('e:', e);
	// console.log('e.code:', e.code);
	// console.log('e.ctrlKey:', e.ctrlKey);
	// console.log('e.metaKey:', e.metaKey);
	if( nowOperations === null ){

		return;
	}

	switch( e.code ){

		case 'Space':

			nowOperations.execute( WindowKey.Space );
			break;
	}
}


const WindowKeyEvent = {

	addOperations( name, isUse = true ){

		if( windowKeydownEventOperationsMap.has( name ) ){

			throw new Error(`已存在该名称的操作集, 请换一个名称`);
		}else{

			const windowKeydownEventOperations = new WindowKeydownEventOperations();
			windowKeydownEventOperationsMap.set( name, windowKeydownEventOperations );

			if( isUse ){

				this.useOperations( windowKeydownEventOperations );
			}

			return windowKeydownEventOperations;
		}
	},

	getOperations( name ){

		if( windowKeydownEventOperationsMap.has( name ) ){

			return windowKeydownEventOperationsMap.get( name );
		}else{

			throw new Error(`该名称操作集不存在, 请先添加`);
		}
	},

	useOperationsByName( name ){

		if( windowKeydownEventOperationsMap.has( name ) ){

			this.useOperations( windowKeydownEventOperationsMap.get( name ) );
		}else{

			throw new Error(`该名称操作集不存在, 请先添加`);
		}
	},

	useOperations( operations ){

		if( !(operations instanceof WindowKeydownEventOperations) ){

			throw new Error(`传入参数有误, 不是 WindowKeydownEventOperations`);
		}
		nowOperations = operations;

		return this;
	},

	nonuseOperations(){

		nowOperations = null;
	},

	clear(){

		windowKeydownEventOperationsMap.clear();
	}
};

export default WindowKeyEvent;
