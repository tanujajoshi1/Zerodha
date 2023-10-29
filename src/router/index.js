// import { createRouter, Router, createWebHistory } from 'vue-router'
// import Vue from 'vue'

// Vue.use(Router)

// const routes = [
  
// ]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

// export default router

import { createApp } from 'vue'
import App from '../components/App.vue' // Adjust the path based on your file structure
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // Your routes go here
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const app = createApp(App) // Specify your main component here

app.use(router)
app.mount('#app') // Make sure to adjust the mount point as needed

export default router;

