import { createRouter, createWebHistory } from "vue-router";
import CategoriesPage from "../pages/CategoriesPage.vue";
import HomePage from "../pages/HomePage.vue";
import PostsPage from "../pages/PostsPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/categories", component: CategoriesPage },
  { path: "/posts", component: PostsPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
