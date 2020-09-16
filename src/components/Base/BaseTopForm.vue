<!-- 组件名称
@module 组件存放位置
@desc 用于页面el-main顶部表单及标题复用
@author 高飞翔
@date 2020年5月12日
@param {String} [title] - 父组件标题
@param {Object} [baseTopFormData] - 表单数据
@example 调用示例
<base-top-form title='广播区域'
:baseTopFormData="baseTopFormData"
@onPostBaseTopFormData="postBaseTopFormData">
 <template v-slot:btn>
  <el-button type="primary">设置终端对应</el-button>
 </template>
 <template v-slot:form>
  <el-form-item prop="keyword"
  label="关键字">
   <el-input v-model="baseTopFormData.keyword"
   placeholder="请输入"></el-input>
  </el-form-item>
 </template>
</base-top-form>
 -->
<template>
    <div class="base-top-form-cmpt">
        <div class="base-top-title" :style="title ? {} : { marginBottom: 0 }">
            <base-title :title="title" v-if="title"></base-title>
            <div class="title-btns-wrap">
                <slot name="btn"></slot>
            </div>
        </div>
        <el-form
            @submit.native.prevent
            class="base-top-form"
            ref="baseTopForm"
            :model="baseTopFormData"
            :rules="baseTopFormRules"
            :inline="baseTopFormInline"
            :labelWidth="baseTopFormLabelWidth"
        >
            <slot name="form"></slot>
            <div class="form-btns-wrap">
                <el-button
                    class="form-post-btn"
                    size="mini"
                    plain
                    type="primary"
                    @click="postFormData"
                >查询</el-button>
                <el-button
                    class="form-post-btn"
                    v-if="isBaseTopFormResetBtn"
                    size="mini"
                    plain
                    type="primary"
                    @click="$resetFields('baseTopForm')"
                >重置</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        baseTopFormData: {
            type: Object,
            default() {
                return {};
            }
        },
        baseTopFormRules: {
            type: Object,
            // 如不传该参数，使用默认全局校验规则
            default() {
                return {
                    keyword: [
                        {
                            required: true,
                            message: "请输入关键字",
                            trigger: "blur"
                        }
                    ],
                    jinghao: [
                        {
                            required: true,
                            message: "请输入警号",
                            trigger: "blur"
                        }
                    ],
                    email: [
                        {
                            required: true,
                            message: "请输入邮箱地址",
                            trigger: "blur"
                        },
                        {
                            type: "email",
                            message: "请输入正确的邮箱地址",
                            trigger: ["blur", "change"]
                        }
                    ],
                    mobile: [
                        {
                            required: true,
                            message: "请输入手机号码",
                            trigger: "blur"
                        },
                        {
                            validator: this.$checkMobile,
                            trigger: ["blur", "change"]
                        }
                    ]
                };
            }
        },
        baseTopFormInline: {
            type: Boolean,
            default: true
        },
        baseTopFormLabelWidth: {
            type: String,
            default: "80px"
        },
        isBaseTopFormResetBtn: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    methods: {
        postFormData() {
            this.$validate("baseTopForm")
                .then(res => {
                    console.log("res", res);
                    this.$emit("onPostBaseTopFormData");
                })
                .catch(err => {
                    console.log("err", err);
                });
        }
    }
};
</script>

<style scoped lang="scss">
.base-top-form-cmpt {
    margin-bottom: 20px;

    .base-top-title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title-btns-wrap {
            display: flex;
            justify-content: flex-end;
        }
    }

    .base-top-form {
        padding: 15px;
        border-radius: 2px;
        display: flex;
        align-items: center;
        border: 1px solid #ace7fd;
        background: #2659bf;

        ::v-deep .el-form-item {
            margin: 0 30px 0 0;

            .el-form-item__label-wrap {
                margin-left: 0 !important;
                width: 100px;

                .el-form-item__label {
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #ffffff;
                }
            }
        }

        .form-btns-wrap {
            flex: 1;
            display: flex;
            justify-content: flex-end;

            .form-post-btn {
                background: rgba(108, 223, 252, 1);
                border-radius: 4px;
                /* padding: 12px 24px; */
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(9, 61, 113, 1);
                border: none;
            }

            .el-button:not(.el-button--text) {
                background: linear-gradient(
                    0deg,
                    rgba(34, 145, 227, 1) 0%,
                    rgba(145, 227, 247, 1) 100%
                ) !important;
            }
        }
    }
}
</style>
