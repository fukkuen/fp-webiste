<template lang="pug">
  vi-container.event-detail
    .input-group
      label Event Title
      vi-input(v-model="form.title" placeholder="Event Title")
    .input-group
      label Feature Image
      croppa(ref="croppa" @newImage="uploadProfileImage" :width="300" :height="210" :quality="2")
        img(slot="initial" :src="form.imageUrl")
      vi-button(@click="uploadProfileImage") upload
    .input-group
      label HTML
      vue-editor(v-model="form.html" @imageAdded="handleImageAdded" :useCustomImageHandler="true")
    .input-group
      label Category(s)
      vi-select(v-model="form.cats" placeholder="Slot Title" :options="$store.state.eventCats" chip)
    .slot-group(v-for="s in form.slots")
      .input-group
        label Start Date
        vi-date-picker(v-model="s.startDate")
      .input-group
        label End Date
        vi-date-picker(v-model="s.endDate")
        vi-button(@click="s.endDate = null") Clear
      .input-group
        label Title (optional)
        vi-input(v-model="s.slotTitle" placeholder="Slot Title")
    vi-button(@click="addSlot") Add another time slot
    div
      vi-button(@click="edit" color="brand" v-if="isEdit") Update
      vi-button(@click="create" color="brand" v-else) Create Event
</template>

<script>
import Croppa from "vue-croppa";

const genSlot = () => {
  return {
    startDate: null,
    endDate: null,
    slotTitle: ''
  }
}
import { VueEditor } from "vue2-editor";
export default {
  name: 'event-detail-view',

  components: {
    croppa: Croppa.component,
    VueEditor
  },

  // provide eventId = Edit Mode
  props: ['eventId'],

  data () {
    return {
      form: {
        title: '',
        html: '',
        cats: [],
        imageUrl: '',
        slots: [],
        uploadingImage: false
      }
    }
  },

  computed: {
    isEdit () {
      return !!this.eventId
    }
  },

  methods: {
    async fetchEdit () {
      if (!this.eventId) return
      await this.$store.dispatch('FETCH_EVENT_DETAIL', {
        eventId: this.eventId
      })
      this.$store.getters.event(this.eventId)
      const {title, html, cats, imageUrl, slots} = this.$store.getters.event(this.eventId)
      this.form.title = title
      this.form.html = html
      this.form.cats = cats
      this.form.imageUrl = imageUrl
      this.form.slots = JSON.parse(JSON.stringify(slots))
    },

    async edit () {
      const payload = {...this.form, ...{eventId: this.eventId}}
      this.$store.dispatch('EDIT_EVENT', {form: payload})
    },

    async create () {
      this.$store.dispatch('CREATE_EVENT', {form: this.form})
    },

    addSlot () {
      this.form.slots.push(genSlot())
    },

    uploadProfileImage () {
      console.log('uploadProfileImage')
      if (!this.$refs.croppa.hasImage()) return

      const filename = this.$refs.croppa.getChosenFile().name

      this.$refs.croppa.generateBlob(file => {
        console.log(file)
        this.uploadingImage = true
        this.$store.dispatch('UPLOAD_IMAGE', {
          file: file,
          filename
        }).then(res => {
          this.uploadingImage = false
          this.form.imageUrl = res
          // this.showMessage('success', 'Profile image uploaded')
          // remove the image, otherwise @new-image-drawn event will not be triggered if the user upload another image
          this.$refs.croppa.remove()
        }).catch(reason => {
          this.uploadingImage = false
          // this.showMessage('fail', 'Profile image upload fail')
        })
      })
    },

    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      const url = await this.$store.dispatch('UPLOAD_IMAGE', {
        file: file
      })
      Editor.insertEmbed(cursorLocation, 'image', url);
      resetUploader();
    }
  },

  created () {
    console.log('gu', this.isEdit, this.eventId)
    if (this.isEdit) this.fetchEdit()
  }
}
</script>

<style lang="stylus">
  .input-group
    display flex
    align-items flex-start
    margin-bottom 20px

    > label
      width 180px
      flex-shrink 0
      padding-top 8px

    > .vi-input
      width 400px

  .slot-group
    margin-top 40px
    padding-top 40px
    border-top 1px solid #e1e1e1

  .quillWrapper
    height 500px
    margin-bottom 80px

  canvas
    border 1px solid #e1e1e1
</style>
