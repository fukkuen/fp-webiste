<template lang="pug">
  .event-list
    vi-container
      vi-spinner(v-if="!filteredEvents")
      virtual-scroller(v-else :items="filteredEvents" item-height="200" :page-mode="true")
        event-item(slot-scope="{item}" :event="item" :key="item.eventId")
</template>

<script>
import EventItem from '../components/event-item'
export default {
  name: 'event-list',

  components: { EventItem },

  computed: {
    $catSlug () {
      return this.$route.params.catSlug
    },
    events () {
      return this.$store.getters.allEvents
    },
    filteredEvents () {
      if (!this.events) return null
      return this.events.filter(p => p.cats.includes(this.$catSlug))
    }
  },

  created () {
    this.$store.dispatch('FETCH_ALL_EVENTS')
  }
}
</script>

<style lang="stylus">

</style>
