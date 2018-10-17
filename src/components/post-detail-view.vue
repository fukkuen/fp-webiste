<template lang="pug">
  vi-container.post-detail
    vi-spinner(v-if="!post")
    template(v-else)
      img(:src="post.image" width="100%")
      h2 {{post.post_title}}
      div.post-content(v-html="post.post_content")
      vi-chip(v-for="(tag, i) in post.tags" :key="tag.slug" class="mr-2 mb-2") {{tag.name}}
      div {{post.author_name}}
      div {{post.post_date}}
      vi-chip(v-for="(tag, i) in post.cats" :key="tag.slug" class="mr-2 mb-2") {{tag.name}}
</template>

<script>
  export default {
    name: 'post-detail',

    computed: {
      $id () {
        return this.$route.params.id
      },
      post () {
        return this.$store.getters.post(this.$id)
      }
    },

    created () {
      this.$store.dispatch('FETCH_POST_DETAIL', {
        postId: this.$id
      })
    }
  }
</script>

<style lang="stylus">
  .post-content img
    float left
    margin 20px 20px 20px 0
</style>
