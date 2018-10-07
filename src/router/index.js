import Vue from 'vue'
import Router from 'vue-router'
import PostListView from '../components/post-list-view'
import PostDetailView from '../components/post-detail-view'
import HomeView from '../components/home-view'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomeView
    },
    {
      name: 'post-list',
      path: '/posts/:catSlug',
      component: PostListView
    },
    {
      name: 'post-detail',
      path: '/posts/:id',
      component: PostDetailView
    }
  ]
})
