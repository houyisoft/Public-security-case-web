<template>
  <div class="belongings-list-dialog">
    <el-dialog
      title="历史轨迹视频"
      :close-on-click-modal="false"
      width="70%"
      :max-height="300"
      :visible="isShow"
      @close="handleViewHistoryTrajectoryVideo(false)"
    >
      <el-form class="dialog-form" label-width="90px">
        <el-row :gutter="10">
          <el-col :span="12">
            <div id="tableY" style="height:500px;font-size:12px">
              <el-table
               class="main-table"
                :data="VideoList"
                border
                highlight-current-row
                @current-change="videoChange" 
              >
                <el-table-column prop="roomName" width="150" label="房间"></el-table-column>
                <el-table-column prop="puId" width="200" label="编号"></el-table-column>
                <el-table-column prop="inTime" label="进入时间"></el-table-column>
                <el-table-column prop="outTime" label="离开时间"></el-table-column>
                <el-table-column prop="channelId" width="50" label="通道"></el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="10">
            <div id="keda" style="flex-grow: 1;padding-left: 10px;border-left: solid 1px #ccc;"></div>
          </el-col>
        </el-row>
      </el-form>
      <template slot="footer">
        <el-button type="primary" @click="handleViewHistoryTrajectoryVideo(false)">关闭</el-button>
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
          // console.log('this.$refs', this.$refs.videoImage)
          //this.$refs.videoImage.startMedia();
          console.log("this.peopleObj", this.peopleObj);
          burn
            .getGjHistoryVideoByTrailId({ Id: this.peopleObj.trailId })
            .then((res) => {
              console.log(res);
              debugger;
              if (res.code == 0) {
                this.VideoList = res.rows;
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
      selectionRow:{},
      VideoList: [],
      baseTableData: {
        total: 20,
        list: [],
      },
      distributeLockerDialogFormData: {
        name: "",
        lockerNo: "",
        positionNo: "",
      },
    };
  },

  methods: {
    //播放
    playVideo(val) {
      console.log("playVideo-val", val);
      //  let starttime = (new Date(row.inTime)).getTime() / 1000;
      // let endtime = (new Date(row.outTime)).getTime() / 1000;
      var cmd = {
        cmd: "switchstartplayrecord",
        data: {
          vendor: "kedacom",
          starttime: this.selectionRow.startTime,
          endtime: this.selectionRow.endTime,
          playtime: this.selectionRow.startTime,
          hd: 1,
        },
      };
      let pluginPlay = document.getElementById("plugin0");
      let ret = pluginPlay.PostCmd(JSON.stringify(cmd));
      console.log("vidoChange-res", ret);
    },
    //选中时查找记录信息
    videoChange(row) {
      console.log("vidoChange", row);
      console.log("starttime", row.startTime);
      console.log("endtime", row.endTime);
      this.selectionRow=row;
      var cmd = {
        cmd: "getrecord",
        data: {
          type: 1,
          domain: "4be42e0b627e4345950bcb2ed17dd094",
          starttime: row.startTime,
          endtime: row.endTime,
          chnid: 0,
          puid: row.puId,
        },
      };
      let pluginPlay = document.getElementById("plugin0");
      let ret = pluginPlay.PostCmd(JSON.stringify(cmd));
      console.log("vidoChange-res", ret);
    },
    handleViewHistoryTrajectoryVideo(bool) {
      var cmd = {
        cmd: "logoutplatform",
      };
      let pluginPlay = document.getElementById("plugin0");
      let ret = pluginPlay.PostCmd(JSON.stringify(cmd));

      document.getElementById("keda").innerHTML = "";
      this.$emit("onCloseDialog");
    },
    //监听获取录像记录后调用，如果有数据则播放视频
    onRecordList(notify) {
      if (notify.code != 0) {
        alert("录像查询失败: " + notify.desc);
      } else {
        if (!notify.data) return;
        this.playVideo(notify.data.records[0]);
      }
    },
    //初始化视频控件
    initVedio() {
      //动态加载object标签
      let obj = document.createElement("object");
      obj.setAttribute("id", "plugin0");
      obj.setAttribute("classid", "clsid:bea284b6-9db8-547c-975c-77ec7a6b802c");
      obj.setAttribute("width", 620);
      obj.setAttribute("height", 550);
      obj.setAttribute("type", "application/x-sfplayplugin");
      console.log(obj);
      var _obj = document.getElementById("keda");
      console.log(_obj);
      _obj.appendChild(obj);
      //获取标签 并验证是否可用
      let pluginPlatform = document.getElementById("plugin0");
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
              console.log("loginkedainfo", res.rows);
              let configNr = JSON.parse(res.rows[0].configNr);
              kdPtIp = configNr.ip;
              kdPtUN = configNr.user;
              kdPtPW = configNr.pwd;
              kdPtPort = "80";
            }
          });
        var _this = this;
        //监听插件是否准备完毕;
        addEvent(pluginPlatform, "Notify", function (e) {
          let notify = JSON.parse(e);
          switch (notify.notify) {
            case "ready":
              //返回ready后执行登陆
              //let ret = this.setloginForm(pluginPlatform);
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
              ret = JSON.parse(ret);

              break;
            case "recordlist":
              console.log("recordlist-notify", notify);
              _this.onRecordList(notify);
              break;
          }
        });
      }
    },
  },
};
</script>
<style  lang="scss">
#tableY .el-table__body-wrapper {
  height: 500px;
  overflow-y: auto;
}

</style>