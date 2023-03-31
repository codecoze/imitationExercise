import { createApp } from 'vue'
// import './style.css'
import 'element-plus/dist/index.css'
import router from './router/index'

import "./mock/index.js"

import App from './App.vue'
const app = createApp(App);

app.use(router);

app.mount('#app')
