<template lang="pug">
  #app
    .top-bar
      .top-bar-logo
        img(src="./assets/logo.png" height="58" style="margin-right: 6px")
        img(src="./assets/logotype.png" height="50")
      .top-bar-menu
        .top-bar-social
          a(href="https://www.facebook.com/floatingprojects" target="_blank")
            vi-button(icon text)
              vi-icon(name="facebook" size="28")
          a(href="https://www.instagram.com/explore/locations/969213982/floating-projects/" target="_blank")
            vi-button(icon text)
              vi-icon(name="instagram" size="28")
          // vi-icon(name="medium" size="30")
        template(v-for="(item, i) in menu")
          vi-menu(v-if="item.children" :offset="item.offset" :nudge-bottom="-10" :nudge-left="item.offset")
            .top-bar-menu__item(slot="activator")
              .top-bar-menu__item-title {{item.title.zh}}
                vi-icon(name="down")
              .top-bar-menu__item-subtitle {{item.title.en}}
            a(v-for="item in item.children" :href="item.href" target="_blank")
              vi-item(link height="70")
                vi-item-content
                  vi-item-title {{item.zh}}
                  vi-item-subtitle {{item.en}}
          a(v-else :href="item.href" target="_blank")
            .top-bar-menu__item
              .top-bar-menu__item-title {{item.title.zh}}
              .top-bar-menu__item-subtitle {{item.title.en}}
    .hero-section
      .hero-section__container
        .hero-section__l
          carousel(:per-page="1" navigation-enabled :pagination-enabled="false")
            slide(v-for="(slide, i) in slides" :key="i" v-if="slides")
              .home-slide
                a(:href="slide.href" target="_blank")
                  vi-img(:src="slide.src" height="100%" :cover="slide.cover")
        .hero-section__r
          OralCalender
    .row.bottom-section
      .col-1-3
        .panel
          .panel__header
            .panel__blanket 「
            .panel__blanket.right ]
            .panel__title 關於我吔
            .panel__subtitle 呢班人搞咩?
          .panel__content
            vi-img(src="./assets/about-us.jpg")
            // img(src="./assets/about-us.jpg")

      .col-1-3
        .panel
          .panel__header
            .panel__blanket 「
            .panel__blanket.right ]
            .panel__title 關於我吔
            .panel__subtitle 呢班人搞咩?
          .panel__content yo
      .col-1-3
        .panel
          .panel__header
            .panel__blanket 「
            .panel__blanket.right ]
            .panel__title 文章分享
            .panel__subtitle 正經不正經也好...
          .panel__content
            a.vi-item(v-for="post in posts" :href="post.link" target="_blank")
              .vi-item__title(v-html="post.title.rendered")
              .vi-item__subtitle {{post.date}}
    footer.footer
      .vi-container Floating Projects © Copyright 2016. All Rights Reserved
</template>

