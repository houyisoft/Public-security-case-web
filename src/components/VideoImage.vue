<!-- 组件名称
@module 组件存放位置
@desc 用于前端调起摄像头，实时预览并拍照，生成base64图片保存给父组件
@author 高飞翔
@date 2020年5月8日
@param {Number} [width] - 成像区域宽度
@param {Number} [height] - 成像区域高度
@function startMedia() - 暴露给父组件，用于调取权限打开摄像头，生成实时影像。
@function getImgSrc(index) - 暴露给父组件，用于拍照。参数为拍照序号，区分不同照片展示。返回图片base64地址
@function clearImgSrc() - 暴露给父组件，清除展示照片，继续显示实时影像
@function stopMedia() - 暴露给父组件，用于停止权限关闭摄像头。
@example 调用示例
<video-image ref="video-image" :width="300" :height="200"></video-image>
this.$refs.videoImage.startMedia()
this.$refs.videoImage.stopMedia()
this.$refs.videoImage.getImgSrc(index) -->
<template>
	<div class="camera_outer">
		<!--canvas截取流，不显示-->
		<canvas style="display:none;"
		 id="canvasCamera"
		 :width="width"
		 :height="height"></canvas>
		<!--实时图片展示-->
		<video id="videoCamera"
		 :width="width"
		 :height="height"
		 autoplay></video>
		<!-- 拍照图片展示 -->
		<div v-if="false"
		 class="img_bg_camera">
			<img :src="imgSrc"
			 :style="'width:'+width+'px;height:'+height + 'px;'"
			 class="tx_img">
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			width: {
				default: 500,
				type: Number,
			},
			height: {
				default: 300,
				type: Number,
			}
		},
		data() {
			return {
				imgSrc: '', // 拍照图片

				thisCanvas: null, // canvas对象
				thisContext: null, // canvas执行环境
				thisVideo: null, // video对象
			}
		},
		methods: {
			// 调用权限（打开摄像头功能）
			startMedia() {
				var _this = this
				// 获取canvas对象及执行环境
				this.thisCanvas = document.getElementById('canvasCamera')
				this.thisContext = this.thisCanvas.getContext('2d')
				// 获取video对象
				this.thisVideo = document.getElementById('videoCamera')

				//  navigator.mediaDevices 接口提供访问连接媒体输入的设备，如照相机和麦克风，以及屏幕共享等。旧版本浏览器可能根本没有实现 mediaDevices，我们首先设置一个空对象
				if (navigator.mediaDevices === undefined) {
					navigator.mediaDevices = {}
				}

				// MediaDevices.getUserMedia() 会提示用户给予使用媒体输入的许可，媒体输入会产生一个 MediaStream，里面包含了请求的媒体类型的轨道。此流可以包含一个视频轨道（来自硬件或者虚拟视频源，比如相机、视频采集设备和屏幕共享服务等等）、一个音频轨道（同样来自硬件或虚拟音频源，比如麦克风、A/D转换器等等），也可能是其它轨道类型。
				// 它返回一个 Promise 对象，成功后会 resolve 回调一个 MediaStream 对象。若用户拒绝了使用权限，或者需要的媒体源不可用，promise 会 reject 回调一个 PermissionDeniedError 或者 NotFoundError 。

				// 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia，因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
				if (navigator.mediaDevices.getUserMedia === undefined) {
					navigator.mediaDevices.getUserMedia = constraints => {
						// 首先，如果有getUserMedia的话，就获得它
						var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia // 已废弃，向后兼容

						// 一些浏览器根本没实现它，那么就返回一个 error 到 promise 的 reject 来保持一个统一的接口
						if (!getUserMedia) {
							return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
						}
						// 否则，为老的 navigator.getUserMedia 方法包裹一个 Promise
						return new Promise((resolve, reject) => {
							getUserMedia.call(navigator, constraints, resolve, reject)
						})
					}
				}

				// constraints 作为一个 MediaStreamConstraints 对象，指定了请求的媒体类型和相对应的参数。
				// constraints 参数是一个包含了 video 和 audio 两个成员的 MediaStreamConstraints 对象，用于说明请求的媒体类型。必须至少一个类型或者两个同时可以被指定。如果浏览器无法找到指定的媒体类型或者无法满足相对应的参数要求，那么返回的Promise对象就会处于rejected［失败］状态，NotFoundError作为rejected［失败］回调的参数。 
				var constraints = {
					audio: false,
					video: {
						width: this.width,
						height: this.height,
						transform: 'scaleX(-1)'
					}
				}
				navigator.mediaDevices.getUserMedia(constraints).then(stream => {
					// 旧的浏览器可能没有srcObject
					if ('srcObject' in _this.thisVideo) {
						_this.thisVideo.srcObject = stream
					} else {
						// 避免在新的浏览器中使用它，因为它正在被弃用。
						_this.thisVideo.src = window.URL.createObjectURL(stream)
					}
					_this.thisVideo.onloadedmetadata = (e) => {
						_this.thisVideo.play() // 播放媒体流，一个流包含几个轨道，比如视频和音频轨道。
					}
				}).catch(err => {
					console.log(err)
				})
			},

			//  绘制图片（拍照功能）
			getImgSrc(index) {
				// 点击，canvas画图
				this.thisContext.drawImage(this.thisVideo, 0, 0, this.width, this.height)
				// 获取图片base64链接
				this.imgSrc = this.thisCanvas.toDataURL('image/png')
				return this.imgSrc
			},

			// 清除展示照片，继续显示实时影像
			clearImgSrc() {
				this.imgSrc = ""
			},

			// 关闭摄像头
			stopMedia() {
				// HTMLMediaElement 接口的 srcObject 属性设定或返回一个对象，这个对象提供了一个与HTMLMediaElement关联的媒体源，这个对象通常是 MediaStream ，但根据规范可以是 MediaSource， Blob 或者 File。
				console.log("this.thisVideo.srcObject", this.thisVideo.srcObject);
				if (!this.thisVideo.srcObject) {
					return
				}
				this.thisVideo.srcObject.getTracks()[0].stop()
			},

			// base64转文件
			// dataURLtoFile(dataurl, filename) {
			// 	var arr = dataurl.split(',')
			// 	var mime = arr[0].match(/:(.*?);/)[1]
			// 	var bstr = atob(arr[1])
			// 	var n = bstr.length
			// 	var u8arr = new Uint8Array(n)
			// 	while (n--) {
			// 		u8arr[n] = bstr.charCodeAt(n)
			// 	}
			// 	return new File([u8arr], filename, {
			// 		type: mime
			// 	})
			// },
		},
	}
</script>
<style lang="scss"
 scoped>
	.camera_outer {
		position: relative;
		overflow: hidden;
		background-size: 100%;

		video,
		canvas,
		.tx_img {
			-moz-transform: scaleX(-1);
			-webkit-transform: scaleX(-1);
			-o-transform: scaleX(-1);
			transform: scaleX(-1);
		}

		.img_bg_camera {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			top: 0;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
