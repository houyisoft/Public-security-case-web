<template>
    <el-breadcrumb class="app-breadcrumb" separator=">">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item
                v-for="(item,index) in levelList"
                :key="item.path"
                @click.prevent="void 0;"
            >
                <span
                    v-if="item.redirect==='noRedirect'||index==levelList.length-1"
                    class="no-redirect item"
                >{{ item.meta.title }}</span>
                <a v-else @click.prevent="handleLink(item)" class="item">{{ item.meta.title }}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script>
import { compile } from "path-to-regexp";

export default {
    data() {
        return {
            levelList: null
        };
    },
    watch: {
        $route(route) {
            // if you go to the redirect page, do not update the breadcrumbs
            if (route.path.startsWith("/redirect/")) {
                return;
            }
            this.getBreadcrumb();
        }
    },
    created() {
        this.getBreadcrumb();
    },
    methods: {
        getBreadcrumb() {
            // only show routes with meta.title
            let matched = this.$route.matched.filter(
                item => item.meta && item.meta.title
            );
            const first = matched[0];

            if (!this.isDashboard(first)) {
                matched = [
                    {
                        path: "/home",
                        meta: { title: "首页" }
                    }
                ].concat(matched);
            }

            this.levelList = matched.filter(
                item =>
                    item.meta &&
                    item.meta.title &&
                    item.meta.breadcrumb !== false
            );
        },
        isDashboard(route) {
            const name = route && route.name;
            if (!name) {
                return false;
            }
            return name.trim() === "首页";
        },
        pathCompile(path) {
            const { params } = this.$route;
            var toPath = compile(path);
            return toPath(params);
        },
        handleLink(item) {
            const { redirect, path } = item;
            if (redirect) {
                this.$router.push(redirect);
                return;
            }
            this.$router.push(this.pathCompile(path));
        }
    }
};
</script>

<style lang="scss" scoped>
.app-breadcrumb {
    display: inline-block;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgb(162, 204, 215);
    line-height: 22px;
    background-color: rgb(4, 87, 135);

    .item {
        color: rgb(162, 204, 215);
    }
}
</style>
