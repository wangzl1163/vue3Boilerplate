<!--
 * @Description  : app dom 入口
 * @Author       : 王占领
 * @Date         : 2022-02-18 09:52:06
 * @LastEditTime: 2022-07-27 10:42:59
 * @LastEditors: 王占领
-->
<script setup lang="ts">
import { provide } from "vue";

provide("roleDirective", [
   {
      name: "hasRole",
      value: ["admin"]
   }
]);
</script>

<template>
   <router-view></router-view>
</template>

<style lang="less">
@import url("./Assets/Style/Index.less");
#app {
   height: 100%;
}
</style>
