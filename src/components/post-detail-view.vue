<template lang="pug">
  vi-container.post-detail
    h2 {{post.post_title}}
    div(v-html="post.post_content")
</template>

<script>
  export default {
    name: 'abc',

    data () {
      return {
        post: {}
      }
    },

    computed: {
      $id () {
        return this.$route.params.id
      }
    },

    created () {
      console.log('hi')
      this.$http.get(`/posts/${this.$id}`).then(res => {
        console.log(res)
        this.post = res
      })
    }
  }
</script>

<style lang="stylus">

</style>
