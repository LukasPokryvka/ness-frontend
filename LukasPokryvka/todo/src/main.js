import { createApp } from 'vue'
import './styles/normalize.css'
import './styles/style.css'
import App from './App.vue'
import store from './store'

createApp(App)
	.use(store)
	.mount('#app')
