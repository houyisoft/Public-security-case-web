<template>
  <div class>
    <el-dialog
      title="坐垫测试页"
      :close-on-click-modal="false"
      width="50%"
      :max-height="400"
      :visible="isShow"
      @close="handleViewDownloadHistoryVideo(false)"
    >
      <base-title title="人员基本信息"></base-title>
      <el-form :model="person" class="dialog-form" label-width="90px">
        <el-row :gutter="10" style="margin: 20px;">
          <el-col>
            <el-form-item label="姓名">
              <el-input disabled v-model="person.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin: 20px;">
          <el-col>
            <el-form-item label="性别">
              <el-input disabled v-model="person.sex"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin: 20px;">
          <el-col>
            <el-form-item label="年龄">
              <el-input disabled v-model="person.age"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin: 20px;">
          <el-col>
            <el-form-item label="证件号">
              <el-input disabled v-model="person.cardnumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <base-title title="人员当前状态"></base-title>
      <el-form :model="zdinfo" class="dialog-form" label-width="90px">
        <el-row style="margin: 20px;">
          <el-col :span="4">
            <el-form-item label="心率">
              <el-input disabled v-model="zdinfo.heartRate"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="4">
            <el-form-item label="⼼率状态">
              <el-input disabled v-model="zdinfo.heartException"></el-input>
            </el-form-item>
          </el-col>
     
          <el-col  :span="4">
            <el-form-item label="呼吸率">
              <el-input disabled v-model="zdinfo.respiratoryRate"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="4">
            <el-form-item label="呼吸率状态">
              <el-input disabled v-model="zdinfo.respiratoryException"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="4">
            <el-form-item label="情绪状态">
              <el-input v-model="zdinfo.emotionState" disabled></el-input>
            </el-form-item>
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
          console.log("peopleObj",this.peopleObj)
          this.person.name = this.peopleObj.name;
          this.person.sex = this.peopleObj.genderName;
          this.person.age = 25;
          this.person.cardnumber = "";
          this.timer= setInterval(() => {
             setTimeout(() => {
            this.initZDData();
          }, 1000);
          }, 2000);
         
        });
      }
    },
  },
  data() {
    return {
      //保存地址和保存类型
      person: {
        name: "",
        sex: "",
        age: "",
        cardnumber: "",
      },
      zdinfo: {
        heartRate: 0,
        heartException: "正常",
        respiratoryRate: 0,
        respiratoryException: "正常",
        emotionState: "正常",
      },
      timer:null
    };
  },

  methods: {
    handleViewDownloadHistoryVideo(bool) {
      clearInterval(this.timer);
      this.$emit("onCloseDialog");
    },
    initZDData() {
      burn.getZDInfo("425881900658266112").then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.zdinfo.heartRate = res.data.heartRate;
          if (res.data.heartException) {
            this.zdinfo.heartException = "正常";
          } else {
            this.zdinfo.heartException = "异常";
          }
          this.zdinfo.respiratoryRate = res.data.respiratoryRate;
          if (res.data.respiratoryException) {
            this.zdinfo.respiratoryException = "正常";
          } else {
            this.zdinfo.respiratoryException = "异常";
          }
          if(res.data.emotionState=="1"){
             this.zdinfo.emotionState = "正常";
          }else if(res.data.emotionState =="2"){
            this.zdinfo.emotionState="紧张"
          }else if( res.data.emotionState =="3"){
            this.zdinfo.emotionState="恐惧"
          }else if( res.data.emotionState =="4"){
            this.zdinfo.emotionState="焦虑"
          }else if( res.data.emotionState =="5"){
            this.zdinfo.emotionState="内疚"
          }
           
        }
      });
    },
  },
  mounted() {
   
  },
};
</script>