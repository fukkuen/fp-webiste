<template lang="pug">
  vi-container.event-detail
    vi-input(v-model="form.title" placeholder="Event Title")
    vi-button(@click="edit") Edit
</template>

<script>
export default {
  name: 'event-detail-view',

  // provide eventId = Edit Mode
  props: ['eventId'],

  data () {
    return {
      form: {
        title: '',
        html: '',
        cats: '',
        imageUrl: ''
      }
    }
  },

  computed: {
    event () {
      return this.$store.getters.event(this.$id)
    }
  },

  methods: {
    async fetchEdit () {
      if (!this.eventId) return
      await this.$store.dispatch('FETCH_EVENT_DETAIL', {
        eventId: this.eventId
      })
      this.$store.getters.event(this.eventId)
      const {title, html, cats, imageUrl} = this.$store.getters.event(this.eventId)
      this.form.title = title
      this.form.html = html
      this.form.cats = cats
      this.form.imageUrl = imageUrl
    },
    async edit () {
      const payload = {...this.form, ...{eventId: this.eventId}}
      this.$store.dispatch('EDIT_EVENT', {form: payload})
    }
  },

  created () {
    this.fetchEdit()
  }
}
</script>

<style lang="stylus">

</style>
