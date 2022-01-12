import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'moment/locale/zh-cn'
import 'animate.css/animate.min.css'

createApp(App).use(ElementPlus).use(createPinia()).use(router).mount('#app')
