<template lang="pug">
  .oral-calendar
    vi-spinner(v-if="!monthBoard")
    template(v-else)
      .oral-calendar__title
        vi-button(@click="prev" icon text :disabled="index === 0" flat)
          vi-icon(name="left" size="16")
        .date(class="mx-20")
          .date__month {{month}} 月
          .date__year {{year}} 年
        vi-button(@click="next" icon text :disabled="isMax" flat)
          vi-icon(name="right" size="16")
      .oral-calendar__content(v-html="content")
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
      year () {
        if (!this.monthBoard) return
        return this.monthBoard[this.index].year
      },
      month () {
        if (!this.monthBoard) return
        return this.monthBoard[this.index].month
      },
      content () {
        if (!this.monthBoard) return
        return this.monthBoard[this.index].content
      },
      isMax () {
        const l = this.monthBoard && this.monthBoard.length
        return this.index >= l - 1
      }
    },
    methods: {
      prev () {
        if (this.index > 0) this.index--
      },
      next () {
        if (this.isMax) return
        this.index++
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
        console.log(this.monthBoard)
        this.monthBoard.sort((current, next) => {
          return current.YYYYMM > next.YYYYMM ? 1 : -1
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
  .oral-calendar
    border-radius 20px
    box-shadow 0 3px 30px -2px rgba(0,0,0,0.1)
    background #fffef7
    height: calc(100vh - 350px)
    overflow hidden

    @media (max-width 1000px)
      height auto

    &__title
      text-align center
      font-size 18px
      font-weight bold
      display flex
      align-items center
      justify-content center
      padding 15px 0
      border-bottom 1px solid rgba(0,0,0,0.1)

    &__content
      height calc(100% - 70px)
      padding 26px
      overflow-y scroll

  .date
    line-height 1
    // display flex

    &__year
      font-size 0.7em
      margin-top 5px
</style>
