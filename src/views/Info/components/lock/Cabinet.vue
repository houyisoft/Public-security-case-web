<!-- 橱柜 -->
<template>
    <div class="container">
        <div v-for="(item, index) in listProp" :key="index" class="box">
            <!-- <div v-if="typeProp === 1" class="title">储物柜名称：{{item.lockerName}}</div>
            <div v-else class="title">货架名称：{{item.goodsName}}</div>-->
            <div v-if="typeProp === 1" class="border">
                <div class="content" v-for="(child, cIndex) in item.children" :key="cIndex">
                    <div v-if="typeProp === 1" class="content-title">{{child.isMain ? '主柜':'副柜'}}</div>
                    <lock-type
                        :type="getType(item, child)"
                        :children="child.children"
                        @lockerClick="lockerClick"
                    />
                </div>
            </div>
            <div v-else class="border">
                <div class="content">
                    <lock-type :type="6" :children="item.children" @lockerclick="lockerClick" />
                </div>
            </div>
            <div class="tooltips">
                <div class="white">表示空闲，</div>
                <div class="red">表示已被分配，</div>
                <div class="dark">表示出区未取出状态</div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import LockType from "./types/LockType";
export default {
    props: {
        listProp: { type: Array, default: [] },
        typeProp: { type: Number, default: 1 }
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
    watch: {},
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
            margin-right: 80px;
            .content-title {
                text-align: center;
                padding-top: 20px;
                margin-bottom: -10px;
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
</style>