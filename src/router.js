import Vue from "vue";
import VueRouter from "vue-router";
import TokenService from './services/TokenService'

Vue.use(VueRouter);

const routes = [
    {
        path: '/admin',
        name: 'admin',
        redirect: { name: 'Dashboard'},
        component: ()=> import('./components/admin/MainDashboardLayout'),
        children: [
            {
                path: '/',
                name: 'Dashboard',
                component: ()=> import('./views/admin/Dashboard')
            },
            {
                path: 'computer',
                component: ()=>import('./views/computer/index.vue'),
                children: [
                    {
                        path: '/',
                        name: 'BlogIndex',
                        component: ()=>import('./views/computer/pages/index.vue')
                    },
                    {
                        path: 'add',
                        name: 'BlogAdd',
                        component: ()=>import('./views/computer/pages/BlogAddEdit')
                    },
                    {
                        path: ':id',
                        name: 'BlogEdit',
                        component: ()=>import('./views/computer/pages/BlogAddEdit')
                    }
                ]
            },
            {
                path: 'book',
                component: ()=>import('./views/book/index.vue'),
                children: [
                    {
                        path: '/',
                        name: 'BlogIndex',
                        component: ()=>import('./views/book/pages/index.vue')
                    },
                    {
                        path: 'add',
                        name: 'BlogAdd',
                        component: ()=>import('./views/book/pages/BlogAddEdit')
                    },
                    {
                        path: ':id',
                        name: 'BlogEdit',
                        component: ()=>import('./views/book/pages/BlogAddEdit')
                    }
                ]
            }
        ]
    },
    {
        path: '/register',
        name: 'register',
        component: ()=>import('./views/admin/Register')
    },
    {
        path: '/login',
        name: 'login',
        component: ()=>import('./views/admin/Login')
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to,from,next)=>{
    if(TokenService.getToken()){
        if(to.path === '/login' || to.path === '/register'){
            next({path: '/admin'})
        }
        else next();
    }else{
        if(
            to.path === "/login"||
            to.path === "/register"||
            to.path === "/"
        ){
            next();
        }
        else{
            next('/login')
        }
    }
})

export default router;