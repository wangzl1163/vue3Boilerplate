<!--
 * @Description: 锚点
 * @Author: 王占领
 * @Date: 2022-08-25 13:47:42
 * @LastEditTime: 2022-12-29 17:12:49
 * @LastEditors: 王占领
-->
<template>
   <div class="anchor-wrapper">
      <el-timeline type="info" class="anchor">
         <el-timeline-item
            v-for="(anchor, index) in anchors"
            :key="index"
            hide-timestamp
            :class="currentAnchorIndex === index ? 'is-active' : ''"
         >
            <a @click="handleClick(index, anchor.id)">{{ anchor.label }}</a>
         </el-timeline-item>
      </el-timeline>
   </div>
</template>

<script>
let intersectionObserver; //:IntersectionObserver;

export default {
   props: {
      anchors: {
         type: Array // [{id:'',label:''}]
      },
      top: String,
      right: {
         type: String,
         default: "74px"
      },
      rootIdOrClass: {
         type: String,
         default: "app-main"
      },
      rootMargin: {
         type: String,
         default: "-10px 0px 0px 0px"
      }
   },
   data() {
      return {
         currentAnchorIndex: 0,
         isUserClick: false
      };
   },
   mounted() {
      intersectionObserver = new IntersectionObserver(
         (entries) => {
            if (entries.length === 1) {
               if (
                  entries[0].intersectionRatio >= 0 &&
                  entries[0].boundingClientRect.y < 100
               ) {
                  this.currentAnchorIndex = this.anchors.findIndex(
                     (a) => a.id === entries[0].target.id
                  );
               }
            } else {
               if (this.isUserClick) {
                  this.isUserClick = false;
                  return;
               }

               if (!this.isUserClick) {
                  const yes = entries.map((e) => e.boundingClientRect.y);
                  const minY = Math.min(...yes);
                  if (!isNaN(minY) && minY < 100) {
                     this.currentAnchorIndex = this.anchors.findIndex(
                        (a) =>
                           a.id ===
                           entries.find((e) => e.boundingClientRect.y === minY)
                              .target.id
                     );
                  }
               }
            }
         },
         {
            root:
               document.getElementById(this.rootIdOrClass) ??
               document.getElementsByClassName(this.rootIdOrClass)[0],
            rootMargin: this.rootMargin,
            threshold: 0.1
         }
      );

      for (let i = 0, len = this.anchors.length; i < len; i++) {
         intersectionObserver.observe(
            document.getElementById(this.anchors[i].id)
         );
      }
   },
   unmounted() {
      intersectionObserver.disconnect();
   },
   methods: {
      handleClick(index, id) {
         this.isUserClick = true;
         this.currentAnchorIndex = index;

         document.getElementById(id).scrollIntoView({
            behavior: "smooth",
            block: "start"
         });
      }
   }
};
</script>

<style lang="less" scoped>
@import "@/Assets/Style/Variables.less";
.anchor-wrapper {
   width: 121px;
   height: 100%;
   margin-left: auto;
}
.anchor {
   position: fixed;
   top: v-bind(top);
   right: v-bind(right);
}
:deep(.el-timeline-item__tail),
:deep(.el-timeline-item__node) {
   display: none;
}
:deep(.is-active) {
   .el-timeline-item__content {
      color: @color-primary;
   }
}
</style>
