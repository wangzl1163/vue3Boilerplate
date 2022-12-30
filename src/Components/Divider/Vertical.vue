<!--
 * @Description  : 
 * @Author       : 王占领
 * @Date         : 2022-02-28 15:13:10
 * @LastEditTime : 2022-02-28 16:44:54
 * @LastEditors  : 王占领
-->
// 垂直
<template>
   <el-divider
      direction="vertical"
      :content-position="contentPosition"
      class="divider"
   >
      <slot></slot>
   </el-divider>
</template>

<script>
export default {
	props: {
      contentPosition: {
         // 分割线文案的位置 可选值：left / right / center
         type: String,
         default: 'center'
      }
   }
}
</script>
<style lang="less" scoped>
.divider {
   background-color: #0066cc;
}
</style>
