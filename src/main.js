import { createApp } from 'vue'
import './style/reset.scss'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// 计算设置rem的基准值，即html的font-size
import 'amfe-flexible'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
