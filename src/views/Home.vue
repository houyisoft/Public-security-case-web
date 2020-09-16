<!-- 首页 -->
<template>
    <div class="container">
        <layout-header />
        <div class="border">
            <el-row :gutter="24" style="margin-bottom: 60px;">
                <el-col :span="6" class="col">
                    <router-link
                        :class="`grid-content ${perms[0].enable? 'enable' : 'disable'}`"
                        tag="div"
                        :to="perms[0].enable ? perms[0].path : ''"
                    >
                        <img src="../assets/images/home/case-entry.png" />
                    </router-link>
                </el-col>
                <el-col :span="6" class="col">
                    <router-link
                        :class="`grid-content ${perms[1].enable? 'enable' : 'disable'}`"
                        tag="div"
                        :to="perms[1].enable ? perms[1].path : ''"
                    >
                        <img src="../assets/images/home/case-exit.png" />
                    </router-link>
                </el-col>
                <el-col :span="6" class="col">
                    <router-link
                        :class="`grid-content ${perms[2].enable? 'enable' : 'disable'}`"
                        tag="div"
                        :to="perms[2].enable ? perms[2].path : ''"
                    >
                        <img src="../assets/images/home/case-security-check.png" />
                    </router-link>
                </el-col>
                <el-col :span="6" class="col">
                    <router-link
                        :class="`grid-content ${perms[3].enable? 'enable' : 'disable'}`"
                        tag="div"
                        :to="perms[3].enable ? perms[3].path : ''"
                    >
                        <img src="../assets/images/home/case-info-collect.png" />
                    </router-link>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="6" class="col">
                    <router-link
                        :class="`grid-content ${perms[4].enable? 'enable' : 'disable'}`"
                        tag="div"
                        :to="perms[4].enable ? perms[4].path : ''"
                    >
                        <img src="../assets/images/home/ask-manager.png" />
                    </router-link>
                </el-col>
                <el-col :span="6" class="col">
                    <router-link class="grid-content" tag="div" to @click.native="handleClick">
                        <img src="../assets/images/home/msg-publish.png" />
                    </router-link>
                </el-col>
                <el-col :span="6" class="col">
                    <router-link
                        class="grid-content"
                        tag="div"
                        to
                        @click.native="handleClick($event, perms[6].path)"
                    >
                        <img src="../assets/images/home/supervision-management.png" />
                    </router-link>
                </el-col>
                <el-col :span="6" class="col">
                    <router-link
                        :class="`grid-content ${perms[7].enable? 'enable' : 'disable'}`"
                        tag="div"
                        :to="perms[7].enable ? perms[7].path : ''"
                    >
                        <img src="../assets/images/home/system.png" />
                    </router-link>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import LayoutHeader from "./Layout/Header";
import { mapState } from "vuex";
export default {
    components: { LayoutHeader },
    data() {
        return {
            perms: [
                { title: "入区登记", enable: false, path: "case/caseEntry" },
                { title: "出区登记", enable: false, path: "case/caseExit" },
                {
                    title: "人身检查",
                    enable: false,
                    path: "case/CaseSecurityCheck"
                },
                {
                    title: "信息采集",
                    enable: false,
                    path: "case/CaseInfoCollect"
                },
                { title: "候问待审", enable: false, path: "case/caseWaitRoom" },
                { title: "", enable: false, path: "" },
                {
                    title: "",
                    enable: false,
                    //  path:
                    //      "http://20.120.96.201:1000/ZF_LawCaseCenter/SupervisionCommand/PersonnelInvolvedAnalysis"
                    //轨迹
                    path:
                      "http://20.112.102.3:21000/kisms/index.html"
                },
                {
                    title: "系统功能",
                    enable: false,
                    path: "other/systemFunction"
                }
            ]
        };
    },
    //监听属性 类似于data概念
    computed: {
        ...mapState(["originMenuList"])
    },
    //监控data中的数据变化
    watch: {
        originMenuList: {
            handler(list) {
                const { perms } = this;
                for (const perm of perms) {
                    for (const item of list) {
                        if (item.meta.title === perm.title) {
                            perm.enable = true;
                        }
                    }
                }
                this.perms = perms;
            },
            immediate: true
        }
    },
    //方法集合
    methods: {
        handleClick(e, path) {
            if (path) {
                location.href = path;
            } else {
                this.$message.info("系统建设中...");
            }
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        const list = this.$store.state.originMenuList;
        const { perms } = this;
        for (const perm of perms) {
            for (const item of list) {
                if (item.meta.title === perm.title) {
                    perm.enable = true;
                }
            }
        }
        this.perms = perms;
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {}
};
</script>
<style lang='scss' scoped>
.container {
    height: 100%;

    .border {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        padding: 0 300px;
        .el-tabs__nav {
            .el-tabs__item {
                padding: 17px 26px 15px 26px !important;
                height: auto;
                line-height: initial;
                text-align: center;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(108, 223, 252, 1);
                &.is-active {
                    color: rgba(3, 10, 67, 1);
                    background: rgba(108, 223, 252, 1);
                    border: 1px solid rgba(108, 223, 252, 1);
                }
            }
            .el-tabs__active-bar {
                width: 0 !important;
            }
        }

        &:after {
            height: 1px;
            background: rgba(119, 168, 244, 1);
        }
    }
    .el-row {
        margin: 60px 0 !important;
        box-sizing: border-box;
        .col {
            padding: 0 30px !important;
            text-align: center;
            img {
                width: 100%;
            }
        }
    }
}
.disable {
    filter: grayscale(1);
    cursor: not-allowed;
}

@media screen and(min-width: 1800px) {
    .container {
        .border {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 1200px;
            padding: 0 !important;
        }
    }
}
@media screen and(max-width: 1440px) {
    .container {
        .border {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 840px;
            padding: 0 !important;
        }
    }
}
</style>