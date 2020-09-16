<template>
    <div class="info-layout">
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
        return {};
    }
};
</script>

<style lang="scss"
 scoped>
.main-outer {
    background: rgba(9, 61, 113, 1);
    border: 1px solid rgba(108, 223, 252, 1);
}
</style>
