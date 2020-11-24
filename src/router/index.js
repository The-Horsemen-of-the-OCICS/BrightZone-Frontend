import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Campus from "../views/Campus.vue";
import ViewDeliverables from "@/components/ViewDeliverables";
import ViewSubmissions from "@/components/ViewSubmissions";
import ViewStudents from "@/components/ViewStudents";
import MyCampus from "@/components/MyCampus";
import EditDeliverables from "@/components/EditDeliverable";
import EvaluateSubmission from "@/components/EvaluateSubmission";

Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: Home
    // },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
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
        redirect: '/dashboard'
    },
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        meta: {title: '自述文件'},
        children: [
            {
                path: '/dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/admin/Dashboard'),
                meta: {title: '系统首页'},
                name: 'Dashboard'
            },
            {
                path: '/icon',
                component: () => import(/* webpackChunkName: "icon" */ '@/views/admin/Icon.vue'),
                meta: { title: '自定义图标' }
            },
            {
                path: '/table',
                component: () => import(/* webpackChunkName: "table" */ '@/views/admin/BaseTable.vue'),
                meta: { title: '基础表格' }
            },
            {
                path: '/tabs',
                component: () => import(/* webpackChunkName: "tabs" */ '@/views/admin/Tabs.vue'),
                meta: { title: 'tab选项卡' }
            },
            {
                path: '/form',
                component: () => import(/* webpackChunkName: "form" */ '@/views/admin/BaseForm.vue'),
                meta: { title: '基本表单' }
            },
            {
                // 富文本编辑器组件
                path: '/editor',
                component: () => import(/* webpackChunkName: "editor" */ '@/views/admin/VueEditor.vue'),
                meta: { title: '富文本编辑器' }
            },
            {
                // markdown组件
                path: '/markdown',
                component: () => import(/* webpackChunkName: "markdown" */ '@/views/admin/Markdown.vue'),
                meta: { title: 'markdown编辑器' }
            },
            {
                // 图片上传组件
                path: '/upload',
                component: () => import(/* webpackChunkName: "upload" */ '@/views/admin/Upload.vue'),
                meta: { title: '文件上传' }
            },
            {
                // vue-schart组件
                path: '/charts',
                component: () => import(/* webpackChunkName: "chart" */ '@/views/admin/BaseCharts.vue'),
                meta: { title: 'schart图表' }
            },
            {
                // 拖拽列表组件
                path: '/drag',
                component: () => import(/* webpackChunkName: "drag" */ '@/views/admin/DragList.vue'),
                meta: { title: '拖拽列表' }
            },
            {
                // 拖拽Dialog组件
                path: '/dialog',
                component: () => import(/* webpackChunkName: "dragdialog" */ '@/views/admin/DragDialog.vue'),
                meta: { title: '拖拽弹框' }
            },
            {
                // 国际化组件
                path: '/i18n',
                component: () => import(/* webpackChunkName: "i18n" */ '@/views/admin/I18n.vue'),
                meta: { title: '国际化' }
            },
            {
                // 权限页面
                path: '/permission',
                component: () => import(/* webpackChunkName: "permission" */ '@/views/admin/Permission.vue'),
                meta: { title: '权限测试', permission: true }
            },
            {
                path: '/404',
                component: () => import(/* webpackChunkName: "404" */ '@/views/admin/404.vue'),
                meta: { title: '404' }
            },
            {
                path: '/403',
                component: () => import(/* webpackChunkName: "403" */ '@/views/admin/403.vue'),
                meta: { title: '403' }
            },
            {
                path: '/donate',
                component: () => import(/* webpackChunkName: "donate" */ '@/views/admin/Donate.vue'),
                meta: { title: '支持作者' }
            }

        ]
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
