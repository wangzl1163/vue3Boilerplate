<template>
   <el-card class="page" shadow="never" :body-style="style">
      <el-row :gutter="gutter" :justify="justify" :align="align">
         <el-col
            v-if="$slots.pageLeft"
            :sm="computedLeftSpan.sm"
            :md="computedLeftSpan.md"
            :lg="computedLeftSpan.lg"
            :xl="computedLeftSpan.xl"
         >
            <slot name="pageLeft"></slot>
         </el-col>

         <el-col
            :sm="computedRightSpan.sm"
            :md="computedRightSpan.md"
            :lg="computedRightSpan.lg"
            :xl="computedRightSpan.xl"
         >
            <slot></slot>
         </el-col>
      </el-row>
   </el-card>
</template>

<script>
export default {
   name: "Page"
};
</script>
<script setup>
import { computed, useSlots } from "vue";
import styleVariables from "@/Assets/Style/Variables.module.less";

const slots = useSlots();
const props = defineProps({
   gutter: {
      type: Number,
      default: 20
   },
   justify: {
      type: String,
      default: "start" //flex 布局下的水平排列方式,start/end/center/space-around/space-between/spacing-evenly
   },
   align: {
      type: String,
      default: "top" // flex 布局下的垂直排列方式,top/middle/bottom
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
      paddingTop: "16px",
      paddingBottom: "16px",
      paddingLeft: "16px",
      paddingRight: "16px",
      backgroundColor: styleVariables.colorPrimaryLight2,
      ...props.bodyStyle
   };
});
</script>

<style lang="less">
.page {
   border: none;
}
</style>
