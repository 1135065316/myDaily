<template>
	<view class="dflex-column container">
		<image class="logo" src="/static/logo.png"/>
		<!-- <button @tap="toDaily">日常记录</button>
		<button @tap="toSport">自重健身</button> -->
		<!-- 记录提示 -->
		<text>{{recordTip}}</text>
		<!-- 记录盒子 -->
		<view class="recordBox" v-if="!isRecord">
			<text>存活?</text>
			<radio-group @change='handleRecordChange'>
				<radio :value="true" checked>是</radio>
				<radio :value="false">否</radio>
			</radio-group>
			<button @tap="handleSubmit">提交</button>
		</view>
		<!-- 查看记录历史 -->
		<button>查看历史</button>
	</view>
</template>

<script>
	import service from '@/service.js'
	export default {
		data() {
			return {
				recordTip: '今日未记录',
				isRecord: false, // 今日是否已经记录
				myChoose: null, // 我的选择 true|false
			}
		},
		methods: {
			// 处理提交
			handleSubmit() {
				service.test((res)=>{
					console.log(res);
				})
			},
			// 处理记录改变
			handleRecordChange(event) {
				// 保存我的选择
				this.myChoose = event.detail.value
			},
			toDaily() {
				uni.navigateTo({
				    url: '../myDaily/myDaily'
				})
			},
			toSport() {
				uni.navigateTo({
				    url: '../mySport/mySport'
				})
			}
		}
	}
</script>

<style lang="scss">
	.logo {
		height: 1rpx;
		width: 1rpx;
	}
	.container {
		width: 100vw;
	}
</style>