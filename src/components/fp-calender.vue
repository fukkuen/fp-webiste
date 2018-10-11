<template>
  <div class="fp-calender">
    <calendar-view
      :show-date="showDate"
      :events="slots"
      @click-event="navigate"
      class="theme-default holiday-us-traditional holiday-us-official">
      <calendar-view-header
        slot="header"
        slot-scope="t"
        :header-props="t.headerProps"
        @input="setShowDate" />
    </calendar-view>
  </div>
</template>

<script>
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"

export default {
  name: 'app',
  data () {
    return {
      showDate: new Date()
    }
  },
  computed: {
    slots () {
      if (!this.events) return []
      const arr = []
      this.events.forEach(e => {
        e.slots.forEach(s => {
          arr.push({
            startDate: s.startDate,
            endDate: s.endDate,
            title: s.slotTitle || e.eventTitle,
            id: Math.random(),
            url: e.eventId
          })
        })
      })
      console.log(this.events)
      return arr
    },
    events () {
      return this.$store.getters.allEvents
    }
  },
  components: {
    CalendarView,
    CalendarViewHeader,
  },
  methods: {
    setShowDate(d) {
      this.showDate = d;
    },
    navigate (e) {
      console.log(e)
      const eventId = e.originalEvent.url
      this.$router.push({
        name: 'event-detail',
        params: {
          id: eventId
        }
      })

    }
  },
  created () {
    this.$store.dispatch('FETCH_ALL_EVENTS')
  }
}
</script>
<style lang="stylus">
  .fp-calender
    height 600px
    margin 40px 20px
</style>
