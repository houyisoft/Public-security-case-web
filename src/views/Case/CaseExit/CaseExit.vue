<template>
    <div class="case-exit-page">
        <!-- 出区登记 -->
        <div class="case-exit-main">
            <div class="tab-bar">
                <div class="tab-bar-left">
                    <div
                        :class="{'tab-bar-card': true, 'current-card': currentTab==1}"
                        @click="changeTab(1)"
                    >嫌疑人</div>
                    <div
                        :class="{'tab-bar-card': true, 'current-card': currentTab==2}"
                        @click="changeTab(2)"
                    >民警</div>
                    <div
                        :class="{'tab-bar-card': true, 'current-card': currentTab==3}"
                        @click="changeTab(3)"
                    >其他人员</div>
                </div>
            </div>
            <suspect-item v-if="currentTab == 1"></suspect-item>
            <police-item v-if="currentTab == 2"></police-item>
            <others-item v-if="currentTab == 3"></others-item>
        </div>
    </div>
</template>

<script>
import SuspectItem from "@/views/Case/CaseExit/components/SuspectItem.vue";
import PoliceItem from "@/views/Case/CaseExit/components/PoliceItem.vue";
import OthersItem from "@/views/Case/CaseExit/components/OthersItem.vue";
export default {
    components: {
        SuspectItem,
        PoliceItem,
        OthersItem
    },
    data() {
        return {
            currentTab: "1" // 1 嫌疑人 2 民警
        };
    },
    created() {},
    methods: {
        // 查看列表
        handleSuspectFormTableType(index) {
            this.suspectItemFormTableType = index;
            if (index == 1) {
                console.log("切换为嫌疑人出区登记");
            } else {
                console.log("切换为嫌疑人查看列表");
            }
        },
        changeTab(val) {
            this.currentTab = val;
        }
    }
};
</script>

<style scoped
 lang="scss">
.case-exit-page {
    display: flex;

    .case-exit-main {
        flex: 1;
        padding: 13px 20px 30px;
    }
}
</style>
