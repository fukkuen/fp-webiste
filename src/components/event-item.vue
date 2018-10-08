<template lang="pug">
  .event-item
    .event-item__l
      vi-img(:src="event.imageUrl" height="200px")
    .event-item__r
      h3 {{event.eventTitle}}
      div
        router-link(v-for="(cat,i) in event.eventCats" :key="i" :to="{name: 'event-list', params:{catSlug: cat}}")
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
    margin 40px 0

    &__l
      flex-shrink 0
      width 280px
      margin-right 20px
</style>
