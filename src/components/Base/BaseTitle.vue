<!-- 小标题 -->
<template>
    <div class="base-title" :style="baseTitleStyle">
        <div class="base-title-block"></div>
        <div class="base-title-text">{{title}}</div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        baseTitleStyle: {
            type: String,
            default: ""
        }
    }
};
</script>

<style scoped
 lang="scss">
.base-title {
    padding: 12px 0 15px 0;
    display: flex;
    align-items: center;

    .base-title-block {
        width: 12px;
        height: 12px;
        margin-right: 10px;
        background: rgba(181, 203, 251, 1);
    }

    .base-title-text {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(181, 203, 251, 1);
        line-height: 22px;
    }
}
</style>
