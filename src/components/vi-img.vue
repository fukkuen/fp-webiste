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
      }
    },
    computed: {
      style () {
        return {
          'position': 'relative',
          'background-size': 'cover',
          'background-position': 'center',
          'background-image': 'url(' + this.src +')',
          'height': this.height
        }
      }
    }
  }
</script>
