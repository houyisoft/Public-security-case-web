<!--  -->
<template>
  <div ref="container" class></div>
</template>

<script>
export default {
  components: {},
  props: {
    model: Object,
    type: String,
    pdfInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      form: {
        name: "",
        sex: "",
        nation: "",
        birthday: "",
        address: "",
        id: "",
        base64_ID: "",
        base64_Face: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    pdfInfo: {
      handler(val) {},
      deep: true,
      immediate: true
    }
  },
  //方法集合
  methods: {
    resetCompare() {
      const { form } = this;
      for (const key in form) {
        form[key] = "";
      }
      if (this.ctx) {
        // 重置渲染上下文并清空画布
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.idCard.width, this.idCard.height);
      }
    },
    close() {
      var ret = this.object.GWQ_CancelOperate();
      if (ret == 0) {
        console.log("关闭成功");
      } else {
        console.log("失败，返回错误码为", ret);
      }
    },
    startFace() {
      this.resetCompare();
      this.close();
      let ret = this.object.DoGWQ_StartFace();
      if (ret == 0) {
        this.addEventListener(1);
        console.log("启动成功");
      } else {
        console.log("失败，返回错误码为", ret);
      }
    },
    readIdCard() {
      this.resetCompare();
      this.close();
      let ret = this.object.DoGWQ_ReadID();
      if (ret == 0) {
        this.addEventListener(2);
        console.log("启动成功");
      } else {
        console.log("失败，返回错误码为", ret);
      }
    },
    startPdfSign() {
      this.resetCompare();
      const {
        pdfPath,
        xmlPath = "",
        location = "",
        retain = "",
        timeout = 60
      } = this.pdfInfo;
      if (pdfPath !== "") {
        var ret = this.object.DoGWQ_StartSign(
          pdfPath,
          xmlPath,
          location,
          retain,
          timeout
        );
        if (ret == 0) {
          this.addEventListener(3);
          console.log("启动成功");
        } else {
          console.log("失败，返回错误码为" + ret);
        }
      }
    },
    addEventListener(type) {
      switch (type) {
        case 1: //认证对比
          //人脸识别回调
          if (!window.OnAfterGWQ_StartFace) {
            const script = document.createElement("script");
            script.htmlFor = "GWQ";
            script.language = "javascript";
            script.type = "text/javascript";
            script.event = "OnAfterGWQ_StartFace(ErrorCode,JsonData)";
            script.textContent = "OnAfterGWQ_StartFace(ErrorCode,JsonData)";
            document.body.appendChild(script);
            //认证比对验证回调方法
            window.OnAfterGWQ_StartFace = (ErrorCode, JsonData) => {
              this.afterCompare(ErrorCode, JsonData);
            };
          }
          break;
        case 2: //读取身份证
          //读取身份证回调
          if (!window.OnAfterGWQ_ReadID) {
            const script = document.createElement("script");
            script.htmlFor = "GWQ";
            script.language = "javascript";
            script.type = "text/javascript";
            script.event = "OnAfterGWQ_ReadID(ErrorCode,JsonData)";
            script.textContent = "OnAfterGWQ_ReadID(ErrorCode,JsonData)";
            document.body.appendChild(script);
            //认证比对验证回调方法
            window.OnAfterGWQ_ReadID = (ErrorCode, JsonData) => {
              this.afterReadIdCard(ErrorCode, JsonData);
            };
          }
          break;
        case 3: //读取身份证
          //读取身份证回调
          if (!window.OnAfterGWQ_StartSign) {
            const script = document.createElement("script");
            script.htmlFor = "GWQ";
            script.language = "javascript";
            script.type = "text/javascript";
            script.event =
              "OnAfterGWQ_StartSign(ErrorCode,SignPdfBase64,SignNameBase64,FingerPrintBase64,XML)";
            script.textContent =
              "OnAfterGWQ_StartSign(ErrorCode,SignPdfBase64,SignNameBase64,FingerPrintBase64,XML)";
            document.body.appendChild(script);
            //认证比对验证回调方法
            window.OnAfterGWQ_StartSign = (
              ErrorCode,
              SignPdfBase64,
              SignNameBase64,
              FingerPrintBase64,
              XML
            ) => {
              this.afterPdfSign(
                ErrorCode,
                SignPdfBase64,
                SignNameBase64,
                FingerPrintBase64,
                XML
              );
            };
          }
          break;
      }
    },
    afterReadIdCard(ErrorCode, JsonData) {
      if (ErrorCode == 0) {
        let obj = JSON.parse(JsonData);
        const {
          name,
          sex,
          nation,
          birth: birthday,
          addr: address,
          id_num: id,
          base64_ID
        } = obj;
        Object.assign(this.form, {
          name,
          sex,
          nation,
          birthday,
          address,
          id,
          base64_ID
        });
        //this.writeIdCard(); //写入身份证信息
        this.$emit("update:model", this.form);
        this.$emit("compareSuccess", this.form);
      } else if (ErrorCode == -9) {
        this.$emit("compareError", this.form);
        console.log("取消");
      } else {
        console.log("失败，返回错误码为", ErrorCode);
      }
    },
    afterCompare(ErrorCode, JsonData) {
      if (ErrorCode == 0) {
        let obj = JSON.parse(JsonData);
        const {
          name,
          sex,
          nation,
          birth: birthday,
          addr: address,
          id_num: id,
          base64_Face,
          base64_ID,
          passFlag
        } = obj;
        Object.assign(this.form, {
          name,
          sex,
          nation,
          birthday,
          address,
          id,
          base64_Face,
          base64_ID
        });
        //(); //写入身份证信息
        this.$emit("update:model", this.form);
        if (passFlag == true) {
          this.$emit("compareSuccess", this.form);
          console.log("比对通过");
        } else {
          this.$emit("compareError", this.form);
          console.log("比对失败");
        }
      } else {
        console.log("失败，返回错误码为", ErrorCode);
      }
    },
    //显示身份证信息
    showIdCardImage() {
      return new Promise(resolve => {
        const idCard = new Image();
        idCard.onload = res => {
          this.ctx && this.ctx.drawImage(idCard, 0, 0, 318, 200);
          resolve();
        };
        idCard.src = require("./images/card_1.png");
      });
    },
    // writeIdCard() {
    //   this.showIdCardImage().then(r => {
    //     if (this.ctx) {
    //       const {
    //         name,
    //         sex,
    //         nation,
    //         birthday,
    //         address,
    //         id,
    //         base64_ID
    //       } = this.form;
    //       const birth = birthday.split(/\D/);
    //       this.ctx.font = "11x YaHei";
    //       this.ctx.fillText(name, 55, 40);
    //       this.ctx.fillText(sex, 55, 65);
    //       this.ctx.fillText(nation, 125, 65);
    //       this.ctx.fillText(birth[0], 55, 90);
    //       this.ctx.fillText(birth[1], 110, 90);
    //       this.ctx.fillText(birth[2], 138, 90);
    //       this.ctx.fillText(address.substr(0, 10), 55, 115);
    //       this.ctx.fillText(address.substr(10, 20), 55, 130);
    //       this.ctx.fillText(address.substr(20, 30), 55, 145);
    //       this.ctx.fillText(id, 100, 178);
    //       const img = new Image();
    //       img.src = "data:image/png;base64," + base64_ID;
    //       this.ctx.drawImage(img, 186, 20, 110, 138);
    //     }
    //   });
    //   this.writePhoto();
    // },
    writePhoto() {
      const { base64_Face } = this.form;
      if (base64_Face) {
        const img = new Image();
        img.src = "data:image/png;base64," + base64_Face;
        this.ctx.drawImage(img, 340, 40, 120, 120);
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //创建object，用来做硬件交互
    this.object = document.createElement("object");
    this.object.classid = "clsid:96BB8ADA-D348-4414-8892-DC79C8818841";
    this.object.width = 0;
    this.object.height = 0;
    this.object.id = "GWQ";
    if (this.type === "card" || this.type === "compare") {
      //创建canvas，用来显示身份证信息
      this.idCard = document.createElement("canvas");
      this.idCard.width = this.type === "card" ? 320 : 460;
      this.idCard.height = 200;
    }
    if (this.type === "pdf") {
      //创建canvas，用来显示身份证信息
      this.pdfIframe = document.createElement("iframe");
      this.pdfIframe.style.width = "100%";
      this.pdfIframe.style.height = "400px";
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //追加object到body
    this.$refs.container.appendChild(this.object);
    this.close(); //初始化后调用一次关闭

    if (this.type === "card" || this.type === "compare") {
      this.$refs.container.appendChild(this.idCard);
      this.ctx = this.idCard.getContext("2d");
    }

    if (this.type === "pdf") {
      //创建canvas，用来显示身份证信息
      this.$refs.container.appendChild(this.pdfIframe);
      if (this.pdfUrl) {
        debugger;
        this.pdfIframe.src = this.pdfUrl;
      }
    }
  },
  destroyed() {
    if (this.object && this.object.remove) {
      //销毁object
      this.object.remove();
    }
    if (this.idCard && this.idCard.remove) {
      //销毁canvas
      this.idCard.remove();
    }
    if (this.pdfIframe && this.pdfIframe.remove) {
      //销毁iframe
      this.pdfIframe.remove();
    }
  }
};
</script>
