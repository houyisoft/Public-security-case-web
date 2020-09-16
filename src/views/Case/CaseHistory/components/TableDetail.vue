<template>
    <div>
        <div class="bottom-btn">
            <el-button @click="saveFileHandle" class="el-button-repeat">打印</el-button>
            <el-button @click="saveHandle" class="el-button-repeat">保存</el-button>
        </div>
        <table
            width="699.6"
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="width:865.7pt;border-collapse:collapse;table-layout:fixed;"
        >
            <colgroup>
                <col width="22.2" span="2" style="mso-width-source:userset;mso-width-alt:710;" />
                <col width="23.33" style="mso-width-source:userset;mso-width-alt:746;" />
                <col width="64.4" style="mso-width-source:userset;mso-width-alt:2060;" />
                <col width="91.07" style="mso-width-source:userset;mso-width-alt:2914;" />
                <col width="74.4" style="mso-width-source:userset;mso-width-alt:2380;" />
                <col width="79.93" style="mso-width-source:userset;mso-width-alt:2557;" />
                <col width="82.2" style="mso-width-source:userset;mso-width-alt:2630;" />
                <col width="81.07" style="mso-width-source:userset;mso-width-alt:2594;" />
                <col width="77.73" style="mso-width-source:userset;mso-width-alt:2487;" />
                <col width="81.07" style="mso-width-source:userset;mso-width-alt:2594;" />
            </colgroup>
            <tbody>
                <tr height="18" style="height:13.50pt;">
                    <td
                        class="xl65"
                        height="18"
                        width="699.6"
                        colspan="11"
                        style="height:42px;width:524.70pt;border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >场所使用情况登记表</td>
                </tr>
                <tr
                    height="29.33"
                    style="height:22.00pt;mso-height-source:userset;mso-height-alt:440;"
                >
                    <td
                        class="xl66"
                        height="264"
                        rowspan="9"
                        style="height:198.00pt;border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >
                        <p class="table-p">进入场所人员基本情况</p>
                    </td>
                    <td
                        class="xl67"
                        colspan="3"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >姓名</td>
                    <td class="xl70">{{info.name}}</td>
                    <td class="xl71" x:str>性别</td>
                    <td class="xl70">{{info.GenderName}}</td>
                    <td class="xl71" x:str>出生日期</td>
                    <td class="xl70">{{info.BirthDate}}</td>
                    <td class="xl71" x:str>联系方式</td>
                    <td class="xl70">{{info.Phone}}</td>
                </tr>
                <tr
                    height="29.33"
                    style="height:22.00pt;mso-height-source:userset;mso-height-alt:440;"
                >
                    <td
                        class="xl67"
                        colspan="3"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >证件类型</td>
                    <td
                        class="xl67"
                        colspan="3"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{info.CardTypeName}}</td>
                    <td class="xl71" x:str>证件号</td>
                    <td
                        class="xl67"
                        colspan="3"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{info.CardNumber}}</td>
                </tr>
                <tr
                    height="29.33"
                    style="height:22.00pt;mso-height-source:userset;mso-height-alt:440;"
                >
                    <td
                        class="xl67"
                        colspan="3"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >户籍地址</td>
                    <td
                        class="xl67"
                        colspan="7"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{info.NativeAddress}}</td>
                </tr>
                <tr
                    height="29.33"
                    style="height:22.00pt;mso-height-source:userset;mso-height-alt:440;"
                >
                    <td
                        class="xl72"
                        colspan="3"
                        rowspan="6"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >进入场所原因</td>
                    <td
                        class="xl75"
                        style="text-align: left;padding-left:20px;"
                        rowspan="2"
                        colspan="7"
                        x:str
                    > 
                         <el-checkbox-group disabled v-model="checkInItem">
                            <el-checkbox
                                style="width:77px;line-height:22px;font-family: 宋体;"
                                v-for="(item, index) in codetypelist"
                                :key="index"
                                :label="item.fitemname"
                            >{{item.fitemname}}</el-checkbox>
                        </el-checkbox-group>
                    </td>
                </tr>
                <tr
                    height="29.33"
                    style="height:22.00pt;mso-height-source:userset;mso-height-alt:440;"
                ></tr>
                <tr
                    height="29.33"
                    style="height:22.00pt;mso-height-source:userset;mso-height-alt:440;"
                >
                    <td class="xl71" x:str>案件编号</td>
                    <td
                        class="xl79"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{info.ZFCaseId}}</td>
                    <td class="xl71" x:str>案件名称</td>
                    <td
                        class="xl79"
                        colspan="3"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{info.ZFCaseName}}</td>
                </tr>
                <tr
                    height="29.33"
                    style="height:22.00pt;mso-height-source:userset;mso-height-alt:440;"
                >
                    <td class="xl71" x:str>案由</td>
                    <td
                        class="xl79"
                        colspan="6"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{info.ZFCaseTypeName}}</td>
                </tr>
                <tr
                    height="29.33"
                    style="height:22.00pt;mso-height-source:userset;mso-height-alt:440;"
                >
                    <td class="xl71" x:str>办案民警</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{info.PoliceName}}</td>
                    <td class="xl71" x:str>办案民警</td>
                    <td
                        class="xl67"
                        colspan="3"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{info.Police2Name}}</td>
                </tr>
                <tr
                    height="29.33"
                    style="height:22.00pt;mso-height-source:userset;mso-height-alt:440;"
                >
                    <td class="xl71" x:str>进入场所时间</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{info.F_CreateDate}}</td>
                    <td class="xl71" x:str>操作人</td>
                    <td
                        class="xl67"
                        colspan="3"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{info.F_CreateUserName}}</td>
                </tr>
                <tr
                    height="37.33"
                    style="height:28.00pt;mso-height-source:userset;mso-height-alt:560;"
                >
                    <td
                        class="xl66"
                        height="354.67"
                        :rowspan="7+goodsList.length"
                        style="height:266.00pt;border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >
                        <p class="table-p">安全检查情况</p>
                    </td>
                    <td
                        class="xl66"
                        rowspan="5"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >
                        <p class="table-p">人身检查记录</p>
                    </td>
                    <td
                        class="xl66"
                        rowspan="3"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >
                        <p class="table-p">自述症状</p>
                    </td>
                    <td class="xl71" x:str>有无病史</td>
                    <td class="xl70">{{personsSecurity.selfIllness == '1'? '是':'否'}}</td>
                    <td class="xl71" x:str>有无伤情</td>
                    <td
                        class="xl71"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{personsSecurity.selfInjury == '1'? '是':'否'}}</td>
                    <td
                        class="xl71"
                        colspan="3"
                        rowspan="5"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >
                        <div style="flex-shrink: 0;position: relative;display: inline-block;">
                            <div
                                v-for="(item, index) in personsSecurityDetailList"
                                :key="index"
                                class="pos"
                                :style="{position: 'absolute', top: item.y, left: item.x}"
                            >{{item.no}}</div>
                            <img :src="require('@/assets/rt.jpg')" />
                        </div>
                    </td>
                </tr>
                <tr
                    height="37.33"
                    style="height:28.00pt;mso-height-source:userset;mso-height-alt:560;"
                >
                    <td class="xl71" x:str>病史描述</td>
                    <td
                        class="xl71"
                        colspan="4"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{personsSecurity.selfIllnessDescribe}}</td>
                </tr>
                <tr
                    height="37.33"
                    style="height:28.00pt;mso-height-source:userset;mso-height-alt:560;"
                >
                    <td class="xl71" x:str>伤情描述</td>
                    <td
                        class="xl71"
                        colspan="4"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{personsSecurity.selfInjuryDescribe}}</td>
                </tr>
                <tr
                    height="37.33"
                    style="height:28.00pt;mso-height-source:userset;mso-height-alt:560;"
                >
                    <td
                        class="xl66"
                        rowspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >
                        <p class="table-p">检查情况</p>
                        <span style="display:none;">况</span>
                    </td>
                    <td class="xl71" x:str>有无伤痕</td>
                    <td class="xl70">{{personsSecurity.inspectInjury == '1'? '是':'否'}}</td>
                    <td class="xl71" x:str>是否饮酒</td>
                    <td
                        class="xl71"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{personsSecurity.inspectWine == '1'? '是':'否'}}</td>
                </tr>
                <tr
                    height="52"
                    style="height:39.00pt;mso-height-source:userset;mso-height-alt:780;"
                >
                    <td class="xl71" x:str>伤伤痕述</td>
                    <td
                        class="xl85"
                        colspan="4"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{personsSecurity.inspectInjuryDescribe}}</td>
                </tr>
                <tr
                    height="30.67"
                    style="height:23.00pt;mso-height-source:userset;mso-height-alt:460;"
                >
                    <td
                        class="xl66"
                        :rowspan="2+goodsList.length"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >
                        <p class="table-p">随身财物检查记</p>
                        <span style="display:none;">录</span>
                    </td>
                    <td
                        class="xl71"
                        colspan="5"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >物品名称及特征</td>
                    <td class="xl71" x:str>数量</td>
                    <td class="xl71" x:str>单位</td>
                    <td
                        class="xl71"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >保存措施</td>
                </tr>
                <tr
                    v-for="(item, index) in goodsList"
                    :key="index"
                    height="30.67"
                    style="height:23.00pt;mso-height-source:userset;mso-height-alt:460;"
                >
                    <td
                        class="xl86"
                        colspan="5"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{ item.Name }}</td>
                    <td class="xl86">{{ item.Amount }}</td>
                    <td class="xl86">{{ item.AmountUnit }}</td>
                    <td
                        class="xl86"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    ></td>
                </tr>

                <tr
                    height="30.67"
                    style="height:23.00pt;mso-height-source:userset;mso-height-alt:460;"
                >
                    <td
                        class="xl71"
                        colspan="3"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >存储位置</td>
                    <td
                        class="xl71"
                        colspan="6"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{positionCodeStr}}</td>
                </tr>
                <tr height="18" style="height:13.50pt;">
                    <td
                        class="xl87"
                        height="90"
                        rowspan="5"
                        style="height:67.50pt;border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >
                        <p class="table-p">信息采集</p>
                    </td>
                    <td
                        class="xl67"
                        colspan="4"
                        style="height:30px;border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >采集项目</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >入库信息</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >采集项目</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >入库信息</td>
                </tr>
                <tr height="18" style="height:13.50pt;">
                    <td
                        class="xl67"
                        colspan="4"
                        style="height:30px;border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >身高</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{suspectInfo.height}}</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >体重</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{suspectInfo.weight}}</td>
                </tr>
                <tr height="18" style="height:13.50pt;">
                    <td
                        class="xl67"
                        colspan="4"
                        style="height:30px;border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >指纹</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{suspectInfo.fingerprint}}</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >掌纹</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{suspectInfo.palmprints}}</td>
                </tr>
                <tr height="18" style="height:13.50pt;">
                    <td
                        class="xl67"
                        colspan="4"
                        style="height:30px;border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >足迹</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{suspectInfo.footprint}}</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >尿检</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{suspectInfo.urine }}</td>
                </tr>
                <tr height="18" style="height:13.50pt;">
                    <td
                        class="xl67"
                        colspan="4"
                        style="height:30px;border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >血液</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{suspectInfo.bloodTesting}}</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >DNA</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{suspectInfo.dNA}}</td>
                </tr>
                <tr
                    height="44"
                    style="height:33.00pt;mso-height-source:userset;mso-height-alt:660;"
                >
                    <td
                        class="xl88"
                        height="145.33"
                        :rowspan="1+gjfileinfoList.length"
                        style="height:109.00pt;border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >
                        <p class="table-p">
                            活动内容
                            <br />/
                            <br />询讯问
                        </p>
                    </td>
                    <td
                        class="xl67"
                        colspan="5"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >时间</td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >房间</td>
                    <td
                        class="xl67"
                        colspan="3"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >音视频</td>
                </tr>

                <tr
                    v-for="(item, index) in gjfileinfoList"
                    :key="index"
                    height="48"
                    style="height:36.00pt;mso-height-source:userset;mso-height-alt:720;"
                >
                    <td
                        class="xl67"
                        colspan="5"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >
                        {{item.inDate}}
                        <span v-if="item.inDate">--</span>
                        {{item.outDate}}
                    </td>
                    <td
                        class="xl67"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{item.position}}</td>
                    <td
                        class="xl67"
                        colspan="3"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{item.fileSavePath}}</td>
                </tr>
                <!-- <tr height="53.33" style="height:40.00pt;mso-height-source:userset;mso-height-alt:800;">
    <td class="xl67" colspan="5" style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"></td>
    <td class="xl67" colspan="2" style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"></td>
    <td class="xl67" colspan="3" style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"></td>
                </tr>-->
                <tr
                    height="32"
                    style="height:24.00pt;mso-height-source:userset;mso-height-alt:480;"
                >
                    <td
                        class="xl66"
                        height="96"
                        rowspan="3"
                        style="height:72.00pt;border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >
                        <p class="table-p">离开场所</p>
                    </td>
                    <td
                        class="xl71"
                        colspan="3"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >离开时间</td>
                    <td
                        class="xl71"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >
                        <span v-if="info.OutAreaTime !== null">{{info.OutAreaTime}}</span>
                    </td>
                    <td class="xl71" x:str>离开原因</td>
                    <td
                        class="xl71"
                        colspan="4"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    >{{info.OutRouteName}}</td>
                </tr>
                <tr
                    height="32"
                    style="height:24.00pt;mso-height-source:userset;mso-height-alt:480;"
                >
                    <td
                        class="xl71"
                        colspan="3"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >领取人签名</td>
                    <td
                        class="xl71"
                        colspan="2"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    ></td>
                    <td class="xl71" x:str>身份证号码</td>
                    <td
                        class="xl71"
                        colspan="4"
                        style="border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                    ></td>
                </tr>
                <tr
                    height="32"
                    style="height:24.00pt;mso-height-source:userset;mso-height-alt:480;"
                >
                    <td
                        class="xl90"
                        colspan="10"
                        style="padding-right: 20px;border-right:.5pt solid #fff;border-bottom:.5pt solid #fff;"
                        x:str
                    >
                        <span>年</span>
                        <span style="margin: 0 20px">月</span>
                        <span>日</span>
                    </td>
                </tr>

                <!--[if supportMisalignedColumns]-->


                <tr width="0" style="display:none;">
                    <td width="22" style="width:17;"></td>
                    <td width="23" style="width:18;"></td>
                    <td width="64" style="width:48;"></td>
                    <td width="91" style="width:68;"></td>
                    <td width="74" style="width:56;"></td>
                    <td width="80" style="width:60;"></td>
                    <td width="82" style="width:62;"></td>
                    <td width="81" style="width:61;"></td>
                    <td width="78" style="width:58;"></td>
                    <td width="81" style="width:61;"></td>
                </tr>
                <!--[endif]-->
            </tbody>
        </table>
    </div>
