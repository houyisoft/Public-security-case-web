<!--  -->
<template>
    <el-aside class="layout-aside" width="180px">
        <el-menu
            class="layout-menu"
            background-color="#093D71"
            text-color="#6CDFFC"
            active-text-color="#030A43"
            :default-active="$route.path"
            unique-opened
            router
        >
            <template v-for="(item1, index1) in menuList">
                <el-submenu
                    v-if="!item1.hidden && item1.children"
                    :index="getRealPath(item1.path)"
                    :key="index1"
                >
                    <template v-if="!item1.hidden" slot="title">{{ item1.meta.title }}</template>
                    <template v-for="(item2, index2) in item1.children">
                        <el-submenu
                            v-if="!item1.hidden && item2.children"
                            :key="index2"
                            :index="getRealPath(item1.path, item2.path)"
                        >
                            <template v-if="!item2.hidden" slot="title">{{ item2.meta.title }}</template>
                            <template v-for="(item3, index3) in item2.children">
                                <el-menu-item
                                    v-if="!item2.hidden"
                                    :index="getRealPath(item1.path, item2.path, item3.path)"
                                    :key="index3"
                                >{{ item3.meta.title }}</el-menu-item>
                            </template>
                        </el-submenu>
                        <el-menu-item
                            :key="index2"
                            :index="getRealPath(item1.path, item2.path)"
                            v-else-if="!item2.hidden"
                        >{{ item2.meta.title }}</el-menu-item>
                    </template>
                </el-submenu>
                <el-menu-item
                    v-else
                    :key="index1"
                    :index="getRealPath(item1.path)"
                >{{ item1.meta.title }}</el-menu-item>
            </template>
        </el-menu>
    </el-aside>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import Path from "path";
export default {
    components: {},
    data() {
        return { currentMenuIndex: "" };
    },
    //监听属性 类似于data概念
    computed: {
        ...mapState(["menuList"])
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getRealPath() {
            return Path.resolve(...arguments);
        }
    }
};
</script>
<style lang='scss' scoped>
</style>