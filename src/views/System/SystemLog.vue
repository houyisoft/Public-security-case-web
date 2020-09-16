<template>
  <div class="info-card">
    <base-top-form
      title="日志管理"
      :baseTopFormData="baseTopFormData"
      @onPostBaseTopFormData="postBaseTopFormData"
    >
      <template v-slot:form>
        <el-form-item prop="key" label="功能名称：">
          <el-input
            v-model="baseTopFormData.key"
            placeholder="请输入功能名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="操作日期"
				 prop="date">
					<el-date-picker type="daterange"
					 unlink-panels
					 value-format="yyyy-MM-dd"
					 range-separator="-"
					 start-placeholder="开始日期"
					 end-placeholder="结束日期"
					 v-model="baseTopFormData.date">
					</el-date-picker>
				</el-form-item>
        <el-button style="margin-left:700px;" @click="excel">导出</el-button>
      </template>
    </base-top-form>



    <base-table
      :baseTableData="baseTableData.list"
      :isBaseTableCheckbox="false"
      :baseTableDataTotal="baseTableData.total"
      baseTableDataPrimaryKey="flogid"
      :baseTablePageCurrent="baseTablePageCurrent"
      :baseTablePageSize="baseTablePageSize"
      @onBaseTableCurrentChange="baseTableCurrentChange"
      @onBaseTablePageSizeChange="baseTablePageSizeChange"
      @onBaseTablePageCurrentChange="baseTablePageCurrentChange"
    >
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="fmodule" label="模块"> </el-table-column>
      <el-table-column prop="fCategoryName" label="类型"> </el-table-column>
      <el-table-column prop="fExecuteresultName" label="结果"> </el-table-column>
      <el-table-column prop="foperateaccount" label="访问用户"> </el-table-column>
      <el-table-column prop="foperatetime" label="访问时间"> </el-table-column>
      <el-table-column prop="fipaddress" label="电脑IP"> </el-table-column>
    </base-table>
  </div>
</template>
<script>
    import axios from 'axios'
import systemLog from '@/apis/systemLog.js'
import $axios from "../../apis";

