import { defineStore } from "pinia";
import { TAGS_VIEW_STORE_KEY } from "../StoreKeys";

type TagView = {
   fullPath: string;
   hash: string;
   meta: Record<string, string>;
   name: string;
   path: string;
   params: Record<string, string>;
   query: Record<string, string>;
   title: string;
};

export const useTagsViewStore = defineStore(TAGS_VIEW_STORE_KEY, {
   state: () => ({
      visitedViews: [] as TagView[],
      cachedViews: [] as string[]
   }),
   actions: {
      addView(view: TagView) {
         this.addVisitedView(view);
         this.addCachedView(view);
      },
      addVisitedView(view: TagView) {
         if (this.visitedViews.some((v) => v.path === view.path)) return;

         this.visitedViews.push({
            fullPath: view.fullPath,
            hash: view.hash || "",
            meta: view.meta,
            name: view.name,
            path: view.path,
            params: view.params,
            query: view.query,
            title: view.meta.title || "no-name"
         });
      },
      addCachedView(view: TagView) {
         if (this.cachedViews.includes(view.name)) return;
         if (!view.meta.noCache) {
            this.cachedViews.push(view.name);
         }
      },
      delView(view: TagView) {
         return new Promise((resolve) => {
            this.delVisitedView(view);
            this.delCachedView(view);

            resolve({
               visitedViews: [...this.visitedViews],
               cachedViews: [...this.cachedViews]
            });
         });
      },
      delVisitedView(view: TagView) {
         return new Promise((resolve) => {
            for (const [i, v] of this.visitedViews.entries()) {
               if (v.path === view.path) {
                  this.visitedViews.splice(i, 1);
                  break;
               }
            }
            resolve([...this.visitedViews]);
         });
      },
      delCachedView(view: TagView) {
         return new Promise((resolve) => {
            const index = this.cachedViews.indexOf(view.name);
            index > -1 && this.cachedViews.splice(index, 1);
            resolve([...this.cachedViews]);
         });
      },
      delOthersViews(view: TagView) {
         return new Promise((resolve) => {
            this.delOthersVisitedViews(view);
            this.delOthersCachedViews(view);
            resolve({
               visitedViews: [...this.visitedViews],
               cachedViews: [...this.cachedViews]
            });
         });
      },
      delOthersVisitedViews(view: TagView) {
         return new Promise((resolve) => {
            this.visitedViews = this.visitedViews.filter((v) => {
               return v.meta.affix || v.path === view.path;
            });
            resolve([...this.visitedViews]);
         });
      },
      delOthersCachedViews(view: TagView) {
         return new Promise((resolve) => {
            const index = this.cachedViews.indexOf(view.name);
            if (index > -1) {
               this.cachedViews = this.cachedViews.slice(index, index + 1);
            } else {
               this.cachedViews = [];
            }
            resolve([...this.cachedViews]);
         });
      },

      delAllViews(view: TagView) {
         return new Promise((resolve) => {
            this.delAllVisitedViews();
            this.delAllCachedViews();
            resolve({
               visitedViews: [...this.visitedViews],
               cachedViews: [...this.cachedViews]
            });
         });
      },
      delAllVisitedViews() {
         return new Promise((resolve) => {
            const affixTags = this.visitedViews.filter((tag) => tag.meta.affix);
            this.visitedViews = affixTags;
            resolve([...this.visitedViews]);
         });
      },
      delAllCachedViews() {
         return new Promise((resolve) => {
            this.cachedViews = [];
            resolve([...this.cachedViews]);
         });
      },
      updateVisitedView(view: TagView) {
         for (let v of this.visitedViews) {
            if (v.path === view.path) {
               v = Object.assign(v, view);
               break;
            }
         }
      }
   }
});
