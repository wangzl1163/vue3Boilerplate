<!--
 * @Description  : 
 * @Author       : 王占领
 * @Date         : 2022-02-28 15:13:10
 * @LastEditTime: 2022-12-08 13:53:49
 * @LastEditors: 王占领
-->
<template>
   <el-card
      :shadow="shadow"
      :body-style="{ padding: bodyPadding, ...bodyStyle }"
      :class="className"
      class="card"
      :style="cardStyle"
   >
      <template #header>
         <div class="card-header" :style="headerStyle" :class="headerClass">
            <span v-if="title">{{ title }}</span>
            <slot name="subheader"></slot>
         </div>
      </template>

      <template #default>
         <slot name="body"></slot>
      </template>
   </el-card>
</template>

<script>
export default {
   props: {
      title: String,
      cardStyle: {
         type: Object,
         default: () => undefined
      },
      headerStyle: {
         type: Object,
         default: () => undefined
      },
      bodyStyle: {
         type: Object,
         default: () => undefined
      },
      bodyPadding: {
         type: [Number, String],
         default: "20px"
      },
      shadow: {
         type: String,
         default: "never"
      },
      headerClass: {
         type: [String, Array],
         default: ""
      },
      className: {
         type: String,
         default: "block"
      }
   },
   data() {
      return {};
   }
};
</script>
<style lang="less" scoped>
.card {
   overflow: unset;
}
:deep(.el-card__header) {
   padding: 0;
   border-bottom: none;
}
.card-header {
   display: flex;
   width: 100%;
   height: 48px;
   box-sizing: border-box;
   padding: 0 20px;
   justify-content: space-between;
   align-items: center;
   font-weight: 700;
}
</style>
