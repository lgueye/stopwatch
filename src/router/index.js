import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView";
import MainStoryView from "@/views/MainStoryView";
import ExtensionView from "@/views/ExtensionView";
import ProgressView from "@/views/ProgressView";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
    },
    {
      path: "/main-story",
      name: "MainStoryView",
      component: MainStoryView,
    },
    {
      path: "/extension",
      name: "ExtensionView",
      component: ExtensionView,
    },
    {
      path: "/progress",
      name: "ProgressView",
      component: ProgressView,
    },
  ],
});

export default router;
