<!-- 模拟input/select等 -->
<!-- <base-fake-element baseFakeElementFlag="responseAlarm"
 baseFakeElementType="select"
 @onBaseFakeElementClick="baseFakeElementClick">请选择</base-fake-element> -->
<template>
  <div
    class="base-fake-element"
    :style="baseFakeElementStyle"
    @click="baseFakeElementClick"
  >
    <span>
      <slot>{{value || '请输入'}}</slot>
    </span>
    <el-input v-model="value" v-show="false"/>
    <i
      v-if="baseFakeElementType == 'select'"
      class="el-icon-plus"
      style="color: rgb(172, 231, 253);"
    ></i>
    <i
      v-if="baseFakeElementType == 'card'"
      class="el-icon-bank-card"
      style="font-size: 18px;color: rgb(172, 231, 253);"
    ></i>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    baseFakeElementFlag: {
      type: String,
      default: "",
    },
    baseFakeElementType: {
      type: String,
      default: "select",
    },
    // 添加自定义样式（width, height等）
    baseFakeElementStyle: {
      type: String,
      default: "",
    },
  },
  methods: {
    baseFakeElementClick() {
      // 点击，回传该标识
      this.$emit("onBaseFakeElementClick", this.baseFakeElementFlag);
    },
  },
};
</script>

<style scoped lang="scss">
.base-fake-element {
  background-color: rgba(108, 223, 252, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 130px;
  width: 100%;
  padding: 0 9px;
  height: 40px;
  border: 1px solid #ace7fd !important;
  border-radius: 4px;
  font-size: 14px;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  position: relative;

  span {
    white-space: nowrap;
    padding: 0 6px;
    width: 100%;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.el-form-item--small {
  .base-fake-element {
    height: 32px;
  }
}
</style>
