<template>
  <div class="belongings-list-dialog">
    <el-dialog
      title="历史轨迹回放"
      :close-on-click-modal="false"
      width="70%"
      :max-height="300"
      :visible="isShow"
      @close="handleViewHistoryTrajectoryVideo(false)"
    >
      <el-form class="dialog-form" label-width="90px">
        <el-row :gutter="10">
          <el-col >
             <div style="height:500px;width:100%">
              <iframe
                id="iframe" 
                src="http://wwww.baidu.com"
                frameborder="0"
                width="100%"
                height="500px"
                scrolling="no"
              ></iframe>
            </div>
          </el-col>
          <!-- <el-col :span="1">
            <div id="keda" style="flex-grow: 1;padding-left: 10px;border-left: solid 1px #ccc;"></div>
          </el-col> -->
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
            .then(res => {
              console.log(res);
              debugger;
              if (res.code == 0) {
              }
            });
          // setTimeout(() => {
          //   this.initVedio();
          // }, 1000);
        });
      }
    }
  },
  data() {
    return {
      baseTableData: {
        total: 20,
        list: []
      },
      distributeLockerDialogFormData: {
        name: "",
        lockerNo: "",
        positionNo: ""
      }
    };
  },

  methods: {
    //播放
    playVideo(val) {
      var cmd = {
        cmd: "switchstartplayrecord",
        data: {
          vendor: "kedacom",
          starttime: val.starttime,
          endtime: val.endtime,
          playtime: val.starttime,
          hd: 1
        }
      };
      let pluginPlay = document.getElementById("plugin0");
      let ret = pluginPlay.PostCmd(JSON.stringify(cmd));
    },

    handleViewHistoryTrajectoryVideo(bool) {
      //document.getElementById("keda").innerHTML = "";
      this.$emit("onCloseDialog");
    },
    //监听获取录像记录后调用，如果有数据则播放视频
    onRecordList(notify) {
      if (notify.code != 0) {
        alert("录像查询失败: " + notify.desc);
      } else {
        if (!notify.data) return;
        this.playVideo(notify.data);
      }
    },
    //初始化视频控件
    initVedio() {
      //动态加载object标签
      let obj = document.createElement("object");
      obj.setAttribute("id", "plugin0");
      obj.setAttribute("classid", "clsid:bea284b6-9db8-547c-975c-77ec7a6b802c");
      obj.setAttribute("width", 1);
      obj.setAttribute("height", 1);
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
            configName: "kedaPlatform"
          })
          .then(res => {
            if (res.code == 0) {
              console.log(res.rows);
              kdPtIp = res.rows[0].deviceIp;
              kdPtUN = res.rows[0].userName;
              kdPtPW = res.rows[0].password;
              kdPtPort = "80";
            }
          });
        //监听插件是否准备完毕;
        addEvent(pluginPlatform, "Notify", function(e) {
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
                  decmode: 1
                }
              };
              console.log("执行登陆");
              let ret = pluginPlatform.PostCmd(JSON.stringify(cmd));
              console.log(ret);
              ret = JSON.parse(ret);

              break;
            case "recordlist":
              onRecordList(notify);
              break;
          }
        });
      }
    }
  }
};
</script>