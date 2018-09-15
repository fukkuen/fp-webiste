<template lang="pug">
  .vi-imgs(:style="style")
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
          'height': this.height
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
