<template lang="pug">
  .post-list
    vi-container
      vi-spinner(v-if="!filteredPosts")
      virtual-scroller(v-else :items="filteredPosts" item-height="200" :page-mode="true")
        post-item(slot-scope="{item, itemKey}" :post="item")
</template>

<script>
import postItem from './post-item'

export default {
  name: 'post-list',

  components: {
    postItem
  },

  computed: {
    posts () {
      return this.$store.getters.allPosts
    },
    $catSlug () {
      return this.$route.params.catSlug
    },
    filteredPosts () {
      if (!this.posts) return null
      return this.posts.filter(p => p.cats.map(c => c.slug).includes(this.$catSlug))
    }
  },

  data () {
    return {
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
    this.$store.dispatch('FETCH_ALL_POSTS')
  }
}
</script>
