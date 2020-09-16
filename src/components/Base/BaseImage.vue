<template>
    <div class="base-image-cmpt">
        <template>
            <el-image
                :class="`base-image ${imgType}`"
                :src="src || require('@/assets/images/case/caseEntry/'+ imgType +'.png')"
                :preview-src-list="src ? [src] : []"
            />
            <div v-if="!onlyView" class="base-image-control">
                <template v-for="(item, index) in commads">
                    <el-button
                        v-if="item"
                        :key="index"
                        :icon="`el-icon-${map[item]}`"
                        type="text"
                        @click="handleClick(`${item}Img`)"
                        style="font-size: 16px;cursor: pointer;"
                    ></el-button>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            default: ""
        },
        index: {
            type: Number,
            default: 0
        },
        imgType: {
            type: String,
            default: "formImgPlh"
        },
        onlyView: {
            type: Boolean,
            default: false
        },
        commads: {
            type: Array,
            default() {
                return ["add", "delete"];
            }
        }
    },
    data() {
        return {
            map: {
                add: "camera",
                delete: "delete"
            }
        };
    },
    methods: {
        handleClick(commad) {
            this[commad]();
        },
        deleteImg() {
            this.$emit("onBaseImageDeleteImg", this.index);
        },
        addImg() {
            this.$emit("onBaseImageAddImg", this.index);
        }
    }
};
</script>

<style scoped
 lang="scss">
.base-image-cmpt {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;

    .base-image {
        width: 90px;
        height: 75px;
        &.face {
            width: 120px;
            height: 160px;
        }
    }

    .base-image-control {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0 8px;
    }
}

.preview-img-dialog {
    ::v-deep .el-dialog__header {
        .el-dialog__headerbtn {
            top: 10px;
        }
    }

    ::v-deep .el-dialog_body {
        .preview-img {
            width: 500px;
            height: 300px;
        }
    }
}
@media screen and (max-width: 1440px) {
    .base-image-cmpt {
        .base-image {
            &.face {
                max-width: 90px;
                height: 120px;
            }
        }
    }
}
@media screen and (min-width: 1441px) and (max-width: 1660px) {
    .base-image-cmpt {
        .base-image {
            &.face {
                max-width: 120px;
                height: 160px;
            }
        }
    }
}
</style>
