<template lang="pug">
  #app
    FpCalendar
    .bottom-section
      vi-container
        recent-post
</template>

<script>
  import OralCalender from './oral-calender'
  import RecentPost from './recent-post'
  import HomeSlide from './home-slider'
  import FpCalendar from './fp-calender'

  export default {
    name: 'App',

    components: {OralCalender, RecentPost, HomeSlide, FpCalendar},
  }
</script>

<style lang="stylus">
  @import '../yolo/stylus/app.styl'
  // generic
  .row
    display flex

    .col-1-3
      padding 12px
      width 33.33%

    .col-2-3
      padding 12px
      width 66.66%

  .hero-section
    // height calc(100vh - 250px)
    margin-top -25px
    padding-top 65px
    padding-bottom 40px
    background #f5f5f5
    border-top 1px solid #e1e1e1

    @media(max-width 1000px)
      height auto

    @media(max-width 800px)
      margin-top auto
      padding-top 20px

    &__container
      height 100%
      max-width 1100px
      margin 0 auto
      display flex
      align-items stretch

      @media(max-width 1000px)
        display block

    &__l
      width 65%
      padding-left 20px

      @media(max-width 1000px)
        width 100%
        // height 400px
        padding 20px

    &__r
      width 35%
      padding-left 20px
      padding-right 20px

      @media(max-width 1000px)
        width 100%

  .bottom-section
    border-top 1px solid #e1e1e1
    background white
    padding 0 0 40px

  .vi-container
    margin 0 auto
    padding 20px 0
    max-width 1000px
</style>
