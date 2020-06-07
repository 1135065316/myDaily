<template>
	<view>
		<image class="logo" src="/static/logo.png"/>
		<button @tap="toDaily">日常记录</button>
		<button @tap="toSport">自重健身</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
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

<style>
	.logo {
		height: 1rpx;
		width: 1rpx;
	}
</style>