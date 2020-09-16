<!-- 刷卡模拟输入框 -->
<template>
	<div class="base-scan-card"
	 @click="scanCard">
		<span>请刷卡</span>
		<img class="card-icon"
		 :src="require('@/assets/Case/CaseEntry/cardIcon.png')"></img>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
				type: String,
				default: 'cardNo'
			}
		},
		methods: {
			scanCard() {
				this.$emit('onScanCard', this.value)
			}
		}
	}
</script>

<style scoped
 lang="scss">
	.base-scan-card {
		position: relative;
		width: 100%;
		padding: 0 10px 0 14px;
		height: 32px;
		line-height: 32px;
		border: 1px solid rgba(222, 222, 222, 1);
		border-radius: 4px;
		font-size: 12px;
		color: rgba(153, 153, 153, 1);
		cursor: pointer;

		.card-icon {
			width: 32px;
			height: 26px;
			position: absolute;
			top: 0;
			bottom: 0;
			right: 10px;
			margin: auto;
		}
	}
</style>
