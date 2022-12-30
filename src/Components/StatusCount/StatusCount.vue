<!--
 * @Description: 状态统计
 * @Author: 王占领
 * @Date: 2022-06-16 11:05:07
 * @LastEditTime: 2022-12-29 10:31:15
 * @LastEditors: 王占领
-->
<template>
   <div class="status-count">
      <div class="mr-6">
         {{ normalText }}：<span
            class="status-count__number status-count__number--normal"
            :class="{
               'status-count__number--cursor': normalCount.toString() !== '0'
            }"
            @click="handleClick(HealthStatus.up, normalCount)"
            >{{ normalCount }}</span
         >
      </div>
      <div>
         {{ abnormalText }}：<span
            class="status-count__number status-count__number--abnormal"
            :class="{
               'status-count__number--cursor': abnormalCount.toString() !== '0'
            }"
            @click="handleClick(HealthStatus.down, abnormalCount)"
            >{{ abnormalCount }}</span
         >
      </div>
   </div>
</template>

<script lang="ts" setup>
import type { HealthStatuses } from "@/Typings/ObjKey4Enum";

defineProps<{
   normalText: string;
   abnormalText: string;
   normalCount: number | string;
   abnormalCount: number | string;
}>();

const emit = defineEmits<{
   (e: "click", status: HealthStatuses): void;
}>();

const HealthStatus: Record<string, HealthStatuses> = { up: "1", down: "0" };

const handleClick = (status: HealthStatuses, count: number | string) => {
   if (count.toString() === "0") {
      return;
   }

   emit("click", status);
};
</script>

<style lang="less" scoped>
@import "@/Assets/Style/Mixin.less";
@import "@/Assets/Style/Variables.less";
.status-count {
   .flex(flex-start);
   &__number {
      display: inline-block;
      vertical-align: middle;
      font-weight: 700;
   }
   &__number--normal {
      color: @color-success;
   }
   &__number--abnormal {
      color: @color-error;
   }
   &__number--cursor {
      cursor: pointer;
   }
}
</style>
