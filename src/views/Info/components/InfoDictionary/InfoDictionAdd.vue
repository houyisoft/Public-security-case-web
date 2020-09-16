<template>
  <div>
    <el-dialog
      width="70%"
      :close-on-click-modal="false"
      :visible="visibleSubMain"
      @close="$emit('close')"
    >
      <base-top-form
        :baseTopFormData="baseTopFormData"
        @onPostBaseTopFormData="postBaseTopFormData"
      >
        <template v-slot:form>
          <el-form-item prop="type" label="项目名称/项目值">
            <el-input v-model="keyword" placeholder="请输入内容"></el-input>
          </el-form-item>
        </template>
      </base-top-form>
      <div class="table-btns-wrap">
        <div class="table-btn-wrap" @click="showForm(true)">
          <span>新增</span>
          <i class="el-icon-circle-plus btn-icon"></i>
        </div>
        <div class="table-btn-wrap" @click="showForm(false)">
          <span>编辑</span>
          <i class="el-icon-edit btn-icon"></i>
        </div>
        <div class="table-btn-wrap" @click="handleDelete()">
          <span>删除</span>
          <i class="el-icon-delete btn-icon"></i>
        </div>
      </div>

      <base-table
        :baseTableData="baseTableData.list"
        :baseTableDataTotal="baseTableData.total"
        :isBaseTableRadio="false"
        :baseTablePageCurrent="baseTablePageCurrent"
        :baseTablePageSize="baseTablePageSize"
        @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
        @onBaseTablePageSizeChange="baseTablePageSizeChange"
        @onBaseTableCurrentChange="baseTableCurrentChange"
      >
        <el-table-column type="index" label="序号" :index="indexMethod" width="50" align="center"></el-table-column>
        <el-table-column prop="parentName" label="上级" width="150" align="center"></el-table-column>
        <el-table-column prop="fitemcode" label="编号" align="center" width="200"></el-table-column>
        <el-table-column prop="fitemname" label="名称" align="center"></el-table-column>
        <el-table-column prop="fsortcode" label="排序" width="100" align="center"></el-table-column>
        <el-table-column prop="fenabledmark" label="有效" width="100" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.fenabledmark ? 'success' : 'danger'"
            >{{scope.row.fenabledmark? '有效':'无效'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="fdescription" label="备注" width></el-table-column>
      </base-table>
      <!-- <template slot="footer">
				<el-button type="primary"
				@click="submitForm('ruleForm')">确认</el-button>
				<el-button type=""
				@click="mainDialog = false">关闭</el-button>
      </template>-->
      <!-- 主页弹窗 -->
    </el-dialog>

    <el-dialog
      title="添加分类"
      width="50%"
      :close-on-click-modal="false"
      :visible="mainDialog"
      @close="mainDialog = false"
    >
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="上级" prop="fParentid">
          <el-select v-model="ruleForm.fParentid" placeholder="请选择">
            <el-option
              v-for="item in parentOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :rules="[{'required': true,'message': '请输入名称','trigger': 'blur'}]"
          label="名称"
          prop="fItemname"
        >
          <el-input v-model="ruleForm.fItemname" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item
          :rules="[{'required': true,'message': '请输入编号','trigger': 'blur'}]"
          label="编号"
          prop="fItemcode"
        >
          <el-input v-model="ruleForm.fItemcode" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item
          :rules="[
            {'required': true,'message': '请输入排序','trigger': 'blur'},
            { type: 'number', message: '排序必须为数字值'}
          ]"
          label="排序"
          prop="fSortcode"
        >
          <el-input v-model.number="ruleForm.fSortcode" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label prop="fEnabledmark">
          <el-checkbox label="有效" v-model="ruleForm.fEnabledmark"></el-checkbox>
          <!-- <el-checkbox-group v-model="ruleForm.type">

            <el-checkbox label="有效"
                         name="type"></el-checkbox>
          </el-checkbox-group>-->
        </el-form-item>

        <el-form-item label="备注" prop="fDescription">
          <el-input type="ruleForm.fdescription" v-model="ruleForm.fDescription"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
        <el-button type @click="mainDialog = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import InfoDiction from "@/apis/Info/InfoDictionType.js";
export default {
  props: {
    visibleSubMain: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      keyword: "",
      parentOptions: [],
      ruleForm: {
        fItemid: "",
        fParentid: "",
        fItemcode: "",
        fItemname: "",
        fSortcode: 0,
        fEnabledmark: true,
        fDeletemark: 0,
        fDescription: ""
      },
      mainDialog: false,
      baseTopFormData: {
        type: ""
      },
      types: [
        {
          value: 1,
          label: "类型一"
        }
      ],
      baseTablePageCurrent: 1,
      baseTablePageSize: 10,
      baseTableCurrent: {},
      // baseTable表格组件数据
      baseTableData: {
        total: 20,
        list: []
      }
    };
  },
  watch: {},
  created() {
    this.getList();
    this.getParentList();
  },
  methods: {
    // 获取序号
    indexMethod(index) {
      return index + 1;
    },
    // 查询
    postBaseTopFormData() {
      this.getList();
    },
    baseTablePageCurrentChange(val) {
      this.baseTablePageCurrent = val;
      this.getList();
    },
    baseTablePageSizeChange(val) {
      this.baseTablePageSize = val;
      this.baseTablePageCurrent = 1;
      this.getList();
    },
    baseTableCurrentChange(row, index) {
      // console.log('当前选中表格行', row, index)
      this.baseTableCurrent = row;
    },
    // 查询分类列表
    getList() {
      InfoDiction.getList({
        pageNum: this.baseTablePageCurrent,
        pageSize: this.baseTablePageSize,
        name: this.keyword ? this.keyword : ""
      })
        .then(res => {
          // console.log('数据字典分类:', res)
          this.baseTableData.total = res.total;
          this.baseTableData.list = res.rows || [];
        })
        .catch(err => {
          this.$message.error("读取数据失败");
        });
    },
    getParentList() {
      InfoDiction.getList({
        name: ""
      })
        .then(res => {
          // console.log('数据字典分类:', res)
          this.parentOptions = res.rows && res.rows.length ? res.rows : [];
        })
        .catch(err => {
          this.$message.error("读取上级分类数据失败");
        });
    },
    // 显示编辑分类表单
    showForm(isadd) {
      if (!isadd) {
        // 编辑
        if (!this.baseTableCurrent["fitemid"]) {
          this.$message({
            message: "请选择需要编辑的数据",
            type: "warning"
          });
        } else {
          const { fitemid } = this.baseTableCurrent;
          // 获取数据
          InfoDiction.getSingle(fitemid)
            .then(res => {
              if (res.code === 0 && res.rows && res.rows.length > 0) {
                const data = res.rows[0];
                // console.log('res: ', data)
                this.ruleForm.fParentid = data.fparentid;
                this.ruleForm.fItemid = data.fitemid;
                this.ruleForm.fItemcode = data.fitemcode;
                this.ruleForm.fItemname = data.fitemname;
                this.ruleForm.fSortcode = +data.fsortcode;
                this.ruleForm.fEnabledmark = data.fenabledmark ? true : false;
                this.ruleForm.fDescription = data.fdescription;
                // console.log('ruleForm: ', this.ruleForm)
                this.mainDialog = true;
              } else {
                this.$message.error("读取数据失败");
              }
            })
            .catch(err => {
              this.$message.error("读取数据失败");
            });
        }
      } else {
        this.ruleForm.fItemid = "";
        this.resetForm("ruleForm");
        this.mainDialog = true;
      }
    },
    // 重置表单
    resetForm(formName) {
      setTimeout(() => {
        this.$nextTick(() => {
          // console.log(this.$refs.ruleForm)
          this.$refs[formName].resetFields();
        });
      }, 0);
    },
    // 删除数据
    handleDelete() {
      if (!this.baseTableCurrent["fitemid"]) {
        this.$message({
          message: "请选择需要删除的数据",
          type: "warning"
        });
      } else {
        const { fitemid } = this.baseTableCurrent;

        this.$elConfirm()
          .then(res => {
            // console.log(fitemid)
            InfoDiction.delete(fitemid)
              .then(res => {
                if (res.code == 0) {
                  // success
                  this.$message({
                    message: "删除数据字典分类成功",
                    type: "success"
                  });
                  this.getList();
                } else {
                  debugger;
                  this.$message.error(res.msg);
                }
              })
              .catch(err => {
                debugger;
                this.$message.error("删除数据字典分类错误");
              });
          })
          .catch(err => {
            // console.log('err', err)
          });
      }
    },
    // 主页表单校验并保存按钮
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.fEnabledmark = this.ruleForm.fEnabledmark ? 1 : 0;
          // console.log('form: ', this.ruleForm)

          InfoDiction.save(this.ruleForm)
            .then(res => {
              if (res.code === 0) {
                this.$message({
                  message: "保存数据字典分类成功",
                  type: "success"
                });
                this.mainDialog = false;
                this.getList();
              } else {
                tthis.$message.error("保存数据字典分类错误");
              }
            })
            .catch(err => {
              // console.error(err)
              this.$message.error("保存数据字典分类错误");
            });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
</style>