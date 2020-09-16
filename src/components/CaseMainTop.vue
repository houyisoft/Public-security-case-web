<!-- 组件名称

注意：该组件已弃用


@module 组件存放位置
@desc 用于嵌套页面el-main头部部分表单及标题复用
@author 高飞翔
@date 2020年4月30日
@param {String} [title] - 父组件标题
@example 调用示例
<case-main-top title='待办流程'></case-main-top> -->
<template>
  <div class="case-main-top-cpnt">
    <!-- 表单区域 -->
    <div class="form-wrap">
      <slot></slot>
    </div>
    <!-- 标题 -->
    <div class="title-wrap">
      <div class="title-text" v-if="title">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '默认标题',
    },
  },
}
</script>

<style scoped lang="scss">
.case-main-top-cpnt {
  .form-wrap {
    display: flex;
    align-items: center;
    height: 90px;
    overflow: hidden;

    .case-main-top-form {
      display: flex;
      align-items: center;

      ::v-deep .el-form-item {
        display: flex;
        margin: 0 10px 0;
      }

      .form-btn {
      }
    }
  }

  .title-wrap {
    height: 50px;
    /* background-color: #E9ECF2; */
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title-text {
      // color: rgba(0, 0, 0, 1);
      color: #b5cbfb;
      line-height: 22px;
      font-weight: bold;
      padding-left: 15px;
      border-left: 4px solid rgb(26, 167, 255);
      font-size: 18px;
    }
  }
}
</style>
