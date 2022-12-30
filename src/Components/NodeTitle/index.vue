<!--
 * @Description  : 
 * @Author       : 王占领
 * @Date         : 2022-02-28 15:13:10
 * @LastEditTime: 2022-12-30 10:18:27
 * @LastEditors: 王占领
-->
<template>
   <div :class="className" class="node-title-wrapper">
      <div class="title-left">
         <slot name="title">
            <span
               v-if="showFlag"
               class="flag"
               :style="{ background: flagBg }"
            ></span>
            <span>{{ title }}</span>
         </slot>
      </div>

      <div class="title-right" :style="rightStyle">
         <slot></slot>
      </div>
   </div>
</template>

<script>
import { styleVars } from "@/Assets/Theme";

export default {
   props: {
      title: String,
      className: String,
      flagBackground: {
         type: String
      },
      rightStyle: [String, Object],
      showFlag: {
         type: Boolean,
         default: true
      }
   },
   computed: {
      flagBg() {
         return this.flagBackground ?? styleVars().colorPrimary;
      }
   }
};
</script>
<style lang="less" scoped>
.node-title-wrapper {
   height: 20px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   font-size: 14px;
   font-weight: 700;
   box-sizing: border-box;
}

.title-left {
   display: flex;
   align-items: center;

   & > span {
      height: 14px;
      line-height: 14px;
   }

   & > .flag {
      width: 3px;
      margin-right: 8px;
   }
}
</style>
