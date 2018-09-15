<template>
  <div class="VueCarousel-navigation">
    <vi-button
      icon outline
      class="VueCarousel-navigation-button VueCarousel-navigation-prev"
      v-on:click="triggerPageAdvance('backward')"
      :disabled="!canAdvanceBackward">
      <vi-icon name="left" size="14"/>
    </vi-button>
    <vi-button
      icon outline
      class="VueCarousel-navigation-button VueCarousel-navigation-next"
      v-on:click="triggerPageAdvance()"
      :disable="!canAdvanceForward">
      <vi-icon name="right" size="14"/>
    </vi-button>
  </div>
</template>

<script>
export default {
  name: "navigation",
  inject: ["carousel"],
  props: {
    /**
     * Amount of padding to apply around the label in pixels
     */
    clickTargetSize: {
      type: Number,
      default: 8
    },
    /**
     * Text content of the navigation next button
     */
    nextLabel: {
      type: String,
      default: "&#9654"
    },
    /**
     * Text content of the navigation prev button
     */
    prevLabel: {
      type: String,
      default: "&#9664"
    }
  },
  computed: {
    /**
     * @return {Boolean} Can the slider move forward?
     */
    canAdvanceForward() {
      return this.carousel.canAdvanceForward || false;
    },
    /**
     * @return {Boolean} Can the slider move backward?
     */
    canAdvanceBackward() {
      return this.carousel.canAdvanceBackward || false;
    }
  },
  methods: {
    /**
     * Trigger page change on +/- 1 depending on the direction
     * @param {"backward"} [direction]
     * @return {void}
     */
    triggerPageAdvance(direction) {
      /**
       * @event paginationclick
       * @type {string}
       */
      this.$emit("navigationclick", direction);
    }
  }
};
</script>

<style scoped>
.VueCarousel-navigation-button {
  position: absolute;
  top: 50%;
  background: white;
}

.VueCarousel-navigation-next {
  right: 30px;
  transform: translateY(-50%) translateX(100%);
  background: white;
}

.VueCarousel-navigation-prev {
  left: 30px;
  transform: translateY(-50%) translateX(-100%);
}

/* Define the "system" font family */
@font-face {
  font-family: system;
  font-style: normal;
  font-weight: 300;
  src: local(".SFNSText-Light"), local(".HelveticaNeueDeskInterface-Light"),
    local(".LucidaGrandeUI"), local("Ubuntu Light"), local("Segoe UI Symbol"),
    local("Roboto-Light"), local("DroidSans"), local("Tahoma");
}
</style>
