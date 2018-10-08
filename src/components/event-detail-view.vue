<template lang="pug">
  vi-container.event-detail
    h2 {{event.eventTitle}}
    div(v-html="event.eventHtml")
</template>

<script>
  export default {
    name: 'event-detail-view',

    data () {
      return {
        event: {}
      }
    },

    computed: {
      $id () {
        return this.$route.params.id
      }
    },

    created () {
      this.$http.get(`v2/events/${this.$id}`).then(res => {
        this.event = res
      })
    }
  }
</script>

<style lang="stylus">

</style>
