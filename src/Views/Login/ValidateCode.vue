<!--
 * @Description  : 验证码
 * @Author       : 王占领
 * @Date         : 2022-06-07 14:18:59
 * @LastEditTime : 2022-06-07 15:51:43
 * @LastEditors  : 王占领
-->
<template>
   <canvas
      id="vc-canvas"
      ref="vcCanvas"
      :width="width"
      :height="height"
      @click="reloadCode"
   />
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import randomKey from "@/Utils/RandomKey";

const props = withDefaults(
   defineProps<{
      modelValue: string;
      width?: string;
      height?: string;
      codeLength?: number;
      fontSizeMin?: number;
      fontSizeMax?: number;
      backgroundColorMin?: number;
      backgroundColorMax?: number;
      colorMin?: number;
      colorMax?: number;
      lineColorMin?: number;
      lineColorMax?: number;
      contentWidth?: number;
      contentHeight?: number;
   }>(),
   {
      width: "96",
      height: "40",
      codeLength: 4,
      fontSizeMin: 20,
      fontSizeMax: 22,
      backgroundColorMin: 240,
      backgroundColorMax: 250,
      colorMin: 10,
      colorMax: 20,
      lineColorMin: 40,
      lineColorMax: 180,
      contentWidth: 96,
      contentHeight: 38
   }
);

const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const code = ref("");

const reloadCode = () => {
   randomCode();
};
const randomNum = (min: number, max: number) => {
   return Math.floor(Math.random() * (max - min) + min);
};
const randomColor = (min: number, max: number) => {
   const r = randomNum(min, max);
   const g = randomNum(min, max);
   const b = randomNum(min, max);
   return `rgb(${r}, ${g}, ${b})`;
};
const randomCode = () => {
   code.value = randomKey.getKey(props.codeLength);
   const {
      backgroundColorMin,
      backgroundColorMax,
      contentWidth,
      contentHeight
   } = props;

   const canvas = document.getElementById("vc-canvas")! as HTMLCanvasElement;
   const ctx = canvas.getContext("2d")!;
   ctx.textBaseline = "bottom";
   // 绘制背景
   ctx.fillStyle = randomColor(backgroundColorMin, backgroundColorMax);
   ctx.fillRect(0, 0, contentWidth, contentHeight);
   // 绘制文字
   for (let i = 0; i < code.value.length; i++) {
      drawText(ctx, code.value[i], i);
   }
   drawLine(ctx);
   drawDot(ctx);
   emit("update:modelValue", code.value);
};
const drawLine = (ctx: CanvasRenderingContext2D) => {
   const { lineColorMin, lineColorMax, contentWidth, contentHeight } = props;
   // 绘制干扰线
   for (let i = 0; i < 1; i++) {
      ctx.strokeStyle = randomColor(lineColorMin, lineColorMax);
      ctx.beginPath();
      ctx.moveTo(randomNum(0, contentWidth), randomNum(0, contentHeight));
      ctx.lineTo(randomNum(0, contentWidth), randomNum(0, contentHeight));
      ctx.stroke();
   }
};
const drawText = (ctx: CanvasRenderingContext2D, txt: string, i: number) => {
   ctx.fillStyle = randomColor(props.colorMin, props.colorMax);
   const fontSize = randomNum(props.fontSizeMin, props.fontSizeMax);
   ctx.font = fontSize + "px SimHei";
   const padding = 10;
   const offset = (props.contentWidth - 40) / (props.codeLength - 1);
   let x = padding;
   if (i > 0) {
      x = padding + i * offset;
   }
   let y = randomNum(props.fontSizeMax, props.contentHeight - 5);
   if (fontSize > 40) {
      y = 40;
   }
   const deg = randomNum(-10, 10);
   // 修改坐标原点和旋转角度
   ctx.translate(x, y);
   ctx.rotate((deg * Math.PI) / 180);
   ctx.fillText(txt, 0, 0);
   // 恢复坐标原点和旋转角度
   ctx.rotate((-deg * Math.PI) / 180);
   ctx.translate(-x, -y);
};
const drawDot = (ctx: CanvasRenderingContext2D) => {
   const { contentWidth, contentHeight } = props;
   // 绘制干扰点
   for (let i = 0; i < 100; i++) {
      ctx.fillStyle = randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(
         randomNum(0, contentWidth),
         randomNum(0, contentHeight),
         1,
         0,
         2 * Math.PI
      );
      ctx.fill();
   }
};

onMounted(() => {
   // 首次加载时生成验证码
   randomCode();
});
</script>

<style lang="less" scoped>
#vc-canvas {
   cursor: pointer;
}
</style>
