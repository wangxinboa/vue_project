import Vue from 'vue'
import Message from './message.vue'

let MessageConstructor = Vue.extend( Message ),
		instances = [],
		instance = null,
		seed = 1

export default {

	show(options){
		let userOnClose = options.onClose,
				id = 'message_' + seed++;
		options.onClose = ()=>{
			this.close( id, userOnClose );
		}

		instance = new MessageConstructor({
			data: options
		});
		instance.id = id;
		instance.$mount();

		let verticalOffset = options.offset || 20;
		instances.forEach((item)=>{
			verticalOffset += item.$el.offsetHeight + 16;
		});
		instance.verticalOffset = verticalOffset;

		instances.push( instance );
	},
	close( id, userOnClose ){
		let len = instances.length ,
				index = -1 ,
				removedHeight;
		for( let i = 0; i < len; i++ ){
			if( id === instances[i].id ){
				removedHeight = instances[i].$el.offsetHeight;
				index = i;
				if( typeof userOnClose === 'function' ){
					userOnClose( instances[i] );
				}
				instances.splice( i, 1 );
				break ;
			}
		}
		if( len <= 1 || index === -1 || index > instances.length - 1 ){
			return;
		}
		for( let i = index; i < len - 1 ; i++ ){
			let dom = instances[i].$el;
			dom.style['top'] = parseInt( dom.style[ 'top' ], 10 ) - removedHeight - 16 + 'px';
		}
	}
}