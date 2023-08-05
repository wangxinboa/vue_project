let transition = '.3s height ease-in-out';

export default {
	name: 'my-collapse-transition',
	functional: true,
	render(h, { children }) {
		const data = {
			on: {
				beforeEnter: function( el ){
					if (!el.dataset){
						el.dataset = {};
					}
					el.style.transition = transition
					el.style.height = '0';
				},
				enter: function( el ){
					el.dataset.oldOverflow = el.style.overflow;
					if (el.scrollHeight !== 0) {
						el.style.height = el.scrollHeight + 'px';
					} else {
						el.style.height = null;
					}
					el.style.overflow = 'hidden';
				},
				afterEnter: function( el ){
					el.style.transition = null;
					el.style.height = null;
					el.style.overflow = el.dataset.oldOverflow;
				},
				beforeLeave: function( el ){
					if (!el.dataset){
						el.dataset = {};
					}
					el.dataset.oldOverflow = el.style.overflow;

					el.style.height = el.scrollHeight + 'px';
					el.style.overflow = 'hidden';
				},
				leave: function( el ){
					if (el.scrollHeight !== 0) {
						el.style.transition = transition;
						el.style.height = 0;
					}
				},
				afterLeave: function( el ){
					el.style.overflow = el.dataset.oldOverflow;

					el.style.transition = null;
					el.style.height = null;
				},
			}
		};

		return h('transition', data, children);
	}
};