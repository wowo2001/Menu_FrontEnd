import { createRouter, createWebHistory } from 'vue-router';
import PlanPage from '../views/PlanPage.vue';
import ReviewPage from '../views/ReviewPage.vue';
import MiscellaneousPage from '../views/MiscellaneousPage.vue';


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
    {
        path: '/miscellaneous',
        name: 'MiscellaneousPage',
        component: MiscellaneousPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
