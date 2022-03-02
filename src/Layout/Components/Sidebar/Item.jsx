import { defineComponent } from 'vue';
import {SvgIcon} from '@/Components/index.js';

export default defineComponent({
   name: 'MenuItem',
   props: {
      icon: {
         type: String,
         default: ''
      },
      title: {
         type: String,
         default: ''
      }
   },
   render () {
      const { icon, title } = this.$props
      const vNodes = []

      if (icon) {
         vNodes.push(<SvgIcon icon-class={icon}/>)
      }

      if (title) {
         vNodes.push(<span slot='title'>{(title)}</span>)
      }
      
      return vNodes
   }
})

