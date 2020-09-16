<template>
    <div class="dressdio">
        <el-dialog
            title="换衣拍照"
            width="1200px"
            :close-on-click-modal="false"
            :visible="isShow"
            @close="closeDialog"
        >
            <div
                class="left-name"
                style="color:#FBB95C"
            >{{peopleObj ? peopleObj.personnelType : ''}} - {{peopleObj ? peopleObj.name : ''}}</div>
            <el-row :gutter="24">
                <el-col :span="10">
                    <div class="left-title" style="line-height:40px">换衣后</div>

                    <el-row :gutter="10" class="left-img-wrap">
                        <el-col :span="6" v-for="(item, index) in photoList" :key="index">
                            <div class="left-img-label">{{item.position}}</div>
                            <base-image
                                :src="item.value"
                                :index="index"
                                @onBaseImageDeleteImg="deletePhoto"
                                @onBaseImageAddImg="setImage"
                            ></base-image>
                        </el-col>
                    </el-row>
                    <div class="left-remark">
                        <div class="remark-label" style="line-height:40px">备注</div>
                        <el-input
                            class="remark-value"
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="remark"
                            show-word-limit
                        ></el-input>
                    </div>
                </el-col>
                <el-col :span="14">
                    <el-row :gutter="24">
                        <el-col :span="8">
                        </el-col>
                        <el-col :span="16">
                            <div class="right-title">实时影像信息</div>
                            <div class="camera_outer" style="margin-left:20px;margin-top:15px;">
                                <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
                                <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
                                <div v-if="imgSrc" class="img_bg_camera">
                                <p>效果预览</p>
                                <img :src="imgSrc" alt class="tx_img" />
                                </div>
                                <div class="button" style="margin-top:15px;">
                                <el-button @click="getCompetence()">打开摄像头</el-button>
                                <el-button @click="stopNavigator()">关闭摄像头</el-button>
                                <!-- <el-button @click="setImage()">拍照</el-button> -->
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <div style="text-align:right;margin-top:20px">
                <el-button class="right-btn" type="primary" @click="postDressPhotoFormData">保存</el-button>
                <el-button class="right-btn" @click="closeDialog">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import caseinfo from "@/apis/wywcase.js";
