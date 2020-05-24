<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"/>
		{{getCurrentDate()}}
		<!-- 作息区域 -->
		<view class="dflex-column lifeTimePart">
			<view>作息规律</view>
			<view>
				<radio-group @change="handleChange">
					<label><radio :value="true" checked />是</label>
					<label><radio :value="false" />否</label>
				</radio-group>
			</view>
		</view>
		<!-- 运动区域 -->
		<view class="dflex-column sportPart">
			<view>是否运动</view>
			<view>
				<radio-group @change="handleChange1">
					<label><radio :value="true" checked />是</label>
					<label><radio :value="false" />否</label>
				</radio-group>
			</view>
		</view>
		<!-- 心理状态区域 -->
		<view class="dflex-column moodPart">
			<view>心理状态</view>
			<view>
				<radio-group @change="handleChange2">
					<label><radio :value="true" checked />是</label>
					<label><radio :value="false" />否</label>
				</radio-group>
			</view>
		</view>
		<!-- 提交按钮 -->
		<button class="handleBtn" @tap="handleSubmit">点击提交</button>
		<button @tap="getData">获取数据</button>
		<button @tap="clear">清除</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 作息是否规律 bool
				lifeTime: true,
				// 是否运动
				isSport: true,
				// 心理状态是否平常
				mood: true
			}
		},
		onLoad() {

		},
		methods: {
			getCurrentDate() {
				let currentTime = new Date()
				return currentTime.getMonth() + '月' + currentTime.getDate() + '日'
			},
			clear() {
				uni.removeStorage({
					key: 'myLife'
				})
			},
			getData() {
				uni.getStorage({
					key: 'myLife',
					success: function(res) {
						console.log(res.data);
						console.log('获取成功');
					},
					fail: function() {
						console.log('获取失败');
					}
				})
			},
			// 更改作息选择时触发
			handleChange(event) {
				// 更改作息标示
				this.lifeTime = event.detail.value
			},
			// 运动
			handleChange1(event) {
				this.isSport = event.detail.value
			},
			// 心理
			handleChange2(event) {
				this.mood = event.detail.value
			},
			// 处理按钮提交
			handleSubmit() {
				let currentTime = new Date()
				// 准备需要存储的数据
				const data = this.prepareData(currentTime)
				const finalData = {}
				finalData[currentTime.getTime()] = data
				let that = this
				
				uni.getStorage({
					key: 'myLife',
					success: function(res) {
						console.log(res.data);
						console.log('获取成功');
						
						uni.setStorage({
							key: 'myLife',
							data: {
								...res.data,
								...finalData
							},
							success: function () {
								if(that.lifeTime&&that.isSport&&that.mood) {
									// 若提交信息都为true
									uni.showToast({
										title: '提交成功,获得1小时游戏时间',
										icon: 'none'
									})
								}else {
									uni.showToast({
										title: '提交成功,未获得奖励',
										icon: 'none'
									})
								}
								
							},
							fail: function () {
								console.log('存储失败');
							}
						})
					},
					fail: function() {
						console.log('获取失败');
						uni.setStorage({
							key: 'myLife',
							data: finalData,
							success: function () {
								uni.showToast({
									title: '获得1小时游戏时间'
								})
							},
							fail: function () {
								console.log('存储失败');
							}
						})
					}
				})
				
				
			},
			// 返回周几	因为0是周日,所以需要进行处理
			weekDay(weekDay) {
				return ['日','一','二','三','四','五','六'][weekDay]
			},
			// 准备需要存储的数据
			prepareData(currentTime) {
				// 处理时间
				let handledTime = currentTime.getFullYear() + '年' + currentTime.getMonth() + '月' + currentTime.getDate() + '日,' + '周' + this.weekDay(currentTime.getDay()) + ',' + currentTime.getHours() + '时' + currentTime.getMinutes() + '分'
				// 准备数据
				let data = {
					lifeTime: this.lifeTime,
					isSport: this.isSport,
					mood: this.mood,
					handledTime: handledTime,
					year: currentTime.getFullYear(),
					month: currentTime.getMonth()
				}
				return data
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 1rpx;
		width: 1rpx;
	}
	.lifeTimePart {
		border-top: 1rpx solid #999999;
		border-bottom: 1rpx solid #999999;
		width: 100%;
		padding-bottom: 20rpx;
	}
	.sportPart {
		border-bottom: 1rpx solid #999999;
		width: 100%;
		padding-bottom: 20rpx;
	}
	.moodPart {
		border-bottom: 1rpx solid #999999;
		width: 100%;
		padding-bottom: 20rpx;
	}
	.handleBtn {
		margin-top: 30rpx;
		width: 80%;
		background: #0ea6d8;
		color: #fff;
		font-weight: 600;
	}
	.handleBtn::after{ border: none; }
</style>
