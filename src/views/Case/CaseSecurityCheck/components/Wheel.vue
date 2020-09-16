<template>
    <v-stage :config="configKonva">
        <v-layer ref="layer">
            <!-- 上 -->
            <v-group
                name="top"
                @mouseup="() => handleMouseUp('top', 0)"
                @mousedown="() => handleMouseDown('top', 0)"
            >
                <v-shape
                    :config="{
						sceneFunc: function(context, shape) {
							context.beginPath();
							context.moveTo(100, 100);
							context.arc(100, 100, 90, (PI / 6) * 8, (PI / 6) * 10);
							context.closePath();
							context.fillStrokeShape(shape);
						},
						fill: indexList[0] ? '#6c7df9' : '#232426',
						stroke: '#1B1D1F',
						strokeWidth: 1,
					}"
                />
                <v-shape
                    :config="{
						sceneFunc: function(ctx, shape) {
							var height = 35 + 10 * Math.sin(Math.PI / 3); //计算等边三角形的高
							ctx.beginPath();
							ctx.moveTo(100, 35);
							ctx.lineTo(95, height); //从A(100,0)开始，画到B (0,173)结束
							ctx.lineTo(105, height); //B(0,173)-C(100,173)
							ctx.closePath();
							ctx.fillStrokeShape(shape);
						},
						fill: '#ffffff',
						stroke: '#ffffff',
						strokeWidth: 2,
					}"
                />
            </v-group>
            <!-- 右上 -->
            <v-group
                name="topRight"
                @mouseup="handleMouseUp('topRight', 1)"
                @mousedown="handleMouseDown('topRight', 1)"
            >
                <v-shape
                    :config="{
						sceneFunc: function(context, shape) {
							context.beginPath();
							context.moveTo(100, 100);
							context.arc(100, 100, 90, (PI / 6) * 10, (PI / 6) * 11);
							context.closePath();
							context.fillStrokeShape(shape);
						},
						fill: indexList[1] ? '#6c7df9' : '#232426',
						stroke: '#1B1D1F',
						strokeWidth: 1,
					}"
                />
                <v-shape
                    :config="{
						sceneFunc: function(ctx, shape) {
							ctx.beginPath();
							ctx.moveTo(138, 52);
							ctx.lineTo(148, 52); //从A(100,0)开始，画到B (0,173)结束
							ctx.lineTo(148, 62); //B(0,173)-C(100,173)
							ctx.fillStrokeShape(shape);
						},
						stroke: '#ffffff',
						strokeWidth: 2,
					}"
                />
            </v-group>
            <!-- 右 -->
            <v-group
                name="right"
                @mouseup="handleMouseUp('right', 2)"
                @mousedown="handleMouseDown('right', 2)"
            >
                <v-shape
                    :config="{
						sceneFunc: function(context, shape) {
							context.beginPath();
							context.moveTo(100, 100);
							context.arc(100, 100, 90, (PI / 6) * 11, (PI / 6) * 1);
							context.closePath();
							context.fillStrokeShape(shape);
						},
						fill: indexList[2] ? '#6c7df9' : '#232426',
						stroke: '#1B1D1F',
						strokeWidth: 1,
					}"
                />
                <v-shape
                    :config="{
						sceneFunc: function(ctx, shape) {
							var width = 155 + 10 * Math.sin(Math.PI / 3); //计算等边三角形的高
							ctx.beginPath();
							ctx.moveTo(155, 95);
							ctx.lineTo(155, 105); //从A(100,0)开始，画到B (0,173)结束
							ctx.lineTo(width, 100); //B(0,173)-C(100,173)
							ctx.closePath();
							ctx.fillStrokeShape(shape);
						},
						fill: '#ffffff',
						stroke: '#ffffff',
						strokeWidth: 2,
					}"
                />
            </v-group>
            <!-- 右下 -->
            <v-group
                name="rightBottom"
                @mouseup="handleMouseUp('rightBottom', 3)"
                @mousedown="handleMouseDown('rightBottom', 3)"
            >
                <v-shape
                    :config="{
						sceneFunc: function(context, shape) {
							context.beginPath();
							context.moveTo(100, 100);
							context.arc(100, 100, 90, (PI / 6) * 1, (PI / 6) * 2);
							context.closePath();
							context.fillStrokeShape(shape);
						},
						fill: indexList[3] ? '#6c7df9' : '#232426',
						stroke: '#1B1D1F',
						strokeWidth: 1,
					}"
                />
                <v-shape
                    :config="{
						sceneFunc: function(ctx, shape) {
							ctx.beginPath();
							ctx.moveTo(138, 148);
							ctx.lineTo(148, 148); //从A(100,0)开始，画到B (0,173)结束
							ctx.lineTo(148, 138); //B(0,173)-C(100,173)
							ctx.fillStrokeShape(shape);
						},
						stroke: '#ffffff',
						strokeWidth: 2,
					}"
                />
            </v-group>
            <!-- 下 -->
            <v-group
                name="bottom"
                @mouseup="handleMouseUp('bottom', 4)"
                @mousedown="handleMouseDown('bottom', 4)"
            >
                <v-shape
                    :config="{
						sceneFunc: function(context, shape) {
							context.beginPath();
							context.moveTo(100, 100);
							context.arc(100, 100, 90, (PI / 6) * 2, (PI / 6) * 4);
							context.closePath();
							context.fillStrokeShape(shape);
						},
						fill: indexList[4] ? '#6c7df9' : '#232426',
						stroke: '#1B1D1F',
						strokeWidth: 1,
					}"
                />
                <v-shape
                    :config="{
						sceneFunc: function(ctx, shape) {
							var height = 155 + 10 * Math.sin(Math.PI / 3); //计算等边三角形的高
							ctx.beginPath();
							ctx.moveTo(95, 155);
							ctx.lineTo(105, 155); //从A(100,0)开始，画到B (0,173)结束
							ctx.lineTo(100, height); //B(0,173)-C(100,173)
							ctx.closePath();
							ctx.fillStrokeShape(shape);
						},
						fill: '#ffffff',
						stroke: '#ffffff',
						strokeWidth: 1,
					}"
                />
            </v-group>
            <!-- 左下 -->
            <v-group
                name="leftBottom"
                @mouseup="handleMouseUp('leftBottom', 5)"
                @mousedown="handleMouseDown('leftBottom', 5)"
            >
                <v-shape
                    :config="{
						sceneFunc: function(context, shape) {
							context.beginPath();
							context.moveTo(100, 100);
							context.arc(100, 100, 90, (PI / 6) * 4, (PI / 6) * 5);
							context.closePath();
							context.fillStrokeShape(shape);
						},
						fill: indexList[5] ? '#6c7df9' : '#232426',
						stroke: '#1B1D1F',
						strokeWidth: 1,
					}"
                />
                <v-shape
                    :config="{
						sceneFunc: function(ctx, shape) {
							ctx.beginPath();
							ctx.moveTo(52, 138);
							ctx.lineTo(52, 148); //从A(100,0)开始，画到B (0,173)结束
							ctx.lineTo(62, 148); //B(0,173)-C(100,173)
							ctx.fillStrokeShape(shape);
						},
						stroke: '#ffffff',
						strokeWidth: 2,
					}"
                />
            </v-group>
            <!-- 左 -->
            <v-group
                name="left"
                @mouseup="handleMouseUp('left', 6)"
                @mousedown="handleMouseDown('left', 6)"
            >
                <v-shape
                    :config="{
						sceneFunc: function(context, shape) {
							context.beginPath();
							context.moveTo(100, 100);
							context.arc(100, 100, 90, (PI / 6) * 5, (PI / 6) * 7);
							context.closePath();
							context.fillStrokeShape(shape);
						},
						fill: indexList[6] ? '#6c7df9' : '#232426',
						stroke: '#1B1D1F',
						strokeWidth: 1,
					}"
                />
                <v-shape
                    :config="{
						sceneFunc: function(ctx, shape) {
							var width = 45 - 10 * Math.sin(Math.PI / 3); //计算等边三角形的高
							ctx.beginPath();
							ctx.moveTo(45, 95);
							ctx.lineTo(45, 105); //从A(100,0)开始，画到B (0,173)结束
							ctx.lineTo(width, 100); //B(0,173)-C(100,173)
							ctx.closePath();
							ctx.fillStrokeShape(shape);
						},
						fill: '#ffffff',
						stroke: '#ffffff',
						strokeWidth: 2,
					}"
                />
            </v-group>
            <!-- 左上 -->
            <v-group
                name="leftTop"
                @mouseup="handleMouseUp('leftTop', 7)"
                @mousedown="handleMouseDown('leftTop', 7)"
            >
                <v-shape
                    :config="{
						sceneFunc: function(context, shape) {
							context.beginPath();
							context.moveTo(100, 100);
							context.arc(100, 100, 90, (PI / 6) * 7, (PI / 6) * 8);
							context.closePath();
							context.fillStrokeShape(shape);
						},
						fill: indexList[7] ? '#6c7df9' : '#232426',
						stroke: '#1B1D1F',
						strokeWidth: 1,
					}"
                />
                <v-shape
                    :config="{
						sceneFunc: function(ctx, shape) {
							ctx.beginPath();
							ctx.moveTo(62, 52);
							ctx.lineTo(52, 52); //从A(100,0)开始，画到B (0,173)结束
							ctx.lineTo(52, 62); //B(0,173)-C(100,173)
							ctx.fillStrokeShape(shape);
						},
						stroke: '#ffffff',
						strokeWidth: 2,
					}"
                />
            </v-group>
            <!-- 重置 -->
            <v-group
                name="reset"
                @mouseup="handleMouseUp('reset', 8)"
                @mousedown="handleMouseDown('reset', 8)"
            >
                <v-circle
                    :config="{ x: 100, y: 100, radius: 30, fill: indexList[8] ? '#6c7df9' : '#232426', stroke: '#1B1D1F', strokeWidth: 1 }"
                />
                <v-image :config="{ x: 84, y: 84, image: images.reset }" />
            </v-group>
            <!-- 近 -->
            <v-group
                name="near"
                :config="{ x: 215, y: 50 }"
                @mouseup="handleMouseUp('near', 9)"
                @mousedown="handleMouseDown('near', 9)"
            >
                <v-circle
                    :config="{ radius: 28, fill: indexList[9] ? '#6c7df9' : '#232426', stroke: '#1B1D1F', strokeWidth: 1 }"
                />
                <v-image :config="{ x: -12, y: -12, width: 24, height: 24, image: images.near }" />
            </v-group>
            <!-- 远 -->
            <v-group
                name="far"
                :config="{ x: 215, y: 150 }"
                @mouseup="handleMouseUp('far', 10)"
                @mousedown="handleMouseDown('far', 10)"
            >
                <v-circle
                    :config="{ radius: 28, fill: indexList[10] ? '#6c7df9' : '#232426', stroke: '#1B1D1F', strokeWidth: 1 }"
                />
                <v-image :config="{ x: -12, y: -12, width: 24, height: 24, image: images.far }" />
            </v-group>
        </v-layer>
    </v-stage>
