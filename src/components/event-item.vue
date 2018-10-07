<template lang="pug">
  .event-item
    .event-item__l
      vi-img(:src="event.image" height="200px")
    .event-item__r
      h3 {{event.event_title}}
      p {{event.event_excerpt}}
      div
        router-link(v-for="cat in event.cats" :key="cat.slug" :to="{name: 'event-list', params:{catSlug: cat.slug}}")
          vi-chip(class="mr-2") {{cat.name}}
      div {{event.publish_date}}
      div {{event.author_name}}
</template>

<script>
export default {
  name: 'event-item',
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus">
  .event-item
    display flex
    margin 40px 0

    &__l
      flex-shrink 0
      width 280px
      margin-right 20px
</style>
