/*
 * @Description:
 * @Author: 王占领
 * @Date: 2022-12-21 11:15:21
 * @LastEditTime: 2022-12-23 17:28:00
 * @LastEditors: 王占领
 */

import { mapState } from "pinia";
import { useAppStore } from "@/Stores";

export default {
   computed: {
      ...mapState(useAppStore, ["device"])
   },
   mounted() {
      // In order to fix the click on menu on the ios device will trigger the mouseleave bug
      this.fixBugIniOS();
   },
   methods: {
      fixBugIniOS() {
         const $subMenu = this.$refs.subMenu;
         if ($subMenu) {
            const handleMouseleave = $subMenu.handleMouseleave;
            $subMenu.handleMouseleave = (e) => {
               if (this.device === "mobile") {
                  return;
               }
               handleMouseleave(e);
            };
         }
      }
   } as ThisType<{
      device: string;
      $refs: Record<
         string,
         {
            handleMouseleave: (e: Event) => void;
         }
      >;
   }>
} as ThisType<{
   fixBugIniOS: () => void;
   methods: {
      device: string;
      $refs: Record<string, string>;
   };
}>;
