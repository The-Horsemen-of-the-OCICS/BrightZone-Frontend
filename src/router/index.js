import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Campus from "../views/Campus.vue";
import ViewDeliverables from "@/components/ViewDeliverables";
import ViewSubmissions from "@/components/ViewSubmissions";
import ViewStudents from "@/components/ViewStudents";
import MyCampus from "@/components/MyCampus";
import EditDeliverables from "@/components/EditDeliverable";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
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

    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/account/Login')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
