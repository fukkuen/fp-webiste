import Vue from 'vue'
import Vuex from 'vuex'
import http from '../http'
import { schema, normalize, denormalize } from 'normalizr'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export const postSchema = new schema.Entity('post', {}, {idAttribute: 'post_id'})
export const postListSchema = new schema.Array(postSchema)
export const eventSchema = new schema.Entity('event', {}, {idAttribute: 'eventId'})
export const eventListSchema = new schema.Array(eventSchema)
const eventCats = [
  {
    name: 'WIP Inspection',
    value: 'wip-inspection'
  },
  {
    name: 'Artistic Production',
    value: 'artistic-production'
  },
  {
    name: 'Workshops',
    value: 'workshops'
  },
  {
    name: 'Stock-taking',
    value: 'stock-taking'
  },
  {
    name: 'Partnership',
    value: 'partnership'
  }
]

export default new Vuex.Store({
  state: {
    recentPostIds: null,
    postCatDict: {},
    allEventIds: null,
    allPostIds: null,
    post: {},
    event: {},
    eventCats: eventCats
  },
  mutations: {
    SET_RECENT_POST_IDS (state, ids) {
      state.recentPostIds = ids
    },
    SET_ALL_POSTS (state, postIds) {
      state.allPostIds = postIds
    },
    SET_ALL_EVENTS (state, eventIds) {
      state.allEventIds = eventIds
    },
    SET_ENTITIES (state, entities) {
      for (let type in entities) {
        for (let entity in entities[type]) {
          // console.log(state[type])
          const oldObj = state[type][entity] || {}
          const newObj = Object.assign({}, oldObj, entities[type][entity])
          Vue.set(state[type], entity, newObj)
        }
      }
    }
  },
  actions: {
    async TEST () {
      http.get('/test')
    },
    async FETCH_ALL_EVENTS ({commit}) {
      try {
        const res = await http.get('/events/getAllEvents')
        const {result, entities} = normalize(res, eventListSchema)
        commit('SET_ENTITIES', entities)
        commit('SET_ALL_EVENTS', result)
      } catch (e) {
        console.log(e)
      }
    },
    async FETCH_EVENT_DETAIL ({commit}, {eventId}) {
      try {
        const res = await http.get(`/events/getEvent/${eventId}`)
        const entity = {
          event: {
            [eventId]: res
          }
        }
        commit('SET_ENTITIES', entity)
      } catch (e) {
        console.log(e)
      }
    },
    async EDIT_EVENT ({commit}, {form}) {
      try {
        form.slots.forEach(s => {
          s.startDate = s.startDate && s.startDate.split('T')[0]
          s.endDate = s.endDate && s.endDate.split('T')[0]
        })
        await http.post(`/events/editEvent`, {
          form
        })
        return true
      } catch (e) {
        console.log(e)
      }
    },
    async FETCH_RECENT_POSTS ({commit}) {
      try {
        const res = await http.get('/v1/posts?limit=3')
        const {result, entities} = normalize(res, postListSchema)
        commit('SET_ENTITIES', entities)
        commit('SET_RECENT_POST_IDS', result)
      } catch (e) {
        console.log(e)
      }
    },
    async FETCH_ALL_POSTS ({commit}) {
      try {
        const res = await http.get('/v1/posts')
        const {result, entities} = normalize(res, postListSchema)
        res.forEach(p => {
          let a = p.image
          p.image_sm = a.slice(0, a.length - 4) + '_abc_' + a.slice(a.length - 4, a.length)
        })
        commit('SET_ENTITIES', entities)
        commit('SET_ALL_POSTS', result)
      } catch (e) {
        console.log(e)
      }
    },
    async FETCH_POST_DETAIL ({commit}, {postId}) {
      try {
        const res = await http.get(`/v1/posts/${postId}`)
        const entity = {
          post: {
            [postId]: res
          }
        }
        commit('SET_ENTITIES', entity)
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    allEvents (state) {
      if (!state.allEventIds) return null
      return denormalize(state.allEventIds, eventListSchema, {
        event: state.event
      })
    },
    post: (state) => (id) => {
      return state.post[id]
    },
    event: (state) => (id) => {
      return state.event[id]
    },
    allPosts (state) {
      return denormalize(state.allPostIds, postListSchema, {
        post: state.post
      })
    },
    recentPosts (state) {
      return denormalize(state.recentPostIds, postListSchema, {
        post: state.post
      })
    }
  },
  strict: debug,
})
