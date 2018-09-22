<template lang="pug">
  div
    vi-spinner(v-if="!slides")
    carousel(v-else :per-page="1" navigation-enabled :pagination-enabled="false")
      slide(v-for="(slide, i) in slides" :key="i" v-if="slides")
        .home-slide
          h3.home-slide__title(v-if="slide.title") {{slide.title}}
          a(:href="slide.href" target="_blank")
            vi-img(:src="slide.src" height="100%" :cover="slide.cover")
</template>

<script>
  export default {
    name: 'abc',

    data () {
      return {
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
        console.log(html)
        const images = html.getElementsByTagName('img') || []
        this.slides = []
        for (let i = 0; i < images.length; i++) {
          this.slides.push({
            src: images[i].attributes.src.nodeValue,
            href: images[i].attributes.alt.nodeValue,
            cover: images[i].classList[0],
            title: images[i].title
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
  .VueCarousel, .VueCarousel-wrapper, .VueCarousel-inner, .VueCarousel-slide, .home-slide, .vi-imgs, .home-slide > a
    height: calc(100vh - 350px)

    @media(max-width 1000px)
      height 400px

  .home-slide
    border-radius 20px
    overflow hidden
    position relative

    &__title
      position absolute
      background rgba(0,0,0,0.6)
      color white
      padding 20px
      bottom 0
      left 0
      right 0
      z-index 2
</style>