export default {
  data() {
    return {
      // 顶部表单数据
      baseTopFormData: {
        key: '',
      },
      personTypes: [],
      // 表格数据
      baseTableData: {
        total: 0,
        list: null,
      },
      baseTablePageCurrent: 1,
      baseTablePageSize: 11,
      baseTableCurrent: {}, // 当前选中行数据

      /* 全局弹框组件 */
      baseDialogType: 1, // 操作表格类别 1 新增 2 编辑
      isBaseDialog: false,
      baseDialogFormData: {},
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      systemLog.getList({
        pageNum: this.baseTablePageCurrent,
        pageSize: this.baseTablePageSize,
        fModule: this.baseTopFormData.key,
        beginDate:this.baseTopFormData.date ? this.baseTopFormData.date[0] + ' 00:00:00' : '',
        endDate:this.baseTopFormData.date ? this.baseTopFormData.date[1] + ' 23:59:59' : '',
        fCategoryId:'2'
      }).then((res) => {
        this.baseTableData.list = res.rows
        this.baseTableData.total = res.total
      })
    },
      // exportExcel(methods , url , postData){
      //     window.location.href = '/management/lrBaseLog/exportDetail?fCategoryId=4';
      // },

      excel(){
          let data  = {
              pageNum: this.baseTablePageCurrent,
                                  pageSize: this.baseTablePageSize,
                                  fModule: this.baseTopFormData.key,
                                  beginDate:this.baseTopFormData.date ? this.baseTopFormData.date[0] + ' 00:00:00' : '',
                                  endDate:this.baseTopFormData.date ? this.baseTopFormData.date[1] + ' 23:59:59' : '',
                                  fCategoryId:'4'
                              };
          return $axios.download('/management/lrBaseLog/exportDetail?fCategoryId=4', data, 'test.xls');
        // return $axios.post('/management/lrBaseLog/exportDetail?fCategoryId=4',data).then((res) => {
        //     // let fileName = res.headers['content-disposition'].match(/fushun(\S*)xls/)[0];
        //     // let blob = new Blob(res, {type: "application/vnd.ms-excel"});
        //     // let objectUrl = URL.createObjectURL(blob);
        //     // window.location.href = objectUrl;
        // }).catch(function (res) {
        // });

        // systemLog.outExcelDetail({
        //         pageNum: this.baseTablePageCurrent,
        //         pageSize: this.baseTablePageSize,
        //         fModule: this.baseTopFormData.key,
        //         beginDate:this.baseTopFormData.date ? this.baseTopFormData.date[0] + ' 00:00:00' : '',
        //         endDate:this.baseTopFormData.date ? this.baseTopFormData.date[1] + ' 23:59:59' : '',
        //         fCategoryId:'4'
        //     }
        // ).then((res) => {
        //     // console.log("data is:" + res.data);
        //     // this.download(res,"test.xls");
        // });
      //  systemLog.outExcel({
      //   pageNum: this.baseTablePageCurrent,
      //   pageSize: this.baseTablePageSize,
      //   fModule: this.baseTopFormData.key,
      //   beginDate:this.baseTopFormData.date ? this.baseTopFormData.date[0] + ' 00:00:00' : '',
      //   endDate:this.baseTopFormData.date ? this.baseTopFormData.date[1] + ' 23:59:59' : '',
      //   fCategoryId:'2'
      // }).then((res) => {
      //    systemLog.downLoad({
      //      fileName:res.msg
      //    }).then(data=>{
      //        this.download(data,res.msg);
      //    })
      // })
    },



      // 下载文件
      download (data,fileName) {
          let blob = new Blob([data],{type: 'application/octet-stream'});
          const linkNode = document.createElement('a');

          linkNode.download = fileName; //a标签的download属性规定下载文件的名称
          linkNode.style.display = 'none';
          linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
          document.body.appendChild(linkNode);
          linkNode.click();  //模拟在按钮上的一次鼠标单击

          URL.revokeObjectURL(linkNode.href); // 释放URL 对象
          document.body.removeChild(linkNode);
      },
      postBaseTopFormData() {
      this.getList()
      console.log('顶部表单数据', this.baseTopFormData)
    },

      formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
      },
    /* 表格上方控制按钮操作 */
    baseTableBtnsAdd(bool) {
      this.baseDialogFormData = {}
      this.baseDialogType = 1
      this.handleIsBaseDialog(bool)

      console.log('baseTableBtnsAdd', bool)
    },
    /* 弹窗操作 */
    handleIsBaseDialog(bool) {
      if(!bool)
      this. getList()
      this.isBaseDialog = bool
    },
    postBaseDialogFormData() {
      var data = this.baseDialogFormData
      if (this.baseDialogType == 1) {
        systemLog.save({
          no: data.no,
          icCode: data.icCode,
          state: 0,
          centerInfoId: this.$store.state.userInfo.fcompanyid,
        })
          .then((res) => {
            if (res.code == 0) {
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success',
              })
              this.getList()
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'error',
              })
            }
          })
          .catch((err) => {
            console.log('获取表单失败' + err)
          })
      } else if (this.baseDialogType == 2) {
        systemLog.edit({
          fId: data.fid,
          no: data.no,
          icCode: data.icCode,
          state: 0,
        }).then((res) => {
          if (res.code == 0) {
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success',
            })
            this.getList()
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error',
            })
          }
        })
      }
      console.log(
        '提交表单数据',
        JSON.parse(JSON.stringify(this.baseDialogFormData))
      )
    },

    /* 表格操作 */
    baseTableCurrentChange(row, index) {
      this.baseDialogFormData = row
      console.log('当前选中表格行', row, index)
      this.baseTableCurrent = row
    },
    baseTablePageSizeChange(val) {
      console.log('当前页码', val)
      this.baseTablePageSize = val
      this.getList()
    },
    baseTablePageCurrentChange(val) {
      console.log('每页数量', val)
      this.baseTablePageCurrent = val
      this.getList()
    },
    baseTableBtnsUse() {
      var data = this.baseTableCurrent
      if (data.fid != null) {
        // debugger
        systemLog.use({
          fIdList: data.fid,
        }).then((res) => {
          if (res.code == 0) {
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success',
            })
            this.getList()
          } else {
            this.$message({
              showClose: true,
              message: '操作失败',
              type: 'error',
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: '请选择要操作的信息',
          type: 'warning',
        })
      }
    },
    baseTableBtnsunUse() {
      // debugger
      var data = this.baseTableCurrent
      if (data.fid != null) {
        systemLog.use({
          fIdList: data.fid,
        }).then((res) => {
          if (res.code == 0) {
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success',
            })
            this.getList()
          } else {
            this.$message({
              showClose: true,
              message: '操作失败',
              type: 'error',
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: '请选择要操作的信息',
          type: 'warning',
        })
      }
    },
    formatterState(row, column) {
      if (row.state == '0') return '未使用'
      else if (row.state == '1') return '使用中'
      else return '未使用'
    },
    formatterproportion(row, column) {
      if (row.proportion != null) return row.proportion + '%'
      else return ''
    },
    formatterPersonType(row, column) {
      for (var i = 0; i < this.personTypes.length; i++) {
        if (this.personTypes[i].fitemid == row.peopleType) {
          return this.personTypes[i].fitemname
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.info-card {
  padding: 30px 20px;
}
</style>
