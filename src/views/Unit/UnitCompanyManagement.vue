<template>
  <div class="system-administration">
    <base-top-form
      title="公司管理"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:btn> </template>

      <template v-slot:form>
        <el-form-item prop="type" label-width="120px" label="">
          <el-select
            placeholder="请选择"
            clearable
            v-model="baseTopFormData.type"
          >
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="(item, index) in types"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
    </base-top-form>
    <div class="table-btns-wrap">
      <div class="table-btn-wrap" @click="mainDialog = true">
        <span>新增</span>
        <i class="el-icon-circle-plus btn-icon"></i>
      </div>
      <div class="table-btn-wrap" @click="mainDialog = true">
        <span>编辑</span>
        <i class="el-icon-edit btn-icon"></i>
      </div>
      <div class="table-btn-wrap">
        <span>删除</span>
        <i class="el-icon-delete btn-icon"></i>
      </div>
    </div>
    <base-table
      :baseTableData="baseTableData.list"
      :baseTableDataTotal="baseTableData.total"
      :baseTableCurrentRadio="baseTableCurrentRadio"
      :baseTablePagecurrentPage="baseTablePagecurrentPage"
      :baseTablePageSize="baseTablePageSize"
      @onBaseTableCurrentChange="baseTableCurrentChange"
      @onBaseTablePageSizeChange="baseTablePageSizeChange"
      @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
    >
      <el-table-column prop="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="name" label="部门" width="100"> </el-table-column>
      <el-table-column prop="address" width="" label="设备IP">
      </el-table-column>
      <el-table-column prop="number" label="状态" width=""> </el-table-column>
      <el-table-column prop="number" label="创建日期" width="">
      </el-table-column>
      <el-table-column prop="number" label="创建人" width=""> </el-table-column>
      <el-table-column prop="police" label="描述" width="190">
      </el-table-column>
      <el-table-column prop="police" label="操作" width="">
        <template>
          <el-switch></el-switch>
        </template>
      </el-table-column>
    </base-table>

    <!-- 主页弹窗 -->
    <base-dialog
      :isBaseDialog="mainDialog"
      :baseDialogFormData="baseTopFormData"
      dialogWidth="60%"
      :title="baseDialogType == 1 ? '新增' : '编辑'"
      @onHandleIsBaseDialog="mainDialog = false"
      @onPostBaseDialogFormData="postBaseDialogFormData"
    >
      <template v-slot:form>
        <el-row>
          <el-col :span="12">
            <el-form-item
              :rules="[
                { required: true, message: '请输入公司名称', trigger: 'blur' },
              ]"
              label="公司名称"
              prop="name"
            >
              <el-input
                class="input-width"
                v-model="baseTopFormData.type"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :rules="[
                { required: true, message: '请输入公司性质', trigger: 'blur' },
              ]"
              label="公司性质"
              prop="name"
            >
              <el-input
                class="input-width"
                v-model="baseTopFormData.type"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item
              :rules="[
                { required: true, message: '请输入公司编码', trigger: 'blur' },
              ]"
              label="公司编码"
              prop="name"
            >
              <el-input
                class="input-width"
                v-model="baseTopFormData.type"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :rules="[
                { required: true, message: '请输入公司简称', trigger: 'blur' },
              ]"
              label="公司简称"
              prop="name"
            >
              <el-input
                class="input-width"
                v-model="baseTopFormData.type"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="上级公司" prop="name">
              <el-select placeholder="请选择" v-model="baseTopFormData.type">
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="(item, index) in types"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成立时间" prop="name">
              <el-input
                class="input-width"
                v-model="baseTopFormData.type"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="负责人" prop="name">
              <el-input
                class="input-width"
                v-model="baseTopFormData.type"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话" prop="name">
              <el-input
                class="input-width"
                v-model="baseTopFormData.type"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="电子邮箱" prop="name">
              <el-input
                class="input-width"
                v-model="baseTopFormData.type"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="传真" prop="name">
              <el-input
                class="input-width"
                v-model="baseTopFormData.type"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="公司地点" prop="name">
              <el-input
                class="input-width"
                v-model="baseTopFormData.type"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="传真" prop="name">
              <el-input
                class="input-width"
                v-model="baseTopFormData.type"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="邮编" prop="name">
              <el-input
                class="input-width"
                v-model="baseTopFormData.type"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司官网" prop="name">
              <el-input
                class="input-width"
                v-model="baseTopFormData.type"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="精英范围" prop="name">
              <el-input v-model="baseTopFormData.type"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
      </template>
    </base-dialog>
  </div>
