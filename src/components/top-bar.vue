<template lang="pug">
  .top-bar
    .top-bar-logo
      img(src="http://floatingprojectscollective.net/wp-content/uploads/2010/02/fp_logo_web.png" height="58" style="margin-right: 6px")
      // img(class="top-bar-logo__type" src="http://floatingprojectscollective.net/wp-content/uploads/2018/09/logotype-2018-09-15.png" height="50")
    .top-bar-menu
      .top-bar-social
        a(href="https://www.facebook.com/floatingprojects" target="_blank")
          vi-button(icon text)
            vi-icon(name="facebook" size="28")
        a(href="https://www.instagram.com/explore/locations/969213982/floating-projects/" target="_blank")
          vi-button(icon text)
            vi-icon(name="instagram" size="28")
        a(href="https://vimeo.com/floatingprojectsvideos" target="_blank")
          vi-button(icon text)
            vi-icon(name="vimeo" size="24")
      template(v-for="(item, i) in menu")
        vi-menu(v-if="item.children" :offset="item.offset" :nudge-bottom="28" :nudge-left="item.offset")
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
    .top-bar-mobile
      vi-button(class="mobile-menu-button" icon text @click="drawer = !drawer")
        vi-icon(name="menu")
      vi-drawer(v-model="drawer")
        template(v-for="(item, i) in menu")
          vi-expansion-panel(v-if="item.children" :offset="item.offset" :nudge-bottom="28" :nudge-left="item.offset")
            .top-bar-menu__item(slot="header")
              .top-bar-menu__item-title {{item.title.zh}}
              .top-bar-menu__item-subtitle {{item.title.en}}
            a(v-for="item in item.children" :href="item.href" target="_blank")
              vi-item(link height="70")
                vi-item-content
                  vi-item-title {{item.zh}}
                  vi-item-subtitle {{item.en}}
          div(v-else class="vi-expansion-panel")
            a(:href="item.href" target="_blank" class="vi-expansion-panel__header")
              .top-bar-menu__item
                .top-bar-menu__item-title {{item.title.zh}}
                .top-bar-menu__item-subtitle {{item.title.en}}
        .mobile-social
          a(href="https://www.facebook.com/floatingprojects" target="_blank")
            vi-button(icon text size="50")
              vi-icon(name="facebook" size="36")
          a(href="https://www.instagram.com/explore/locations/969213982/floating-projects/" target="_blank")
            vi-button(icon text size="50")
              vi-icon(name="instagram" size="36")
          a(href="https://vimeo.com/floatingprojectsvideos" target="_blank")
            vi-button(icon text size="50")
              vi-icon(name="vimeo" size="32")
</template>

<script>
  export default {
    name: 'top-bar',
    data () {
      return {
        drawer: false,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
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
          },
          {
            offset: 25,
            title: {
              zh: '關於',
              en: 'About'
            },
            children: [
              {
                zh: '關於據點。句點',
                en: 'About Floating Projects ',
                href: 'http://floatingprojectscollective.net/about/'
              },
              {
                zh: ' 理念論述',
                en: 'Conceptual Discourse ',
                href: 'http://floatingprojectscollective.net/conceptual-discourse/'
              },
              {
                zh: ' 傳媒說據點',
                en: 'Press Coverage ',
                href: 'http://floatingprojectscollective.net/press-coverage/'
              },
              {
                zh: ' 聯絡我們',
                en: 'Contact us ',
                href: 'http://floatingprojectscollective.net/contact/'
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style lang="stylus">
  .top-bar
    text-align: center
    position relative
    padding-top 40px

    @media(max-width 900px)
      padding-top 0

  .top-bar-logo
    @media(max-width 900px)
      transform scale(0.7) translateY(2px)

    &__type
      @media(max-width 480px)
        display none

  .top-bar-menu
    display inline-flex
    align-items center
    justify-content center
    margin-top 16px
    border-radius 40px
    border 1px solid #e1e1e1
    position relative
    z-index 2
    background white
    padding 16px 78px

    @media(max-width 1000px)
      padding 16px 40px

    @media(max-width 900px)
      display none

    &__item
      margin 0 26px
      position relative

      &:hover
        // color

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

  .top-bar-mobile
    @media(min-width 901px)
      display none

  .top-bar-social
    position absolute
    right 30px
    top -60px
    opacity 0.6

  .vi-drawer
    text-align left
    padding: 40px 0;

    .top-bar-menu__item-title
      font-size 21px

  .vi-expansion-panel__body
    background #fffaf3

  .vi-expansion-panel__header
    text-align left
    padding-left 0 !important

  .mobile-menu-button
    position absolute
    top 12px
    left 16px

  .mobile-social
    padding 20px
</style>
