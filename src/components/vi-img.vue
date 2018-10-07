<template lang="pug">
  .vi-img(:style="style")
    slot
</template>

<script>
  export default {
    name: 'vi-img',
    props: {
      src: {
        type: String,
        required: true
      },
      height: {
        default: '120px'
      },
      cover: {
        default: 'cover',
        type: String
      }
    },
    computed: {
      style () {
        return {
          'position': 'relative',
          'background-size': this.backgroundSize,
          'background-position': 'center',
          'background-image': 'url(' + this.src +')',
          'background-repeat': 'no-repeat',
          'height': this.height,
          'width': '100%'
        }
      },
      backgroundSize () {
        if (this.cover === 'height') {
          return 'auto 100%'
        } else if (this.cover === 'width') {
          return '100% auto'
        } else {
          return 'cover'
        }
      }
    }
  }
</script>

<style lang="stylus">
  .vi-img
    &:hover
      background #fff6e8
</style>
