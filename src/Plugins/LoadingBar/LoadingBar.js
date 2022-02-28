/*
 * @Description  : loading bar
 * @Author       : 王占领
 * @Date         : 2022-02-23 15:17:30
 * @LastEditTime : 2022-02-23 16:53:19
 * @LastEditors  : 王占领
 */
import LoadingBar from './LoadingBar.vue'
import {createApp, h} from 'vue'

LoadingBar.newInstance = properties => {
   const _props = () => properties || {}
   const container = document.createElement('div')
   const Instance = createVNode(LoadingBar, _props)

   render(Instance, container)
   document.body.appendChild(container.firstElementChild)
   
   const loading_bar = Instance.component

   return {
      update (options) {
         if ('percent' in options) {
            loading_bar.percent = options.percent
         }
         if (options.status) {
            loading_bar.status = options.status
         }
         if ('show' in options) {
            loading_bar.show = options.show
         }
      },
      component: loading_bar,
      destroy () {
         document.body.removeChild(document.getElementsByClassName('loading-bar')[0])
      }
   }
}

export default LoadingBar
