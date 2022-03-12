import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Unauthorized from '@/views/Unauthorized.vue'
import NotExists from '@/views/NotExists.vue'
import LanguageIndex from '@/views/Languages/index.vue'
import LanguageCreate from '@/views/Languages/create.vue'
import LanguageEdit from '@/views/Languages/edit.vue'
import store from '@/store'
import {computed} from 'vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta:{
            requiresAuth:true
        }
    },
    {name: 'login', path: '/login', component: Login},
    {path: '/register', component: Register},
    {name: 'unauthorized', path : '/401', component: Unauthorized},
    {
        name:'notexists', 
        path : '/404',
        component: NotExists
    },
    {   
        name: 'languages.index', 
        path: '/languages', 
        component: LanguageIndex,
        beforeEnter: async (to, from, next) => {
            
            const result = await store.dispatch("canAllow",to.name);
            //await console.log("En turoa lo asdtenasd "+result);
            !result ? next({ name: 'unauthorized' }) : next();
        }
    },
    {
        name: 'languages.create', 
        path: '/languages/create', 
        component: LanguageCreate,
        beforeEnter: async (to, from, next) => {
            const result = await store.dispatch("canAllow",to.name);
            !result ? next({ name: 'unauthorized' }) : next();
        }
    },
    {   
        name: 'languages.edit', 
        path : '/languages/edit:id', 
        component: LanguageEdit,
        beforeEnter: async (to, from, next) => {
            const result = await store.dispatch("canAllow",to.name);
            !result ? next({ name: 'unauthorized' }) : next();
        }  
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach( (to,from,next) =>{
    /*if(to.matched.some(route =>route.meta.requiresAuth)){
        console.log(store.state.authenticated);
        if(!store.state.authenticated){
            next('/login')
        }else{
            next()
        }
    }else{
        next()
    }*/
    if( to.matched.length > 0){
        next()

     }else{
         next('/404')

     }
})

export default router