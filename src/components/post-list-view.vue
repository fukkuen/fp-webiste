<template lang="pug">
  .post-list
    button(v-for="c in categories" @click="filter = c.id" :key="c.id") {{c.id}}
    vi-container
      vi-spinner(v-if="!posts")
      router-link(v-else v-for="post in filteredPosts" :to="{name: 'post-detail', params: {id: post.post_id}}" :key="post.post_id")
        post-item(:post="post")
</template>

<script>
import postItem from './post-item'
export default {
  name: 'post-list',

  components: {
    postItem
  },

  computed: {
    $catSlug () {
      return this.$route.params.catSlug
    },
    filteredPosts () {
      return this.posts.filter(p => p.cats.map(c => c.slug).includes(this.$catSlug))
    }
  },

  data () {
    return {
      posts: null,
      categories: [
        {
          id: 'coffee-fantasia'
        },
        {
          id: 'eat-well-drink-well-breathe-well'
        },
        {
          id: 'seriously-speaking'
        },
        {
          id: 'personally-speaking'
        },
        {
          id: 'art-notes'
        }
      ],
      filter: 'coffee-fantasia'
    }
  },

  created () {
    this.$http.get('/posts').then(res => {
      this.posts = res
    })
  }
}
</script>
