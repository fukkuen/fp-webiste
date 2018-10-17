<template lang="pug">
  .post-item
    .post-item__l
      vi-img(:src="post.imageSm" height="200px")
    .post-item__r
      router-link(:to="{name: 'post-detail', params: {id: post.post_id}}")
        h3(class="mb-10") {{post.post_title}}
      // p {{post.post_excerpt}}
      vi-row(class="mb-20")
        vi-item
          vi-item-avatar
            vi-icon(name="star")
          vi-item-content {{post.author_name}}
        vi-item(class="ml-20")
          vi-item-avatar
            vi-icon(name="calendar")
          vi-item-content {{post.publish_date}}
      div
        router-link(v-for="cat in post.cats" :key="cat.slug" :to="{name: 'post-list', params:{catSlug: cat.slug}}")
          vi-chip(class="mr-4" small) {{cat.name}}

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
  @import '../yolo/stylus/settings.styl'
  .post-item
    display flex
    height 200px
    &:not(:last-child)
      margin-bottom 40px

    &__l
      flex-shrink 0
      width 280px
      margin-right 20px

    h3
      font-size 22px

    a:hover
      color $brand

    .vi-chip:hover
      box-shadow $box-shadow
</style>
