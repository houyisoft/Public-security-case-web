<!-- 橱柜 -->
<template>
    <div class="container">
        <div class="box">
            <!-- <div v-for="(item, index) in listProp" :key="index" class="box"> -->
            <div v-if="typeProp === 1" class="border">
                <div class="content" v-for="(child, cIndex) in detailProp.children" :key="cIndex">
                    <div v-if="typeProp === 1" class="content-title">{{child.isMain ? '主柜':'副柜'}}</div>
                    <lock-type
                        :type="getType(detailProp, child)"
                        :children="child.children"
                        @lockerClick="lockerClick"
                    />
                </div>
            </div>
            <div v-else class="border">
                <div class="content">
                    <lock-type
                        :type="6"
                        :children="detailProp.children"
                        @lockerclick="lockerClick"
                    />
                </div>
            </div>
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import LockType from "./LockType";
export default {
    props: {
        listProp: { type: Array, default: [] },
        detailProp: { type: Object, default: {} },
        typeProp: { type: Number, default: 1 },
        currentId: String
    },
    components: { LockType },
    data() {
        return {
            result: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {
        // currentId: {
        //     handler(val) {
        //         for (const item of this.listProp) {
        //             if (item.lockerId === val) {
        //                 this.result = [item];
        //                 break;
        //             }
        //         }
        //     },
        //     immediate: true
        // },
        // listProp: {
        //     handler(val) {
        //         for (const item of val) {
        //             if (item.lockerId === this.currentId) {
        //                 this.result = [item];
        //                 break;
        //             }
        //         }
        //     },
        //     deep: true
        // }
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
        lockerClick() {
            this.$emit("lockerClick", ...arguments);
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        console.log(this.detailProp)
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        console.log("mounted", this.listProp);
        console.log('mounted',this.typeProp)
    }
};
</script>
<style lang='scss' scoped>
.container {
    margin: auto;
    .box {
        width: 728px;
        margin-bottom: 50px;
        overflow-x: auto;
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
                margin-right: 80px;
                .content-title {
                    text-align: center;
                    padding-top: 20px;
                    margin-bottom: -10px;
                }
                &:last-child {
                    margin-right: 0;
                }
            }
        }

        .tooltips {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(108, 223, 252, 1);
            line-height: 22px;
            display: flex;
            .white {
                margin-right: 15px;
                display: inline-flex;
                align-items: center;
                &::before {
                    content: "";
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    background: #fff;
                    margin-right: 5px;
                }
            }
            .red {
                margin-right: 15px;
                display: inline-flex;
                align-items: center;
                &::before {
                    content: "";
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    background: #ff6666;
                    margin-right: 5px;
                }
            }
            .dark {
                display: inline-flex;
                align-items: center;
                &::before {
                    content: "";
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    background: #030a43;
                    border: solid 1px #6cdffc;
                    margin-right: 5px;
                }
            }
        }
    }
}
</style>