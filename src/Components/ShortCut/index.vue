// 时间快捷选项
<template>
   <div class="short-cut">
      <div class="short-cut--radio">
         <el-radio-group v-model="tab" @change="radioChange">
            <el-radio-button label="0">今日</el-radio-button>
            <el-radio-button label="3">近三日</el-radio-button>
            <el-radio-button label="7">近七日</el-radio-button>
            <!-- <el-radio-button label="30">本月</el-radio-button> -->
            <!-- <el-radio-button label="90">最近90天</el-radio-button> -->
         </el-radio-group>
      </div>
      <div class="short-cut--picker">
         <el-date-picker
            class="short-cut--picker_date"
            v-model="datePickerValue"
            type="daterange"
            value-format="YYYY-MM-DD"
            :picker-options="{ disabledDate: disableDate }"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="pickerChange"
         />
      </div>
   </div>
</template>

<script>
import moment from "moment";

export default {
   props: {
      modelValue: {
         type: Array,
         default: () => []
      },
      dateTab: {
         type: String,
         default: "0"
      },
      colValue: {
         type: Number
      },
      colValueInput: {
         type: Number
      }
   },
   emits: ["update:modelValue", "change"],
   data() {
      return {
         tab: this.dateTab,
         datePickerValue: null
      };
   },
   watch: {
      tab(value) {
         this.$_handleValueUpdate(value);
      }
   },

   methods: {
      // 禁用今天及以后的日期
      disableDate(date) {
         const curDate = new Date();
         curDate.setHours(0, 0, 0, 0);

         return date >= curDate.getTime();
      },
      radioChange() {
         this.datePickerValue = null;
      },
      pickerChange() {
         this.tab = "";
         this.$_handleValueUpdate(this.tab);
      },
      $_handleValueUpdate(radioShortCut) {
         let res = [];

         if (radioShortCut) {
            const subtractValue = {
               0: 0,
               3: 3,
               7: 7,
               30: 30,
               90: 90
            };

            res = [
               moment()
                  .subtract(subtractValue[radioShortCut], "days")
                  .format("yyyy-MM-DD"),
               moment().subtract(0, "days").format("yyyy-MM-DD")
            ];
         } else {
            res = this.datePickerValue;
         }

         this.$emit("update:modelValue", res);
         // 对外暴露一个change事件
         this.$emit("change", res);
      }
   }
};
</script>
<style lang="less" scoped>
@import "@/Assets/Style/Variables.less";
.short-cut {
   width: 650px;
   height: auto;
   display: flex;
   justify-content: space-between;
   align-items: center;
}

.short-cut--radio {
   width: 280px;
   :deep(.el-radio-group) {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .el-radio-button > .el-radio-button__inner {
         border-radius: 4px !important;
         padding: 8px 25px;
      }
   }
}
.short-cut--picker {
   width: 350px;

   & > .short-cut--picker_date {
      width: 100%;
      height: 32px;
   }

   :deep(.el-date-editor) {
      background-color: @color-white;
   }
   :deep(.el-date-editor .el-range__icon),
   :deep(.el-date-editor .el-range-separator),
   :deep(.el-date-editor .el-range__close-icon) {
      line-height: 24px;
   }
}
</style>
