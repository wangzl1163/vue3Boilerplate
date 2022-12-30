<!--
 * @Description  : 
 * @Author       : 王占领
 * @Date         : 2022-02-28 15:13:10
 * @LastEditTime : 2022-05-07 14:01:31
 * @LastEditors  : 王占领
-->
// 水平
<template>
   <div class="divider-wrapper" :style="styles">
      <el-divider
         v-if="hasMargin"
         direction="horizontal"
         :content-position="contentPosition"
         class="divider"
      >
         <slot></slot>
      </el-divider>

      <el-divider
         v-if="!hasMargin"
         direction="horizontal"
         :content-position="contentPosition"
         class="divider divider-margin"
      >
         <slot></slot>
      </el-divider>
   </div>
</template>

<script>
export default {
   props: {
      contentPosition: {
         // 分割线文案的位置 可选值：left / right / center
         type: String,
         default: "center"
      },
      hasMargin: {
         type: Boolean,
         default: false
      },
      styles: {
         type: Object,
         default: () => undefined
      }
   }
};
</script>
<style lang="less" scoped>
.divider-wrapper {
   box-sizing: border-box;
}
.divider {
   background-color: #0066cc;
}
.divider-margin {
   margin: 0;
}
</style>
