<!-- 头部 -->
<template>
    <el-header class="layout-header bgc-black" height="50px">
        <div class="header-intro">
            <div class="header-title">
                <img
                    style="width:24px;vertical-align:middle;margin-right:12px;margin-top:-5px"
                    src="../../assets/Case/policeBadge.png"
                />
                <span>{{title}}</span>
            </div>
        </div>
        <div class="user-separator"></div>
        <div class="header-navigator"></div>
        <div class="header-user">
            <div class="user-separator"></div>
            <div class="user-item user-name">
                <img src="../../assets/images/user/user_header.png" />
                <span>{{userInfo.frealname}}</span>
            </div>
            <!-- <div class="user-item user-number">工号 {{userInfo.fencode}}</div> -->
            <div class="user-separator"></div>
            <div class="user-item user-logout" @click="userLogout">
                <img src="../../assets/images/user/user_exit.png" />
                <span>退出</span>
            </div>
        </div>
    </el-header>
</template>

<script>
import Vue from "vue";
import { removeToken } from "@/utils/auth.js";
import { mapState } from "vuex";
export default {
    components: {},
    data() {
        return {
            title: ""
        };
    },
    //监听属性 类似于data概念
    computed: {
        ...mapState(["userInfo"])
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        userLogout() {
            window.localStorage.removeItem("token");
            removeToken();
            this.$store.commit("updateMenuList", []);
            this.$store.commit("updateOriginMenuList", []);
            this.$router.push("/login");
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.title = localStorage.getItem("title");
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {}
};
</script>
<style lang='scss'
 scoped>
.user-separator {
    width: 1px;
    height: 26px;
    background: rgba(108, 223, 252, 1);
    opacity: 0.3;
    margin: 0 20px;
}

.layout-header {
    display: flex;
    align-items: center;
    padding: 0;
    color: rgba(108, 223, 252, 1);
    line-height: 60px;
    padding: 20px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;

    .header-title {
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        // line-height: 22px;
        flex-shrink: 0;
        margin-right: 70px;
    }

    .header-navigator {
        flex-grow: 1;
    }

    .header-user {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 14px;
        white-space: nowrap;

        .user-item {
            display: flex;
            align-items: center;
            padding: 0 30px;

            img {
                width: 29px;
                height: 29px;
                margin-right: 10px;
            }
        }

        .user-name {
            padding-left: 10px;
        }

        .user-logout {
            cursor: pointer;
            padding: 0 20px;

            img {
                width: 26px;
                height: 22px;
            }
        }
    }
}
</style>
