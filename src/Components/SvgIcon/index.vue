<!--
 * @Description  : svg icon
 * @Author       : 
 * @Date         : 2022-02-22 13:53:16
 * @LastEditTime: 2022-12-29 14:04:02
 * @LastEditors: 王占领
-->
<template>
   <div
      v-if="isExternal"
      :style="styleExternalIcon"
      class="svg-external-icon svg-icon"
      v-bind="$attrs"
   />
   <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
      <use :xlink:href="iconName" />
   </svg>
</template>

<script>
import { isExternal } from "@/Utils/Validate";

export default {
   name: "SvgIcon",
   inheritAttrs: false,
   props: {
      icon: {
         type: String,
         required: true
      },
      className: {
         type: String,
         default: ""
      }
   },
   computed: {
      isExternal() {
         return isExternal(this.icon);
      },
      iconName() {
         return `#icon-${this.icon}`;
      },
      svgClass() {
         if (this.className) {
            return "svg-icon " + this.className;
         } else {
            return "svg-icon";
         }
      },
      styleExternalIcon() {
         return {
            mask: `url(${this.icon}) no-repeat 50% 50%`,
            "-webkit-mask": `url(${this.icon}) no-repeat 50% 50%`
         };
      }
   }
};
</script>

<style lang="less" scoped>
:global(.svg-icon) {
   width: 1em;
   height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}

:global(.svg-external-icon) {
   background-color: currentColor;
   mask-size: cover !important;
   display: inline-block;
}
</style>
