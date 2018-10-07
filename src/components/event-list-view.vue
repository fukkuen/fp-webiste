<template lang="pug">
  .event-list
    vi-container
      vi-spinner(v-if="!events")
      router-link(v-else v-for="event in filteredEvents" :to="{name: 'event-detail', params: {id: event.event_id}}" :key="event.event_id")
        event-item(:event="event")
</template>

<script>
import EventItem from '../components/event-item'
export default {
  name: 'event-list',

  components: { EventItem },

  data () {
    return {
      events: null
    }
  },

  computed: {
    $catSlug () {
      return this.$route.params.catSlug
    },
    filteredEvents () {
      if (!this.events) return
      return this.events.filter(p => p.cats.map(c => c.slug).includes(this.$catSlug))
    }
  },

  created () {
    this.$http.get('/events').then(res => {
      this.events = res
    })
  }
}
</script>

<style lang="stylus">

</style>
