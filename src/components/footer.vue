<template lang="pug">
  footer.footer
    vi-container
      vi-row(align-center justify-center)
        .footer-menu
          a(v-for="(item, i) in menu" :key="i" :href="item.href" target="_blank" class="footer-link")
            div {{item.zh_name}}
            div {{item.en_name}}
      div(class="mt-40" style="font-size: 14px") Floating Projects © Copyright 2016. All Rights Reserved
</template>

<script>
  export default {
    name: 'site-footer',
    data () {
      return {
        menu: [
          {
            zh_name: '關於據點。句點',
            en_name: 'About Floating Projects ',
            href: 'http://floatingprojectscollective.net/about/'
          },
          {
            zh_name: ' 理念論述',
            en_name: 'Conceptual Discourse ',
            href: 'http://floatingprojectscollective.net/conceptual-discourse/'
          },
          {
            zh_name: ' 傳媒說據點',
            en_name: 'Press Coverage ',
            href: 'http://floatingprojectscollective.net/press-coverage/'
          },
          {
            zh_name: ' 聯絡我們',
            en_name: 'Contact us ',
            href: 'http://floatingprojectscollective.net/contact/'
          }
        ]
      }
    }
  }
</script>

<style lang="stylus">
  .footer
    text-align center
    background #414141
    color white
    font-size 16px

  .footer-menu
    display inline-flex

    @media(max-width: 800px)
      display block

  .footer-link
    padding 10px 20px
</style>
