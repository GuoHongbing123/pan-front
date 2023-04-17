import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [{
    path:'/',
    name:'Main',
    component:()=>
        import('../views/Main/index.vue'),
    children:[
      {
        path:'',
        redirect:'home'
      },
      {
        path:'home',
        name:'home',
        component:()=>
          import('../views/Home.vue'),
        children:[{name:'',path:''}]
      },
      {
        path:'recycle',
        name:'Recycle',
        component: () =>
          import('../views/Recycle/index.vue'),
      },
      {
        path:'share',
        name:'Share',
        component: () =>
          import('../views/Share/index.vue'),
      },
      {
        path: '/changepwd',
        name: 'ChangePwd',
        component:()=>
          import ('../views/ChangePwd.vue')
      },
      {
        path:'detail',
        name:'Detail',
        component:()=>
          import('../views/Detail.vue')
      },
    ]
    },
    {
      path: '/login',
      name: 'Login',
      component:()=>
        import ('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component:()=>
        import ('../views/Register.vue')
    },
    {
      path: '/forgetPwd',
      name: 'ForgetPwd',
      component:()=>
        import ('../views/ForgetPwd.vue')
    },
    {
      path:'/s/:id',
      name:'S',
      component:()=>
        import ('../views/Share/S.vue')
    },
  ]

const router = new VueRouter({
  routes
})

export default router
