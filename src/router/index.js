import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue'
import ReservationsPage from "@/pages/ReservationsPage.vue";




const routes = [
    { path: '/', name: 'home', component: HomePage },
    { path: '/reservations', name: 'reservations', component: ReservationsPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;