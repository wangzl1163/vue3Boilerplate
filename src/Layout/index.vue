<!--
 * @Description  : layout
-->
<template>
   <div :class="classObj" class="app-wrapper">
      <div v-if="device==='mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar class="sidebar-container" />
      <div :class="{hasTagsView: tagsView}" class="main-container">
         <div :class="{'fixed-header': fixedHeader}">
            <navbar />
            <tags-view v-if="tagsView" />
         </div>
         <app-main />
      </div>
   </div>
</template>

<script>
import { AppMain, Navbar, Sidebar, TagsView } from './Components'
import ResizeMixin from './Mixin/ResizeHandler'
import { mapState, mapGetters } from 'vuex'

export default {
   name: 'Layout',
   components: {
      AppMain,
      Navbar,
      Sidebar,
      TagsView
   },
   mixins: [ResizeMixin],
   computed: {
      ...mapState({
         sidebar: state => state.app.sidebar,
         device: state => state.app.device
      }),
      ...mapGetters(['tagsView', 'fixedHeader']),
      classObj () {
         return {
            hideSidebar: !this.sidebar.opened,
            openSidebar: this.sidebar.opened,
            withoutAnimation: this.sidebar.withoutAnimation,
            mobile: this.device === 'mobile'
         }
      }
   },
   methods: {
      handleClickOutside () {
         this.$store.dispatch('closeSideBar', { withoutAnimation: false })
      }
   }
}
</script>

<style lang="less" scoped>
@import "@/Assets/Style/Mixin.less";
@import "@/Assets/Style/Variables.less";
.app-wrapper {
   .clearfix();
   position: relative;
   height: 100%;
   width: 100%;

   &.mobile.openSidebar {
      position: fixed;
      top: 0;
   }
}

.drawer-bg {
   background: #000;
   opacity: 0.3;
   width: 100%;
   top: 0;
   height: 100%;
   position: absolute;
   z-index: 999;
}

.main-container {
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: @sideBarWidth;
    position: relative;
}

.fixed-header {
   position: fixed;
   top: 0;
   right: 0;
   z-index: 9;
   width: calc(100% - @sideBarWidth);
   transition: width 0.28s;
}

.hideSidebar .fixed-header {
   width: calc(100% - 54px);
}

.mobile .fixed-header {
   width: 100%;
}
</style>
