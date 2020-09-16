<template>
    <div>
        <base-title :title="title" baseTitleStyle="padding: 12px 0;"></base-title>
        <el-tree
            class="filter-tree"
            :data="menuList"
            :props="kv"
            default-expand-all
            :filter-node-method="filterNode"
            :expand-on-click-node="expandOnClickNode"
            ref="tree"
            @node-click="nodeClick"
        ></el-tree>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String
        },
        menuList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        maps: {
            type: Object,
            default: () => {
                return {};
            }
        },
        expandOnClickNode: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        maps: {
            handler(val) {
                Object.assign(this.kv, val);
            },
            immediate: true
        }
    },
    data() {
        return {
            kv: { label: "title", children: "children", uniKey: "id" }
        };
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        nodeClick(data, node) {
            this.$emit("nodeclick", data, node.isLeaf);
        }
    }
};
</script>
<style lang="scss" scoped>
::v-deep.el-tree {
    position: relative;
    cursor: default;
    background: transparent;
    color: rgb(76, 223, 252);
    border: 1px solid rgb(108, 223, 252);

    .el-tree-node__content {
        &:hover {
            background-color: rgba(108, 223, 252, 0.2);
        }
    }
}
</style>
