<!--  -->
<template>
    <div class="cabinet">
        <div v-for="(child,i) in cells" :key="i" class="cabinet-column">
            <template v-for="(item, index) in child">
                <el-tooltip v-if="item.userId" :key="index" placement="bottom">
                    <template #content>
                        <div class="info">
                            <div class="text">姓名：{{item.userName}}</div>
                            <div
                                class="text"
                            >性别：{{{1: '男', 2: '女', 3: '未知', 9: '未说明'}[item.gender]}}</div>
                            <div class="text">存放日期：{{item.distributionDate}}</div>
                            <div class="text">是否出区：{{item.out ? '是': '否'}}</div>
                        </div>
                    </template>
                    <div v-if="item.col" :class="`cabinet-cell ${item.col} screen`">触摸屏</div>
                    <div
                        v-else
                        :class="`cabinet-cell${item.userId ? item.isOut ? ' used-leave' : ' used' : ''}`"
                        @click="lockerClick(item, true)"
                    >{{item.name || item.siteNO}}</div>
                </el-tooltip>
                <div
                    :key="index"
                    v-else-if="item.col"
                    :class="`cabinet-cell ${item.col} screen`"
                >触摸屏</div>
                <div
                    v-else
                    :key="index"
                    :class="`cabinet-cell${item.selected?' selected':''}`"
                    @click="lockerClick(item, false)"
                >{{item.name || item.siteNO}}</div>
            </template>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
export default {
    props: {
        children: Array,
        type: Number
    },
    components: {},
    data() {
        return { cells: [] };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {
        children: {
            
            handler(list) {
                switch (this.type) {
                    case 1:
                        this.cells = [
                            list.slice(0, 5),
                            list.slice(5, 10),
                            [
                                ...list.slice(10, 11),
                                { col: "col2" },
                                ...list.slice(11, 13)
                            ],
                            list.slice(13, 18)
                        ];
                        break;
                    case 2:
                        this.cells = [
                            list.slice(0, 7),
                            list.slice(7, 14),
                            [
                                ...list.slice(14, 15),
                                { col: "col3" },
                                ...list.slice(15, 18)
                            ],
                            list.slice(18, 25)
                        ];
                        break;
                    case 3:
                        this.cells = [
                            [
                                { col: "col4" },
                                ...list.slice(0, 4)
                            ],
                            list.slice(4, 12)
                        ];
                        break;
                    case 4:
                        this.cells = [
                            list.slice(0, 5),
                            list.slice(5, 10),
                            list.slice(10, 15),
                            list.slice(15, 20)
                        ];
                        break;
                    case 5:
                        this.cells = [list.slice(0, 8), list.slice(8, 16)];
                        break;
                    case 6:
                        this.cells = [list.slice(0, 6), list.slice(6, 12), list.slice(12, 18),list.slice(18, 24), list.slice(24, 30),list.slice(30, 36),list.slice(36, 42),list.slice(42, 48),list.slice(48, 54),list.slice(54, 60)];
                        break;
                    case 7:
                        this.cells = [
                            list.slice(0, 6),
                            [{ col: "col6" }],
                            list.slice(6, 12)
                        ];
                        break;
                    default:
                        break;
                }
                
            },
            immediate: true
        }
    },
    //方法集合
    methods: {
        lockerClick() {
            this.$emit("lockerClick", ...arguments);
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {}
};
</script>
<style lang='scss' scoped>
.info {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(108, 223, 252, 1);
    line-height: 22px;
}
.cabinet {
    display: inline-flex;
    box-sizing: border-box;
    .cabinet-column {
        flex-grow: 1;
        // flex-basis: 25%;
        box-sizing: border-box;
        .cabinet-cell {
            height: 44px;
            line-height: 44px;
            width: 44px;
            box-sizing: border-box;
            margin: 30px 30px 30px 0;
            background-color: #fff;
            text-align: center;
            cursor: default;

            &.col2 {
                height: 118px;
                line-height: 118px;
            }
            &.col3 {
                height: 192px;
                line-height: 192px;
            }
            &.col4 {
                height: 266px;
                line-height: 266px;
            }
            &.col5 {
                height: 340px;
                line-height: 340px;
            }
            &.col6 {
                height: 414px;
                line-height: 414px;
            }
            &.screen {
                border: 1px dotted rgba(108, 223, 252, 1);
                background-color: rgba(108, 223, 252, 0.2);
                font-size: 12px;
                color: #6cdffc;
            }
            &.box {
                border: 1px solid rgba(108, 223, 252, 1);
                background-color: rgba(255, 255, 255, 0.5);
            }

            &.used {
                background: #ff6666;
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
            }

            &.used-leave {
                background: rgba(3, 10, 67, 1);
                border: 1px solid rgba(108, 223, 252, 1);
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(108, 223, 252, 1);
            }
            &.selected {
                background: #fbb95c;
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #666;
            }
        }
        &:last-child {
            .cabinet-cell {
                margin-right: 0;
            }
        }
    }
}
</style>