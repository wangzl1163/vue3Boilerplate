<!--
 * @Description  : 
 * @Author       : 王占领
 * @Date         : 2022-02-28 15:13:10
 * @LastEditTime : 2022-05-06 15:24:05
 * @LastEditors  : 王占领
-->
<script>
import { h } from "vue";
import Horizontal from "./Horizontal.vue";
import Vertical from "./Vertical.vue";

export default {
   props: {
      direction: {
         // 分割线方向 可选值：horizontal / vertical
         type: String,
         default: "horizontal"
      },
      contentPosition: {
         // 分割线文案的位置 可选值：left / right / center
         type: String,
         default: "center"
      },
      hasMargin: {
         type: Boolean,
         default: false
      },
      styles: {
         type: Object,
         default: () => undefined
      }
   },
   render() {
      const horizontal = h(Horizontal, {
         contentPosition: this.contentPosition,
         styles: this.styles,
         hasMargin: this.hasMargin
      });

      const vertical = h(Vertical, {
         contentPosition: this.contentPosition
      });

      return this.direction === "horizontal" ? horizontal : vertical;
   }
};
</script>
