<!--
 * @Description: form wrapper
 * @Author: 王占领
 * @Date: 2022-09-29 16:27:05
 * @LastEditTime: 2022-11-21 17:02:02
 * @LastEditors: 王占领
-->
<template>
   <div class="form-wrapper">
      <slot></slot>
      <div v-if="$slots.right" class="form-wrapper__right">
         <slot name="right"></slot>
      </div>
   </div>
</template>

<style lang="less">
@import "@/Assets/Style/Mixin.less";
@import "@/Assets/Style/Variables.less";

.form-wrapper {
   .flex(space-between, flex-end);
   & > form {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      flex: 1;

      & .el-form-item {
         margin-right: @gutter;
         margin-bottom: @gutter;

         &:last-of-type {
            margin-right: 0;
            & .el-form-item__content {
               width: fit-content;
            }
         }
         & label {
            padding-right: 8px;
         }
         & .el-form-item__content {
            width: 206px;
         }
      }
   }
   & > .form-wrapper__right {
      margin-bottom: @gutter;
      flex-basis: content;
   }
}
</style>
