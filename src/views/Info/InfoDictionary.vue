<template>
  <div class="info-Dictionary">
    <el-container>
      <el-aside width="180px">
        <info-submenu
          title="字典分类"
          :menuList="menuList"
          :maps="{label: 'name'}"
          @nodeclick="nodeclick"
        ></info-submenu>
      </el-aside>
      <el-main>
        <base-top-form
          :title="this.titleName"
          :baseTopFormData="baseTopFormData"
          @onPostBaseTopFormData="postBaseTopFormData"
        >
          <template v-slot:btn>
            <div class="left-btn">
              <el-button @click="visibleSubMain = true" type="primary">字典分类</el-button>
              <el-button type="primary" @click="clickZFBADataSynchronization">执法办案字典同步</el-button>
            </div>
          </template>

          <template v-slot:form>
            <el-form-item prop="type" label-width="120px" label="项目名称/项目值">
              <el-input placeholder="请输入关键字" v-model="baseTopFormData.name" />
            </el-form-item>
          </template>
        </base-top-form>
        <base-table-btns
          v-if="!this.isZFBAshow"
          @onBaseTableBtnsAdd="baseTableBtnsAdd"
          @onBaseTableBtnsEdit="baseTableBtnsEdit"
          @onBaseTableBtnsDelete="baseTableBtnsDelete"
        ></base-table-btns>
        <base-table
          :baseTableData="baseTableData.list"
          :baseTableDataTotal="baseTableData.total"
          :baseTablePageCurrent="baseTablePageCurrent"
          :baseTablePageSize="baseTablePageSize"
          :isBaseTableRadio="false"
          @onBaseTableCurrentChange="baseTableCurrentChange"
          @onBaseTablePageSizeChange="baseTablePageSizeChange"
          @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="fitemname" label="项目名" width></el-table-column>
          <el-table-column prop="fitemvalue" label="项目值"></el-table-column>
          <!-- <el-table-column prop="fsimplespelling" label="简拼"></el-table-column> -->
          <el-table-column prop="fsortcode" label="排序"></el-table-column>
          <!-- <el-table-column prop="fEnabledmark"
                           label="有效"
                           width="100">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.fEnabledmark"
                         :active-value="1"
                         :inactive-value="0"
                         @change="handleStatusChange(scope.row)"></el-switch>
            </template>
          </el-table-column>-->
          <el-table-column prop="fenabledmark" label="有效">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.fenabledmark"
                disabled
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="fdescription" label="备注"></el-table-column>
        </base-table>
      </el-main>
    </el-container>

    <!-- 主页弹窗 -->
    <el-dialog
      title="添加字典"
      width="50%"
      :close-on-click-modal="false"
      :visible="mainDialog"
      @close="mainDialog = false"
    >
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="所属分类"
          :rules="[{'required': true,'message': '请选择分类','trigger': 'change'}]"
          prop="fitemid"
        >
          <el-select v-model="ruleForm.fitemid" placeholder="请选择" disabled>
            <el-option
              v-for="item in dictTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :rules="[{'required': true,'message': '请输入项目名','trigger': 'blur'}]"
          label="项目名"
          prop="fitemname"
        >
          <el-input v-model="ruleForm.fitemname" maxlength="50"></el-input>
        </el-form-item>
        <!-- <el-form-item label="简拼" prop="fsimplespelling">
                    <el-input v-model="ruleForm.fsimplespelling"></el-input>
        </el-form-item>-->
        <el-form-item
          :rules="[{'required': true,'message': '请输入项目值','trigger': 'blur'}]"
          label="项目值"
          prop="fitemvalue"
        >
          <el-input v-model="ruleForm.fitemvalue" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item
          :rules="[
            {'required': true,'message': '请输入排序','trigger': 'blur'},
            { type: 'number', message: '排序必须为数字值'}
          ]"
          label="排序"
          prop="fsortcode"
        >
          <el-input v-model.number="ruleForm.fsortcode" maxlength="5"></el-input>
        </el-form-item>
        <el-form-item label prop="fenabledmark">
          <el-checkbox label="有效" v-model="ruleForm.fenabledmark"></el-checkbox>
        </el-form-item>

        <el-form-item label="备注" prop="fdescription">
          <el-input type="textarea" v-model="ruleForm.fdescription" maxlength="100"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
        <el-button type @click="mainDialog = false">关闭</el-button>
      </template>
    </el-dialog>
    <info-diction-add @close="visibleSubMain=false" :visibleSubMain="visibleSubMain"></info-diction-add>
  </div>
