<template>
  <div id="app">
    <h1>My Calendar</h1>
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
      showDate: new Date(),
      events: []
    }
  },
  computed: {
    slots () {
      const arr = []
      this.events.forEach(e => {
        e.slots.forEach(s => {
          arr.push({
            startDate: s.startDate,
            endDate: s.endDate,
            title: s.slotTitle || e.eventTitle,
            id: s.slotId,
            url: e.eventId
          })
        })
      })
      return arr
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
    this.$http.get('/v2/events').then(res => {
      this.events = res
    })
  }
}
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    height: 67vh;
    width: 90vw;
    margin-left: auto;
    margin-right: auto;
  }
</style>
