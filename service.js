// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
const web_url = "https://www.shitouji.ltd/index.php?datatype=json&";


// 保存每日记录
const saveRecord = function(data,callback) {
	// let url = web_url + "ctrl=sjapp&action=svorder&@random@&datatype=json";
	let url = "http://www.sword-z.xyz/mydaily/saveRecord?datatype=json&";
	requestGet(url,data,(res)=>{
		callback(res);
	})
}
// 查询指定的记录
const selectRecord = function(data,callback) {
	// let url = web_url + "ctrl=sjapp&action=svorder&@random@&datatype=json";
	let url = "http://www.sword-z.xyz/mydaily/selectrecord?datatype=json&";
	requestGet(url,data,(res)=>{
		callback(res);
	})
}


const requestGet = function(url, data, callback) {
	uni.request({
		url: url,
		data: data,
		header: {
			'custom-header': 'application/json'
		},
		success: (res) => {
			callback(res)
		},
		// 没用，要去manifest.json里面配置，因为manifest.json里的timeout不设置的话，默认值是30秒
		// timeout: 100,
		
		fail: (res) => {
			if (res.errMsg == "request:fail timeout") {
				uni.showToast({
					icon: 'none',
					title: "408网络超时，请检查网络连接后重试，如仍无响应请联系上级",
					duration: 1500
				})
			} else if (res.errMsg == "request:fail abort statusCode:-1") {
				uni.showToast({
					icon: 'none',
					title: "404网络连接失败，请检查网络连接后重试，如仍无响应请联系上级",
					duration: 1500
				})
			} else {
				uni.showToast({
					icon: 'none',
					title: "未知网络错误：" + res.errMsg,
					duration: 1500
				})
			}
			callback(res)

		},
	})
}
const requestPost = function(url, data, callback) {
	uni.request({
		url: url,
		data: data,
		method: "POST",
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		success: (res) => {
			callback(res)
		},
		fail: (res) => {
			if (res.errMsg == "request:fail timeout") {
				uni.showToast({
					icon: 'none',
					title: "408网络超时，请检查网络连接后重试，如仍无响应请联系上级",
					duration: 1500
				})
			} else if (res.errMsg == "request:fail abort statusCode:-1") {
				uni.showToast({
					icon: 'none',
					title: "404网络连接失败，请检查网络连接后重试，如仍无响应请联系上级",
					duration: 1500
				})
			} else {
				uni.showToast({
					icon: 'none',
					title: "未知网络错误：" + res.errMsg,
					duration: 1500
				})
			}
			callback(res)
		
		}
	})
}


export default {
	saveRecord,
	selectRecord
}
