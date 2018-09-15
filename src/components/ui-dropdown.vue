<template lang="pug">
  .ui-dropdown(
    @click="opened = true"
  )
    .ui-dropdown__activator(ref="activator")
      slot(name="activator")
    .ui-dropdown__menu(
      ref="menu" v-show="opened"
      :style="{'left': `${-offset}px`}"
      v-if="$slots.default"
    )
      slot
</template>

<script>
  export default {
    name: 'ui-dropdown',
    props: ['offset'],
    data () {
      return {
        opened: false
      }
    },
    methods: {
      close () {
        this.opened = false
      }
    },
    mounted () {
      document.addEventListener('click', (e) => {

      })
      // console.log(this.$refs.activator.offsetWidth)
      // if (this.$refs.menu) {
      //   this.offset = 100 - this.$refs.activator.offsetWidth/2
      // }
    }
  }
</script>

<style lang="stylus">
  .ui-dropdown
    position relative

    &__menu
      position absolute
      top 30px
      left 0
      width 200px
      padding 20px
      border 1px solid #e1e1e1
      background white
      box-shadow 0 3px 30px -2px rgba(0,0,0,0.1)
</style>
