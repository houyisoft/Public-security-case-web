<template>
  <div class="add-belongings-dialog">
    <el-dialog
      title="添加物品"
      :visible="isAddBelongingsDialog"
      width="1200px"
      :close-on-click-modal="false"
      @close="closeDialog()"
    >
      <div class="person-name">人员姓名 - {{ belongRow.suspectName }}</div>
      <div class="dialog-top-wrap">
        <div class="dialog-left-wrap">
          <base-title title="物品信息"></base-title>
          <el-form
            class="add-belongings-dialog-form"
            :model="addBelongingsDialogFormData"
            :rules="addRules"
            ref="addBelongingsDialogForm"
            labelWidth="84px"
          >
            <el-form-item label="物品名称" prop="name">
              <el-input v-model="addBelongingsDialogFormData.name" placeholder="请输入"></el-input>
            </el-form-item>
            <div class="flex-box">
              <el-form-item label="数量" prop="amount">
                <el-input-number
                  v-model="addBelongingsDialogFormData.amount"
                  placeholder="请输入"
                  :controls="false"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="数量单位" prop="amountUnit">
                <el-select v-model="addBelongingsDialogFormData.amountUnit" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in numberList"
                    :key="index"
                    :label="item.fitemname"
                    :value="item.fitemname"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="flex-box">
              <el-form-item label="重量" prop="weight">
                <el-input-number
                  v-model="addBelongingsDialogFormData.weight"
                  placeholder="请输入"
                  :controls="false"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="重量单位" prop="weightUnit">
                <el-select v-model="addBelongingsDialogFormData.weightUnit" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in weightList"
                    :key="index"
                    :label="item.fitemname"
                    :value="item.fitemname"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-form-item label="物品类型" prop="goodsType">
              <el-select
                style="width: 100%;"
                v-model="addBelongingsDialogFormData.goodsType"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in typeList"
                  :key="index"
                  :label="item.fitemname"
                  :value="item.fitemname"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
              <el-input
                type="textarea"
                v-model="addBelongingsDialogFormData.remarks"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-imgs-wrap" label="照片">
              <el-row type="flex" justify="start">
                <el-col :span="8" v-for="(item, index) in photoList" :key="index">
                  <base-image
                    :src="item.src"
                    :index="index"
                    @onBaseImageDeleteImg="deletePhoto"
                    @onBaseImageAddImg="handleTakePhone"
                  ></base-image>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog-right-wrap">
          <base-title title="实时影像信息"></base-title>
          <div class="tab-bar">
            <div class="flex-box">
              <div
                :class="{
                  'tab-bar-card': true,
                  'current-card': belongingsImgCurrentTab == 1,
                }"
                @click="belongingsImgChangeTab(1)"
              >摄像头影像</div>
              <div
                :class="{
                  'tab-bar-card': true,
                  'current-card': belongingsImgCurrentTab == 2,
                }"
                @click="belongingsImgChangeTab(2)"
              >高拍仪影像</div>
            </div>
          </div>
          <div class="belongings-img-wrap" v-if="belongingsImgCurrentTab == 1">
            <koda-video :scale="0.8" ref="kodaVideo" :width="400" :height="270" configName="随身物品" />
            <!-- <div class="belongings-msg">
                            <div class>1.实时影像区可查看物品图像</div>
                            <div class>2.在物品信息处点击照片进行抓拍</div>
                            <div class>3.在物品记录表里点击相应的物品，可进行物品信息查看和修改</div>
            </div>-->
          </div>
          <div class="belongings-img-wrap" v-else>
            <el-image
              class="belongings-img"
              fit="cover"
              :src="belongingsImgSrc || require('@/assets/nolink.png')"
            ></el-image>
            <div class="belongings-msg">
              <div class>1.实时影像区可查看物品图像</div>
              <div class>2.在物品信息处点击照片进行抓拍</div>
              <div class>3.在物品记录表里点击相应的物品，可进行物品信息查看和修改</div>
            </div>
          </div>
          <div style="margin-top: 56px; float: right;padding-bottom: 10px;">
            <el-button
              type="primary"
              v-if="editRow === undefined"
              @click="postAddBelongingsDialogFormData"
            >增加物品</el-button>
            <el-button type="primary" v-else @click="confirmEdit">确认修改</el-button>
            <el-button type="primary" @click="saveGoods">保存</el-button>
          </div>
        </div>
      </div>
      <div class="dialog-bottom-wrap">
        <base-title
          title="物品记录"
          baseTitleStyle="padding: 40px 0 25px 0; border-top:1px solid #DDDDDD;"
        ></base-title>
        <div class="table-btns-wrap">
          <!-- <div class="table-btn-wrap" @click="openDist">
            <span style="color: #fff;">分配储物柜</span>
            <i class="el-icon-s-order btn-icon"></i>
          </div>-->

          <el-dropdown @command="openDist">
            <span class="el-dropdown-link" style="color: white; ">
              分配箱柜
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in lockerList"
                :key="index"
                :command="item"
              >{{ item.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-table
          :data="goodsList"
          border
          ref="multipleTable"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
          style="width: 100%"
        >
<!--          <el-table-column type="selection" :selectable="checkList" disabled="true" width="50"></el-table-column>-->
          <el-table-column type="selection"  width="50"></el-table-column>
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="物品名称"></el-table-column>
          <el-table-column prop="amount" label="数量" width="70"></el-table-column>
          <el-table-column prop="amountUnit" label="数量单位"></el-table-column>
          <el-table-column prop="weight" label="重量" width="70"></el-table-column>
          <el-table-column prop="weightUnit" label="重量单位"></el-table-column>
          <el-table-column prop="goodsType" label="物品类型"></el-table-column>
          <el-table-column prop="positionCode" label="货位编号"></el-table-column>
          <el-table-column prop="remarks" label="备注"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                :disabled="scope.row.positionCode !== ''"
                icon="el-icon-delete"
                @click="deleteBelongingsRecord(scope.row, scope.$index)"
              >删除</el-button>
              <el-button
                type="text"
                icon="el-icon-edit"
                v-if="!scope.row.positionId"
                @click="editBelongingsRecord(scope.row)"
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <el-dialog
      class="distribute-locker-dialog"
      :close-on-click-modal="false"
      width="770px"
      title="分配储物柜"
      :visible.sync="isDist"
      append-to-body
    >
      <div class="person-info">
        <span class="info-name">人员姓名：{{ belongRow.suspectName }}</span>
        <span
          class="info-bandno"
          v-if="belongRow.wristbandNo != 'null'"
        >手环编号：{{ belongRow.wristbandNo }}</span>
      </div>

      <el-form :model="distForm" ref="distributeLockerDialogForm" labelWidth="100px">
        <el-form-item label="储物柜名称" prop="name">
          <el-select
            @change="selLocker"
            style="width: 100%;"
            v-model="distForm.lockerId"
            placeholder="请选择储物柜名称"
          >
            <el-option
              v-for="(item, index) in lockerList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="箱体编号" prop="lockerNo" v-show="!hideBox">
          <el-select
            @change="selBox"
            style="width: 100%;"
            v-model="distForm.boxId"
            placeholder="请选择箱体编号"
          >
            <el-option
              v-for="(item, index) in boxList"
              :key="index"
              :label="item.sort"
              :value="item.boxId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="货位编号" prop="positionNo">
          <el-select
            style="width: 100%;"
            v-model="distForm.positionId"
            @change="selPosition"
            placeholder="请选择货位编号"
          >
            <el-option
              v-for="(item, index) in positionList"
              :key="index"
              :label="item.name || item.siteNO"
              :value="item.positionId || item.fid"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="distribute-locker-control">
        <el-button
          class="control-btn"
          plain
          @click="autoAssign"
          :disabled="!autoAssignButton"
          type="primary"
        >自动分配</el-button>
        <div class="control-blocks">
          <cabinet
            :listProp="detailForm.list"
            :detailProp="detailForm.detail"
            :currentId="detailForm.currentId"
            :typeProp="detailForm.type"
          />
        </div>
        <div class="control-msg">
          可选择相应货柜或点击自动分配按钮进行分配，
          <div class="control-msg-block"></div>表示空闲可以分配，
          <div class="disable-msg-block"></div>表示已被分配，
          <div class="current-msg-block"></div>表示选中状态
        </div>
      </div>
      <template slot="footer">
        <el-button type="primary" @click="distLocker">分配完成</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import belong from "@/apis/apiCase/apiCaseBelongings.js";
import Cabinet from "./types/Cabinet";
import KodaVideo from "@/components/camera/KodaVideo";
import { dateFormat } from "@/utils/utils.js";

export default {
  components: {
    Cabinet,
    KodaVideo,
  },
  props: {
    isAddBelongingsDialog: {
      type: Boolean,
      default: false,
    },
    belongRow: {
      type: Object,
      default: () => {
        return {};
      },
    },
    goodsList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  watch: {
    isDist(val) {
      const display = val ? "none" : "flex";
      this.$refs.kodaVideo.$el.style.display = display;
    },
  },
  data() {
    return {
      hideBox: false,
      selectedBox: {},
      autoAssignButton: true, //自动分配按钮
      photoList: [
        { field: "picture01", value: "", src: "" },
        { field: "picture02", value: "", src: "" },
        { field: "picture03", value: "", src: "" },
      ],
      editRow: undefined,
      //储物柜list
      lockerList: [],
      personalGoodsIdJson: "",
      lockerId: "",
      lockerName: "",
      lockerType: "",
      boxId: "",
      boxCode: "",
      positionId: "",
      positionCode: "",
      objData: [],
      boxList: [],
      positionList: [],
      detailForm: [],
      // 物品类别
      numberList: [],
      weightList: [],
      typeList: [],
      // 物品信息表单数据
      addBelongingsDialogFormData: {
        name: "",
        amount: undefined,
        amountUnit: "",
        weight: undefined,
        weightUnit: "",
        goodsType: "",
        remarks: "",
      },
      // 添加物品弹窗实时影像tab
      belongingsImgCurrentTab: 1,
      // 添加物品弹窗实时影像
      belongingsImgSrc: "",
      // 物品记录表格数据
      distForm: {
        lockerId: "",
        boxId: "",
        positionId: "",
      },
      isDist: false,
      recordList: [],
      recordIds: "",
      result: [],
      detailForm: {
        list: [],
        detail: {},
        type: 1,
      }, //储物柜图形展示
      codes: [],
      codeList: [],
      addRules: {
        name: [
          {
            required: true,
            message: "请填写物品名称",
            trigger: "blur",
          },
        ],
        amount: [{ required: true, message: "请填写数量", trigger: "blur" }],
        amountUnit: [
          {
            required: true,
            message: "请选择数量单位",
            trigger: "change",
          },
        ],
        goodsType: [
          {
            required: true,
            message: "请选择物品类型",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    // this.getDistList();
    this.getBoxList();
    this.getType(1);
    this.getType(2);
    this.getType(3);
  },
  methods: {
    getBoxList() {
      belong.getBoxList({}).then((res) => {
        const { rows } = res;
        this.lockerList = rows;
      });
    },
    handleTakePhone(index) {
      const item = this.photoList[index];
      this.$refs["kodaVideo"].takeAndUploadPhoto(item).then((res) => {
        this.addBelongingsDialogFormData[item.field] = item.value;
      });
    },
    deletePhoto(index) {
      this.photoList[index].value = "";
      this.photoList[index].src = "";
    },
    availableLocker(list, obj) {
      console.log("货位列表:", list);
      for (const item of list) {
        const {
          children,
          userId,
          lockerId,
          lockerType,
          lockerName,
          positionId,
          code,
          sort: boxCode,
          boxId,
        } = item;
        if (obj.lockerId !== lockerId) {
          obj = { lockerId, lockerName, lockerType };
        }
        if (boxCode && obj.boxCode !== boxCode) {
          obj.boxId = boxId;
          obj.boxCode = boxCode;
        }
        if (children && children.length) {
          return this.availableLocker(children, obj);
        } else {
          if (!userId) {
            obj.positionId = positionId;
            obj.positionCode = code;
            Object.assign(this, obj);
            this.$set(item, "selected", true);
            // this.selLocker(obj.lockerId);
            this.selBox(obj.boxId);
            this.distForm.lockerId = obj.lockerId;
            this.distForm.boxId = obj.boxId;
            this.distForm.positionId = obj.positionId;
            item.userName = this.belongRow.suspectName;
            item.gender = this.belongRow.sex;
            // item.userId = this.belongRow.suspectId;
            item.distributionDate = dateFormat(
              "YYYY-MM-DD hh:mm:ss",
              new Date()
            );
            this.autoAssignButton = false;
            return obj;
          }
        }
      }
    },
    availableBoxCell(list, obj) {
      for (const item of list) {
        const { userId, fid: positionId, siteNO: positionCode } = item;
        if (!userId) {
          Object.assign(this, { positionId, positionCode });
          this.$set(item, "selected", true);
          this.distForm.positionId = positionId;
          this.distForm.positionId = positionCode;
          item.userName = this.belongRow.suspectName;
          item.gender = this.belongRow.sex;
          item.distributionDate = dateFormat("YYYY-MM-DD hh:mm:ss", new Date());
          this.autoAssignButton = false;
          return obj;
        }
      }
    },
    //点击自动分配
    autoAssign() {
      if (this.detailForm.type === 1) {
        this.availableLocker(this.detailForm.detail.children, {});
      } else {
        this.availableBoxCell(this.detailForm.detail.children, {});
      }
    },
    // 物品已分配储物柜，则不能进行勾选再次分配
    checkList(row) {
      if (row.positionId) {
        return false;
      } else {
        return true;
      }
    },
    // 查询数量单位/重量单位/物品类别列表
    getType(type) {
      let data = {
        type: type,
      };
      belong.queryGoods(data).then((res) => {
        if (res.code == 0) {
          if (type == 1) {
            this.numberList = res.rows;
          } else if (type == 2) {
            this.weightList = res.rows;
          } else if (type == 3) {
            this.typeList = res.rows;
          }
        }
        console.log(res, "res");
      });
    },
    getUsedDistList(item) {
      return new Promise((resolve) => {
        let codes = this.codes.join(",");
        let data = {
          centerInfoId: this.$store.state.userInfo.fcompanyid,
          codes: codes,
          type: item.lockerType,
        };
        belong.detail(data).then((res) => {
          console.log("detailForm", res);
          const { lockerData, goodsshelvesData } = res;
          this.detailForm.type = item.lockerType;
          if (lockerData != null && goodsshelvesData != null) {
            this.detailForm.list = [...lockerData, ...goodsshelvesData];
          } else if (lockerData != null && goodsshelvesData == null) {
            this.detailForm.list = [...lockerData];
          } else if (lockerData == null && goodsshelvesData != null) {
            this.detailForm.list = [...goodsshelvesData];
          }
          console.log("this.detailForm.list", this.detailForm.list);
          // (item.lockerType === 1 ? lockerData : goodsshelvesData) || [];
          // this.detailForm.detail = this.detailForm.list[0] || {};
          resolve();
        });
      });
    },
    // // 获取储物柜列表
    // getDistList() {
    //   let data = {
    //     centerInfoId: this.$store.state.userInfo.fcompanyid,
    //   };
    //   belong.detail(data).then((res) => {
    //     const { lockerData, goodsshelvesData, type } = res;
    //     this.lockerList = (type === 1 ? lockerData : goodsshelvesData) || [];
    //     this.detailForm.type = type;
    //     this.detailForm.list =
    //       (type === 1 ? lockerData : goodsshelvesData) || [];
    //     this.detailForm.detail = this.detailForm.list[0] || {};
    //   });
    // },
    // 打开分配储物柜
    openDist(item) {
      console.log(this.recordIds);
      if (!this.recordIds) {
        this.$message({
          message: "请选择商品，再进行分配！",
          type: "warning",
        });
      } else {
        this.selectedBox = item;
        this.isDist = true;
        this.hideBox = false;
        this.distForm.lockerId = item.id;
        console.log(2);
        this.getUsedDistList(item).then(() => {
          console.log("item", item);
          this.selLocker(item.id);
        });
        this.autoAssignButton = true;
        // this.distForm.lockerId = this.lockerList[0].lockerId;
        // this.selLocker(this.lockerList[0].lockerId);
      }
    },
    selLocker(val) {
        console.log(val)

      let data = {
        lockerId: val,
      };

      for (const item of this.detailForm.list) {
        console.log(item.lockerId)
        console.log(item.fid)

          // this.detailForm.detail = item;

        if (item.lockerId === val || item.fid === val) {
          this.detailForm.type = Number(item.lockerType || 2);
          this.detailForm.detail = item;
          break;
        }
      }
      console.log(this.detailForm.detail)

      this.lockerList.forEach((item) => {
        if (item.id == val) {
          this.lockerType = item.lockerType;
          this.lockerName = item.name;
        }
      });
      //跟type判断货架还是柜子
      if (this.lockerType === 2) {
        this.selGoodsShelves(val);
        this.hideBox = true;
      } else {
        this.hideBox = false;
        this.getCurrentBoxList(val);
        belong.queryBox(data).then((res) => {
          console.log("箱体列表", res);
          if (res.code == 0) {
            this.boxList = res.rows;
          }
        });
        // this.lockerId = val
        this.distForm.boxId = "";
        this.distForm.positionId = "";
      }
    },
    getCurrentBoxList(val) {
      // for (const item of this.detailForm.list) {debugger
      //   if (item.lockerId === val || item.fid === val) {
      //     this.detailForm.detail = iteitem.children ? item.children : item;
      //     this.detailForm.type = Number(item.lockerType || 2)
      //     break;
      //   }
      // }
    },
    selBox(val) {
      this.boxId = val;
      let data = {
        lockerId: this.distForm.lockerId,
        boxId: val,
      };
      console.log("this.boxId", this.boxId);
      console.log("data", data);
      this.boxList.forEach((item) => {
        if (item.boxId == val) {
          // this.lockerType = item.lockerType;
          this.boxCode = item.sort;
        }
      });
      console.log(" this.boxCode", this.boxCode);
      belong
        .queryPosition({ ...data, isNull: 1 })
        .then((res) => {
          if (res.code == 0) {
            this.positionList = res.rows;
          }
        })
        .catch((err) => {});
      this.distForm.positionId = "";
    },
    selGoodsShelves(val) {
      this.boxId = val;
      let data = {
        cabinetId: this.distForm.lockerId,
        centerInfoId: this.$store.state.userInfo.fcompanyid,
      };
      belong
        .queryGoodsPosition({ ...data, isNull: 1 })
        .then((res) => {
          if (res.code == 0) {
            this.positionList = res.data;
          }
        })
        .catch((err) => {});
      this.distForm.positionId = "";
    },
    selPosition(val) {
      // this.positionId = val;
      let that = this;
      this.detailForm.list.forEach(function (item, index) {
        let children1 = item.children;
        children1.forEach(function (item, index1) {
          let list1 = item.children;
          if (list1) {
            list1.forEach(function (item, index2) {
              if (item.positionId === val) {
                that.$set(
                  that.detailForm.list[index].children[index1].children[index2],
                  "selected",
                  true
                );
                that.lockerId = that.detailForm.list[index].lockerId;
                that.lockerName = that.detailForm.list[index].lockerName;
                that.lockerType = that.detailForm.list[index].lockerType;
              } else {
                that.$set(
                  that.detailForm.list[index].children[index1].children[index2],
                  "selected",
                  false
                );
              }
            });
          }
        });
      });
      this.positionId = val;
      this.positionList.forEach(function (item) {
        if (item.positionId == val) {
          // that.lockerType = item.lockerType;
          that.positionCode = item.name;
        }
      });
    },
    confirmEdit() {
      Object.assign(this.editRow, this.addBelongingsDialogFormData);
      this.$resetFields("addBelongingsDialogForm");
      this.editRow = undefined;
    },
    // 添加物品弹窗显示隐藏
    closeDialog() {
      let saveFlag = false;
      this.goodsList.forEach(function (item) {
        if (!item.positionId) {
          saveFlag = true;
          return false;
        }
      });
      if (saveFlag) {
        this.$confirm("您还有物品未分配储物柜，请确认是否关闭？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$emit("onHandleAddBelongingsDialog", false);
          })
          .catch(() => {
            this.$emit("onHandleAddBelongingsDialog", true);
          });
      } else {
        this.$emit("onHandleAddBelongingsDialog", false);
      }
      this.$resetFields("addBelongingsDialogForm");
    },
    // 全局图片组件 - 删除图片
    baseImageDeleteImg(index) {},
    // 全局图片组件 - 添加图片
    baseImageAddImg(index) {},
    // 切换：高拍仪影像 / 摄像头影像
    belongingsImgChangeTab(index) {
      this.belongingsImgCurrentTab = index;
    },
    // 删除物品记录
    deleteBelongingsRecord(row, index) {
      const { fid: ids } = row;
      this.$confirm("确认要删除?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (ids) {
            belong.delDist({ ids }).then((res) => {
              if (res.code == 0) {
                this.$message({
                  message: "删除  商品成功！",
                  type: "success",
                });
                this.goodsList.splice(index, 1);
              }
            });
          } else {
            this.goodsList.splice(index, 1);
          }
        })
        .then((e) => {});
    },
    editBelongingsRecord(row) {
      this.editRow = row;
      Object.assign(this.addBelongingsDialogFormData, { ...row });
      this.setAllImageData(row);
    },
    setAllImageData(row) {
      for (const item of this.photoList) {
        item.value = row[item.field];
        item.src = row[item.field];
      }
    },
    getAllImageData() {
      const result = [];
      for (const item of this.photoList) {
        result[item.field] = item.value;
      }
      return result;
    },
    resetAllImage() {
      for (const item of this.photoList) {
        item.value = "";
        item.src = "";
      }
    },
    // 保存 - 提交添加物品表单
    postAddBelongingsDialogFormData() {
      this.$refs.addBelongingsDialogForm.validate((valid) => {
        if (valid) {
          console.log(this.belongRow);
          this.addBelongingsDialogFormData.personalGoodsId = this.belongRow.fId;
          this.addBelongingsDialogFormData.centerInfoId = this.$store.state.userInfo.fcompanyid;
          this.addBelongingsDialogFormData.suspectId = this.belongRow.suspectId;
          this.addBelongingsDialogFormData.entryRegistrationId = this.belongRow.entryreGistrationId;
          Object.assign(this.addBelongingsDialogFormData, this.getAllImageData);
          this.goodsList.push({
            suspectId: this.belongRow.suspectId,
            entryRegistrationId: this.belongRow.entryreGistrationId,
            name: this.addBelongingsDialogFormData.name,
            amount: this.addBelongingsDialogFormData.amount,
            amountUnit: this.addBelongingsDialogFormData.amountUnit,
            weight: this.addBelongingsDialogFormData.weight,
            weightUnit: this.addBelongingsDialogFormData.weightUnit,
            goodsType: this.addBelongingsDialogFormData.goodsType,
            remarks: this.addBelongingsDialogFormData.remarks,
            positionCode: "",
          });
          this.$resetFields("addBelongingsDialogForm");
          this.resetAllImage();
        } else {
          return false;
        }
      });
    },
    postAddHandle() {
      this.$refs.addBelongingsDialogForm.validate((valid) => {
        if (valid) {
          this.addBelongingsDialogFormData.personalGoodsId = this.belongRow.fId;
          this.addBelongingsDialogFormData.centerInfoId = this.$store.state.userInfo.fcompanyid;
          this.addBelongingsDialogFormData.suspectId = this.belongRow.suspectId;
          this.addBelongingsDialogFormData.entryRegistrationId = this.belongRow.entryreGistrationId;

          belong.addGoods(this.addBelongingsDialogFormData).then((res) => {
            if (res.code == 0) {
              this.$message({
                message: "添加商品成功！",
                type: "success",
              });
              this.$emit("getGoods", {});
            }
          });
        } else {
          return false;
        }
      });
    },
    // 保存-验证物品都已经分配储物柜
    saveGoods() {
      const { goodsList } = this;
      let saveFlag = false;
      goodsList.forEach((item) => {
        if (!item.fid && !item.positionId) {
          saveFlag = true;
        }
      });
      if (saveFlag) {
        this.$message({
          message: "您还有物品未分配储物柜，请检查后保存!",
          type: "error",
        });
      } else {
        const goodsDetailList = goodsList.filter((item) => {
          if (!item.fid && item.positionId) {
            item.type = this.detailForm.type;
            return true;
          }
        });
        belong
          .addDists({
            goodsDetailList: JSON.stringify(goodsDetailList),
          })
          .then((res) => {
            if (res.code === 0) {
              this.$message.success("保存成功!");
              this.$refs.addBelongingsDialogForm.resetFields();
              this.$emit("onHandleAddBelongingsDialog", false);
            } else {
              this.$message.error(res.msg);
            }
          });
      }
    },
    // 选择多条物品记录
    handleSelectionChange(val) {
      let personalGoodsIdArr = [];
      let idsArr = [];
      this.recordList = val;
      this.recordList.forEach(function (item, index) {
        idsArr.push(index);
        personalGoodsIdArr.push(item.personalGoodsId);
      });
      this.recordIds = idsArr.join(",");
      this.personalGoodsIdJson = personalGoodsIdArr.join(",");
    },
    // 分配储物柜
    distLocker() {
      const {
        boxId,
        boxCode,
        lockerId,
        lockerType,
        lockerName,
        positionId,
        positionCode,
      } = this;
      let obj = {
        boxId,
        boxCode,
        lockerId,
        lockerType,
        lockerName,
        positionId,
        positionCode,
      };
      console.log(obj)
      this.codeList = []
      this.codeList.push(obj);
      let that = this;
      this.recordList.forEach(function (item, index) {
        //Object.assign(item, that.codeList[index]);
        Object.assign(item, that.codeList[0]);
      });
      console.log(this.recordList)
      console.log(this.codeList)

      this.codes.push(this.positionId);
      this.isDist = false;
      
      // this.$emit()
    },
  },
};
</script>

<style scoped lang="scss">
.add-belongings-dialog {
  .person-name {
    margin-bottom: 40px;
    font-size: 18px;
    color: #fbb95c;
    line-height: 22px;
  }

  .dialog-top-wrap {
    display: flex;

    .dialog-left-wrap {
      flex: 1;
      padding-right: 80px;

      .add-belongings-dialog-form {
        margin-top: 20px;

        .flex-box {
          justify-content: space-between;
        }
      }
    }

    .dialog-right-wrap {
      flex: 1.2;

      .tab-bar {
        border-bottom: 1px solid rgba(119, 168, 244, 1);
        margin-bottom: 20px;
        padding-top: 20px;

        .flex-box {
          .tab-bar-card {
            width: 108px;
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            color: #38a6f3;
            text-align: center;
            border-bottom: none;
            cursor: pointer;
          }

          .current-card {
            border-radius: 10px 10px 0px 0px;
            background: linear-gradient(
              0deg,
              rgba(107, 124, 249, 1) 0%,
              rgba(169, 200, 241, 1) 100%
            );
            color: #03083d;
          }
        }
      }

      .belongings-img-wrap {
        display: flex;
        justify-content: space-between;

        .belongings-img {
          width: 500px;
          height: 270px;
          background: #093d71;
          box-shadow: 0px 11px 38px 0px rgba(5, 2, 2, 0.09);
          border: 9px solid #030a43;
        }

        .belongings-msg {
          font-size: 14px;
          color: #6cdffc;
          line-height: 36px;
          margin-left: 25px;
          margin-top: 55px;
        }
      }
    }
  }
}

.distribute-locker-dialog {
  .person-info {
    color: #fbb95c;
    margin-bottom: 20px;

    .info-bandno {
      margin-left: 100px;
    }
  }

  .distribute-locker-control {
    .control-btn {
      margin-bottom: 21px;
    }

    .control-blocks {
      display: flex;
      /* justify-content: space-between; */
      flex-wrap: wrap;

      .control-block {
        width: 44px;
        height: 44px;
        background: rgba(236, 245, 255, 1);
        border: 1px solid rgba(179, 216, 255, 1);
        margin: 0 30px 30px 0;
      }

      .disable-control-block {
        background: #ff6666;
        border: none;
      }

      .current-control-block {
        background: #fbb95c;
        border: none;
      }
    }

    .control-msg {
      font-size: 14px;
      color: #6cdffc;

      .control-msg-block,
      .disable-msg-block,
      .current-msg-block {
        width: 12px;
        height: 12px;
        display: inline-block;
        font-size: 12px;
        margin-right: 5px;
        background: rgba(236, 245, 255, 1);
        border: 1px solid rgba(179, 216, 255, 1);
      }

      .disable-msg-block {
        border: none;
        background-color: #ff6666;
      }

      .current-msg-block {
        border: none;
        background-color: #fbb95c;
      }
    }
  }
}
</style>
