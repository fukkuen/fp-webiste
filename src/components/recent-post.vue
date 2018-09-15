<template lang="pug">
  .recent-post
    h2(class="mb-20") 最近文章 Recent Posts
    vi-spinner(v-if="!posts")
    a(v-else v-for="(post, i) in posts" :key="i" :href="post.link" target="_blank")
      vi-item(link height="70")
        vi-item-content
          vi-item-title(v-html="post.title.rendered")
          vi-item-subtitle {{post.date | dateFormat}}
</template>

<script>
  export default {
    data () {
      return {
        posts: null
      }
    },
    created () {
      this.$http.get('http://floatingprojectscollective.net/wp-json/wp/v2/posts?per_page=3').then(res => {
        this.posts = res
      })
    }
  }
</script>

<style scoped lang="stylus">
  .recent-post
    text-align center
</style>
