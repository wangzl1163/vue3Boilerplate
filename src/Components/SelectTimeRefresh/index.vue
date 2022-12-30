<template>
   <div class="select-refresh" :style="style">
      <el-select
         v-model="selectedTime"
         class="select-time"
         @change="handleChange"
      >
         <el-option
            v-for="option in shortcutOptions"
            :key="option.value"
            :value="option.value"
            :label="option.label"
         >
         </el-option>
      </el-select>
      <div
         v-if="showRefresh"
         ref="refreshIcon"
         class="refresh"
         @click="handleClick"
      >
         <svg-icon icon="shuaxin" className="refresh-icon"></svg-icon>
      </div>
      <slot></slot>
   </div>
</template>

<script>
import { FunctionTools } from "@/Utils/Tools";

export default {
   data() {
      return {
         options: [
            {
               id: "5m",
               label: "最近5分钟",
               value: 300000 // 单位：毫秒
            },
            {
               id: "15m",
               label: "最近15分钟",
               value: 900000
            },
            {
               id: "30m",
               label: "最近30分钟",
               value: 1800000
            },
            {
               id: "1h",
               label: "最近1小时",
               value: 3600000
            },
            {
               id: "3h",
               label: "最近3小时",
               value: 10800000
            },
            {
               id: "6h",
               label: "最近6小时",
               value: 21600000
            },
            {
               id: "12h",
               label: "最近12小时",
               value: 43200000
            },
            {
               id: "24h",
               label: "最近24小时",
               value: 86400000
            }
         ],
         selectedTime: this.modelValue
      };
   },
   props: {
      modelValue: {
         type: [Number, null],
         default: 3600000
      },
      showRefresh: {
         type: Boolean,
         default: true
      },
      blackList: {
         // 逗号分割
         type: String,
         default: ""
      },
      width: {
         type: [String, Number],
         default: "180px"
      }
   },
   computed: {
      shortcutOptions() {
         if (!this.blackList) {
            return this.options;
         }

         return this.options.filter((op) => {
            return !this.blackList.includes(op.id);
         });
      },
      style() {
         return {
            width:
               typeof this.width === "string" ? this.width : this.width + "px"
         };
      }
   },
   watch: {
      modelValue(val) {
         if ((val && val !== this.selectedTime) || val === null) {
            if (this.shortcutOptions.some((s) => s.value === val)) {
               this.selectedTime = val;
            } else {
               this.selectedTime = null;
            }
         }
      }
   },
   methods: {
      handleChange() {
         this.dispatchEvent();
      },
      handleClick: FunctionTools.debounce(function () {
         this.dispatchEvent();
      }, 1000),
      dispatchEvent() {
         this.$emit("refresh", this.selectedTime);
      }
   }
};
</script>
<style lang="less" scoped>
@import "@/Assets/Style/Variables.less";
.select-refresh {
   display: flex;
   justify-content: space-between;
   align-items: center;
   min-width: 180px;
}
.select-time {
   width: 128px;
}
.refresh {
   width: 40px;
   height: 32px;
   line-height: 28px;
   text-align: center;
   color: @icon-color-primary;
   background: @color-primary;
   border-radius: 4px;
   border: 1px solid @color-primary;
   cursor: pointer;
}
.refresh-icon {
   font-size: 14px;
   color: #99ccff;
}
</style>
