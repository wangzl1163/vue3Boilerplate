/*
 * @Description:
 * @Author: 王占领
 * @Date: 2022-12-21 11:15:21
 * @LastEditTime: 2022-12-28 17:20:21
 * @LastEditors: 王占领
 */
import { defineComponent } from "vue";

export default defineComponent({
   name: "BeRemove",
   props: {
      size: {
         type: String
      },
      style: {
         type: Object
      }
   },
   render() {
      return (
         <el-icon
            style={{
               position: "absolute",
               top: "10px",
               right: "-20px",
               cursor: "pointer",
               color: "inherit",
               fontSize: this.size ?? "14px",
               ...this.style
            }}
         >
            <remove />
         </el-icon>
      );
   }
});
