<template lang="pug">
  .post-list
    button(v-for="c in categories" @click="filter = c.id") {{c.id}}
    router-link(:to="{name: 'post-detail', params: {id: p.ID}}" v-for="p in filteredPosts")
      vi-item(link height="60") {{p.post_title}} {{p.cat_name}}
</template>

<script>
  export default {
    name: 'post-list',

    data () {
      return {
        posts: [],
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

    computed: {
      filteredPosts () {
        return this.posts.filter(p => p.cat_slug == this.filter)
      }
    },

    created () {
      this.$http.get('/posts').then(res => {
        console.log(res)
        this.posts = res
      })
    }
  }
</script>
