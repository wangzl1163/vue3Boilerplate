<!--
 * @Description: tag 标签
 * @Author: 王占领
 * @Date: 2022-06-22 17:27:10
 * @LastEditTime: 2022-12-29 10:35:54
 * @LastEditors: 王占领
-->
<template>
   <div
      v-if="category === 'status'"
      class="tag"
      :class="'tag--' + type + ' ' + (hasIcon ? '' : 'tag--small ') + className"
      :style="hasBgColor ? '' : { backgroundColor: 'transparent' }"
   >
      <div v-if="hasIcon" class="tag__icon mr-1"></div>
      <span>{{ label }}</span>
   </div>
   <div
      v-if="category === 'level'"
      :class="'alarm-level--' + alarmLevel.level[level!] + ' '+className"
      style="display: inline-block"
   >
      <SvgIcon
         v-if="alarmLevel.level[level!]"
         :icon="'alarm-' + alarmLevel.level[level!]"
         className="mr-1"
      ></SvgIcon>
      <span>{{ level }}</span>
   </div>
</template>

<script lang="ts" setup>
withDefaults(
   defineProps<{
      label?: string;
      type?: "success" | "danger" | "info" | "disabled";
      hasIcon?: boolean;
      category?: "status" | "level";
      level?: "紧急" | "重要" | "次要" | "提示";
      className?: string;
      hasBgColor?: boolean;
   }>(),
   {
      category: "status",
      hasIcon: true,
      className: "",
      hasBgColor: true
   }
);

const alarmLevel = {
   level: {
      紧急: "exigency",
      重要: "serious",
      次要: "secondary",
      提示: "information"
   },
   list: [
      {
         value: "紧急",
         label: "紧急"
      },
      {
         value: "重要",
         label: "重要"
      },
      {
         value: "次要",
         label: "次要"
      },
      {
         value: "提示",
         label: "提示"
      }
   ]
};
</script>

<style lang="less" scoped>
@import "@/Assets/Style/Mixin.less";
@import "@/Assets/Style/Variables.less";

.tag {
   .inline-flex();
   padding: 2px 12px;
   border-radius: 4px;
   line-height: 20px;

   &__icon {
      width: 6px;
      height: 6px;
      border-radius: 50%;
   }
   &--success {
      background-color: @tag-success-color;
      color: @tag-success-text-color;
      & .tag__icon {
         background-color: @tag-success-text-color;
      }
   }
   &--danger {
      background-color: @tag-danger-color;
      color: @tag-danger-text-color;
      & .tag__icon {
         background-color: @tag-danger-text-color;
      }
   }
   &--info {
      background-color: @tag-info-color;
      color: @tag-info-text-color;
      & .tag__icon {
         background-color: @tag-info-text-color;
      }
   }
   &--disabled {
      background-color: @tag-disabled-color;
      color: @tag-disabled-text-color;
      & .tag__icon {
         background-color: @tag-disabled-text-color;
      }
   }
   &--small {
      font-size: @font-size-extra-small;
   }
}

.alarm-level--exigency {
   color: @alarm-level-1;
}
.alarm-level--serious {
   color: @alarm-level-2;
}
.alarm-level--secondary {
   color: @alarm-level-3;
}
.alarm-level--information {
   color: @alarm-level-4;
}
</style>
