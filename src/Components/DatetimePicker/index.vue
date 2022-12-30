<!--
 * @Description: 
 * @Author: 王占领
 * @Date: 2022-09-20 14:34:48
 * @LastEditTime: 2022-12-29 10:33:38
 * @LastEditors: 王占领
-->
<template>
   <el-date-picker
      v-model="start"
      type="datetime"
      placeholder="开始时间"
      class="ml-3 mr-3"
      style="width: 200px"
   />
   <el-date-picker
      v-model="end"
      type="datetime"
      placeholder="结束时间"
      style="width: 200px"
      :default-time="defaultTime"
      :disabled-date="handleDisabledDate"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
   />
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";

type Model = { start: Date | undefined; end: Date | undefined };

const props = defineProps<{
   modelValue: Model;
}>();
const emit = defineEmits<{
   (e: "update:modelValue", value: Model): void;
}>();

const start = ref<Date>();
const end = ref<Date>();

const defaultTime = computed(() => {
   return !start.value
      ? new Date(Date.now())
      : new Date(start.value.getTime() - 7 * 3600000);
});

const handleDisabledDate = (d: Date) => {
   return start.value
      ? d.getTime() + 24 * 3600000 - 1000 < start.value.getTime()
      : d.getTime() > Date.now();
};
const makeRange = (start: number, end: number) => {
   const result: number[] = [];
   for (let i = start; i < end; i++) {
      result.push(i);
   }
   return result;
};
const disabledHours = () => {
   return makeRange(0, start.value?.getHours() ?? 0);
};
const disabledMinutes = (hour: number) => {
   return makeRange(0, start.value?.getMinutes() ?? 0);
};
const disabledSeconds = (hour: number, minute: number) => {
   return makeRange(0, start.value?.getSeconds() ?? 0);
};

watch(start, (val) =>
   emit("update:modelValue", { start: val, end: end.value })
);
watch(end, (val) =>
   emit("update:modelValue", { start: start.value, end: val })
);
watch(
   () => props.modelValue,
   (val) => {
      start.value = val.start;
      end.value = val.end;
   }
);
</script>
