import { createRouter, createWebHistory } from 'vue-router';
import PlanPage from '../views/PlanPage.vue';
import ReviewPage from '../views/ReviewPage.vue';


const routes = [
    {
        path: '/plan',
        name: 'PlanPage',
        component: PlanPage,
    },
    {
        path: '/review',
        name: 'ReviewPage',
        component: ReviewPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
