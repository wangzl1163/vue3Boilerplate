<!--
 * @Description: 
 * @Author: 王占领
 * @Date: 2022-07-25 16:20:41
 * @LastEditTime: 2023-02-03 14:36:58
 * @LastEditors: 王占领
-->
<template>
   <el-button
      link
      type="primary"
      v-if="buttonType === 'button'"
      v-bind="$attrs"
      class="link-button"
      @click="emit('click', $event)"
   >
      <slot name="prefix-icon"></slot>
      <span class="href ml-1">{{ label }}</span>
      <slot name="suffix-icon"></slot>
   </el-button>
   <el-button
      link
      type="primary"
      v-if="buttonType === 'box'"
      v-bind="$attrs"
      class="link-button"
      @click="$_handleClick"
   >
      <slot name="prefix-icon"></slot>
      <span class="href ml-1">{{ label }}</span>
      <slot name="suffix-icon"></slot>
   </el-button>

   <el-popconfirm
      v-if="buttonType === 'pop'"
      :title="message"
      v-bind="$attrs"
      @onConfirm="$emit('confirm', $event)"
      @onCancel="$emit('cancel', $event)"
   >
      <template v-slot:reference>
         <el-button v-bind="popconfirmButtonAttrs" class="link-button">
            <slot name="prefix-icon"></slot>
            <span class="href ml-1">{{ label }}</span>
            <slot name="suffix-icon"></slot>
         </el-button>
      </template>
   </el-popconfirm>
</template>

<script lang="tsx" setup>
import { createVNode } from "vue";
import { useGlobal } from "@/Composables/Global";
import { SvgIcon } from "@/Components/index";

import type { messageType } from "element-plus";

const gp = useGlobal();

const props = withDefaults(
   defineProps<{
      label: string;
      title?: string;
      message?: string;
      buttonType?: string;
      boxType?: messageType;
      boxWidth?: string;
      iconSize?: string;
      confirmButtonText?: string;
      popconfirmButtonAttrs?: () => Record<string, unknown>;
   }>(),
   {
      title: "警告",
      message: "确定删除吗？",
      buttonType: "button", // 可选值：pop、box
      boxType: "error", // 可选值：success / info / warning / error
      boxWidth: "520px",
      iconSize: "14px",
      confirmButtonText: "删除",
      popconfirmButtonAttrs: () => ({})
   }
);
const emit = defineEmits<{
   (e: "confirm", value: Event): void;
   (e: "cancel", value: Event): void;
   (e: "click", value: Event): void;
}>();

const $_handleClick = (e: Event) => {
   e.stopPropagation();

   gp.$confirm(props.message, {
      title: props.title,
      type: props.boxType,
      customClass: "confirm-box confirm-box--" + props.boxType,
      icon: createVNode(SvgIcon, { icon: "information" }),
      customStyle: {
         width: props.boxWidth
      },
      confirmButtonText: props.confirmButtonText
   })
      .then((res) => {
         console.log("----- confirm res: ", res);
         emit("confirm", e);
      })
      .catch((err: PromiseRejectedResult) => {
         console.log("----- 已取消", err);
         emit("cancel", e);
      });
};
</script>

<style lang="less" scoped>
@import "@/Assets/Style/Variables.less";

.link-button {
   --hover-color: @color-primary-dark-4;
   color: @color-primary;

   &:hover {
      color: var(--hover-color);
      .href {
         border-bottom: 1px solid var(--hover-color);
      }
   }
   &:focus {
      color: @click-active-color !important;
      .href {
         border-bottom: 1px solid @click-active-color;
      }
   }
   &.is-disabled {
      .href {
         border-bottom-color: transparent;
      }
   }

   .href {
      display: inline-block;
      height: 20px;
      line-height: 20px;
   }

   svg {
      width: v-bind("props.iconSize");
      height: v-bind("props.iconSize");
   }
}
.el-button.is-link:hover {
   color: var(--hover-color);
}
</style>
