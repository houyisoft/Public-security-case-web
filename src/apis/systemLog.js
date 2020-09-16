import $axios from '@/apis/index.js'

export default {
	getList(data) {
		return $axios.post('/management/lrBaseLog/list', data)
	},
	outExcel(data) {
		return $axios.post('/management/lrBaseLog/export', data)
	},
	downLoad(data) {
		return $axios.post('/common/downloadExcel', data, {responseType: "arraybuffer"})
	},
	outExcelDetail(data) {
		return $axios.post('/management/lrBaseLog/exportDetail', data, {responseType: 'arraybuffer'}).then((res) => {

			let fileName = res.headers['content-disposition'].match(/fushun(\S*)xls/)[0];
			// fileDownload(res.data,fileName);  //如果用方法一 ，这里需要安装 npm install js-file-download --save ,然后引用 var fileDownload = require('js-file-download')，使用详情见github;
			let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
			let objectUrl = URL.createObjectURL(blob);
			window.location.href = objectUrl;
		}).catch(function (res) {
		});
	}
}

		 // $axios.post('/management/lrBaseLog/exportDetail',  data, { responseType: "arraybuffer" })

		// $axios ( {
		// 	method : 'post',
		// 	url : '/management/lrBaseLog/exportDetail' , // 请求地址
		// 	data :data,
		// 	responseType : 'arraybuffer',
		// 	observe: 'response',
		// } )
		// 	.then ( ( res ) => {
		// 		debugger;
		// 		const fileName = "xx.xlsx";
		// 		let blob = new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
		// 		if ( 'download' in document.createElement ( 'a' ) ) { // 非IE下载
		// 			const elink = document.createElement ( 'a' )
		// 			elink.download = fileName
		// 			elink.style.display = 'none'
		// 			elink.href = URL.createObjectURL ( blob )
		// 			document.body.appendChild ( elink )
		// 			elink.click ()
		// 			URL.revokeObjectURL ( elink.href ) // 释放URL 对象
		// 			document.body.removeChild ( elink )
		// 		} else { // IE10+下载
		// 			navigator.msSaveBlob ( blob, fileName )
		// 		}
		// 	})
