/*
 * @Description  :
 * @Author       : 王占领
 * @Date         : 2022-02-25 13:56:40
 * @LastEditTime: 2022-12-28 17:17:34
 * @LastEditors: 王占领
 */
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useAppStore } from "@/Stores";

export default defineComponent({
   name: "MenuItem",
   props: {
      icon: {
         type: String,
         default: ""
      },
      title: {
         type: String,
         default: ""
      },
      path: {
         type: String,
         default: ""
      },
      redirect: {
         type: String,
         default: ""
      }
   },
   computed: {
      ...mapState(useAppStore, ["sidebar"]),
      isCollapse() {
         return !this.sidebar.opened;
      }
   },
   render() {
      const { icon, title, path } = this.$props;
      const vNodes = [];

      if (icon) {
         if (!(this.isCollapse && icon === "menu-item")) {
            if (
               this.$route.matched.some(
                  (m) => m.path === path && m.path !== this.$route.path
               ) &&
               path !== this.$route.path &&
               this.redirect !== this.$route.path
            ) {
               vNodes.push(<svg-icon icon={icon + "-active"} />);
            } else {
               vNodes.push(<svg-icon icon={icon} />);
            }
         }
      }

      if (title) {
         vNodes.push(<span>{title}</span>);
      }

      return vNodes;
   }
});
