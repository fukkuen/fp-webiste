<template lang="pug">
  #app
    .top-bar
      .top-bar-logo
        img(src="./assets/logo.png" height="58" style="margin-right: 6px")
        img(src="./assets/logotype.png" height="50")
      .top-bar-menu
        .top-bar-social
          a(href="https://www.facebook.com/floatingprojects" target="_blank")
            vi-icon(name="facebook" size="28" color="#d7d7d7")
          a(href="https://www.instagram.com/explore/locations/969213982/floating-projects/" target="_blank")
            vi-icon(name="instagram" size="28" color="#d7d7d7")
          // vi-icon(name="medium" size="30")
        ui-dropdown(v-for="item in menu" :offset="item.offset")
          .top-bar-menu__item(slot="activator")
            .top-bar-menu__item-title {{item.title.zh}}
            .top-bar-menu__item-subtitle {{item.title.en}}
          div(v-for="item in item.children")
            .title {{item.zh}}
            .subtitle {{item.en}}
    .hero-section
      .hero-section__container
        .hero-section__l
          .slider
        .hero-section__r
          .notice-board
            .notice-board__title 9月 2018
            .notice-board__content(v-html="notice")
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
export default {
  name: 'App',

  data () {
    return {
      notice: null,
      posts: null,
      monthBoard: null,
      menu: [
        {
          offset: 80,
          title: {
            zh: '打開門',
            en: 'Floating Events'
          },
          children: [
            {
              en: 'WIP Inspection',
              zh: '句點。定期發表'
            },
            {
              en: 'Artistic Productions',
              zh: '實驗場'
            },
            {
              en: 'Workshops',
              zh: '工作室'
            },
            {
              en: 'Stock-taking',
              zh: '點子上倉'
            },
          ]
        },
        {
          offset: 80,
          title: {
            zh: '據點一杯茶',
            en: 'Floating Teatime',
          },
          children: []
        },
        {
          offset: 80,
          title: {
            zh: '據點資源',
            en: 'Floating Resources',
          },
          children: []
        },
        {
          offset: 80,
          title: {
            zh: '句點藝術群體',
            en: 'Floating Projects Collective'
          },
          children: []
        }
      ]
    }
  },

  created () {
    // get the monthly board
    this.$http.get('http://floatingprojectscollective.net/wp-json/wp/v2/pages/?parent=5253').then(res => {
      this.monthBoard = res
    })

    this.$http.get('http://floatingprojectscollective.net/wp-json/wp/v2/posts?per_page=3').then(res => {
      this.posts = res
    })
  }
}
</script>

<style lang="stylus">
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

  .vi-item
    text-decoration none
    color #414141
    margin 10px 0
    display block
    line-height 1.2
    position relative
    &:not(:last-child)
      margin-bottom 16px

    &__title
      font-size 18px
      font-weight bold

    &__subtitle
      font-size 14px
      margin-top 6px
      color #777777

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
      margin 0 20px
      font-weight bold
      position relative

      &-title
        font-weight bold
        font-size 17px

      &-subtitle
        font-size 0.8em

      &-dropdown
        position absolute
        top 70px
        left 0
        width 170px
        padding 20px
        border 1px solid #e1e1e1
        background white
        box-shadow 0 3px 30px -2px rgba(0,0,0,0.1)

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

    &__r
      width 35%
      padding 20px

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

  .notice-board
    padding 20px
    border-radius 20px
    box-shadow 0 3px 30px -2px rgba(0,0,0,0.1)
    background #fffef7
    // border-top 5px solid brown

    &__title
      text-align center
      font-size 18px
      font-weight bold

  .footer
    background #414141
    color white

  .vi-container
    margin 0 auto
    padding 20px 0
    max-width 1000px
</style>
