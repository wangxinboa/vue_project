<template>
	<div class="ast_learn_node">
		<div class="prevent_text_overflow node_header">
			<div class="text">{{astLNode.type}}</div>
			<div class="node_header_btns">
				<div class="node_header_btn" title="cache"
					v-on:mousedown="showCacheCode">N</div>
				<div class="node_header_btn" title="cache"
					v-on:mousedown="showCacheCode">C</div>
			</div>
		</div>
		<div class="cache_code"
			v-if="isShowCache">
			<div class="cache_code_tab"
				v-for="cacheMsg in astLNode.cacheAst"
				v-on:mousedown="selectCacheAst(cacheMsg)">
				{{ `${cacheMsg.cacheCodeIndex} ${cacheMsg.astNode.start}-${cacheMsg.astNode.end}` }}	
			</div>
		</div>
		<v-astLNKeyMsg
			v-for="keyMsg in astLNode.keyMsgs"
			:key="keyMsg.key"
			:keyMsg="keyMsg"/>
	</div>
</template>

<script>
	import VAstLNKeyMsg from './key_message';

	export default {
		components: {
			'v-astLNKeyMsg': VAstLNKeyMsg,
		},
		props: {
			astLNode: {
				type: Object
			},
		},
		data(){
			return {
				events: {
					selectcacheast: 'selectcacheast',
				},
				isShowCache: true
			}
		},
		methods: {
			showCacheCode(){
				this.isShowCache = !this.isShowCache;
			},
			selectCacheAst(cacheMsg){
				this.$emit(this.events.selectcacheast, cacheMsg);
			}
		}

	}
</script>