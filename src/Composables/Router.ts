/*
 * @Description: use route and router
 * @Author: 王占领
 * @Date: 2022-12-01 16:25:33
 * @LastEditTime: 2022-12-06 11:08:01
 * @LastEditors: 王占领
 */
import { computed, nextTick, unref } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { Ref } from "vue";

type MaybeRef<T> = T | Ref<T>;
type ReactiveRouteOptions = {
   /**
    * Mode to update the router query, ref is also acceptable
    *
    * @default 'replace'
    */
   mode?: MaybeRef<"replace" | "push">;

   /**
    * Route instance, use `useRoute()` if not given
    */
   route?: ReturnType<typeof useRoute>;

   /**
    * Router instance, use `useRouter()` if not given
    */
   router?: ReturnType<typeof useRouter>;
};

export function useRouteQuery(name: string): Ref<string>;
export function useRouteQuery(name: string): Ref<null | string | string[]>;
export function useRouteQuery<
   T extends null | undefined | string | string[] = null | string | string[]
>(name: string, defaultValue?: T, options?: ReactiveRouteOptions): Ref<T>;
export function useRouteQuery<T extends string | string[]>(
   name: string,
   defaultValue?: T,
   {
      mode = "replace",
      route = useRoute(),
      router = useRouter()
   }: ReactiveRouteOptions = {}
) {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   return computed<any>({
      get() {
         const data = route.query[name];
         if (data == null) return defaultValue ?? null;
         if (Array.isArray(data)) return data.filter(Boolean);
         return data;
      },
      set(v) {
         nextTick(() => {
            router[unref(mode)]({
               ...route,
               query: {
                  ...route.query,
                  [name]: v === defaultValue || v === null ? undefined : v
               }
            });
         });
      }
   });
}