<script>
import OralCalender from './components/oral-calender'
export default {
  name: 'App',

  components: {OralCalender},

  data () {
    return {
      notice: null,
      posts: null,
      monthBoard: null,
      slides: null,
      menu: [
        {
          offset: 46,
          title: {
            zh: '打開門',
            en: 'Floating Events'
          },
          children: [
            {
              en: 'WIP Inspection',
              zh: '句點。定期發表',
              href: 'http://floatingprojectscollective.net/wip-inspection/'
            },
            {
              en: 'Artistic Productions',
              zh: '實驗場',
              href: 'http://floatingprojectscollective.net/artistic-production/'
            },
            {
              en: 'Workshops',
              zh: '工作室',
              href: 'http://floatingprojectscollective.net/workshops/'
            },
            {
              en: 'Stock-taking',
              zh: '點子上倉',
              href: 'http://floatingprojectscollective.net/stock-taking/'
            },
            {
              en: 'Partnership',
              zh: '據點演繹',
              href: 'http://floatingprojectscollective.net/partnership/'
            },
          ]
        },
        {
          offset: 80,
          title: {
            zh: '據點一杯茶',
            en: 'Floating Teatime',
          },
          children: [
            {
              en: 'Art Notes',
              zh: '藝文談暢',
              href: 'http://floatingprojectscollective.net/art-notes/'
            },
            {
              en: 'Personally Speaking',
              zh: '私物語',
              href: 'http://floatingprojectscollective.net/personally-speaking/'
            },
            {
              en: 'Seriously Speaking',
              zh: '大聲發表',
              href: 'http://floatingprojectscollective.net/seriously-speaking/'
            },
            {
              en: 'Coffee Fantasia',
              zh: '咖啡經',
              href: 'http://floatingprojectscollective.net/coffee-fantasia/'
            },
            {
              en: 'Eat Well Drink Well Breathe Well',
              zh: '吃好喝好透心涼',
              href: 'http://floatingprojectscollective.net/eat-well-drink-well-breathe-well/'
            }
          ]
        },
        {
          offset: 25,
          title: {
            zh: '據點資源',
            en: 'Floating Resources',
          },
          children: [
            {
              en: 'Limited editions',
              zh: '限量版',
              href: 'http://floatingprojectscollective.net/limited/'
            },
            {
              en: 'Good things ',
              zh: '好東西',
              href: 'http://floatingprojectscollective.net/goodthings/'
            },
            {
              en: 'Floating Library ',
              zh: '書庫',
              href: 'http://floatingprojectscollective.net/library/'
            },
            {
              en: 'Media Archive',
              zh: '影像存庫',
              href: 'http://floatingprojectscollective.net/media-archive/'
            }
          ]
        },
        {
          offset: 80,
          title: {
            zh: '句點藝術群體',
            en: 'Floating Projects Collective'
          },
          href: 'http://floatingprojectscollective.net/collective/'
        }
      ]
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
    //
    // this.$http.get('http://floatingprojectscollective.net/wp-json/wp/v2/posts?per_page=3').then(res => {
    //   this.posts = res
    // })
  }
}
</script>

<style lang="stylus">
  @import './yolo/stylus/app.styl'
  body ,html
    margin 0
    padding 0

  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 40px;
    font-size 15px
    line-height 1.56

  // generic
  .row
    display flex

    .col-1-3
      padding 12px
      width 33.33%

    .col-2-3
      padding 12px
      width 66.66%

  .panel
    // border 1px solid #e1e1e1
    // border-radius 20px

    &__header
      font-size 20px
      font-weight bold
      padding 0 16px
      text-align center
      position relative

    &__content
      padding 20px 16px

    &__subtitle
      font-size 0.65em
      color #555

    &__blanket
      font-size 30px
      line-height 1
      font-weight bold
      position: absolute;
      left: 50px;
      top: 10px;
      opacity 0.7

      &.right
        right 50px
        left auto

  // specific
  .top-bar
    text-align: center
    position relative

  .top-bar-menu
    display inline-flex
    align-items center
    justify-content center
    margin-top 16px
    border-radius 40px
    border 1px solid #e1e1e1
    position relative
    z-index 10
    background white
    padding 16px 78px

    &__item
      margin 0 26px
      font-weight bold
      position relative

      &-title
        font-weight bold
        font-size 17px
        position relative

        > .vi-icon
          transition transform 0.3s
          margin-left 4px
          width 10px
          height @width

      &-subtitle
        font-size 0.8em

    .vi-menu__activator--active .top-bar-menu__item .vi-icon
      transform rotate(180deg)

  .top-bar-social
    position absolute
    right 30px
    top -60px
    opacity 0.6

  .hero-section
    height calc(100vh - 318px)
    margin-top -25px
    padding-top 65px
    padding-bottom 40px
    background #f5f5f5
    border-top 1px solid #e1e1e1

    &__container
      height 100%
      max-width 1100px
      margin 0 auto
      display flex
      align-items stretch

    &__l
      width 65%

      .VueCarousel, .VueCarousel-wrapper, .VueCarousel-inner, .VueCarousel-slide, .home-slide, .vi-imgs, .home-slide > a
        height 100%

    &__r
      width 35%
      padding-left 20px

  .bottom-section
    margin 0 auto
    max-width 1000px
    border-top 1px solid #e1e1e1
    // background #fffce5

  .slider
    background url('./assets/fp2-opening-event.jpg')
    background-size: auto 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;

  .footer
    background #414141
    color white

  .vi-container
    margin 0 auto
    padding 20px 0
    max-width 1000px

  .home-slide
    border-radius 20px
    overflow hidden
</style>