export default {
    components: {  },
    props: ["isShow", "peopleObj"],
    watch: {
        isShow(val) {
            if (val) {
                this.$nextTick(e => {
                    if (this.peopleObj.isChangeClothes == "是") {
                        caseinfo
                            .hypzMain({
                                personsId: this.peopleObj.fid
                            })
                            .then(res => {
                                if (res.code == 0) {
                                    const row = res.rows[0];
                                    const {
                                        picture05: frontImg,
                                        picture06: backImg,
                                        picture07: leftImg,
                                        picture08: rightImg,
                                        fdescription: remark,
                                        fid
                                    } = row;
                                    this.fid = fid;
                                    this.remark = remark;
                                    const result = [
                                        frontImg,
                                        backImg,
                                        leftImg,
                                        rightImg
                                    ];
                                    this.photoList.forEach((item, index) => {
                                        item.value = result[index];
                                    });
                                }
                            });
                    } else {
                        this.reset();
                    }
                });
            }
        }
    },
    mounted() {},
    data() {
        return {
            photoList: [
                { position: "前", field: "frontImg", value: "" },
                { position: "后", field: "backImg", value: "" },
                { position: "左", field: "leftImg", value: "" },
                { position: "右", field: "rightImg", value: "" }
            ],
            remark: "",
            fid: "",
            videoWidth: 550,
            videoHeight: 350,
            imgSrc: "",
            thisCancas: null,
            thisContext: null,
            thisVideo: null,
            openVideo:false
        };
    },
    methods: {
    // 调用权限（打开摄像头功能）
    getCompetence() {
      var _this = this;
      _this.thisCancas = document.getElementById("canvasCamera");
      _this.thisContext = this.thisCancas.getContext("2d");
      _this.thisVideo = document.getElementById("videoCamera");
      _this.thisVideo.style.display = 'block';
      // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {//不存在则报错
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)"
        }
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in _this.thisVideo) {
            _this.thisVideo.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream);
          }
          _this.thisVideo.onloadedmetadata = function(e) {
            _this.thisVideo.play();
          };
        })
        .catch(err => {
          console.log(err);
        });
    },
    //  绘制图片（拍照功能）
	setImage(index) {
        debugger
      var _this = this;
      // canvas画图
      _this.thisContext.drawImage(
        _this.thisVideo,
        0,
        0,
        _this.videoWidth,
        _this.videoHeight
      );
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL("image/png");
      caseinfo.upLoadImageBase64({
					infoType:'register',
					imageBase64:image
					}).then(res=>{
                    debugger
                    this.photoList[index].value = res.msg;//赋值并预览图片
                    });
    },
    // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop();
    },
    // base64转文件，此处没用到
    dataURLtoFile(dataurl, filename) {
        debugger
     //将base64转换为文件
      var arr = dataurl.split(",");
      if(arr.length>1){
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
      }
    },
        reset() {
            for (const item of this.photoList) {
                item.value = "";
            }
            this.remark = "";
        },
        closeDialog() {
            
            this.$emit("onCloseDialog");
        },
        createAddPromise(item) {
            return item.value
                ? new Promise(resolve => {
                      const fileName = Date.now() + ".jpg";
                      const formData = new FormData();
                      formData.append("type", "CHANGE_CLOTHES");
                      formData.append(
                          "files",
                          this.dataURLtoFile(item.value, fileName),
                          fileName
                      );
                      caseinfo.addimg(formData).then(res => {
                          if (res.code == 0) {
                              resolve({
                                  field: item.field,
                                  value: res.data[0]
                              });
                          }
                      });
                  })
                : null;
        },
        addAllImage() {
            const result = [];
            for (const item of this.photoList) {
                const promise = this.createAddPromise(item);
                if (promise) {
                    result.push(promise);
                }
            }
            return Promise.all(result).then(res => {
                const result = {};
                for (const item of res) {
                    result[item.field] = item.value;
                }
                return result;
            });
        },
        // 提交换衣拍照表单
        postDressPhotoFormData() {
            debugger
                if (this.peopleObj.isChangeClothes == "是") {
                    debugger
                    let obj = {
                        fId: this.fid,
                        centerInfoId: this.$store.state.userInfo.fcompanyid,
                        personsId: this.peopleObj.fid,
                        picture05:this.photoList[0].value,
                        picture06:this.photoList[1].value,
                        picture07:this.photoList[2].value,
                        picture08:this.photoList[3].value,
                        fDescription: this.remark
                    };
                    caseinfo
                        .editHypz(obj)
                        .then(res => {
                            if (res.code == 0) {
                                this.$message({
                                    message: "保存成功",
                                    type: "success"
                                });

                                this.reset();
                                this.$emit("onCloseDialog");
                            } else {
                                this.$message({
                                    message: "保存失败",
                                    type: "error"
                                });
                            }
                        })
                        .catch(err => {});
                } else {
                    debugger
                    let obj = {
                        centerInfoId: this.$store.state.userInfo.fcompanyid,
                        personsId: this.peopleObj.fid,
                        picture05:this.photoList[0].value,
                        picture06:this.photoList[1].value,
                        picture07:this.photoList[2].value,
                        picture08:this.photoList[3].value,
                        fDescription: this.remark
                    };
                    caseinfo.addHypz(obj).then(res => {
                        if (res.code == 0) {
                            this.$message({
                                message: "保存成功",
                                type: "success"
                            });
                            this.reset();
                            this.$emit("onCloseDialog");
                        } else {
                            this.$message({
                                message: "保存失败",
                                type: "error"
                            });
                        }
                    });
                }
        },
        handleKeyPress(commad) {
            let index = -1;
            switch (commad) {
                case "left":
                    index = 0;
                    break;
                case "right":
                    index = 1;
                    break;
                case "top":
                    index = 2;
                    break;
                case "bottom":
                    index = 3;
                    break;
                case "leftTop":
                    index = 4;
                    break;
                case "leftBottom":
                    index = 5;
                    break;
                case "rightTop":
                    index = 6;
                    break;
                case "rightBottom":
                    index = 7;
                    break;
                case "reset":
                    index = 12;
                    break;
                case "near":
                    index = 9;
                    break;
                case "far":
                    index = 10;
                    break;
            }
            console.log(index);
            this.ptzControl(index);
        },
        handleStopCommad(commad) {
            let index = -1;
            switch (commad) {
                case "left":
                case "right":
                case "top":
                case "bottom":
                case "leftTop":
                case "leftBottom":
                case "rightTop":
                case "rightBottom":
                    index = 8;
                    break;
                case "near":
                case "far":
                    index = 11;
                    break;
            }
            console.log(index);
            this.ptzControl(index);
        },
        // 清除展示照片，继续显示实时影像
        clearImgSrc() {},
        handleTakePhone(index) {
            const fileName = "D:\\SecurityImg" + "\\" + Date.now() + ".jpg";
            this.takePhoto(fileName).then(res => {
                this.photoList[index].value = res;
            });
        },
        deletePhoto(index) {
            this.photoList[index].value = "";
        }
    }
};
</script>

<style scoped
 lang="scss">
.dressdio .el-dialog__body {
    color: #77a8f4;
}
.left-img-btn-wrap {
    display: flex;
    justify-content: space-between;
}

.base-image-cmpt {
    padding: 10px 20px 0 20px;
}

.left-img-label {
    text-align: center;
}
.left-remark {
    margin-top: 20px;
    .el-textarea__inner {
        height: 150px;
        background: rgba(108, 223, 252, 0.2);
        border: 1px solid rgba(108, 223, 252, 1);
        border-radius: 2px;
    }
}
.left-img-btn {
    color: blue;
    cursor: pointer;
}
</style>
