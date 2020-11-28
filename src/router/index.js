import Vue from 'vue'
import VueRouter from 'vue-router'
import Campus from "../views/Campus.vue";
import ViewDeliverables from "@/components/ViewDeliverables";
import ViewSubmissions from "@/components/ViewSubmissions";
import ViewStudents from "@/components/ViewStudents";
import MyCampus from "@/components/MyCampus";
import EditDeliverables from "@/components/EditDeliverable";
import EvaluateSubmission from "@/components/EvaluateSubmission";
import ClassHome from "@/components/ClassHome";


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
            {
                path: "/classHome",
                name: "Class Home",
                component: ClassHome
            },

        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/account/Login')
    },
    {
        path: '/passwordRecovery',
        name: 'PasswordRecovery',
        component: () => import('@/views/account/PasswordRecovery')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/account/Register')
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
        path: '/common/header',
        name: 'CommonHeader',
        component: () => import('@/views/common/Header')
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
            {
                path: 'courseDetails',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/admin/CourseDetails'),
                meta: {title: 'courseDetails'},
                name: 'courseDetails'
            },
            {
                path: 'notification',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/admin/Notification'),
                meta: {title: 'notification'},
                name: 'notification'
            },
        ]
    },
    {
        path: '/student',
        component: () => import(/* webpackChunkName: "home" */ '@/views/student/StudentHome.vue'),
        redirect: "/student/index",
        children: [
            {
                path: 'index',
                component: () => import('@/views/student/StudentIndex'),
                meta: {title: 'studentIndex'},
                name: 'StudentIndex'
            },
            {
                path: 'viewOpenedCourse',
                component: () => import('@/views/student/ViewOpenedCourse'),
                meta: {title: 'viewOpenedCourse'},
                name: 'ViewOpenedCourse'
            },
            {
                path: 'viewRegisteredCourse',
                component: () => import('@/views/student/ViewRegisteredCourse'),
                meta: {title: 'viewRegisteredCourse'},
                name: 'ViewRegisteredCourse'
            },
        ]
    },
    {
        path: '/studentCourse',
        component: () => import(/* webpackChunkName: "home" */ '@/views/student/StudentCourseHome.vue'),
        redirect: "/studentCourse/index",
        children: [
            {
                path: 'index/:clazzId',
                component: () => import('@/views/student/StudentCourseIndex'),
                meta: {title: 'studentCourseIndex'},
                name: 'StudentCourseIndex'
            },
            {
                path: 'viewCourseDeliverable/:clazzId',
                component: () => import('@/views/student/ViewCourseDeliverable'),
                meta: {title: 'viewCourseDeliverable'},
                name: 'ViewCourseDeliverable'
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
