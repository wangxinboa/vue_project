<template>
	<div class="attribute_message">
		<div class="attr_name prevent_text_overflow">{{attrName}}</div>
		<div class="item_size prevent_text_overflow">{{attr.itemSize}}</div>
		<div class="type prevent_text_overflow" v-if="attr.isInterleavedBufferAttribute">
			isInterleavedBufferAttribute
		</div>
		<div class="type prevent_text_overflow" v-else-if="attr.isInstancedBufferAttribute">
			isInstancedBufferAttribute
		</div>
		<div class="type prevent_text_overflow" v-else-if="attr.isBufferAttribute">
			isBufferAttribute
		</div>
		<div class="type prevent_text_overflow" v-else-if="attr.isGLBufferAttribute">
			isGLBufferAttribute
		</div>
		<div class="type prevent_text_overflow" v-else>
			不知道的属性类型
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			attr: {
				type: Object,
			},
			attrName: {
				type: String,
			}
		}
	}
</script>

<style lang="less">
	.attribute_message{
		display: flex;
		font-size: 0.12rem;
		color: #cccccc;
		>.attr_name{
			width: 0.6rem;
		}
		>.item_size{
			width: 0.4rem;
		}
		>.type{
			width: 0;
			flex: 1;
		}
	}
</style>