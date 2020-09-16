<template>
    <div class="case-layout">
        <!-- 步骤条 -->
        <el-steps class="layout-steps" :active="currentStep">
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
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            steps: [
                { title: "入区登记" },
                { title: "人身检查" },
                { title: "随身财物" },
                { title: "信息采集" },
                { title: "侯问待审" },
                { title: "财务返还" },
                { title: "出区登记" }
            ],
            currentStep: 1
        };
    },
    watch: {
        $route: {
            handler(route) {
                // if you go to the redirect page, do not update the breadcrumbs
                if (route.meta.index !== undefined) {
                    this.currentStep = route.meta.index;
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
<style lang="scss"
 scoped>
.case-layout {
    margin-top: -20px;
    .layout-steps {
        height: 48px;
        padding: 8px 52px;

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
                        &.is-process {
                            background-image: url(../../assets/images/steps/step_1_active.png);
                        }
                    }

                    .step-2 {
                        background-image: url(../../assets/images/steps/step_2.png);
                        &.is-process {
                            background-image: url(../../assets/images/steps/step_2_active.png);
                        }
                    }

                    .step-3 {
                        background-image: url(../../assets/images/steps/step_3.png);
                        &.is-process {
                            background-image: url(../../assets/images/steps/step_3_active.png);
                        }
                    }

                    .step-4 {
                        background-image: url(../../assets/images/steps/step_4.png);
                        &.is-process {
                            background-image: url(../../assets/images/steps/step_4_active.png);
                        }
                    }

                    .step-5 {
                        background-image: url(../../assets/images/steps/step_5.png);
                        &.is-process {
                            background-image: url(../../assets/images/steps/step_5_active.png);
                        }
                    }

                    .step-6 {
                        background-image: url(../../assets/images/steps/step_6.png);
                        &.is-process {
                            background-image: url(../../assets/images/steps/step_6_active.png);
                        }
                    }

                    .step-7 {
                        background-image: url(../../assets/images/steps/step_7.png);
                        &.is-process {
                            background-image: url(../../assets/images/steps/step_7_active.png);
                        }
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

    .main-outer {
        background: rgba(9, 61, 113, 1);
        border: 1px solid rgba(108, 223, 252, 1);
    }
}
</style>
