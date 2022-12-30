<!--
 * @Description: 卡片选择器
 * @Author: 王占领
 * @Date: 2022-10-12 10:05:21
 * @LastEditTime: 2022-12-28 17:24:35
 * @LastEditors: 王占领
-->
<template>
   <el-card
      class="card-select"
      shadow="never"
      :body-style="{ padding: '8px 12px' }"
   >
      <template #header>
         <div class="card-header">
            <el-checkbox
               v-model="checkAll"
               :indeterminate="isIndeterminate"
               :size="headerSize"
               :validate-event="validateEvent"
               @change="handleCheckAllChange"
            ></el-checkbox>
            <span style="line-height: 1"
               >{{ checkedValues.length }}/{{ data.length }}</span
            >
         </div>
      </template>

      <el-input
         v-model="searchVal"
         :placeholder="placeholder"
         suffix-icon="Search"
         :validate-event="validateEvent"
      />
      <template v-if="checkData.length">
         <el-checkbox-group
            v-model="checkedValues"
            class="flex flex-col"
            :validate-event="validateEvent"
            @change="handleCheckedValuesChange"
         >
            <el-checkbox
               v-for="item in checkData"
               :key="item.value"
               :label="item.value"
               >{{ item.label }}</el-checkbox
            >
         </el-checkbox-group>
      </template>
      <template v-else>
         <div class="empty text-center">暂无数据</div>
      </template>
   </el-card>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useFormItem } from "element-plus";

import type { CheckboxValueType, CheckboxGroupValueType } from "element-plus";

type CheckboxItem = {
   label: string | number;
   value: string | number;
};

const { formItem } = useFormItem();

const props = withDefaults(
   defineProps<{
      modelValue: (string | number)[];
      data: CheckboxItem[];
      headerSize?: "" | "default" | "small" | "large" | undefined;
      placeholder?: string;
      validateEvent?: boolean;
      maxBodyHeight?: string;
   }>(),
   {
      placeholder: "请输入关键字搜索",
      headerSize: "default",
      validateEvent: true,
      maxHeight: "none"
   }
);
const emit = defineEmits<{
   (e: "update:modelValue", value: CheckboxValueType[]): void;
}>();

const checkAll = ref(false);
const isIndeterminate = ref(false);
const checkChangeByUser = ref(false);
const checkedValues = ref<CheckboxGroupValueType>(props.modelValue ?? []);

const handleCheckAllChange = (val: CheckboxValueType) => {
   checkedValues.value = val ? props.data.map((item) => item.value) : [];
   isIndeterminate.value = false;
   checkChangeByUser.value = true;

   emit("update:modelValue", checkedValues.value);
};
const handleCheckedValuesChange = (val: CheckboxValueType[]) => {
   const checkedCount = val.length;

   checkedValues.value = val as CheckboxGroupValueType;
   checkAll.value = checkedCount === props.data.length;
   isIndeterminate.value = checkedCount > 0 && checkedCount < props.data.length;
   checkChangeByUser.value = true;

   emit("update:modelValue", checkedValues.value);
};

watch(
   () => props.modelValue,
   (val) => {
      if (!checkChangeByUser.value) {
         checkedValues.value = val;
         isIndeterminate.value =
            val.length !== props.data.length && val.length !== 0;
         checkAll.value = val.length === props.data.length;
      }

      if (props.validateEvent) {
         formItem?.validate("change").catch((err) => undefined);
      }
   }
);

const checkData = ref(props.data);
const searchVal = ref("");
watch(
   () => props.data,
   (val) => {
      checkData.value = val;
   }
);
watch(searchVal, (val) => {
   if (val.trim()) {
      checkData.value = props.data.filter((item) =>
         item.label.toString().includes(val.trim())
      );
   } else {
      checkData.value = props.data;
   }
});
</script>

<style lang="less" scoped>
@import "@/Assets/Style/Mixin.less";
@import "@/Assets/Style/Variables.less";
.card-select {
   width: 100%;
   :deep(.el-card__header) {
      padding: 8px 12px;
      border-bottom: none;
      background-color: @color-gray-space-light-9;
      .el-checkbox.el-checkbox--small {
         height: 20px;
      }
   }
   .card-header {
      .flex(space-between);
   }
   :deep(.el-card__body) {
      max-height: v-bind("props.maxBodyHeight");
      overflow: auto;
   }
   .empty {
      color: @text-color-empty;
   }
}
</style>
