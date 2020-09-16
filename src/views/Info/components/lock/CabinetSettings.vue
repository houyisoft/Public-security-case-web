<!-- 橱柜 -->
<template>
    <div class="box">
        <div
            class="title"
        >{{(typeProp === 1 ? '储物柜名称：': '货架名称：') + (result.lockerName || result.goodsName || ' ')}}</div>

        <div v-if="typeProp === 1" class="border">
            <div class="content" v-for="(child, cIndex) in result.children" :key="cIndex">
                <div v-if="typeProp === 1" class="content-title">{{child.isMain ? '主柜':'副柜'}}</div>
                <el-button
                    type="text"
                    v-if="child._isNew"
                    class="close-button"
                    @click="deleteItem(child)"
                >
                    <i
                        class="el-dialog__close el-icon el-icon-close"
                        style="font-size: 20px;color: rgb(108, 223, 252);"
                    ></i>
                </el-button>
                <lock-type :type="getType(result, child)" :children="child.children" />
            </div>
        </div>
        <div v-else class="border">
            <div class="content">
                <lock-type :type="6" :children="result.children" />
            </div>
        </div>

        <div class="bottons">
            <el-dropdown
                size="mini"
                split-button
                :disabled="hasMaster"
                @command="(command) => this.addMaster(...command)"
                style="margin-right: 10px;"
            >
                新增主柜
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :disabled="hasMaster" :command="['东城电子', 1]">东城电子(18位)</el-dropdown-item>
                    <el-dropdown-item :disabled="hasMaster" :command="['东城电子', 2]">东城电子(25位)</el-dropdown-item>
                    <el-dropdown-item :disabled="hasMaster" :command="['宝树科技', 1]">宝树科技</el-dropdown-item>
                    <el-dropdown-item :disabled="hasMaster" :command="['柯达', 1]">柯达</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button type="primary" @click="addSlave">新增副柜</el-button>
            <el-button type="primary" @click="clear">清除</el-button>
            <!-- <el-button type="primary" @click="reSort">重新排序</el-button> -->
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import LockType from "./types/LockType";
import Create from "./types/data.js";
import Apis from "@/apis/Info/lock.js";
export default {
    props: {
        dataProp: { type: Object, default: {} },
        typeProp: { type: Number, default: 1 } //类型，1储物柜；2货架
    },
    components: { LockType },
    data() {
        return {
            visible: false,
            count: 0,
            result: {
                children: []
            },
            type: "", //厂商
            historyLength: "", //历史长度，防止把已分配的柜子清除
            hasMaster: false
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {
        dataProp(val) {
            this.type = val.lockerPp;
            const children = val.children;
            this.historyLength = children.length;
            if (this.typeProp === 1) {
                if (this.historyLength) {
                    this.hasMaster = true;
                }
            }
            //this.count = val.siteCount || val.positionCount || 0;
            if(val.siteCount) {
                if(val.children.length <= 1) {
                    this.count = (val.siteCount - val.children[0].boxCount) + 1;
                } else {
                    this.count = (val.siteCount - val.children[1].boxCount) + 1;
                }
            } else {
                this.count = 1;
            }
            this.result = JSON.parse(JSON.stringify(val));
        }
    },
    //方法集合
    methods: {
        getType(item, child) {
            if (
                item.lockerPp === "东城电子" &&
                child.boxCount === 18 &&
                child.isMain
            ) {
                return 1;
            } else if (
                item.lockerPp === "东城电子" &&
                child.boxCount === 25 &&
                child.isMain
            ) {
                return 2;
            } else if (
                item.lockerPp === "宝树科技" &&
                child.boxCount === 12 &&
                child.isMain
            ) {
                return 3;
            } else if (
                item.lockerPp === "柯达" &&
                child.boxCount === 12 &&
                child.isMain
            ) {
                return 7;
            } else if (item.lockerPp === "东城电子" && !child.isMain) {
                return 4;
            } else if (item.lockerPp === "宝树科技" && !child.isMain) {
                return 5;
            } else if (item.lockerPp === "柯达" && !child.isMain) {
                return 6;
            }
        },
        addMaster(name, type) {
            this.type = name;
            const { lockerId } = this.result;
            const sort = 1;
            this.result.lockerPp = name;
            this.result.children.push(
                Create(name, type, {
                    lockerId,
                    sort,
                    startNo: 1
                })
            );
            this.type = name;
            this.historyLength = 0;
            this.hasMaster = true;
        },
        addSlave() {
            const { lockerId } = this.result;
            const sort = this.result.children.length + 1;
            if(this.result.children.length <= 1) {
                this.count += this.result.children[0].boxCount;
            } else {
                this.count += this.result.children[1].boxCount;
            }
            if (this.type === "东城电子") {
                this.result.children.push(
                    Create(this.type, 3, {
                        lockerId,
                        sort,
                        startNo: this.count
                        //startNo: 1
                    })
                );
            } else if (this.type === "宝树科技") {
                this.result.children.push(
                    Create(this.type, 2, {
                        lockerId,
                        sort,
                        startNo: this.count
                        //startNo: 1
                    })
                );
            } else if (this.type === "柯达") {
                this.result.children.push(
                    Create(this.type, 2, {
                        lockerId,
                        sort,
                        startNo: this.count
                        //startNo: 1
                    })
                );
            }
        },
        reSort() {},
        clear() {
            this.result.children = this.result.children.slice(
                0,
                this.historyLength
            );
            if (this.result.children.length) {
                this.hasMaster = true;
            } else {
                this.hasMaster = false;
            }
        },
        deleteItem(record) {
            this.$confirm(
                "此操作将永久删除，若已使用，请确保未被使用, 是否继续?",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }
            )
                .then(() => {
                    const { id, isMain, _isNew, _uuid } = record;
                    if (_isNew) {
                        this.$message.success("删除成功");
                        this.updateAfterDelete(id, _uuid);
                    } else {
                        Apis.delete({ lockerId: id, fId: id, isMain }).then(
                            res => {
                                if (res.code === 0) {
                                    this.$message.success("删除成功");
                                    this.updateAfterDelete(id, _uuid);
                                } else {
                                    this.$message.error("操作失败");
                                }
                            }
                        );
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        },
        updateAfterDelete(id, _uuid) {
            const newChildren = this.result.children.filter(item => {
                if (id === item.lockerId || _uuid === item._uuid) {
                    return false;
                }
                return true;
            });
            this.result.children = newChildren;
        },
        save() {
            const tbLockerList = this.result.children.slice(this.historyLength);
            if(tbLockerList.length>0){
                for (const item of tbLockerList) {
                    item.lockerPp = this.type;
                    delete item.children;
                    delete item._isNew;
                }
                return Apis.postData({ tbLockerList });
            }else{
                 this.$message.error("无新增数据无法保存");
            }
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        console.log("mounted", this.listProp);
    }
};
</script>
<style lang='scss' scoped>
.box {
    margin-bottom: 50px;
    overflow: auto;
    .title {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(251, 185, 92, 1);
    }
    .border {
        display: flex;
        align-items: flex-start;
        .content {
            position: relative;
            margin-right: 80px;
            .content-title {
                text-align: center;
                padding-top: 20px;
                margin-bottom: -10px;
            }
            .close-button {
                position: absolute;
                right: 0px;
                top: 10px;
                border: solid 1px rgb(108, 223, 252);
                padding: 2px;
                border-radius: 50%;
            }
        }
    }
}
.bottons {
    position: absolute;
    bottom: 20px;
}

::v-deep.el-dropdown .el-dropdown__caret-button {
    padding: 8px 5px !important;
    .el-dropdown__icon {
        font-size: 14px !important;
        &::before {
            color: rgba(9, 61, 113, 0.8) !important;
        }
    }
    &.el-button--default {
        &::before {
            background: rgba(9, 61, 113, 0.5) !important;
        }
    }
}
</style>
