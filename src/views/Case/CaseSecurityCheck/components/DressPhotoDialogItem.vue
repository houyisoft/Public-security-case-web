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
                                @onBaseImageAddImg="handleTakePhone"
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
                            <wheel
                                :scale="0.8"
                                @handleKeyPress="handleKeyPress"
                                @handleStopCommad="handleStopCommad"
                            />
                        </el-col>
                        <el-col :span="16">
                            <div class="right-title">实时影像信息</div>
                            <div ref="keda"></div>
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
import videoMixins from "./video";
import caseinfo from "@/apis/wywcase.js";
import Wheel from "./Wheel.vue"; // 方向盘
export default {
    mixins: [videoMixins],
    components: { Wheel },
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
                    setTimeout(() => {
                        this.initVideo(
                            this.$refs.keda,
                            caseinfo.getSecurityNvrDetail({
                                configName: "安全检查"
                            })
                        );
                    }, 2000);
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
            fid: ""
        };
    },
    methods: {
        reset() {
            for (const item of this.photoList) {
                item.value = "";
            }
            this.remark = "";
        },
        closeDialog() {
            const child = this.$refs.keda.children[0];
            if (child) {
                this.$refs.keda.removeChild(child);
            }
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
            this.addAllImage().then(res => {
                const {
                    frontImg: picture05,
                    backImg: picture06,
                    leftImg: picture07,
                    rightImg: picture08
                } = res;
                if (this.peopleObj.isChangeClothes == "是") {
                    let obj = {
                        fId: this.fid,
                        centerInfoId: this.$store.state.userInfo.fcompanyid,
                        personsId: this.peopleObj.fid,
                        picture05,
                        picture06,
                        picture07,
                        picture08,
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
                    let obj = {
                        centerInfoId: this.$store.state.userInfo.fcompanyid,
                        personsId: this.peopleObj.fid,
                        picture05,
                        picture06,
                        picture07,
                        picture08,
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
            });
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
