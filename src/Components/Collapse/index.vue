<!--
 * @Description: 折叠组件
 * @Author: 王占领
 * @Date: 2022-11-23 15:52:55
 * @LastEditTime: 2022-12-29 10:34:40
 * @LastEditors: 王占领
-->
<template>
   <div class="fold">
      <div class="fold-item" v-for="(item, i) in data">
         <div
            class="fold-item__header text-primary-text flex w-full items-center"
         >
            <template v-if="item.header"> {{ item.header }} </template>
            <template v-else>
               <div
                  class="fold-item__icon cursor-pointer"
                  @click="handleClick(i)"
               >
                  <template
                     v-if="!['string', 'undefined'].includes(typeof item.icon)"
                  >
                     {{ item.icon }}
                  </template>
                  <template v-else>
                     <el-icon>
                        <template
                           v-if="
                              currentItemIndex === i || expandedKeys.includes(i)
                           "
                        >
                           <ArrowDownBold />
                        </template>
                        <template v-else>
                           <ArrowRightBold />
                        </template>
                     </el-icon>
                  </template>
               </div>

               <div
                  class="fold-item__title ml-2 flex-1 basis-fit text-me font-bold"
               >
                  <template v-if="typeof item.title === 'string'">
                     {{ item.title }}
                  </template>
                  <template v-else>
                     <FunCom :render="item.title"></FunCom>
                  </template>
               </div>

               <div class="fold-item__append basis-fit">
                  <FunCom :render="item.append"></FunCom>
               </div>
            </template>
         </div>

         <div
            class="fold-item__content"
            v-show="currentItemIndex === i || expandedKeys.includes(i)"
         >
            <FunCom :render="item.content"></FunCom>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

import type { VNode, SetupContext } from "vue";
import type { NullableNumber } from "@/Typings/Common";

type Item = {
   icon?: string | (() => VNode) | undefined;
   title: string | (() => VNode);
   append?: (() => VNode) | undefined;
   header?: () => VNode | undefined;
   content: () => VNode;
};

const props = withDefaults(
   defineProps<{
      data: Item[];
      defaultExpandedKeys?: number[];
   }>(),
   {
      defaultExpandedKeys: () => []
   }
);

const currentItemIndex = ref<NullableNumber>(0);
const expandedKeys = ref<number[]>(props.defaultExpandedKeys);

const handleClick = (index: number) => {
   if (expandedKeys.value.includes(index)) {
      currentItemIndex.value = null;
      expandedKeys.value = expandedKeys.value.filter((item) => item !== index);
   } else {
      currentItemIndex.value = currentItemIndex.value === index ? null : index;
   }
};

const FunCom = (
   props: { render: (() => VNode) | undefined },
   ctx: SetupContext
) => {
   return props.render?.call(ctx);
};

watch(
   () => props.data,
   (val) => {
      if (val.length > 0) {
         currentItemIndex.value = val.length - 1;
      }
   }
);
watch(
   () => props.defaultExpandedKeys,
   (val) => {
      expandedKeys.value = val;
   }
);
</script>

<style lang="less" scoped>
@import "@/Assets/Style/Variables.less";

.fold {
   &-item {
      &__header {
         padding: 10px 0;
      }

      &__content {
         padding: 12px 0;
      }

      &__icon {
         height: 24px;
         width: 24px;
         line-height: 28px;
         text-align: center;
         border-radius: 6px;
         background-color: @fill-color-light;
      }
   }
}
</style>
