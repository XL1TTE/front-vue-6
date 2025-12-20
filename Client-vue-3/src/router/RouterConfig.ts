import {createRouter, createWebHistory} from 'vue-router'
import CategoriesPage from "../pages/CategoriesPage.vue";
import HomePage from "../pages/HomePage.vue";

const routes = [
    { path: '/', component: HomePage },
    { path: '/categories', component: CategoriesPage },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})