<!--
 * @Description: img icon
 * @Author: 王占领
 * @Date: 2023-01-04 16:10:51
 * @LastEditTime: 2023-02-03 10:43:15
 * @LastEditors: 王占领
-->
<template>
   <img
      class="align-middle"
      :style="{ width: width, height: height }"
      :src="iconSrc"
      @error="handleError"
   />
</template>

<script lang="ts" setup name="ImgIcon">
import { ref } from "vue";

const props = withDefaults(
   defineProps<{
      icon: string;
      default?: string;
      type?: "png" | "jpg" | "jpeg" | "gif";
      width?: string;
      height?: string;
   }>(),
   {
      type: "png",
      width: "24px",
      height: "24px"
   }
);

const iconSrc = ref(
   new URL(
      `../../Assets/Icons/img/${props.icon}.${props.type}`,
      import.meta.url
   ).href
);

const handleError = () => {
   if (props.default) {
      iconSrc.value = new URL(
         `../../Assets/Icons/img/${props.default}.${props.type}`,
         import.meta.url
      ).href;
   }
};
</script>
