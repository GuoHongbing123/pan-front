import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './static/reset.css';
import VueClipboard from 'vue-clipboard2'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueClipboard);
// Vue.prototype.$staticUrl = ''

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (token) {
      next()
  } else {
      if (to.path === '/login') {
          next()
      } else if(to.path === '/forgetPwd'){
          next()
      } else if(to.path === '/register'){
          next()
      }   else {
          next('/login')
      }
  }
})
new Vue({
  beforeCreate(){
    // 事件总线
    Vue.prototype.$bus=this
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
