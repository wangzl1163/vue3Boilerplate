import { inject } from "vue";

export default function useGlobal(key = "globalProperties") {
   return inject(key);
}
