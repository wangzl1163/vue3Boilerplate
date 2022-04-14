import LoadingBar from "./LoadingBar.vue";
import { createVNode, render } from "vue";

LoadingBar.newInstance = (properties) => {
   const _props = (() => properties || {})();
   const container = document.createElement("div");
   const Instance = createVNode(LoadingBar, _props);

   render(Instance, container);
   document.body.appendChild(container.firstElementChild);

   const loading_bar = Instance.component;

   return {
      update(options) {
         if ("percent" in options) {
            loading_bar.proxy.percent = options.percent;
         }
         if (options.status) {
            loading_bar.proxy.status = options.status;
         }
         if ("show" in options) {
            loading_bar.proxy.show = options.show;
         }
      },
      component: loading_bar,
      destroy() {
         Instance.props.onDestroy = () => {
            render(null, container);
         };
         document.body.removeChild(
            document.getElementsByClassName("loading-bar")[0]
         );
      }
   };
};

export default LoadingBar;
