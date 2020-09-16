<!--  -->
<template>
    <div class="container" :style="{width: (scale * 250 + width) + 'px'}">
        <wheel
            class="wheel"
            :scale="scale"
            @handleKeyPress="handleKeyPress"
            @handleStopCommad="handleStopCommad"
        />
        <div ref="keda" class="video"></div>
    </div>
</template>

<script>
import Vue from "vue";
import videoMixins from "./video";
import Wheel from "./Wheel";
import Path from "path";
import $axios from "@/apis/index.js";

export default {
    mixins: [videoMixins],
    props: {
        width: {
            type: Number,
            default: 640
        },
        height: {
            type: Number,
            default: 360
        },
        scale: {
            type: Number,
            default: 1
        },
        configName: {
            type: String,
            default: ""
        }
    },
    components: { Wheel },
    data() {
        return {};
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
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
        takeAndUploadPhoto(item) {
            return new Promise(resolve => {
                const fileName = Date.now() + ".jpg";
                const filePath = "D:\\SecurityImg" + "\\" + fileName;
                this.takePhoto(filePath).then(res => {
                    item.src = res;
                    const formData = new FormData();
                    formData.append("type", "KODA");
                    formData.append(
                        "files",
                        this.dataURLtoFile(res, fileName),
                        "temp.png"
                    );
                    $axios
                        .postData("/api/fastdfs/upload/addImg", formData)
                        .then(res => {
                            if (res.code == 0) {
                                item.value = res.data[0];
                                resolve(res.data[0]);
                            } else {
                                item.src = "";
                                this.$message.error("图片上传失败！");
                            }
                        });
                });
            });
        }
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        const { width, height, configName } = this;
        setTimeout(() => {
            this.initVideo(
                this.$refs.keda,
                $axios.post("management/tbParaconfig/getNvrDetail", {
                    configName
                }),
                {
                    width,
                    height
                }
            );
        }, 2000);
    }
};
</script>
<style lang='scss' scoped>
.container {
    display: flex;
    align-items: center;
    .wheel {
        flex-shrink: 0;
    }
    .video {
        flex-grow: 1;
    }
}
</style>