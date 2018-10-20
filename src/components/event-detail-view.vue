<template lang="pug">
  vi-container.event-detail
    vi-spinner(v-if="!event")
    div(v-else)
      h1 {{event.title}}
      div(v-html="event.html")
</template>

<script>
  export default {
    name: 'event-detail-view',

    computed: {
      $id () {
        return this.$route.params.id
      },
      event () {
        return this.$store.getters.event(this.$id)
      }
    },

    created () {
      this.$store.dispatch('FETCH_EVENT_DETAIL', {
        eventId: this.$id
      })
    }
  }
</script>

<style lang="stylus">

</style>
