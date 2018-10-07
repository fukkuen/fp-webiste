<template lang="pug">
  .about-view
    vi-spinner(v-if="!post")
    div(v-else v-html="post.post_content")
</template>

<script>
export default {
  name: 'about-view',
  data () {
    return {
      post: null
    }
  },
  created () {
    this.$http.get('/about').then(res => {
      this.post = res
    })
  }
}
</script>

<style lang="stylus">

</style>