</template>
<script>
import Apis from "@/apis/apiCase/exit.js";
import Services from "@/apis/unit.js";
import $axios from "@/apis/index.js";

export default {
    props: { keyProp: String },
    data() {
        return {
            checked: true,
            info: {},
            personsSecurity: {
                selfIllness: ""
            },
            goodsList: [],
            suspectInfo: {},
            gjfileinfoList: [],
            codetypelist: [], //进入场所原因,
            checkInItem: [],
            personsSecurityDetailList: [],
            positionCodeStr: "" //货位编号拼接
        };
    },
    //监控data中的数据变化
    watch: {
        keyProp: {
            handler(val) {
                this.getList(val);
            },
            immediate: true
        }
    },
    created() {
        this.getInList();
    },
    methods: {
        demoHandle() {
            let a = document.createElement("a");
            a.href =
                "/management/tbInoutpersonCasearea/exportSuspectOutElectronicInfo?id=425882667800662017";
            a.click();
        },
        getInList() {
            Services.diclist({ type: 6 }).then(res => {
                if (res.code == 0) {
                    console.log(res.data);
                    this.codetypelist = res.data;
                }
            });
        },
        // 下载
        saveFileHandle() {
            $axios.download(
                "/management/tbInoutpersonCasearea/exportSuspectOutElectronicInfo",
                { id: this.keyProp },
                "测试.pdf"
            );
        },
        // 完成
        saveHandle() {
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
                outFingerprint
            }).then(res => {
                if (res.code === 0) {
                    this.$message({
                        message: "保存成功",
                        type: "success"
                    });
                    this.$emit("savesuccess");
                }
            });

            // OutArea.saveOtherOutInfo({
            //   fId: this.info.F_Id,
            //   outSignature: 1,
            //   outFingerprint: 1,
            //   manageFingerprint: 1,
            //   manageSignature2: 1,
            //   Authorization: 1
            // }).then(res => {
            //   this.$message.error(res.msg);
            // });
        },
        getList(val) {
            Apis.getDetailList({
                // id:'425882667800662017',
                id: val
            }).then(res => {
                this.info = res.data.info;
                console.log(res, "res-getList");
                this.checkInItem = [this.info.InBecauseName];
                if (res.data.personsSecurity !== null) {
                    this.personsSecurity = res.data.personsSecurity;
                }else{
                    this.personsSecurity = {}
                }
                this.personsSecurityDetailList =
                    res.data.personsSecurityDetailList;

                if (res.data.gjfileinfoList !== null) {
                    //活动内容寻询问
                    this.gjfileinfoList = res.data.gjfileinfoList;
                } else {
                    this.gjfileinfoList = [
                        {
                            inDate: "",
                            outDate: "",
                            position: "",
                            fileSavePath: ""
                        },
                        {
                            inDate: "",
                            outDate: "",
                            position: "",
                            fileSavePath: ""
                        }
                    ];
                }
                if (res.data.goodsList === null) {
                    //随身财物检查记
                    this.goodsList = [
                        {
                            Name: "",
                            Amount: "",
                            AmountUnit: ""
                        },
                        {
                            Name: "",
                            Amount: "",
                            AmountUnit: ""
                        }
                    ];
                } else {
                    this.goodsList = res.data.goodsList;
                    console.log(this.goodsList, "this.goodsList");
                    let codeArr = [];
                    this.goodsList.forEach(function(item) {
                        codeArr.push(item.PositionCode);
                    });
                    //this.unique(codeArr);
                    this.positionCodeStr = codeArr.join(",");
                    console.log(codeArr, this.positionCodeStr);
                }
                if (res.data.suspectInfo === null) {
                    this.suspectInfo = {
                        height: "",
                        weight: "",
                        fingerprint: "",
                        palmprints: "",
                        footprint: "",
                        urine: "",
                        bloodTesting: "",
                        dNA: ""
                    };
                } else {
                    this.suspectInfo = res.data.suspectInfo;
                }
                console.log(this.goodsList, "this.goodsList");
            });
        },
        unique(arr) {
            console.log(arr, "arr");
            var hash = [];
            for (var i = 0; i < arr.length; i++) {
                if (hash.indexOf(arr[i]) == -1) {
                    hash.push(arr[i]);
                }
            }
            return hash;
        }
    }
};
</script>
<style lang="scss" scoped>
.table-p {
    width: 27px;
    margin: 0 auto;
    text-align: center;
}
.table-wrapper {
    height: 550px;
    margin-top: 60px;
    // overflow-y: auto;
    .tableHeader,
    .tabletop1,
    .tableTop2,
    .tableTop3 {
        width: 100%;
        border: 1px solid #fff;
        height: 100px;
        color: #fff;
        td {
            text-align: center;
            height: 30px;
            border: 1px solid #fff;
        }
    }
    .tabletop1,
    .tableTop2,
    .tableTop3 {
        border-top: none;
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
.bottom-btn {
    width: 99%;
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: right;
}
.table-wrapper::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
table {
    border: 1px solid #fff;
    text-align: center;
}

tr {
    mso-height-source: auto;
    border: 1px solid #fff;

    mso-ruby-visibility: none;
}

col {
    mso-width-source: auto;
    mso-ruby-visibility: none;
}
br {
    mso-data-placement: same-cell;
}
.font0 {
    color: #fff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: "宋体";
    mso-generic-font-family: auto;
    mso-font-charset: 134;
}
.font2 {
    color: #fff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: "Wingdings";
    mso-generic-font-family: auto;
    mso-font-charset: 134;
}
.style0 {
    mso-number-format: "General";
    text-align: general;
    vertical-align: middle;
    white-space: "";
    mso-rotate: 0;
    mso-pattern: auto;
    mso-background-source: auto;
    color: #fff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 134;
    border: none;
    mso-protection: locked visible;
    mso-style-name: "常规";
    mso-style-id: 0;
}
.style16 {
    mso-number-format: "_ \0022\00A5\0022* \#\,\#\#0_ \;_ \0022\00A5\0022* \\-\#\,\#\#0_ \;_ \0022\00A5\0022* \0022-\0022_ \;_ \@_ ";
    mso-style-name: "货币[0]";
    mso-style-id: 7;
}
.style17 {
    mso-pattern: auto none;
    background: #ebf1de;
    color: #fff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "20% - 强调文字颜色 3";
}
.style18 {
    mso-pattern: auto none;
    background: #ffcc99;
    color: #3f3f76;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    border: 0.5pt solid #7f7f7f;
    mso-style-name: "输入";
}
.style19 {
    mso-number-format: "_ \0022\00A5\0022* \#\,\#\#0\.00_ \;_ \0022\00A5\0022* \\-\#\,\#\#0\.00_ \;_ \0022\00A5\0022* \0022-\0022??_ \;_ \@_ ";
    mso-style-name: "货币";
    mso-style-id: 4;
}
.style20 {
    mso-number-format: "_ * \#\,\#\#0_ \;_ * \\-\#\,\#\#0_ \;_ * \0022-\0022_ \;_ \@_ ";
    mso-style-name: "千位分隔[0]";
    mso-style-id: 6;
}
.style21 {
    mso-pattern: auto none;
    background: #d8e4bc;
    color: #fff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "40% - 强调文字颜色 3";
}
.style22 {
    mso-pattern: auto none;
    background: #ffc7ce;
    color: #9c0006;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "差";
}
.style23 {
    mso-number-format: "_ * \#\,\#\#0\.00_ \;_ * \\-\#\,\#\#0\.00_ \;_ * \0022-\0022??_ \;_ \@_ ";
    mso-style-name: "千位分隔";
    mso-style-id: 3;
}
.style24 {
    mso-pattern: auto none;
    background: #c4d79b;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "60% - 强调文字颜色 3";
}
.style25 {
    color: #0000ff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: underline;
    text-underline-style: single;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "超链接";
    mso-style-id: 8;
}
.style26 {
    mso-number-format: "0%";
    mso-style-name: "百分比";
    mso-style-id: 5;
}
.style27 {
    color: #800080;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: underline;
    text-underline-style: single;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "已访问的超链接";
    mso-style-id: 9;
}
.style28 {
    mso-pattern: auto none;
    background: #ffffcc;
    border: 0.5pt solid #b2b2b2;
    mso-style-name: "注释";
}
.style29 {
    mso-pattern: auto none;
    background: #da9694;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "60% - 强调文字颜色 2";
}
.style30 {
    color: #1f497d;
    font-size: 11pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 134;
    mso-style-name: "标题 4";
}
.style31 {
    color: #ff0000;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "警告文本";
}
.style32 {
    color: #1f497d;
    font-size: 18pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 134;
    mso-style-name: "标题";
}
.style33 {
    color: #7f7f7f;
    font-size: 11pt;
    font-weight: 400;
    font-style: italic;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "解释性文本";
}
.style34 {
    color: #1f497d;
    font-size: 15pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 134;
    border-left: none;
    border-top: none;
    border-right: none;
    border-bottom: 1pt solid #4f81bd;
    mso-style-name: "标题 1";
}
.style35 {
    color: #1f497d;
    font-size: 13pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 134;
    border-left: none;
    border-top: none;
    border-right: none;
    border-bottom: 1pt solid #4f81bd;
    mso-style-name: "标题 2";
}
.style36 {
    mso-pattern: auto none;
    background: #95b3d7;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "60% - 强调文字颜色 1";
}
.style37 {
    color: #1f497d;
    font-size: 11pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 134;
    border-left: none;
    border-top: none;
    border-right: none;
    border-bottom: 1pt solid #a7bfde;
    mso-style-name: "标题 3";
}
.style38 {
    mso-pattern: auto none;
    background: #b1a0c7;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "60% - 强调文字颜色 4";
}
.style39 {
    mso-pattern: auto none;
    background: #f2f2f2;
    color: #3f3f3f;
    font-size: 11pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    border: 0.5pt solid #3f3f3f;
    mso-style-name: "输出";
}
.style40 {
    mso-pattern: auto none;
    background: #f2f2f2;
    color: #fa7d00;
    font-size: 11pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    border: 0.5pt solid #7f7f7f;
    mso-style-name: "计算";
}
.style41 {
    mso-pattern: auto none;
    background: #a5a5a5;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    border: 2pt double #3f3f3f;
    mso-style-name: "检查单元格";
}
.style42 {
    mso-pattern: auto none;
    background: #fde9d9;
    color: #fff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "20% - 强调文字颜色 6";
}
.style43 {
    mso-pattern: auto none;
    background: #c0504d;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "强调文字颜色 2";
}
.style44 {
    color: #fa7d00;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    border-left: none;
    border-top: none;
    border-right: none;
    border-bottom: 2pt double #ff8001;
    mso-style-name: "链接单元格";
}
.style45 {
    color: #fff;
    font-size: 11pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    border-left: none;
    border-top: 0.5pt solid #4f81bd;
    border-right: none;
    border-bottom: 2pt double #4f81bd;
    mso-style-name: "汇总";
}
.style46 {
    mso-pattern: auto none;
    background: #c6efce;
    color: #006100;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "好";
}
.style47 {
    mso-pattern: auto none;
    background: #ffeb9c;
    color: #9c6500;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "适中";
}
.style48 {
    mso-pattern: auto none;
    background: #daeef3;
    color: #fff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "20% - 强调文字颜色 5";
}
.style49 {
    mso-pattern: auto none;
    background: #4f81bd;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "强调文字颜色 1";
}
.style50 {
    mso-pattern: auto none;
    background: #dce6f1;
    color: #fff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "20% - 强调文字颜色 1";
}
.style51 {
    mso-pattern: auto none;
    background: #b8cce4;
    color: #fff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "40% - 强调文字颜色 1";
}
.style52 {
    mso-pattern: auto none;
    background: #f2dcdb;
    color: #fff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "20% - 强调文字颜色 2";
}
.style53 {
    mso-pattern: auto none;
    background: #e6b8b7;
    color: #fff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "40% - 强调文字颜色 2";
}
.style54 {
    mso-pattern: auto none;
    background: #9bbb59;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "强调文字颜色 3";
}
.style55 {
    mso-pattern: auto none;
    background: #8064a2;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "强调文字颜色 4";
}
.style56 {
    mso-pattern: auto none;
    background: #e4dfec;
    color: #fff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "20% - 强调文字颜色 4";
}
.style57 {
    mso-pattern: auto none;
    background: #ccc0da;
    color: #fff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "40% - 强调文字颜色 4";
}
.style58 {
    mso-pattern: auto none;
    background: #4bacc6;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "强调文字颜色 5";
}
.style59 {
    mso-pattern: auto none;
    background: #b7dee8;
    color: #fff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "40% - 强调文字颜色 5";
}
.style60 {
    mso-pattern: auto none;
    background: #92cddc;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "60% - 强调文字颜色 5";
}
.style61 {
    mso-pattern: auto none;
    background: #f79646;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "强调文字颜色 6";
}
.style62 {
    mso-pattern: auto none;
    background: #fcd5b4;
    color: #fff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "40% - 强调文字颜色 6";
}
.style63 {
    mso-pattern: auto none;
    background: #fabf8f;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: "60% - 强调文字颜色 6";
}
td {
    mso-style-parent: style0;
    padding-top: 1px;
    padding-right: 1px;
    padding-left: 1px;
    mso-ignore: padding;
    mso-number-format: "General";
    text-align: general;
    vertical-align: middle;
    white-space: "";
    mso-rotate: 0;
    mso-pattern: auto;
    mso-background-source: auto;
    color: #fff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 134;
    border: none;
    mso-protection: locked visible;
}
.xl65 {
    mso-style-parent: style0;
    text-align: center;
    font-weight: 700;
    mso-font-charset: 134;
    border: 0.5pt solid #fff;
}
.xl66 {
    mso-style-parent: style0;
    text-align: center;
    layout-flow: vertical;
    mso-font-charset: 134;
    border: 0.5pt solid #fff;
}
.xl67 {
    mso-style-parent: style0;
    text-align: center;
    mso-font-charset: 134;
    border-left: 0.5pt solid #fff;
    border-top: 0.5pt solid #fff;
    border-bottom: 0.5pt solid #fff;
}
.xl70 {
    mso-style-parent: style0;
    mso-font-charset: 134;
    border: 0.5pt solid #fff;
}
.xl71 {
    mso-style-parent: style0;
    text-align: center;
    mso-font-charset: 134;
    border: 0.5pt solid #fff;
}
.xl72 {
    mso-style-parent: style0;
    text-align: center;
    mso-font-charset: 134;
    border-left: 0.5pt solid #fff;
    border-top: 0.5pt solid #fff;
}
.xl75 {
    mso-style-parent: style0;
    text-align: center;
    font-family: Wingdings;
    mso-font-charset: 134;
    border: 0.5pt solid #fff;
}
.xl79 {
    mso-style-parent: style0;
    text-align: left;
    mso-font-charset: 134;
    border-left: 0.5pt solid #fff;
    border-top: 0.5pt solid #fff;
    border-bottom: 0.5pt solid #fff;
}
.xl85 {
    mso-style-parent: style0;
    text-align: left;
    mso-font-charset: 134;
    border: 0.5pt solid #fff;
}
.xl86 {
    mso-style-parent: style0;
    mso-font-charset: 134;
    border: 0.5pt solid #fff;
}
.xl87 {
    mso-style-parent: style0;
    text-align: center;
    layout-flow: vertical;
    mso-font-charset: 134;
    border-left: 0.5pt solid #fff;
    border-top: 0.5pt solid #fff;
    border-right: 0.5pt solid #fff;
}
.xl88 {
    mso-style-parent: style0;
    text-align: center;
    layout-flow: vertical;
    mso-font-charset: 134;
    border-left: 0.5pt solid #fff;
    border-right: 0.5pt solid #fff;
}
.xl90 {
    mso-style-parent: style0;
    text-align: right;
    mso-font-charset: 134;
    border: 0.5pt solid #fff;
}
.xl91 {
    mso-style-parent: style0;
    mso-font-charset: 134;
}
</style>