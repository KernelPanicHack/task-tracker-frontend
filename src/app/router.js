import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/components/MainPage.vue';
import NotFound from '@/components/NotFound.vue';
import AuthPage from '@/components/AuthPage.vue';

const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
};

const routes = [
    { path: '/', redirect: '/auth' },
    { path: '/auth', name: 'AuthPage', component: AuthPage },
    { path: '/main', name: 'MainPage', component: MainPage },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // Если пользователь не авторизован и пытается получить доступ к MainPage
    if (to.name === 'MainPage' && !isAuthenticated()) {
        next({ name: 'AuthPage' }); // Перенаправить на страницу авторизации
    } else if (to.name === 'AuthPage' && isAuthenticated()) {
        // Если пользователь уже авторизован и пытается получить доступ к AuthPage
        next({ name: 'MainPage' }); // Перенаправить на главную страницу
    } else {
        next(); // Продолжить навигацию
    }
});

export default router;
