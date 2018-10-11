<template lang="pug">
  .event-list
    vi-container
      vi-spinner(v-if="!filteredEvents")
      router-link(v-else v-for="event in filteredEvents" :to="{name: 'event-detail', params: {id: event.eventId}}" :key="event.eventId")
        event-item(:event="event")
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
      return this.events // TODO
      // return this.events.filter(p => p.cats.map(c => c.slug).includes(this.$catSlug))
    }
  },

  created () {
    this.$store.dispatch('FETCH_ALL_EVENTS')
  }
}
</script>

<style lang="stylus">

</style>
