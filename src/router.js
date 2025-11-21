import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import Transactions from '@/components/Transactions.vue';
import Categories from '@/components/Categories.vue';
import CreateCategory from "@/components/CreateCategory.vue";

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/categories',
    component: Categories,
  },
  {
    path: '/transactions',
    component: Transactions,
  },
  {
    path: '/createCategory',
    component: CreateCategory,
  },
];

const router = createRouter({
  history: createWebHistory(), // Используем режим истории HTML5
  routes, // Список маршрутов
});

export default router;
