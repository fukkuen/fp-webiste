<template lang="pug">
  .recent-post
    h2(class="mb-20") 最近文章 Recent Posts
    vi-spinner(v-if="!posts")
    router-link(v-else v-for="post in posts" :to="{name: 'post-detail', params: {id: post.post_id}}" :key="post.post_id")
      post-item(:post="post")
</template>

<script>
  import postItem from './post-item'

  export default {
    components: {
      postItem
    },

    computed: {
      posts () {
        return this.$store.getters.recentPosts
      }
    },

    created () {
      this.$store.dispatch('FETCH_RECENT_POSTS')
      this.$store.dispatch('FETCH_ALL_EVENTS')
    }
  }
</script>

<style scoped lang="stylus">
  .recent-post
    text-align center
</style>
