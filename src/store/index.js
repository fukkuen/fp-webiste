import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import http from '../http'

const debug = process.env.NODE_ENV !== 'production'


import { schema, normalize, denormalize } from 'normalizr'

export const postSchema = new schema.Entity('post', {}, {idAttribute: 'post_id'})
export const postListSchema = new schema.Array(postSchema)
export const eventSchema = new schema.Entity('event', {}, {idAttribute: 'eventId'})
export const eventListSchema = new schema.Array(eventSchema)


export default new Vuex.Store({
  state: {
    recentPostIds: null,
    postCatDict: {},
    allEventIds: null,
    allPostIds: null,
    post: {},
    event: {}
  },
  mutations: {
    SET_RECENT_POST (state, posts) {

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
    FETCH_HOME () {

    },
    async FETCH_ALL_EVENTS ({commit}) {
      try {
        const res = await http.get('/v2/events')
        const {result, entities} = normalize(res, eventListSchema)
        console.log(result, entities)
        commit('SET_ENTITIES', entities)
        commit('SET_ALL_EVENTS', result)
      } catch (e) {
        console.log(e)
      }
    },
    async FETCH_ALL_POSTS ({commit}) {
      try {
        const res = await http.get('/v1/posts')
        const {result, entities} = normalize(res, postListSchema)
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
    },
    async FETCH_EVENT_DETAIL ({commit}, {eventId}) {
      try {
        const res = await http.get(`/v2/events/${eventId}`)
        const entity = {
          event: {
            [eventId]: res
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
      console.log(id, state.event)
      return state.event[id]
    },
    allPosts (state) {
      return denormalize(state.allPostIds, postListSchema, {
        post: state.post
      })
    }
  },
  strict: debug,
})
