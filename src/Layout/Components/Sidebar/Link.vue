<!--
 * @Description  : 
 * @Author       : 王占领
 * @Date         : 2022-02-25 13:56:40
 * @LastEditTime : 2022-03-02 11:05:33
 * @LastEditors  : 王占领
-->
<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/Utils/Validate'

export default {
   props: {
      to: {
         type: String,
         required: true
      }
   },
   computed: {
      isExternal () {
         return isExternal(this.to)
      },
      type () {
         if (this.isExternal) {
            return 'a'
         }
         return 'router-link'
      }
   },
   methods: {
      linkProps (to) {
         if (this.isExternal) {
            return {
               href: to,
               target: '_blank',
               rel: 'noopener'
            }
         }
         return {
            to: to
         }
      }
   }
}
</script>
