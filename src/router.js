import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import UserCreate from '@/components/User/Create';
import UserIndex from '@/components/User/Index';
import UserEdit from '@/components/User/Edit';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/users',
            name: 'user.index',
            component: UserIndex
        },
        {
            path: '/users/create',
            name: 'user.create',
            component: UserCreate
        },
        {
            path: '/users/:id/edit',
            name: 'user.edit',
            component: UserEdit
        }
    ]
});
