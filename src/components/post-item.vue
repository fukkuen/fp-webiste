<template lang="pug">
  .post-item
    .post-item__l
      vi-img(:src="post.imageSm" height="200px")
    .post-item__r
      h3 {{post.post_title}}
      p {{post.post_excerpt}}
      div
        router-link(v-for="cat in post.cats" :key="cat.slug" :to="{name: 'post-list', params:{catSlug: cat.slug}}")
          vi-chip(class="mr-2") {{cat.name}}
      div {{post.publish_date}}
      div {{post.author_name}}
</template>

<script>
export default {
  name: 'post-item',
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus">
  .post-item
    display flex
    margin 40px 0

    &__l
      flex-shrink 0
      width 280px
      margin-right 20px
</style>
