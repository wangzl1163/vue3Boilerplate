import { createRouter, createWebHistory } from "vue-router";
import routes from "./Modules";

const router = createRouter({
   history: createWebHistory(),
   routes: routes
});

export default router;
