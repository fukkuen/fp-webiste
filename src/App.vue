<template lang="pug">
  #app
    top-bar
    router-view
    site-footer
</template>

<script>
import OralCalender from './components/oral-calender'
import RecentPost from './components/recent-post'
import TopBar from './components/top-bar'
import SiteFooter from './components/footer'
import HomeSlide from './components/home-slider'

export default {
  name: 'App',

  components: {OralCalender, RecentPost, SiteFooter, TopBar, HomeSlide},
}
</script>

<style lang="stylus">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');

  @import './yolo/stylus/app.styl'
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

    @media(max-width 900px)
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
