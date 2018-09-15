<template lang="pug">
  #app
    top-bar
    .hero-section
      .hero-section__container
        .hero-section__l
          vi-spinner(v-if="!slides")
          carousel(v-else :per-page="1" navigation-enabled :pagination-enabled="false")
            slide(v-for="(slide, i) in slides" :key="i" v-if="slides")
              .home-slide
                a(:href="slide.href" target="_blank")
                  vi-img(:src="slide.src" height="100%" :cover="slide.cover")
        .hero-section__r
          OralCalender
    .bottom-section
      vi-container
        recent-post
    site-footer
</template>

<script>
import OralCalender from './components/oral-calender'
import RecentPost from './components/recent-post'
import TopBar from './components/top-bar'
import SiteFooter from './components/footer'

export default {
  name: 'App',

  components: {OralCalender, RecentPost, SiteFooter, TopBar},

  data () {
    return {
      notice: null,
      posts: null,
      monthBoard: null,
      slides: null
    }
  },

  methods: {
    getSlides (post) {
      post = `<div>${post}</div>` // make sure it is a element, not a collection of element
      function htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
      }

      const html = htmlToElement(post)
      const images = html.getElementsByTagName('img') || []
      console.log(images)
      this.slides = []
      for (let i = 0; i < images.length; i++) {
        this.slides.push({
          src: images[i].attributes.src.nodeValue,
          href: images[i].attributes.alt.nodeValue,
          cover: images[i].classList[0]
        })
      }
    }
  },

  created () {
    // get slides
    this.$http.get('http://floatingprojectscollective.net/wp-json/wp/v2/pages/5261').then(res => {
      this.getSlides(res.content.rendered)
    })
  }
}
</script>

<style lang="stylus">
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
    height calc(100vh - 250px)
    margin-top -25px
    padding-top 65px
    padding-bottom 40px
    background #f5f5f5
    border-top 1px solid #e1e1e1

    @media(max-width 1000px)
      height auto

    @media(max-width 800px)
      margin-top auto

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
        height 400px
        padding 20px

      .VueCarousel, .VueCarousel-wrapper, .VueCarousel-inner, .VueCarousel-slide, .home-slide, .vi-imgs, .home-slide > a
        height: calc(100vh - 350px)

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

  .slider
    background url('./assets/fp2-opening-event.jpg')
    background-size: auto 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;

  .vi-container
    margin 0 auto
    padding 20px 0
    max-width 1000px

  .home-slide
    border-radius 20px
    overflow hidden
</style>
