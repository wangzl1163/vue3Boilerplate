<!--
 * @Description: 
 * @Author: 王占领
 * @Date: 2023-02-07 16:57:27
 * @LastEditTime: 2023-02-07 17:24:18
 * @LastEditors: 王占领
-->
<template>
   <div class="radio-wrapper rounded bg-fill-dark" :class="'radio--' + size">
      <el-radio-group
         :model-value="value"
         :size="size"
         @change="
            emit('update:modelValue', $event);
            emit('change', $event);
         "
      >
         <el-radio-button v-for="radio in radios" :label="radio.label">{{
            radio.content
         }}</el-radio-button>
      </el-radio-group>
   </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

type Radio = {
   label: string | number | boolean;
   content: string;
};

const props = withDefaults(
   defineProps<{
      modelValue?: string | number;
      radios: Radio[];
      size: "small" | "default" | "large";
   }>(),
   {
      size: "default"
   }
);

const emit = defineEmits<{
   (e: "update:modelValue", value: string | number | boolean): void;
   (e?: "change", value?: string | number | boolean): void;
}>();

const value = ref();

watch(
   () => props.modelValue,
   (val) => {
      value.value = val;
   }
);
</script>

<style lang="less" scoped>
@import "@/Assets/Style/Variables.less";
.radio-wrapper {
   :deep(.el-radio-group) {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .el-radio-button {
         --el-radio-button-checked-bg-color: @color-white;
         --el-radio-button-checked-border-color: @color-white;
         --el-button-bg-color: transparent;

         & > .el-radio-button__inner {
            border-radius: 6px !important;
            padding: 7px 14px;
            border: none;
            color: inherit;
         }
      }
   }
}
.radio {
   &--default {
      padding: 2px;
   }
}
</style>
