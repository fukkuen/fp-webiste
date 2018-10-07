<template lang="pug">
  vi-container.member-list
    vi-spinner(v-if="!members")
    vi-row(wrap)
      vi-col(xs4 v-for="(m,i) in members" :key="i")
        .member-item
          vi-img(:src="m.image" height="300px")
          h3 {{m.member_name}}
</template>

<script>
  export default {
    name: 'member-list',
    data () {
      return {
        members: null
      }
    },
    created () {
      this.$http.get('/members').then(res => {
        this.members = res
      })
    }
  }
</script>

<style lang="stylus">

</style>
