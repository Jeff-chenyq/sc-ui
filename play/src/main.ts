import ScUI from '@jeffchen123/sc-ui'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@jeffchen123/sc-ui/dist/index.css'

const app = createApp(App)

app.use(router).use(ScUI)

app.mount('#app')
