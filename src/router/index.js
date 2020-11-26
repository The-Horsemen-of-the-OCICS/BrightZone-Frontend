import Vue from 'vue'
import VueRouter from 'vue-router'
import Campus from "../views/Campus.vue";
import ViewDeliverables from "@/components/ViewDeliverables";
import ViewSubmissions from "@/components/ViewSubmissions";
import ViewStudents from "@/components/ViewStudents";
import MyCampus from "@/components/MyCampus";
import EditDeliverables from "@/components/EditDeliverable";
import EvaluateSubmission from "@/components/EvaluateSubmission";

Vue.use(VueRouter)

const routes = [
    {
        path: '/campus',
        name: 'Virtual Campus',
        component: Campus,
        redirect: "/myCampus",
        children: [
            {
                path: "/myCampus",
                name: "My Campus",
                component: MyCampus
            },
            {
                path: "/editDeliverable",
                name: "Edit Deliverable",
                component: EditDeliverables
            },
            {
                path: "/viewDeliverables",
                name: "View Deliverable",
                component: ViewDeliverables
            },
            {
                path: "/viewSubmissions",
                name: "View Submissions",
                component: ViewSubmissions
            },
            {
                path: "/viewStudents",
                name: "View Students",
                component: ViewStudents
            },
            {
                path: "/evaluateSubmission",
                name: "Evaluate Submission",
                component: EvaluateSubmission
            },

        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/account/Login')
    },
    {
        path: '/',
        redirect: '/welcome'
    },
    {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/views/Welcome')
    },
    {
        path: '/mock/index',  // this page is only for development
        name: 'MockIndex',
        component: () => import('@/views/account/MockIndex')
    },
    {
        path: '/admin',
        component: () => import(/* webpackChunkName: "home" */ '@/views/admin/AdminHome.vue'),
        redirect: '/admin/adminIndex',
        meta: {title: 'Admin Page'},
        children: [
            {
                path: 'adminIndex',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/admin/AdminIndex'),
                meta: {title: 'adminIndex'},
                name: 'AdminIndex'
            },
            {
                path: 'accounts',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/admin/AccountManager'),
                meta: {title: 'Accounts'},
                name: 'accounts'
            },
            {
                path: 'courses',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/admin/CourseManager'),
                meta: {title: 'Courses'},
                name: 'courses'
            },
        ]
    },
    {
        path: '/404',
        name: 'Page404',
        component: () => import('@/views/error-page/404')
    },
    // 404 page must be placed at the end !!!
    {
        path: '*',
        redirect: '/404',
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
