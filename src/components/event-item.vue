<template lang="pug">
  .event-item
    .event-item__l
      vi-img(:src="event.imageUrlSm" height="200px")
    .event-item__r
      router-link(:to="{name: 'event-detail', params: {id: event.eventId}}" :key="event.eventId")
        h3 {{event.title}}
      div
        router-link(v-for="(cat,i) in event.cats" :key="i" :to="{name: 'event-list', params:{catSlug: cat}}")
          vi-chip(class="mr-2") {{cat}}
      div {{event.startDate}}
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
    height 200px

    &:not(:last-child)
      margin-bottom 40px

    &__l
      flex-shrink 0
      width 280px
      margin-right 20px
</style>
