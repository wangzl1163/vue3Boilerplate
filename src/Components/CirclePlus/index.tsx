/*
 * @Description  :
 * @Author       : 王占领
 * @Date         : 2022-02-28 15:13:10
 * @LastEditTime: 2022-12-28 17:21:10
 * @LastEditors: 王占领
 */
import { defineComponent } from "vue";

export default defineComponent({
   name: "BeCirclePlus",
   props: {
      size: {
         type: String
      },
      style: {
         type: Object
      }
   },
   computed: {
      iconStyle() {
         return {
            position: "absolute",
            top: "10px",
            right: "-20px",
            cursor: "pointer",
            color: "inherit",
            fontSize: this.size ?? "14px",
            ...this.style
         };
      }
   },
   render() {
      return (
         <el-icon style={this.iconStyle}>
            <circle-plus />
         </el-icon>
      );
   }
});