</template>

<script>
import InfoSubmenu from '@/views/Info/components/InfoSubmenu.vue'
export default {
  components: {
    InfoSubmenu,
  },
  data() {
    return {
      baseDialogType: 1,
      ruleForm: {
        name: '',
        type: [],
      },
      baseTopFormData: {
        type: '',
      },
      types: [
        {
          value: 1,
          label: '类型一',
        },
      ],
      // baseTable表格组件数据
      baseTableData: {
        total: 20,
        list: [
          {
            index: 1, // 序号
            name: '王小虎', // 人员名称
            address: '上海市', // 所在位置
            number: 1010010100101, // 案件编号
            caseName: '案件一', // 案件名称
            bandsNumber: '1232313', // 手环编号
            police: '张三', // 交接民警
            isLeave: true, // 是否已离开
            roomName: '7号侯问室', // 功能室名称
            inDate: '2016-05-02', // 进入时间
            outDate: '2016-05-02', // 离开时间
          },
          {
            index: 2, // 序号
            name: '王小', // 人员名称
            address: '北京市 1518 弄', // 所在位置
            number: 1010010100101, // 案件编号
            caseName: '案件一', // 案件名称
            bandsNumber: '1232313', // 手环编号
            police: '张三', // 交接民警
            isLeave: true, // 是否已离开
            roomName: '7号侯问室', // 功能室名称
            inDate: '2016-05-02', // 进入时间
            outDate: '2016-05-02', // 离开时间
          },
          {
            index: 3, // 序号
            name: '小虎', // 人员名称
            address: '长沙市 1518 弄', // 所在位置
            number: 1010010100101, // 案件编号
            caseName: '案件一', // 案件名称
            bandsNumber: '1232313', // 手环编号
            police: '张三', // 交接民警
            isLeave: true, // 是否已离开
            roomName: '7号侯问室', // 功能室名称
            inDate: '2016-05-02', // 进入时间
            outDate: '2016-05-02', // 离开时间
          },
          {
            index: 4, // 序号
            name: '王虎', // 人员名称
            address: '重庆市', // 所在位置
            number: 1010010100101, // 案件编号
            caseName: '案件一', // 案件名称
            bandsNumber: '1232313', // 手环编号
            police: '张三', // 交接民警
            isLeave: true, // 是否已离开
            roomName: '7号侯问室', // 功能室名称
            inDate: '2016-05-02', // 进入时间
            outDate: '2016-05-02', // 离开时间
          },
        ],
      },
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1',
            },
            {
              id: 6,
              label: '二级 2-2',
            },
          ],
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1',
            },
            {
              id: 8,
              label: '二级 3-2',
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      baseTableCurrentRadio: 0, // 当前选中的radio
      baseTablePagecurrentPage: 1,
      baseTablePageSize: 2,
      mainDialog: false,
      visibleSubMain: false,
      functionDialog: true,
    }
  },
  methods: {
    postBaseDialogFormData() {
      console.log(
        '提交表单数据',
        JSON.parse(JSON.stringify(this.baseTopFormData))
      )
    },
    // 主页表单校验并保存按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.mainDialog = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 提交顶部表单数据
    postBaseTopFormData() {
      console.log('postBaseTopFormData', this.postBaseTopFormData)
    },

    // 表格操作
    baseTableCurrentChange(row, index) {
      console.log('row', row.name, index)
      this.baseTableCurrentRadio = index
    },
    baseTableRadioChange(row, index) {
      console.log('row', row.name, index)
      this.baseTableCurrentRadio = index
    },
    // 页码操作
    baseTablePageSizeChange(val) {
      console.log('val', val)
    },
    baseTablePageCurrentChange(val) {
      console.log('val', val)
    },
  },
}
</script>

<style scoped lang="scss">
.system-administration {
  padding: 40px 20px 20px 20px;
}
.left-btn {
  margin-left: 254px;
}
.input-width {
  width: 217px;
}
</style>
