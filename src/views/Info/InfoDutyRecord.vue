<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="info-Dictionary">
    <el-container>
      <el-aside width="180px">
        <info-submenu title="值班记录"></info-submenu>
      </el-aside>
      <el-main>
        <base-top-form
          title="值班记录"
          :baseTopFormData="baseTopFormData"
          @onPostBaseTopFormData="postBaseTopFormData"
        >
          <template v-slot:btn>
            <div class="left-btn">
              <el-button @click="mainDialog = true" type="primary"
                >设置值班人员</el-button
              >
            </div>
          </template>

          <template v-slot:form>
            <el-form-item prop="type" label="">
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
          <el-table-column prop="index" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="name" label="值班人员名称" width="180">
          </el-table-column>
          <el-table-column prop="address" width="180" label="值班时间">
          </el-table-column>
          <el-table-column prop="number" label="创建用户名" width="180">
          </el-table-column>
          <el-table-column prop="caseName" label="创建时间" width="">
          </el-table-column>
        </base-table>
      </el-main>
    </el-container>

    <!-- 主页弹窗 -->
    <el-dialog
      title="设置值班人员"
      width="80%"
      :close-on-click-modal="false"
      :visible="mainDialog"
      @close="mainDialog = false"
    >
      <template slot="footer">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确认</el-button
        >
        <el-button type="" @click="mainDialog = false">关闭</el-button>
      </template>
    </el-dialog>
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
      baseTableCurrentRadio: 0, // 当前选中的radio
      baseTablePagecurrentPage: 1,
      baseTablePageSize: 2,
      mainDialog: false,
    }
  },
  methods: {
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
.info-Dictionary {
  padding: 40px 20px 20px 20px;
}
.left-btn {
  margin-left: 722px;
}
</style>
