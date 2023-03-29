import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import MainPage from '@/pages/MainPage';
import ProductPage from '@/pages/ProductPage'
import CartPage from '@/pages/CartPage'
import OrderPage from "@/pages/OrderPage.vue";
import OrderInfoPage from "@/pages/OrderInfoPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const routes = [
  {
    path: '/',
    name: 'mainpage',
    component: MainPage,
  },
  {
    path: '/product/:id',
    name: 'productpage',
    component: ProductPage,
  },
  {
    name: 'order',
    component: OrderPage,
    path: '/order'},
  {
    name: 'orderInfo',
    component: OrderInfoPage,
    path: '/order/:id'},

  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFoundPage
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
