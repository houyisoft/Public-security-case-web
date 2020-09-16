<!-- 组件名称
@module 组件存放位置
@desc 安全检查 弹框
@author 高飞翔
@date 2020年5月7日
@params {Boolean} [isShow] 弹窗显示隐藏
@function onCloseDialog 父组件关闭弹窗
-->
<template>
    <div class="aqjc">
        <el-dialog
            title="安全检查"
            :close-on-click-modal="false"
            :destroy-on-close="true"
            :visible="isShow"
            width="1200px"
            @close="closed"
        >
            <el-form
                class="dialog-form"
                label-width="90px"
                ref="dialogForm"
                :model="dialogFormData"
            >
                <div
                    class="left-name"
                >{{peopleObj ? peopleObj.personnelType : ''}} - {{peopleObj ? peopleObj.name : ''}}</div>
                <el-row :gutter="20">
                    <el-col class="dialog-left" :span="9">
                        <el-row>
                            <el-col :span="24" class="dialog-tit" style="line-height:40px">
                                <i></i>自述症状
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item
                                    class
                                    label="有无病史"
                                    prop="hasMedical"
                                    :rules="[
                    { required: true, message: '请选择有无病史', trigger: 'change' }
                  ]"
                                >
                                    <el-select
                                        class
                                        placeholder="请选择"
                                        @change="dialogFormData.medicalRemark=''"
                                        style="width:100%"
                                        v-model="dialogFormData.hasMedical"
                                    >
                                        <el-option class label="是" :value="1"></el-option>
                                        <el-option class label="否" :value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    v-if="dialogFormData.hasMedical==1"
                                    prop="medicalRemark"
                                    :rules="[
                    { required: true, message: '请输入病史详情', trigger: 'blur' }
                  ]"
                                >
                                    <el-input
                                        style
                                        type="textarea"
                                        placeholder="请输入"
                                        v-model="dialogFormData.medicalRemark"
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item
                                    class
                                    label="有无伤情"
                                    prop="hasInjury"
                                    :rules="[
                    { required: true, message: '请选择有无伤情', trigger: 'change' }
                  ]"
                                >
                                    <el-select
                                        class
                                        placeholder="请选择"
                                        @change="dialogFormData.injuryRemark=''"
                                        style="width:100%"
                                        v-model="dialogFormData.hasInjury"
                                    >
                                        <el-option class label="是" :value="1"></el-option>
                                        <el-option class label="否" :value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    v-if="dialogFormData.hasInjury==1"
                                    prop="injuryRemark"
                                    :rules="[
                    { required: true, message: '请输入伤情详情', trigger: 'blur' }
                  ]"
                                >
                                    <el-input
                                        style
                                        type="textarea"
                                        placeholder="请输入"
                                        v-model="dialogFormData.injuryRemark"
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24" class="dialog-tit" style="line-height:40px">
                                <i></i>检查情况
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item
                                    class
                                    label="有无伤痕"
                                    prop="hasScar"
                                    :rules="[
                    { required: true, message: '请选择有无伤痕', trigger: 'change' }
                  ]"
                                >
                                    <el-select
                                        class
                                        placeholder="请选择"
                                        @change="dialogFormData.scarRemark=''"
                                        style="width:100%"
                                        v-model="dialogFormData.hasScar"
                                    >
                                        <el-option class label="是" :value="1"></el-option>
                                        <el-option class label="否" :value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    v-if="dialogFormData.hasScar==1"
                                    prop="scarRemark"
                                    :rules="[
                    { required: true, message: '请输入伤痕详情', trigger: 'blur' }
                  ]"
                                >
                                    <el-input
                                        style
                                        type="textarea"
                                        placeholder="请输入"
                                        v-model="dialogFormData.scarRemark"
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item
                                    class
                                    label="是否饮酒"
                                    prop="hasDrunk"
                                    :rules="[
                    { required: true, message: '请选择是否饮酒', trigger: 'change' }
                  ]"
                                >
                                    <el-select
                                        class
                                        placeholder="请选择"
                                        style="width:100%"
                                        @change="dialogFormData.drunkRemark=''"
                                        v-model="dialogFormData.hasDrunk"
                                    >
                                        <el-option class label="是" :value="1"></el-option>
                                        <el-option class label="否" :value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    v-if="dialogFormData.hasDrunk==1"
                                    prop="drunkRemark"
                                    :rules="[
                    { required: true, message: '请输入饮酒详情', trigger: 'blur' }
                  ]"
                                >
                                    <el-input
                                        style
                                        type="textarea"
                                        placeholder="请输入"
                                        v-model="dialogFormData.drunkRemark"
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>

                    <el-col class="dialog-right" :span="15">
                        <div class="right-title dialog-tit" style="line-height:40px">
                            <i></i>实时影像信息
                        </div>
                        <div style="display:flex;width:100%;border:1px dashed #FBB95C">
                            <div style="flex-shrink: 0;">
                                <div class="body-wrap" ref="peoplebody" style="position:relative;">
                                    <img
                                        @click="addMark($refs.peoplebody,$event)"
                                        class="point"
                                        src="../../../../assets/rt.jpg"
                                        alt
                                    />
                                    <div
                                        v-for="(item, index) in points"
                                        :key="index"
                                        class="mark"
                                        :style="{left: item.x, top: item.y}"
                                    >{{item.no}}</div>
                                </div>
                            </div>

                             <div class="camera_outer" style="margin-left:5px;margin-top:5px;">
                                <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
                                <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
                                <div v-if="imgSrc" class="img_bg_camera">
                                <p>效果预览</p>
                                <img :src="imgSrc" alt class="tx_img" />
                                </div>
                                <div class="button" style="margin-top:15px;margin-bottom:5px;">
                                <el-button @click="getCompetence()">打开摄像头</el-button>
                                <el-button @click="stopNavigator()">关闭摄像头</el-button>
                                <!-- <el-button @click="setImage()">拍照</el-button> -->
                                </div>
                            </div>
                        </div>
                        <el-row style="margin-top:50px;">
                            <el-col class="dialog-tit" :span="24" style="line-height:40px;">
                                <i></i>详细信息
                            </el-col>
                        </el-row>

                        <el-table
                            class="main-table"
                            style="border:1px solid rgba(108,223,252,1);background:rgba(9,61,113,1);"
                            border
                            :data="dialogTableData"
                        >
                            <el-table-column prop="no" label="编号" width="50" align="center"></el-table-column>
                            <el-table-column prop="information" label="详细信息" align="center">
                                <template slot-scope="scope">
                                    <el-input
                                        type="text"
                                        style="color:#fff"
                                        v-model="scope.row.information"
                                    ></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="url" label="图片" align="center">
                                <template slot-scope="scope">
                                    <el-image
                                        :src="scope.row.img"
                                        fit="fill"
                                        :width="50"
                                        :height="20"
                                    ></el-image>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="100" align="center">
                                <template slot-scope="scope">
                                    <el-button @click="takePhoto(scope.row)" type="text">拍照</el-button>
                                    <el-button type="text" @click="deletePhoto(scope.row,index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div style="margin-top:100px;text-align:right">
                            <el-button
                                v-if="this.peopleObj.outAreaTime==null||this.peopleObj.outAreaTime==''"
                                class="right-btn"
                                type="primary"
                                @click="postDressPhotoFormData"
                            >保存</el-button>
                            <el-button class="right-btn" @click="closed">关闭</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import caseinfo from "@/apis/wywcase.js";
