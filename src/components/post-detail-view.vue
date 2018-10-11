<template lang="pug">
  vi-container.post-detail
    vi-spinner(v-if="!post")
    template(v-else)
       h2 {{post.post_title}}
       div(v-html="post.post_content")
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

</style>
