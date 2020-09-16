<!--  -->
<template>
    <div class>
        <div class="exit-step">
            <base-title title="人员基本信息"></base-title>
            <el-form :model="info" label-width="130px" ref="info">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="姓名：">{{info.name}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别：">{{info.GenderName}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出生日期：">{{info.BirthDate}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="联系方式：">{{info.Phone}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="证件类型：">{{info.CardTypeName}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="证件号码：">{{info.CardNumber}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="入区时间：">{{info.F_CreateDate}}</el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="现住址：">{{info.NativeAddress}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="手环编号：">
                            <span v-if="info.WristbandNo != 'null'">{{info.WristbandNo}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="户籍住址：">{{info.NativeAddress}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="进入场所原由：">{{info.InBecauseName}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="案件编号：">{{info.ZFCaseId}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="案件名称：">{{info.ZFCaseName}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="案由：">{{info.ZFCaseTypeName}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="民警1：">{{info.PoliceName}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="民警2：">{{info.Police2Name}}</el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="exit-step">
            <base-title title="人身检查情况"></base-title>
            <div class="flex-box">
                <el-form
                    :model="personsSecurity"
                    label-width="90px"
                    ref="personsSecurity"
                    style="width: 65%;"
                >
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="有无病史：">{{personsSecurity.selfIllness}}</el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="有无伤情：">{{personsSecurity.selfInjury}}</el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="有无伤痕：">{{personsSecurity.inspectInjury}}</el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="是否饮酒：">{{personsSecurity.inspectWine}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-table :data="personsSecurityDetailList" style="width: 100%">
                        <el-table-column prop="no" label="编号"></el-table-column>
                        <el-table-column prop="information" label="详细信息"></el-table-column>
                        <el-table-column prop="img" label="图片">
                            <template slot-scope="scope">
                                <img
                                    :src="scope.row.img"
                                    style="height: 36px;margin: 3px;vertical-align: middle;"
                                />
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="嫌疑人电子签章：" label-width="130px">
                                <img :src="suspectFingerSrc" style="height: 80px;" />
                                <img :src="suspectSignatureSrc" style="height: 80px;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div style="flex-shrink: 0;margin-left: 50px;#fffition: relative;">
                    <div
                        v-for="(item, index) in personsSecurityDetailList"
                        :key="index"
                        class="pos"
                        :style="{position: 'absolute', top: item.y, left: item.x}"
                    >{{item.no}}</div>
                    <img :src="require('@/assets/rt.jpg')" />
                </div>
            </div>
        </div>
        <div class="exit-step">
            <base-title title="物品情况"></base-title>
            <el-table :data="goodsList" style="width: 100%">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="Name" label="物品名称"></el-table-column>
                <el-table-column prop="Amount" label="数量"></el-table-column>
                <el-table-column prop="AmountUnit" label="数量单位"></el-table-column>
                <el-table-column prop="Weight" label="重量"></el-table-column>
                <el-table-column prop="WeightUnit" label="重量单位"></el-table-column>
                <el-table-column prop="GoodsType" label="物品类型"></el-table-column>
                <el-table-column prop="CabinetName" label="储物柜名称"></el-table-column>
                <el-table-column prop="PositionCode" label="货位编号"></el-table-column>
                <el-table-column prop="BoxCode" label="箱体编号"></el-table-column>
            </el-table>
            <el-form label-width="130px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="嫌疑人电子签章：" label-width="150px">
                            <img :src="suspectFingerSrc" style="height: 80px;" />
                            <img :src="suspectSignatureSrc" style="height: 80px;" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="管理人电子签章f：" label-width="150px">
                            <img :src="managerFingerSrc" style="height: 80px;" />
                            <img :src="managerSignatureSrc" style="height: 80px;" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="exit-step">
            <base-title title="信息采集"></base-title>
            <el-form :model="suspectInfo" label-width="130px" ref="suspectInfo">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="身高：">{{suspectInfo.height}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="体重：">{{suspectInfo.weight}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="银行名称：">{{suspectInfo.bankName}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="银行卡号：">{{suspectInfo.bankCard}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="手机号：">{{suspectInfo.phone}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="手机SIS：">{{suspectInfo.phoneSIS}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="指纹：">{{suspectInfo.fingerprint}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="掌纹：">{{suspectInfo.palmprints}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="足迹：">{{suspectInfo.footprint}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="笔迹：">{{suspectInfo.handwriting}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="尿检：">{{suspectInfo.urine }}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="血液：">{{suspectInfo.bloodTesting}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="DNA：">{{suspectInfo.dNA}}</el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="备注：">{{suspectInfo.fDescription}}</el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="exit-step">
            <base-title title="物品返还情况"></base-title>
            <el-table :data="goodsReturnList" style="width: 100%">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="Name" label="物品名称"></el-table-column>
                <el-table-column prop="Amount" label="数量"></el-table-column>
                <el-table-column prop="AmountUnit" label="数量单位"></el-table-column>
                <el-table-column prop="Weight" label="重量"></el-table-column>
                <el-table-column prop="WeightUnit" label="重量单位"></el-table-column>
                <el-table-column prop="name" label="物品类型"></el-table-column>
                <el-table-column prop="CabinetName" label="储物柜名称"></el-table-column>
                <el-table-column prop="PositionCode" label="货位编号"></el-table-column>
                <el-table-column prop="BoxCode" label="箱体编号"></el-table-column>
            </el-table>
            <el-form>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="嫌疑人电子签章：" label-width="150px">
                            <img :src="suspectFingerSrc" style="height: 80px;" />
                            <img :src="suspectSignatureSrc" style="height: 80px;" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="管理人电子签章：" label-width="150px">
                            <img :src="managerFingerSrc" style="height: 80px;" />
                            <img :src="managerSignatureSrc" style="height: 80px;" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="exit-step">
            <base-title title="活动内容/候问待审情况"></base-title>
            <el-table :data="waiTaskList" style="width: 100%">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column label="时间">
                    <template slot-scope="scope">{{scope.row.beginDate}} - {{scope.row.endDate}}</template>
                </el-table-column>
                <el-table-column prop="roomName" label="房间"></el-table-column>
                <el-table-column prop="address" label="音视频"></el-table-column>
            </el-table>
        </div>
        <div class="exit-step">
            <base-title title="出区信息"></base-title>
            <el-form :model="info" label-width="130px" ref="info">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="出区时间：">
                            <span v-if="info.OutAreaTime != 'null'">
                                {{info.OutAreaTime}}
                            </span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出区去向：">
                            <span v-if="info.OutRouteName != 'null'">
                                {{info.OutRouteName}}
                            </span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否已归还手环：">
                            {{info.IsBackCard}}
                            <span v-if="info.IsBackCard == 0">是</span>
                            <span v-else>否</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="出区人电子签章：" label-width="150px">
                            <img :src="suspectFingerSrc" style="height: 80px;" />
                            <img :src="suspectSignatureSrc" style="height: 80px;" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="管理人电子签章：" label-width="150px">
                            <img :src="managerFingerSrc" style="height: 80px;" />
                            <img :src="managerSignatureSrc" style="height: 80px;" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
import Apis from "@/apis/apiCase/exit.js";
export default {
    props: { keyProp: String },
    components: {},
    data() {
        return {
            suspectFingerSrc: "",
            suspectSignatureSrc: "",
            managerFingerSrc: "",
            managerSignatureSrc: "",
            goodsReturnList: [],
            personsSecurity: {},
            goodsList: [],
            waiTaskList: [],
            info: {},
            personsSecurityDetailList: [],
            suspectInfo: {}
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {
        keyProp: {
            handler(val) {
                this.getList(val);
            },
            immediate: true
        }
    },
    //方法集合
    methods: {
        getList(id) {
            Apis.getDetailList({ id }).then(res => {
                const {
                    goodsList,
                    goodsReturnList,
                    info,
                    personsSecurity,
                    personsSecurityDetailList,
                    suspectInfo,
                    waiTaskList
                } = res.data || {};
                this.goodsReturnList = goodsReturnList || [];
                this.personsSecurity = personsSecurity || {};
                this.goodsList = goodsList || [];
                this.waiTaskList = waiTaskList || [];
                this.info = info || {};
                this.personsSecurityDetailList =
                    personsSecurityDetailList || [];
                // this.suspectInfo = suspectInfo || {};
                // this.suspectFingerSrc = info.OutFingerprint;
                // this.suspectSignatureSrc = info.OutSignature;
                // this.managerFingerSrc = info.ManageFingerprint;
                // this.managerSignatureSrc = info.ManageSignature2;
            });
        },
        confrimSuspect() {
            const {
                F_Id: fId,
                ManageFingerprint: manageFingerprint,
                ManageSignature2: manageSignature2,
                OutSignature: outSignature,
                OutFingerprint: outFingerprint
            } = this.info;
            Apis.confrimSuspect({
                fId,
                manageFingerprint,
                manageSignature2,
                outSignature,
                // outFingerprint
            }).then(res => {
                if (res.code === 0) {
                    this.$message({
                        message: "保存成功",
                        type: "success"
                    });
                    this.$emit("savesuccess");
                }
            });
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {}
};
</script>
<style lang='scss' scoped>
.el-form-item {
    margin-bottom: 0;
}
.exit-step {
    position: relative;
    padding-bottom: 20px;
    &::after {
        content: "";
        position: absolute;
        height: 1px;
        width: 100%;
        background: rgba(108, 223, 252, 0.5);
        transform: scaleY(0.5);
        bottom: 0;
    }
}
.pos {
    border-radius: 50%;
    border: solid 1px rgb(108, 223, 252);
    background: rgba(9, 61, 113, 0.8);
    color: rgb(108, 223, 252);
    font-size: 12px;
    width: 18px;
    height: 18px;
    text-align: center;
}
</style>