import videoImage from "@/components/VideoImage.vue";

export default {
    components: {
        videoImage
    },
    props: ["isShow", "peopleObj"],
    watch: {
        isShow(val) {
            if (val) {
                this.index = 0
                this.$nextTick(() => {
                    // console.log('this.$refs', this.$refs.videoImage)
                    //this.$refs.videoImage.startMedia();
                    if (this.peopleObj.isPersonsSecurity == "是") {
                        caseinfo
                            .rsjcMain({
                                personsId: this.peopleObj.fid
                            })
                            .then(res => {
                                console.log(res);
                                if (res.code == 0) {
                                    this.dialogFormData = {
                                        hasMedical:
                                            res.rows[0].selfIllness == "是"
                                                ? 1
                                                : 0,
                                        medicalRemark:
                                            res.rows[0].selfIllnessDescribe,
                                        hasInjury:
                                            res.rows[0].selfInjury == "是"
                                                ? 1
                                                : 0,
                                        injuryRemark:
                                            res.rows[0].selfInjuryDescribe,
                                        hasScar:
                                            res.rows[0].inspectInjury == "是"
                                                ? 1
                                                : 0,
                                        scarRemark:
                                            res.rows[0].inspectInjuryDescribe,
                                        hasDrunk:
                                            res.rows[0].inspectWine == "是"
                                                ? 1
                                                : 0,
                                        drunkRemark:
                                            res.rows[0].inspectWineDescribe
                                    };
                                    this.fid = res.rows[0].fId;
                                    
                                    console.log('zfPersonssecuritydetails',res.rows[0].zfPersonssecuritydetails);
                                    res.rows[0].zfPersonssecuritydetails.forEach((item, index) => {
                                        console.log('zfPersonssecuritydetails',item);
                                        this.points.push({
                                            no: item.no,
                                            x: item.x,
                                            y: item.y,
                                            fDeletemark: item.fDeletemark,
                                            centerInfoId: item.centerInfoId,
                                            information: item.information,
                                            img: item.img
                                        });
                                        this.dialogTableData.push({
                                            fId: item.fId,
                                            no: item.no,
                                            x: item.x,
                                            y: item.y,
                                            fDeletemark: item.fDeletemark,
                                            centerInfoId: item.centerInfoId,
                                            information: item.information,
                                            img: item.img
                                        });
                                        this.index = item.no;
                                    });
                                    //this.newdata = { ...this.dialogTableData };

                                }
                            });
                    }
                     setTimeout(() => {
                        this.getCompetence();
                    }, 700);
                });
            }
        }
    },
    data() {
        return {
            //pathName: "",
            duId: "",
            index: 0,
            dialogFormData: {
                hasMedical: "",
                medicalRemark: "",
                hasInjury: "",
                injuryRemark: "",
                hasScar: "",
                scarRemark: "",
                hasDrunk: "",
                drunkRemark: ""
            },
            newdata: [],
            dialogTableData: [],
            points: [],
            videoWidth: 420,
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
	setImage() {
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
     return image;
    },
    // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop();
    },
    // base64转文件，此处没用到
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
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
        closed() {
            this.$resetFields("dialogForm");
            this.points = [];
            this.newdata = [];
            this.dialogTableData = [];
            this.$emit("onCloseDialog");
        },
        addMark(p, e) {
            //封装创建小红点和输入文字内容的函数
            this.index++;
            // var div = document.createElement("div"); //创建div元素
            // // div.id = "mark" + index;//给div元素添加id
            // div.className = "mark"; //给div元素添加class
            // div.style.position = "absolute";
            // div.style.left = e.offsetX + "px"; //div的css属性
            // div.style.top = e.offsetY + "px";
            // div.style.fontSize = 8 + "px";
            // div.innerHTML = this.index;
            // p.appendChild(div); //把这个div元素追加到传过来的元素的下面
            this.points.push({
                no: this.index,
                x: e.offsetX - 7 + "px",
                y: e.offsetY - 7 + "px",
                fDeletemark: 0,
                centerInfoId: this.$store.state.userInfo.fcompanyid,
                information: "",
                img: ""
            });
            this.dialogTableData.push({
                no: this.index,
                x: e.offsetX - 7 + "px",
                y: e.offsetY - 7 + "px",
                fDeletemark: 0,
                centerInfoId: this.$store.state.userInfo.fcompanyid,
                information: "",
                img: ""
            });
            // var content_p = document.createElement("p");
            // content_p.className = "content_p";
            // console.log("text_val::" + text_val);
            // content_p.innerHTML = this.index;//给p标签添加内容
            // content_p.id = "content_p" + 1;
            // content_p.style.left = e.offsetX-5 + "px";
            // content_p.style.top = e.offsetY-5 + "px";
            // p.appendChild(content_p);
        },
        dataURLtoFile(dataurl, filename) {
            //将base64转换为文件
            var arr = dataurl.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var theBlob = new Blob([u8arr], {
                type: mime
            });
            theBlob.lastModifiedDate = new Date();
            theBlob.name = filename;
            return theBlob;
        },
        // 提交换衣拍照表单
        postDressPhotoFormData() {
            debugger;
            //   console.log('提交表单', this.dialogTableData,'1111',this.newdata)
            if (this.peopleObj.isPersonsSecurity == "是") {
                // this.newdata.forEach((item, index) => {
                //     item.fDeletemark = 1;
                //     item.fEnabledmark = 0;
                //     item.fdeletemark = 1;
                //     item.fenabledmark = 0;
                //     item.fModifyuserid = this.$store.state.userInfo.fuserid;
                //     item.fModifyusername = this.$store.state.userInfo.frealname;
                // });
                // this.dialogTableData.forEach((item, index) => {
                //     item.fId = "";
                //     item.personsSecurityId = this.peopleObj.fid;
                //     item.fModifyuserid = this.$store.state.userInfo.fuserid;
                //     item.fModifyusername = this.$store.state.userInfo.frealname;
                // });
                //let arr = this.dialogTableData;
                let str = 0;
                let arr1 = [];
                // console.log(arr)
                // arr.forEach((item, index) => {
                //     if (item.fdeletemark != 1) {
                //         str++;
                //         const fileName = Date.now() + "_" + index + ".png";
                //         let file = item.img
                //             ? this.dataURLtoFile(item.img, fileName)
                //             : "";
                //         const formData = new FormData();
                //         formData.append("type", "PERSONAL_CHECK");
                //         if (file != "") {
                //             formData.append("files", file, fileName);
                //         }
                //         caseinfo.addimg(formData).then(res => {
                //             //   console.log(res)
                //             // if (res.code == 0) {
                //             item.img = res.code == 0 ? res.data[0] : "";
                //         });
                //     }
                // });

                let obj = {
                    fId: this.fid,
                    personsId: this.peopleObj.fid,
                    centerInfoId: this.$store.state.userInfo.fcompanyid,
                    checkerID: this.$store.state.userInfo.fuserid,
                    checkerNo: this.$store.state.userInfo.fencode,
                    checkerName: this.$store.state.userInfo.frealname,

                    selfIllness: this.dialogFormData.hasMedical,
                    selfIllnessDescribe:
                        this.dialogFormData.medicalRemark == ""
                            ? " "
                            : this.dialogFormData.medicalRemark,
                    selfInjury: this.dialogFormData.hasInjury,
                    selfInjuryDescribe:
                        this.dialogFormData.injuryRemark == ""
                            ? " "
                            : this.dialogFormData.injuryRemark,
                    inspectInjury: this.dialogFormData.hasScar,
                    inspectInjuryDescribe:
                        this.dialogFormData.scarRemark == ""
                            ? " "
                            : this.dialogFormData.scarRemark,
                    inspectWine: this.dialogFormData.hasDrunk,
                    inspectWineDescribe:
                        this.dialogFormData.drunkRemark == ""
                            ? " "
                            : this.dialogFormData.drunkRemark,
                    // ZfPersonssecurity: {
                    zfPersonssecuritydetails: this.dialogTableData
                    // }
                };
                console.log(obj, "obj11111edit");
                caseinfo.editRsjc(obj).then(res => {
                    if (res.code == 0) {
                        this.$message({
                            message: "保存成功",
                            type: "success"
                        });
                        this.$emit("onCloseDialog");
                    } else {
                        this.$message({
                            message: "保存失败",
                            type: "error"
                        });
                    }
                });

                // console.log(this.dialogTableData)
                //   setTimeout(()=>{

                // },2000)
            } else {
                let obj = {
                    personsId: this.peopleObj.fid,

                    selfIllness: this.dialogFormData.hasMedical,
                    selfIllnessDescribe:
                        this.dialogFormData.medicalRemark == ""
                            ? " "
                            : this.dialogFormData.medicalRemark,
                    selfInjury: this.dialogFormData.hasInjury,
                    selfInjuryDescribe:
                        this.dialogFormData.injuryRemark == ""
                            ? " "
                            : this.dialogFormData.injuryRemark,
                    inspectInjury: this.dialogFormData.hasScar,
                    inspectInjuryDescribe:
                        this.dialogFormData.scarRemark == ""
                            ? " "
                            : this.dialogFormData.scarRemark,
                    inspectWine: this.dialogFormData.hasDrunk,
                    inspectWineDescribe:
                        this.dialogFormData.drunkRemark == ""
                            ? " "
                            : this.dialogFormData.drunkRemark,
                    // ZfPersonssecurity: {
                    zfPersonssecuritydetails: this.dialogTableData
                    // }
                };
                console.log(obj);
                caseinfo.addRsjc(obj).then(res => {
                    if (res.code == 0) {
                        this.$message({
                            message: "保存成功",
                            type: "success"
                        });
                        this.$emit("onCloseDialog");
                    } else {
                        this.$message({
                            message: "保存失败",
                            type: "error"
                        });
                    }
                });

                // let str1 = 0;
                // this.dialogTableData.forEach((item, index) => {
                //     str1++;
                //     const fileName = Date.now() + "_" + index + ".png";
                //     let file = item.img
                //         ? this.dataURLtoFile(item.img, fileName)
                //         : "";
                //     console.log(file);
                //     const formData = new FormData();
                //     formData.append("type", "PERSONAL_CHECK");
                //     if (file != "") {
                //         formData.append("files", file, fileName);
                //     }
                //     caseinfo.addimg(formData).then(res => {
                //         console.log(res);
                //         // if (res.code == 0) {
                //         item.img = res.code == 0 ? res.data[0] : "";
                //         item.fCreateuserid = this.$store.state.userInfo.fuserid;
                //         item.fCreateusername = this.$store.state.userInfo.frealname;

                //         if (str1 == this.dialogTableData.length) {

                //         }
                //         // }
                //     });
                // });
                // console.log(this.dialogTableData)
                //   setTimeout(()=>{

                // },2000)
            }
        },
        // 清除展示照片，继续显示实时影像
        clearImgSrc() {
            //this.$refs.videoImage.clearImgSrc();
        },
        //抓拍
        takePhoto(row) {
            debugger
            var me=this;
            var image=this.setImage();
               caseinfo.upLoadImageBase64({
					infoType:'register',
					imageBase64:image
					}).then(res=>{
                    debugger
                    me.dialogTableData[row.no-1].img =
                            res.code == 0 ? res.msg : "";
                    });
          
            //const src = this.$refs.videoImage.getImgSrc(row);
            // console.log('图片base64地址', src)
            //this.dialogTableData[row.no - 1].img = src;
        },
        deletePhoto(row, index1) {
            console.log("删除", row);
            //   if (row.img) {
            //     this.$refs.videoImage.clearImgSrc();
            //     this.dialogTableData[row.no - 1].img = "";
            //   }
            // if(row.fdeletemark){
            // 	this.newdata = this.dialogTableData;

            // }else{
            // console.log(this.$refs.peoplebody.childNodes)
            index1 = row.no
            this.dialogTableData.splice((row.no - 1), 1);
            this.dialogTableData.forEach((item, index) => {
                if(item.no >= index1){
                    item.no = item.no - 1
                }
            });
            this.points.forEach((item, index) => {
                if(item.no >= index1){
                    item.no = item.no - 1
                }
            });
            this.index --;
            this.$refs.peoplebody.childNodes.forEach((item, index) => {
                if (item.className == "mark") {
                    if (index1 == item.innerHTML) {
                        item.remove();
                    }
                }
            });
            // }
        },
        //摄像头控制
        //0向左, 1 向右,  2 向上,   3向下, 4 左上, 5 左下, 6右上,  7 右下, 9 视野拉近,  10视野拉远,8停止移动,
        //210将焦距调远, 211将焦距调近,  212 //自动调焦,213 //调焦停止,  217 //画面调亮,  218 //画面调暗,
        ptzControl(ptzCmd) {
            let pluginPlay = document.getElementById("plugin0");
            var cmd = {
                cmd: "ptzcontrol",
                data: {
                    puid: this.puId,
                    chnid: 0,
                    range: 3,
                    cmd: ptzCmd
                }
            };
            console.log("ptzControl", this.puId);
            var ret = pluginPlay.PostCmd(JSON.stringify(cmd));
            return (ret = JSON.parse(ret));
        },
    },
    created() {
        caseinfo
            .getSecurityNvrDetail({
                configName: "安全检查"
            })
            .then(res => {
                if (res.code == 0) {
                    console.log(res.rows);
                    this.puId = res.rows[0].puid;
                    console.log("created", this.puId);
                }
            });
        console.log(this.peopleObj);
    },
    mounted() {
        // this.$nextTick(() => {
        //   this.initVedio();
        // });
    }
};
</script>

<style
 lang="scss" scoped>
.dialog-form {
    .left-name {
        color: #fbb95c;
        margin-bottom: 25px;
    }
    .dialog-tit i {
        display: inline-block;
        width: 6px;
        height: 6px;
        margin-right: 10px;
        background: #6cdffc;
        vertical-align: middle;
    }
}
.aqjc {
    .el-dialog__body {
        color: rgba(154, 191, 241, 1);
        .el-table__row .cell {
            color: #fff;
        }
    }
    .el-form-item__label {
        color: rgba(108, 223, 252, 1);
    }
    .left-img-btn-wrap {
        display: flex;
        justify-content: space-between;
    }
    .el-table__header-wrapper {
        background: rgba(251, 185, 92, 1);
    }
    .el-table__row {
        background: rgba(9, 61, 113, 1);
    }

    .left-img-btn {
        color: blue;
        cursor: pointer;
    }
}

.mark {
    position: absolute;
    font-size: 12px;
    background: rgb(29, 94, 140);
    border-radius: 50%;
    display: inline-block;
    width: 14px;
    height: 14px;
    text-align: center;
    line-height: 14px;
}
</style> 