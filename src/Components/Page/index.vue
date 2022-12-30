<!--
 * @Description  : basic page
 * @Author       : 王占领
 * @Date         : 2022-03-08 14:29:25
 * @LastEditTime: 2022-12-30 10:14:24
 * @LastEditors: 王占领
-->
<template>
   <el-card
      class="page"
      :class="{ 'page-header': !$slots.header && !backHeader }"
      shadow="never"
      :body-style="style"
   >
      <template #header v-if="$slots.header || backHeader">
         <div class="slot-header" :style="computedHeaderStyle">
            <div v-if="backHeader" :style="{ height: backHeaderHeight }">
               <el-page-header
                  @back="$router.back()"
                  :style="{ lineHeight: backHeaderHeight }"
                  class="back-header"
               >
                  <template #icon>
                     <SvgIcon icon="back"></SvgIcon>
                  </template>
                  <template #title>
                     <span :style="{ color: $styleVars.colorPrimary }"
                        >返回</span
                     >
                  </template>
                  <template #content>
                     <span class="text-base">{{ $route.meta.title }}</span>
                  </template>
               </el-page-header>
            </div>
            <slot name="header" v-else></slot>
         </div>
      </template>
      <template #header v-else>
         <div class="title-header" :style="computedHeaderStyle">
            {{ $attrs.header }}
         </div>
      </template>

      <el-row :gutter="rowGutter" :justify="justify" :align="align">
         <el-col
            v-if="$slots.pageLeft"
            :sm="computedLeftSpan.sm"
            :md="computedLeftSpan.md"
            :lg="computedLeftSpan.lg"
            :xl="computedLeftSpan.xl"
            :class="{ 'fixed-left': fixLeft }"
            :style="
               fixLeft
                  ? {
                       flexBasis:
                          typeof leftWidth === 'number'
                             ? leftWidth + 'px'
                             : leftWidth,
                       maxWidth: 'none'
                    }
                  : {}
            "
         >
            <slot name="pageLeft"></slot>
         </el-col>

         <el-col
            :sm="computedRightSpan.sm"
            :md="computedRightSpan.md"
            :lg="computedRightSpan.lg"
            :xl="computedRightSpan.xl"
            :class="{ 'fixed-right': fixLeft }"
            :style="
               fixLeft
                  ? 'max-width:' +
                    `calc(100% - ${
                       typeof leftWidth === 'number'
                          ? leftWidth + 'px'
                          : leftWidth
                    })`
                  : ''
            "
         >
            <slot></slot>
         </el-col>
      </el-row>
   </el-card>
</template>

<script setup name="Page">
import { computed, useSlots } from "vue";
import { useGlobal } from "@/Composables/Global";

const gp = useGlobal();

const slots = useSlots();
const props = defineProps({
   gutter: {
      type: Number
   },
   justify: {
      type: String,
      default: "start" //flex 布局下的水平排列方式,start/end/center/space-around/space-between/spacing-evenly
   },
   align: {
      type: String,
      default: "top" // flex 布局下的垂直排列方式,top/middle/bottom
   },
   fixLeft: {
      type: Boolean,
      default: false
   },
   leftWidth: {
      type: [String, Number],
      default: "300px"
   },
   leftSpan: {
      type: Object,
      default: () => ({
         sm: 10,
         md: 8,
         lg: 6,
         xl: 4
      })
   },
   rightSpan: {
      type: Object,
      default: () => ({
         sm: 14,
         md: 16,
         lg: 18,
         xl: 20
      })
   },
   bodyStyle: {
      type: Object,
      default: () => undefined
   },
   headerStyle: {
      type: Object,
      default: () => undefined
   },
   backHeader: {
      type: Boolean,
      default: false
   },
   backHeaderHeight: {
      type: [String, Number],
      default: "60px"
   }
});

const computedLeftSpan = computed(() => {
   return {
      sm: 10,
      md: 8,
      lg: 6,
      xl: 4,
      ...props.leftSpan
   };
});

const computedRightSpan = computed(() => {
   if (!slots.pageLeft) {
      return {
         sm: 24,
         md: 24,
         lg: 24,
         xl: 24
      };
   }

   return {
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      ...props.rightSpan
   };
});

const style = computed(() => {
   return {
      display: "flex",
      paddingTop: "20px",
      paddingBottom: "20px",
      paddingLeft: "20px",
      paddingRight: "20px",
      backgroundColor: gp.$styleVars.colorWhite,
      flex: 1,
      ...props.bodyStyle
   };
});
const computedHeaderStyle = computed(() => {
   return {
      paddingLeft: "20px",
      paddingRight: "20px",
      ...props.headerStyle
   };
});
const rowGutter = computed(() => props.gutter ?? gp.$styleVars.gutter);
</script>

<style lang="less">
@import "@/Assets/Style/Mixin.less";
@import "@/Assets/Style/Variables.less";
.page {
   display: flex;
   flex-direction: column;
   min-height: 100%;
   border: none;
   background-color: transparent;

   .slot-header {
      .flex(flex-start);
      background-color: @color-white;
      border-top-left-radius: var(--el-card-border-radius);
      border-top-right-radius: var(--el-card-border-radius);
      border-bottom: 1px solid var(--el-card-border-color);
   }

   & > .el-card__header {
      padding: 0 0;
      background-color: transparent;
      font-weight: 700;
      border-bottom: none;
   }
   & > .el-card__body > .el-row {
      flex-wrap: nowrap;
      width: 100%;
   }
}
.page-header {
   & > .el-card__header {
      background-color: @color-white;

      .title-header {
         padding: 20px 0 20px;
         border-bottom: 1px solid var(--el-card-border-color);
      }
   }
}
.back-header {
   .el-page-header__left {
      margin-right: 17px;
      &::after {
         right: -9px;
      }
   }
   .el-page-header__content {
      .flex(flex-start);
   }
}

.fixed-right {
   flex-grow: 1;
   flex-basis: auto;
}
</style>
