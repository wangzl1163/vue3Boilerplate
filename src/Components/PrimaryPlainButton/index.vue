<!--
 * @Description: primary plain按钮
 * @Author: 王占领
 * @Date: 2022-11-08 16:42:54
 * @LastEditTime: 2022-12-13 17:28:24
 * @LastEditors: 王占领
-->
<template>
   <el-button type="primary" plain>
      <slot>
         <el-icon><Search /></el-icon><span>查询</span>
      </slot>
   </el-button>
</template>

<style lang="less" scoped>
@import "@/Assets/Style/Variables.less";
.el-button--primary.is-plain {
   --el-button-bg-color: @color-white;
   --el-button-border-color: @color-primary;
}
</style>
