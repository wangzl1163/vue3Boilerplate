<template>
   <div>
      <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" />
   </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
   name: 'Screenfull',
   data () {
      return {
         isFullscreen: false
      }
   },
   mounted () {
      this.init()
   },
   beforeDestroy () {
      this.destroy()
   },
   methods: {
      click () {
         if (!screenfull.isEnabled) {
            this.$message({
               message: '你的浏览器当前版本不支持，请升级或更换浏览器后重试',
               type: 'warning'
            })
            return false
         }
         
         screenfull.toggle()
      },
      change () {
         this.isFullscreen = screenfull.isFullscreen
      },
      init () {
         if (screenfull.enabled) {
            screenfull.on('change', this.change)
         }
      },
      destroy () {
         if (screenfull.enabled) {
            screenfull.off('change', this.change)
         }
      }
   }
}
</script>

<style scoped>
.screenfull-svg {
   display: inline-block;
   cursor: pointer;
   fill: #5a5e66;
   width: 20px;
   height: 20px;
   vertical-align: 10px;
}
</style>
