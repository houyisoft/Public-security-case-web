<template>
  <div class>
    <el-dialog
      title="历史视频下载"
      :close-on-click-modal="false"
      width="50%"
      :max-height="400"
      :visible="isShow"
      @close="handleViewDownloadHistoryVideo(false)"
    >
      <el-form :model="downfile" class="dialog-form" label-width="90px">
        <el-row style="margin: 20px;">
          <el-col :span="24">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="percent"></el-progress>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin: 20px;">
          <el-col :span="5">录像文件保存路径</el-col>
          <el-col :span="16">
            <el-input v-model="downfile.SavePath" disabled />
          </el-col>
          <el-col :span="3" style="padding-left:5px;">
            <el-button style="width:100px;" @click="filePath">选择</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin: 20px;">
          <el-col :span="5">选择文件保存格式</el-col>
          <el-col :span="18">
            <div>
              <el-radio-group size="medium" v-model="downfile.Radio1" @change="radioChanges">
                <el-radio-button label="0">mp4</el-radio-button>
                <el-radio-button label="1">3pg</el-radio-button>
                <el-radio-button label="2">asf</el-radio-button>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col>
            <div class="verticalBar"></div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col>
            <div class="bottom-btn" style="margin-top: 8px;margin-bottom: 5px;float:right">
              <el-button
                class="el-button-repeat"
                :disabled="startDo"
                style="margin-right:20px"
                @click="DoDownButton"
              >开始下载</el-button>
              <el-button
                class="el-button-repeat"
                :disabled="cancelDO"
                @click="stopDownloadRecord"
              >取消下载</el-button>
            </div>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="10">
          <el-col>
            <div class="verticalBar"></div>
          </el-col>
        </el-row>-->
        <el-row :gutter="10">
          <el-col>
            <div id="tableX" style="height:270px">
              <el-table
                class="main-table"
                :data="VideoLists"
                border
                highlight-current-row
                @current-change="videoChanges"
              >
                <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                <el-table-column prop="roomName" label="房间" align="center"></el-table-column>
                <el-table-column prop="puId" width="250" label="编号" align="center"></el-table-column>
                <el-table-column prop="inTime" width="160" label="进入时间" align="center"></el-table-column>
                <el-table-column prop="outTime" width="160" label="离开时间" align="center"></el-table-column>
                <el-table-column prop="channelId" width="50" label="通道" align="center"></el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="10">
            <div id="keda1"></div>
          </el-col>
        </el-row>
      </el-form>
      <template slot="footer">
        <el-button type="primary" @click="handleViewDownloadHistoryVideo(false)">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import burn from "@/apis/Burn/BurnGJ.js";
