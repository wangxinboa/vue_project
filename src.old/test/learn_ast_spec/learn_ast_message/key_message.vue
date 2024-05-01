<template>
	<div class="ast_learn_node_key_msg">
		<div class="msg_header">
			<div class="title">
				<div class="key">{{keyMsg.key}}</div>
				<div class="is_array" v-if="keyMsg.isArray">[]</div>
				<div class="value_type">{{keyMsg.valueType}}</div>
				<div class="data_type"
					v-if="keyMsg.hasSimpleData()"
					v-on:mousedown="changeSimpleDataType(keyMsg)">{{keyMsg.SimpleDataType}}</div>
			</div>
			<div class="btns"></div>
		</div>
		<div class="values"
			v-if="keyMsg.isAstData()">
			<div class="tag ast"
				v-for="astLNData in keyMsg.value"
				v-on:mousedown="changeNew(astLNData)">
				<div class="is_new" v-if="astLNData.isNew"></div>
				{{astLNData.data.type}}
			</div>
		</div>

		<div class="values"
			v-else-if="keyMsg.isSimpleData()">
			<div class="tag simple"
				v-for="astLN in keyMsg.value"
				v-on:mousedown="changeNew(astLN)">
				<div class="is_new" v-if="astLN.isNew"></div>
				{{astLN.data}}
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		props: {
			keyMsg: {
				type: Object,
			}
		},
		data(){
			return {
				events: {
					selectastln: 'selectastln',
				}
			}
		},
		methods: {
			changeSimpleDataType(keyMsg){
				keyMsg.changeSimpleDataType();
			},
			changeNew(astLNData){
				astLNData.isNew = !astLNData.isNew;
			}
		}
	}
</script>