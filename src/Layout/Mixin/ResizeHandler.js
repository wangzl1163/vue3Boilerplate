/*
 * @Description  :
 * @Author       : 王占领
 * @Date         : 2022-02-25 13:56:40
 * @LastEditTime: 2022-12-23 17:46:12
 * @LastEditors: 王占领
 */
import { useAppStore } from "@/Stores";
import settings from "@/Settings";

const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design

export default {
   watch: {
      $route() {
         const store = useAppStore();
         if (this.device === "mobile" && this.sidebar.opened) {
            store.closeSideBar({ withoutAnimation: false });
         }
      }
   },
   beforeMount() {
      window.addEventListener("resize", this.$_resizeHandler);
   },
   beforeUnmount() {
      window.removeEventListener("resize", this.$_resizeHandler);
   },
   mounted() {
      const store = useAppStore();
      const isMobile = this.$_isMobile();
      if (isMobile) {
         store.toggleDevice("mobile");
         store.closeSideBar({ withoutAnimation: true });
      }
   },
   methods: {
      // use $_ for mixins properties
      // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
      $_isMobile() {
         const rect = body.getBoundingClientRect();
         return rect.width - 1 < WIDTH;
      },
      $_resizeHandler() {
         if (!document.hidden) {
            const store = useAppStore();
            const isMobile = this.$_isMobile();
            store.toggleDevice(isMobile ? "mobile" : "desktop");

            if (isMobile) {
               store.closeSideBar({ withoutAnimation: true });
            } else if (
               body.getBoundingClientRect().width <=
               settings.sidebarOpenedMinWidth
            ) {
               store.toggleSideBar();
            }
         }
      }
   }
};
