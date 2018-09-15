<template lang="pug">
  .notice-board
    .notice-board__title
      button(@click="prev") prev
      div {{title}}
      button(@click="next") next
    .notice-board__content(v-html="content")
</template>

<script>
  export default {
    data () {
      return {
        monthBoard: null,
        index: 0
      }
    },
    computed: {
      title () {
        if (!this.monthBoard) return
        return this.monthBoard[this.index].time
      },
      content () {
        if (!this.monthBoard) return
        return this.monthBoard[this.index].content
      }
    },
    methods: {
      prev () {
        if (this.index > 0) this.index--
      },
      next () {
        const l = this.monthBoard && this.monthBoard.length
        console.log(l)
        if (this.index < l - 1) {
          console.log('??')
          this.index++
        }
      }
    },
    created () {
      this.$http.get('http://floatingprojectscollective.net/wp-json/wp/v2/pages/?parent=5253').then(res => {
        this.monthBoard = res.map(post => {
          const time = post.title.rendered
          const year = time.split('.')[1]
          const month = time.split('.')[0]
          return {
            time: post.title.rendered,
            content: post.content.rendered,
            year: parseInt(year),
            month: parseInt(month),
            YYYYMM: year + month
          }
        })
        this.monthBoard.sort((current, next) => {
          return current.YYYYMM > next.YYYYMM
        })
        // const cYear = new Date().getFullYear()
        // const cMonth = new Date().getMonth()
        const currentMonthBoard = this.monthBoard.find(b => {
          return b.year === new Date().getFullYear() && b.month === new Date().getMonth() + 1
        })
        const index = this.monthBoard.indexOf(currentMonthBoard)
        console.log(index)
        if (index !== -1) {
          this.index = index
        } else {
          this.index = this.monthBoard.length - 1
        }
      })
    }
  }
</script>

<style lang="stylus">
  .notice-board
    border-radius 20px
    box-shadow 0 3px 30px -2px rgba(0,0,0,0.1)
    background #fffef7
    height 100%
    overflow hidden
    // border-top 5px solid brown

    &__title
      text-align center
      font-size 18px
      font-weight bold
      display flex
      align-items center
      justify-content center
      padding 20px 0
      border-bottom 1px solid #e1e1e1

    &__content
      height 100%
      padding 20px
      overflow-y scroll
</style>
