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
				myChoose: true, // 我的选择 true|false
			}
		},
		onLoad() {
			this.selectRecord()
		},
		watch: {
			isRecord(isRecord) {
				if(isRecord) {
					// 已记录
					this.recordTip = '今日已记录'
				}else {
					// 未记录
					this.recordTip = '今日未记录'
				}
			}
		},
		methods: {
			// 查询记录
			selectRecord() {
				// 提交日期
				let recordTime = ''
				let time = new Date()
				let month = time.getMonth()+1
				// 拼接年月日
				recordTime = time.getFullYear() + '-' + month + '-' + time.getDate()
				let data = {
					record_time: recordTime
				}
				service.selectRecord(data,(res)=>{
					if(res.data.length>0) {
						this.isRecord = true
					}
				})
			},
			// 处理提交
			handleSubmit() {
				// 提交日期
				let recordTime = ''
				let time = new Date()
				let month = time.getMonth()+1
				// 拼接年月日
				recordTime = time.getFullYear() + '-' + month + '-' + time.getDate()
				// 打包数据
				let data = {
					record_time: recordTime,
					is_survival: this.myChoose?1:0
				}
				// 保存选择
				service.saveRecord(data,(res)=>{
					if(res.data == '新记录插入成功') {
						// 更改标示
						this.isRecord = true
					}
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