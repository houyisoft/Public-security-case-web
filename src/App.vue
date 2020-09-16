<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
import apiCommon from "@/apis/apiCommon.js";
import apiKeda from "@/apis/apiKeda.js";
export default {
    data() {
        return {};
    },
    created() {
        this.udmsLogin();
        let typeObjData = window.localStorage.getItem("typeObjData");
        if (typeObjData) {
            this.$store.commit("updateTypeObjData", JSON.parse(typeObjData));
        }
        let typeMapData = window.localStorage.getItem("typeMapData");
        if (typeMapData) {
            this.$store.commit("updateTypeMapData", JSON.parse(typeMapData));
        }
        let posts = window.localStorage.getItem("posts");
        if (posts) {
            this.$store.commit("updatePosts", JSON.parse(posts));
        }
    },
    methods: {
        udmsLogin() {
            apiKeda
                .udmsLogin()
                .then(res => {
                    // console.log("科达设备登录成功", res);
                })
                .catch(err => {
                    console.log("科达设备登录失败", err);
                });
        }
    }
};
</script>

<style lang="scss">
#app {
    height: 100%;
}
</style>
