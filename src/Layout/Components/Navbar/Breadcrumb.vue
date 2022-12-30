<template>
   <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
         <el-breadcrumb-item
            v-for="(item, index) in levelList"
            :key="item.path"
         >
            <span v-if="index === levelList.length - 1" class="no-redirect">
               {{ item.meta.title }}
            </span>
            <a v-else-if="item.redirect === 'noRedirect'">{{
               item.meta.title
            }}</a>
            <a v-else @click.prevent="handleLink(item)">{{
               item.meta.title
            }}</a>
            <!-- <span v-if="item.redirect==='noRedirect'||index===levelList.length-1" @click.prevent="handleLink(item)">{{ item.meta.title }}</span> -->
         </el-breadcrumb-item>
      </transition-group>
   </el-breadcrumb>
</template>

<script>
export default {
   name: "Breadcrumb",
   data() {
      return {
         levelList: null
      };
   },
   watch: {
      $route(route) {
         // if you go to the redirect page, do not update the breadcrumbs
         if (route.path.startsWith("/redirect/")) {
            return;
         }
         this.getBreadcrumb();
      }
   },
   created() {
      this.getBreadcrumb();
   },
   methods: {
      getBreadcrumb() {
         // only show routes with meta.title
         let matched = this.$route.matched.filter(
            (item) => item.meta && item.meta.title
         );
         const first = matched[0];

         // if (!this.isDashboard(first)) {
         //    matched = [{ path: '/index', meta: { title: '首页' } }].concat(matched)
         // }

         this.levelList = matched.filter(
            (item) =>
               item.meta && item.meta.title && item.meta.breadcrumb !== false
         );
      },
      isDashboard(route) {
         const name = route && route.name;
         if (!name) {
            return false;
         }
         return name.trim() === "首页";
      },
      pathCompile(item) {
         const { query, params, path } = item;

         if (query) {
            return { path, query: query };
         }

         if (params) {
            return { path, params };
         }

         return { path };
      },
      handleLink(item) {
         const { redirect } = item;
         if (redirect) {
            redirect !== this.$route.name &&
               redirect !== this.$route.path &&
               this.$router.push(
                  typeof redirect === "function" ? redirect(item) : redirect
               );
            return;
         }

         this.$router.push(this.pathCompile(item));
      }
   }
};
</script>

<style lang="less" scoped>
@import "@/Assets/Style/Variables.less";
.app-breadcrumb.el-breadcrumb {
   display: inline-block;
   font-size: @font-size-base;
   line-height: @navbar-height;
   margin-left: @gutter;

   .no-redirect {
      color: @text-color-placeholder;
      cursor: text;
   }

   a {
      color: @text-color-primary;
   }
}
</style>
