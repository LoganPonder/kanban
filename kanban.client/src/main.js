// @ts-ignore
import App from './App.vue'
import { createApp } from 'vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import router from './router'
import bootstrap from 'bootstrap'
import jquery from 'jquery'
import popper from 'popper.js'
import AOS from 'aos'
import 'aos/dist/aos.css'

const root = createApp(App)
registerGlobalComponents(root)

AOS.init()

root
  .use(router, bootstrap, jquery, popper)
  .mount('#app')