</template>

<script>
import Vue from "vue";
import VueKonva from "vue-konva";

Vue.use(VueKonva);

export default {
    props: {
        scale: {
            type: Number,
            default: 1
        }
    },
    created() {
        const image = new window.Image();
        image.src = require("@/assets/images/common/reverse.png");
        image.onload = () => {
            this.images.reset = image;
        };
        const far = new window.Image();
        far.src = require("@/assets/images/common/far.png");
        far.onload = () => {
            this.images.far = far;
        };
        const near = new window.Image();
        near.src = require("@/assets/images/common/near.png");
        near.onload = () => {
            this.images.near = near;
        };
    },
    data() {
        return {
            interval: null,
            PI: Math.PI,
            images: {
                reset: null,
                near: null,
                far: null
            },
            configKonva: {
                width: 250 * this.scale,
                height: 200 * this.scale,
                scale: { x: this.scale, y: this.scale }
            },
            indexList: this.initIndexList()
        };
    },
    methods: {
        initIndexList() {
            let i = 0,
                result = [];
            while (i < 11) {
                result[i++] = false;
            }
            return result;
        },
        handleMouseUp(commad, index) {
            setTimeout(() => {
                this.$emit("handleStopCommad", commad);
            }, 400);
            clearInterval(this.interval);
            this.interval = null;
            this.indexList[index] = false;
        },
        handleMouseDown(commad, index) {
            this.$emit("handleKeyPress", commad);
            this.interval = setInterval(e => {
                this.$emit("handleKeyPress", commad);
            }, 200);
            this.indexList[index] = true;
        }
    },
    mounted() {}
};
</script>

<style></style>
