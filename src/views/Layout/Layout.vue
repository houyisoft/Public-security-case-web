<template>
    <el-container class="layout">
        <layout-header />
        <!-- 面包屑 -->
        <breadcrumb class="layout-breadcrumb"></breadcrumb>
        <el-container class="layout-container">
            <layout-menu />
            <el-main class="layout-main">
                <!-- 步骤条 -->
                <el-steps v-if="show" class="layout-steps" :active="currentStep">
                    <el-step
                        v-for="(item, index) in steps"
                        :key="index"
                        class="steps-item"
                        :title="item.title"
                        @click.native="goStep(index)"
                    >
                        <i :class="`steps-item-icon step-${index + 1}`" slot="icon"></i>
                    </el-step>
                </el-steps>
                <div class="main-outer">
                    <div class="main-inner">
                        <router-view />
                    </div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb";
import LayoutMenu from "./LayoutMenu";
import LayoutHeader from "./Header";

export default {
    data() {
        return {
            menuList: this.$store.state.originMenuList,
            steps: [
                { title: "入区登记", path: "", index: 1 },
                { title: "人身检查", path: "", index: 2 },
                { title: "随身物品", path: "", index: 3 },
                { title: "信息采集", path: "", index: 4 },
                { title: "候问待审", path: "", index: 5 },
                { title: "物品返还", path: "", index: 6 },
                { title: "出区登记", path: "", index: 7 }
            ],
            currentStep: 1,
            show: false
        };
    },
    components: { Breadcrumb, LayoutMenu, LayoutHeader },
    watch: {
        $route: {
            handler(route) {
                const routerTitle = route.meta.title;
                if (routerTitle) {
                    const menuList = this.menuList;
                    this.show = false;
                    this.steps.forEach(({ title }, index) => {
                        if (
                            routerTitle.replace(/\s*/g, "") ===
                            title.replace(/\s*/g, "")
                        ) {
                            this.show = true;
                            this.currentStep = index;
                        }
                    });
                }
            },
            immediate: true
        }
    },
    methods: {
        goStep(index) {
            this.currentStep = index;
        }
    }
};
</script>

<style scoped lang="scss">
.layout {
    height: 100%;
    padding-top: 80px;

    .layout-breadcrumb {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(162, 204, 215, 1);
        line-height: 22px;
        background-color: rgba(4, 87, 135, 0.2);
        padding: 4px 20px;
        position: fixed;
        width: 100%;
        top: 50px;
        z-index: 100;
    }

    .layout-container {
        padding-left: 180px;
        .layout-main {
            .layout-steps {
                height: 48px;
                padding: 8px 52px;
                margin-top: -20px;

                .steps-item {
                    width: 200px;
                    display: flex;
                    align-items: center;
                    position: relative;

                    ::v-deep .el-step__head {
                        display: flex;
                        align-items: center;

                        .el-step__line {
                            top: 0;
                            bottom: 0;
                            margin: auto;
                            left: 96px;
                            right: 16px;
                            height: 1px;
                            background: #999;
                        }
                        &.is-process {
                            // 完成及正在进行 step UI 调整
                            .el-step__icon {
                                .step-1 {
                                    background-image: url(../../assets/images/steps/step_1_active.png);
                                }

                                .step-2 {
                                    background-image: url(../../assets/images/steps/step_2_active.png);
                                }

                                .step-3 {
                                    background-image: url(../../assets/images/steps/step_3_active.png);
                                }

                                .step-4 {
                                    background-image: url(../../assets/images/steps/step_4_active.png);
                                }

                                .step-5 {
                                    background-image: url(../../assets/images/steps/step_5_active.png);
                                }

                                .step-6 {
                                    background-image: url(../../assets/images/steps/step_6_active.png);
                                }

                                .step-7 {
                                    background-image: url(../../assets/images/steps/step_7_active.png);
                                }
                            }
                        }
                        .el-step__icon {
                            width: 32px;
                            height: 32px;
                            border: none !important;

                            .steps-item-icon {
                                width: 32px;
                                height: 32px;
                                background-size: 100%;
                                background-repeat: no-repeat;
                                background-position: center;
                            }

                            .step-1 {
                                background-image: url(../../assets/images/steps/step_1.png);
                            }

                            .step-2 {
                                background-image: url(../../assets/images/steps/step_2.png);
                            }

                            .step-3 {
                                background-image: url(../../assets/images/steps/step_3.png);
                            }

                            .step-4 {
                                background-image: url(../../assets/images/steps/step_4.png);
                            }

                            .step-5 {
                                background-image: url(../../assets/images/steps/step_5.png);
                            }

                            .step-6 {
                                background-image: url(../../assets/images/steps/step_6.png);
                            }

                            .step-7 {
                                background-image: url(../../assets/images/steps/step_7.png);
                            }
                        }
                        &.is-finish {
                            .el-step__line {
                                background: #999;
                                .el-step__line-inner {
                                    display: none;
                                }
                            }
                        }
                    }

                    ::v-deep .el-step__main {
                        display: flex;
                        align-items: center;

                        .el-step__title {
                            position: absolute;
                            left: 32px;
                            font-size: 12px;
                            padding: 0 4px;
                            top: -3px;
                            &.is-process {
                                font-weight: normal;
                                color: rgba(251, 185, 92, 1);
                            }
                            &.is-finish {
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
