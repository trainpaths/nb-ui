import { createApp } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Link renders <router-link> for `to`; memory history keeps the URL hash free for the nav anchors
const router = createRouter({
	history: createMemoryHistory(),
	routes: [{ path: '/:any(.*)*', component: { render: () => null } }],
})

createApp(App).use(router).mount('#app')
