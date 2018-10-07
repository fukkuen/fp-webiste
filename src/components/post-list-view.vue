<template lang="pug">
  .post-list
    button(v-for="c in categories" @click="filter = c.id" :key="c.id") {{c.id}}
    router-link(:to="{name: 'post-detail', params: {id: p.ID}}" v-for="p in filteredPosts" :key="p.ID")
      img(:src="`http://floatingprojectscollective.net//wp-content/uploads/${p.meta_value}`" width="80")
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
        res.forEach(p => {
          if (!p.meta_value) return
          p.meta_value = p.meta_value.split('.')[0] + '-468x328.' + p.meta_value.split('.')[1]
        })
        this.posts = res
      })
    }
  }
</script>
