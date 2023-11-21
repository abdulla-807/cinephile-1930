import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home, name: 'home' },
        { path: '/tv', component: ()=> import('./pages/Serials.vue'), name: 'tvs' },
        { path: '/tv/:id', component: ()=> import('./pages/SerialId.vue'), name: 'tvId' },
        { path: '/movie', component: ()=> import('./pages/Films.vue'), name: 'movies' },
        { path: '/movie/:id', component: ()=> import('./pages/FilmId.vue'), name: 'movieId' },
        { path: '/search', component: ()=> import('./pages/Search.vue'), name: 'search' },
    ],
    linkActiveClass: 'active',
    scrollBehavior(){
        return {top: 0}
    }
})

export default router;