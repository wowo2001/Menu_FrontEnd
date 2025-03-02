import { createRouter, createWebHashHistory } from 'vue-router';
import PlanPage from '../views/PlanPage.vue';
import ElPlanPage from '../views/Plan/PlanPage.vue';
import ReviewPage from '../views/ReviewPage.vue';
import MiscellaneousPage from '../views/MiscellaneousPage.vue';
import MenuPage from '../views/MenuPage.vue';
import IngredientManagementPage from '../views/IngredientManagementPage.vue';
import Login from '../components/login.vue'
import store from '../store/';


const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/plan',
        name: 'PlanPage',
        component: PlanPage,
        meta: { requiresAuth: true } 
    },
    {
        path: '/elplan',
        name: 'ElPlanPage',
        component: ElPlanPage,
        meta: { requiresAuth: true } 
    },
    {
        path: '/review',
        name: 'ReviewPage',
        component: ReviewPage,
        meta: { requiresAuth: true } 
    },
    {
        path: '/miscellaneous',
        name: 'MiscellaneousPage',
        component: MiscellaneousPage,
        meta: { requiresAuth: true } 
    },
    {
        path: '/menu',
        name: 'MenuPage',
        component: MenuPage,
        meta: { requiresAuth: true } 
    },
    {
        path: '/ingredientManagement',
        name: 'IngredientManagementPage',
        component: IngredientManagementPage,
        meta: { requiresAuth: true } 
    },
    {
        path: '/',  
        redirect: '/login',  // Redirect to login by default
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // Check if the route requires authentication

    if (to.meta.requiresAuth) {
        // You can check if the user is authenticated here, for example by checking a Vuex store or a token in localStorage
        const isAuthenticated = store.state.isAuthenticated || localStorage.getItem('authToken'); // Adjust as needed

        if (!isAuthenticated) {
            // If not authenticated, redirect to login page
            next('/login');
        } else {
            next(); // Proceed to the route
        }
    } else {
        next(); // If no authentication is required, just continue
    }
});

export default router;
