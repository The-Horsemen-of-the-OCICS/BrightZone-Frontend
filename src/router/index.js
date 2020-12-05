import Vue from 'vue'
import VueRouter from 'vue-router'
import ProfessorHome from "../views/ProfessorHome.vue";
import ViewDeliverables from "@/components/ViewDeliverables";
import ViewSubmissions from "@/components/ViewSubmissions";
import ViewStudents from "@/components/ViewStudents";
import ProfessorIndex from "@/components/ProfessorIndex";
import EditDeliverables from "@/components/EditDeliverable";
import EvaluateSubmission from "@/components/EvaluateSubmission";
import ClassHome from "@/components/ClassHome";


Vue.use(VueRouter)

const routes = [
    {
        path: '/professor',
        name: 'Virtual Campus',
        component: ProfessorHome,
        redirect: "/professor/index",
        children: [
            {
                path: "index",
                name: "ProfessorIndex",
                component: ProfessorIndex
            },
            {
                path: "editDeliverable",
                name: "Edit Deliverable",
                component: EditDeliverables
            },
            {
                path: "viewDeliverables",
                name: "View Deliverable",
                component: ViewDeliverables
            },
            {
                path: "viewSubmissions",
                name: "View Submissions",
                component: ViewSubmissions
            },
            {
                path: "viewStudents",
                name: "View Students",
                component: ViewStudents
            },
            {
                path: "evaluateSubmission",
                name: "Evaluate Submission",
                component: EvaluateSubmission
            },
            {
                path: "classHome",
                name: "Class Home",
                component: ClassHome
            },
            {
                path: 'profile',  // http://localhost:8181/professor/profile
                component: () => import('@/views/common/Profile'),
                meta: {title: 'profile'},
                name: 'Professor profile'
            },
            {
                path: 'createRequest',  // http://localhost:8181/professor/createRequest
                component: () => import('@/views/common/CreateRequest'),
                meta: {title: 'createRequest'},
                name: 'create request',
            }
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
        redirect: '/admin/index',
        meta: {title: 'Admin Page'},
        children: [
            {
                path: 'index',
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
                path: 'courseDetails/:courseId',
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
            {
                path: 'profile',  // http://localhost:8181/admin/profile
                component: () => import('@/views/common/Profile'),
                meta: {title: 'profile'},
                name: 'admin profile'
            }
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
            {
                path: 'profile',  // http://localhost:8181/student/profile
                component: () => import('@/views/common/Profile'),
                meta: {title: 'profile'},
                name: 'StudentProfile'
            },
            {
                path: 'createRequest',  // http://localhost:8181/student/createRequest
                component: () => import('@/views/common/CreateRequest'),
                meta: {title: 'createRequest'},
                name: 'create request',
            }
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
        path: '/401',
        name: 'Page401',
        component: () => import('@/views/error-page/401')
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