export default {
  components: {},
  props: ["isShow", "peopleObj"],
  watch: {
    isShow(val) {
      console.log("isshow: ", val);
      if (val) {
        this.$nextTick(() => {
          console.log("this.peopleObj", this.peopleObj);
          burn
            .getGjHistoryVideoByTrailId({ Id: this.peopleObj.trailId })
            .then((res) => {
              if (res.code == 0) {
                this.VideoLists = res.rows;
              }
            });
          setTimeout(() => {
            this.initVedio();
          }, 1000);
        });
      }
    },
  },
  data() {
    return {
      //保存地址和保存类型
      downfile: {
        SavePath: "",
        Radio1: 1,
      },
      //返回下载进度
      percent: 0,
      //视频列表
      VideoLists: [],
      selectRow: {},
      startDo: false,
      cancelDo: true,
      filty: ".3pg",
    };
  },

  methods: {
    //保存路径
    filePath() {
      let filePath;
      let objSrc = new ActiveXObject("Shell.Application").BrowseForFolder(
        0,
        "请选择保存路径",
        0,
        ""
      );
      if (objSrc != null) {
        filePath = objSrc.Items().Item().Path;
        console.log("filePath", filePath);
        if (filePath.charAt(0) == ":") {
          alert("请选择文件夹.");
          return;
        }
        this.downfile.SavePath = filePath;
      }
    },
    radioChanges(val) {
      if (val == 0) {
        this.filty = ".mp4";
      } else if (val == 1) {
        this.filty = ".3pg";
      } else if (val == 2) {
        this.filty = ".asf";
      }
    },
    //开始下载按钮事件
    DoDownButton() {
      console.log("this.selectRow", this.selectRow);
      console.log("this.downfile.Radio1", this.downfile.Radio1);
      if (
        this.downfile.SavePath == null ||
        this.downfile.SavePath == "" ||
        this.downfile.SavePath == undefined
      ) {
        this.$message({
          showClose: true,
          message: "请选择保存路径",
          type: "error",
        });
        return;
      }
      if (!this.selectRow) {
        this.$message({
          showClose: true,
          message: "请选择一条要下载信息",
          type: "error",
        });
        return;
      }
      //查询记录
      var cmd = {
        cmd: "getrecord",
        data: {
          type: 1,
          domain: "4be42e0b627e4345950bcb2ed17dd094",
          starttime: this.selectRow.startTime,
          endtime: this.selectRow.endTime,
          chnid: 0,
          puid: this.selectRow.puId,
        },
      };
      let pluginPlay = document.getElementById("plugin1");
      let ret = pluginPlay.PostCmd(JSON.stringify(cmd));
      console.log("vidoChange-res", ret);
    },
    //选中记录信息
    videoChanges(row) {
      console.log("videoChanges-row", row);
      this.selectRow = row;
      this.startDo = false;
    },
    handleViewDownloadHistoryVideo(bool) {
      var cmd = {
        cmd: "logoutplatform",
      };
      let pluginPlay = document.getElementById("plugin1");
      let ret = pluginPlay.PostCmd(JSON.stringify(cmd));
      this.downfile.Radio1 = 1;
      this.downfile.filePath = "";
      document.getElementById("keda1").innerHTML = "";
      this.$emit("onCloseDialog");
    },
    //监听获取录像记录后调用，如果有数据则
    onRecordList(notify) {
      console.log("onRecordList-notify", notify);
      if (notify.code != 0) {
        console.log("录像查询失败: " + notify.desc);
        this.$message({
          showClose: true,
          message: "未查询到视频信息",
          type: "error",
        });
      } else {
        if (!notify.data) return;
        console.log("notify", notify);
        this.doDownload(notify.data.records[0]);
      }
    },
    //下载
    doDownload(data) {
      let VideoType = this.downfile.Radio1;
      console.log("this.downfile.Radio1", this.downfile.Radio1);
      console.log("VideoType", VideoType);
      let path = "";
      console.log("filety", this.filty);
      if (this.downfile.SavePath.length > 3) {
        path =
          this.downfile.SavePath +
          "\\" +
          this.peopleObj.name +
          "_" +
          this.selectRow.roomName +
          "_" +
          new Date().getTime() +
          this.filty;
      } else {
        path =
          this.downfile.SavePath +
          this.peopleObj.name +
          "_" +
          this.selectRow.roomName +
          "_" +
          new Date().getTime() +
          this.filty;
      }

      let cmd = {
        cmd: "startdownloadrecord",
        data: {
          path: path,
          starttime: this.selectRow.startTime,
          endtime: this.selectRow.endTime,
          type: VideoType,
        },
      };
      console.log("down-cmd", cmd);
      let pluginPlay = document.getElementById("plugin1");
      let ret = pluginPlay.PostCmd(JSON.stringify(cmd));
      console.log("Download", ret);
      ret = JSON.parse(ret);
      if (ret.code == 0) {
        this.startDo = true;
      } else {
        console.log("Post download cmd failed");
      }
    },
    //下载进度
    onDownloadProgress(notify) {
      console.log("progress", JSON.stringify(notify));
      this.percent = notify.data.progress;
      if (notify.data.progress == 100) {
        this.stopDownloadRecord();
      }
    },
    //停止下载
    stopDownloadRecord() {
      let cmd = {
        cmd: "stopdownloadrecord",
      };
      let pluginPlay = document.getElementById("plugin1");
      var ret = pluginPlay.PostCmd(JSON.stringify(cmd));
      console.log("Stop download", ret);
      ret = JSON.parse(ret);
      if (ret.code == 0) {
      } else {
        console.log("Post stop download cmd failed");
      }
    },
    //初始化视频控件
    initVedio() {
      //动态加载object标签
      let obj = document.createElement("object");
      obj.setAttribute("id", "plugin1");
      obj.setAttribute("classid", "clsid:bea284b6-9db8-547c-975c-77ec7a6b802c");
      obj.setAttribute("width", 0);
      obj.setAttribute("height", 0);
      obj.setAttribute("type", "application/x-sfplayplugin");
      console.log(obj);
      var _obj = document.getElementById("keda1");
      console.log(_obj);
      _obj.appendChild(obj);
      //获取标签 并验证是否可用
      let pluginPlatform = document.getElementById("plugin1");
      let kdPtIp = "";
      let kdPtUN = "";
      let kdPtPW = "";
      let kdPtPort = "";

      if (!pluginPlatform.valid) {
        console.log("插件不可用");
      } else {
        burn
          .getPlatForm({
            configName: "kedaPlatform",
          })
          .then((res) => {
            if (res.code == 0) {
              console.log(res.rows);
              let configNr = JSON.parse(res.rows[0].configNr);
              kdPtIp = configNr.ip;
              kdPtUN = configNr.user;
              kdPtPW = configNr.pwd;
              kdPtPort = "80";
            }
          });
        //监听插件是否准备完毕;
        var _this = this;
        addEvent(pluginPlatform, "Notify", function (e) {
          let notify = JSON.parse(e);
          switch (notify.notify) {
            case "ready":
              //返回ready后执行登陆
              var cmd = {
                cmd: "setplatforminfo",
                data: {
                  ip: kdPtIp,
                  port: kdPtPort,
                  user: kdPtUN,
                  pwd: kdPtPW,
                  type: "2",
                  decmode: 1,
                },
              };
              console.log("执行登陆");
              let ret = pluginPlatform.PostCmd(JSON.stringify(cmd));
              console.log(ret);
              break;
            case "recordlist":
              console.log("addevent-recordlist", notify);
              _this.onRecordList(notify);
              break;
            case "downloadrecordprogress":
              console.log("downloadrecordprogress", notify);
              _this.onDownloadProgress(notify);

              break;
          }
        });
      }
    },
  },
};
</script>
<style 
 lang="scss">
.el-progress-bar__outer {
  background-color: #c0c0c0;
}
.bottom-btn {
  width: 99%;
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: right;
}

.verticalBar {
  float: right;
  width: 100%;
  height: 1px;
  margin-top: -0.5em;
  background: #d4c4c4;
  position: relative;
  text-align: center;
}
#tableX .el-table__body-wrapper {
  height: 270px;
  overflow-y: auto;
}

</style> 