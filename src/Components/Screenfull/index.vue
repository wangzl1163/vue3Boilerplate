<!--
 * @Description  : 
 * @Author       : 王占领
 * @Date         : 2022-02-23 10:33:11
 * @LastEditTime: 2023-02-15 10:46:17
 * @LastEditors: 王占领
-->
<template>
   <div class="mr-2 w-9 text-center">
      <svg-icon
         :icon="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"
         className="screenfull-svg"
         @click="handleClick"
      />
   </div>
</template>

<script lang="ts" setup name="Screenfull">
import { useFullscreen } from "@/Composables/Fullscreen";

const { isFullscreen, fullscreen } = useFullscreen();

const handleClick = () => {
   fullscreen(document.documentElement);
};
</script>

<style lang="less" scoped>
@import url("@/Assets/Style/Variables.less");
.screenfull-svg {
   display: inline-block;
   cursor: pointer;
   fill: @color-white-85;
   font-size: 20px;
}
</style>
