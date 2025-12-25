import { createRouter, createWebHistory } from "vue-router";
import CategoriesPage from "../pages/CategoriesPage.vue";
import HomePage from "../pages/HomePage.vue";
import PostsPage from "../pages/PostsPage.vue";
import CreatePostPage from "../pages/CreatePostPage.vue";
import UpdatePostPage from "../pages/UpdatePostPage.vue";
import CreateCategoryPage from "../pages/CreateCategoryPage.vue";
import EditCategoryPage from "../pages/EditCategoryPage.vue";
import PostDetailsPage from "../pages/PostDetailsPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/categories", name: "categories", component: CategoriesPage },
  {
    path: "/categories/create",
    name: "create-category",
    component: CreateCategoryPage,
  },
  {
    path: "/categories/edit/:id",
    name: "edit-category",
    component: EditCategoryPage,
    props: true,
  },
  { path: "/posts", name: "posts", component: PostsPage },
  {
    path: "/posts/create",
    component: CreatePostPage,
  },
  {
    path: "/posts/:slug",
    name: "post-details",
    component: PostDetailsPage,
    props: true,
  },
  {
    path: "/posts/edit/:slug",
    name: "edit-post",
    component: UpdatePostPage,
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