</template>

<script>
import InfoSubmenu from "@/views/Info/components/InfoSubmenu.vue";
import InfoDictionAdd from "@/views/Info/components/InfoDictionary/InfoDictionAdd.vue";
import Apis from "@/apis/basic/dict/index";
import dictInfoApi from "@/apis/Info/InfoDiction";
import dictTypeApi from "@/apis/Info/InfoDictionType.js";

export default {
  components: {
    InfoSubmenu,
    InfoDictionAdd
  },
  data() {
    return {
      CcheckBox: true,
      menuList: [],
      ruleForm: {
        fitemdetailid: "",
        fitemid: "",
        fitemname: "",
        fitemvalue: "",
        fdescription: "",
        fsortcode: "",
        // fsimplespelling: "",
        fenabledmark: true
      },
      titleName: "字典分类",
      baseTopFormData: {
        name: ""
      },
      types: [
        {
          value: 1,
          label: "类型一"
        }
      ],
      // baseTable表格组件数据
      baseTableData: {
        total: 0,
        list: []
      },
      baseTablePageCurrent: 1,
      baseTablePageSize: 10,
      baseTableCurrent: {},
      mainDialog: false,
      visibleSubMain: false,
      dictTypeList: [],
      isZFBAshow: true //是否是执法办案中的项，是的话不允许编辑和删除   默认不显示，选中分类后修改
    };
  },
  mounted() {
    this.getTree();
  },
  methods: {
    //执法办案字典同步
    clickZFBADataSynchronization() {
      dictTypeApi.getDictionaries().then(res => {
        if (res.code == 0) {
          this.$message.success(res.msg);
        } else {
          this.$message.error("同步失败");
        }
      });
    },

    async getDictTypeList() {
      this.dictTypeList = [];
      const me = this;
      try {
        const res = await dictTypeApi.getList({});

        if (res.code !== 0) throw "获取数据字典分类发生错误";

        this.dictTypeList = res.rows || [];
        //console.log(res)
      } catch (e) {
        console.log(e);
        this.$message.error("获取数据字典分类错误");
      }
    },
    /* 表格上方控制按钮操作 */
    baseTableBtnsAdd(bool) {
      this.baseDialogType = 1;
      this.showForm();
    },
    baseTableBtnsEdit(bool) {
      this.baseDialogType = 2;
      this.showForm(true);
    },
    baseTableBtnsDelete(bool) {
      if (this.baseTableCurrent && this.baseTableCurrent["fitemdetailid"]) {
        if (this.baseTableCurrent.fenabledmark) {
          this.$message.error("启用状态不可删除");
        } else {
          this.$elConfirm()
            .then(res => {
              debugger;
              dictInfoApi
                .delete(this.baseTableCurrent["fitemdetailid"])
                .then(res => {
                  if (res.code === 0) {
                    this.$message({
                      message: "删除数据成功",
                      type: "success"
                    });
                    this.getList(this.baseTopFormData.fitemid);
                  } else {
                    this.$message.error("删除数据错误");
                  }
                })
                .catch(err => {
                  console.log(err);
                  this.$message.error("删除数据失败");
                });
            })
            .catch(err => {
              console.log("err", err);
            });
        }
      } else {
        this.$message({
          message: "未找到需删除的数据，请选择",
          type: "warning"
        });
      }
    },

    async showForm(isEdit) {
      await this.getDictTypeList();
      if (isEdit) {
        // 编辑
        if (this.baseTableCurrent && this.baseTableCurrent["fitemdetailid"]) {
          this.ruleForm.fitemdetailid = this.baseTableCurrent.fitemdetailid;
          this.ruleForm.fitemid = this.baseTableCurrent.fitemid;
          this.ruleForm.fitemname = this.baseTableCurrent.fitemname;
          // this.ruleForm.fsimplespelling = this.baseTableCurrent.fsimplespelling;
          this.ruleForm.fitemvalue = this.baseTableCurrent.fitemvalue;
          this.ruleForm.fsortcode = this.baseTableCurrent.fsortcode;
          this.ruleForm.fenabledmark = this.baseTableCurrent.fenabledmark
            ? true
            : false;
          this.ruleForm.fdescription = this.baseTableCurrent.fdescription;
          this.mainDialog = true;
        } else {
          this.$message({
            message: "未找到需编辑的数据，请选择",
            type: "warning"
          });
        }
      } else {
        // 新增
        debugger;
        this.ruleForm = {};
        //默认新增字典类型默认
        this.ruleForm.fitemid = this.baseTopFormData.fitemid;
        this.ruleForm.fenabledmark = true;
        this.mainDialog = true;
      }
    },
    getTree() {
      Apis.getTree().then(res => {
        this.menuList = res.rows || [];
      });
    },
    nodeclick(data, isLeaf) {
      console.log("data: ", data);
      debugger;
      if (data && data.fitemid) {
        //判断选中项如果是执法办案项目 把编辑按钮和删除按钮隐藏
        if (
          !isLeaf ||
          data.fparentid == "e041a66e-ccac-4dd0-84a0-b3026ab7dd83"
        ) {
          this.isZFBAshow = true;
        } else {
          this.isZFBAshow = false;
        }
        const { fitemid } = data;
        this.titleName = "字典分类-" + data.name;
        this.baseTopFormData.fitemid = fitemid;
        this.getList(fitemid);
      }
    },
    getList(typeId) {
      console.log("pageIndex: ", this.baseTablePageCurrent);
      dictInfoApi
        .getList(
          typeId,
          this.baseTablePageCurrent,
          this.baseTablePageSize,
          this.baseTopFormData.name
        )
        .then(res => {
          this.baseTableData.total = res.total;
          this.baseTableData.list = res.rows || [];
        })
        .catch(err => {
          this.$message.error("获取数据字典数据失败");
        });
    },
    // 角色状态修改
    handleStatusChange(row) {
      let text = row.status === "1" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '"吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return changeRoleStatus(row.roleId, row.status);
        })
        .then(() => {
          this.msgSuccess(text + "成功");
        })
        .catch(function() {
          row.status = row.status === "0" ? "1" : "0";
        });
    },
    // 主页表单校验并保存按钮
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.fenabledmark = this.ruleForm.fenabledmark ? 1 : 0;
          dictInfoApi
            .save(this.ruleForm)
            .then(res => {
              debugger;
              if (res.code == 0) {
                this.mainDialog = false;
                this.getList(this.baseTopFormData.fitemid);
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(err => {
              console.error(err);
              this.$message.error(res.msg);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 提交顶部表单数据
    postBaseTopFormData() {
      //console.log("postBaseTopFormData", this.postBaseTopFormData);
      if (this.baseTopFormData.fitemid) {
        this.getList(this.baseTopFormData.fitemid);
      } else {
        console.log(this.$message);
        this.$message({
          message: "请选择数据字典分类",
          type: "warning"
        });
      }
    },

    // 表格操作
    baseTableCurrentChange(row, index) {
      this.baseTableCurrent = row;
    },
    baseTableRadioChange(row, index) {
      console.log("row", row.name, index);
    },
    // 页码操作
    baseTablePageSizeChange(val) {
      console.log("val", val);
      this.baseTablePageSize = +val;
      this.baseTablePageCurrent = 1;
      this.getList(this.baseTopFormData.fitemid);
    },
    baseTablePageCurrentChange(val) {
      console.log("val", val);
      this.baseTablePageCurrent = +val;
      this.getList(this.baseTopFormData.fitemid);
    }
  }
};
</script>

<style scoped
 lang="scss">
.el-main {
  padding: 0 0 0 20px;
}
::v-deep.el-aside {
  .base-title {
    border-bottom: none !important;
  }
  .el-menu {
    &.el-menu--inline {
      border: none;
    }
    border: solid 1px rgb(108, 223, 252);
    background-color: rgba(0, 0, 0, 0);
    .el-menu-item {
      color: rgb(108, 210, 216);
      &:hover {
        background-color: rgba(108, 223, 252, 0.1);
      }
    }
  }
  .el-submenu {
    .el-submenu__title {
      border: none;
      &:hover {
        background-color: rgba(108, 223, 252, 0.1);
      }
      color: rgb(108, 210, 216);
      i {
        color: rgb(108, 210, 216);
      }
    }
  }
}
</style>
