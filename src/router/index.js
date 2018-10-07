import Vue from 'vue'
import Router from 'vue-router'
import PostListView from '../components/post-list-view'
import PostDetailView from '../components/post-detail-view'
import MemberListView from '../components/member-list'
import HomeView from '../components/home-view'
import AboutView from '../components/about-view'

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
    },
    {
      name: 'member-list',
      path: '/members',
      component: MemberListView
    },
    {
      name: 'about',
      path: '/about',
      component: AboutView
    }
  ]
})
