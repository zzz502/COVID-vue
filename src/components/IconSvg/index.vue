,<template>
  <svg aria-hidden="true" class="svg-icon" >
    <use :xlink:href="icon"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon-svg',
  props: {
    name: {
      type: String,
      //required: true
    }
  },
  computed: {
    icon () {
      return `#icon-${this.name}`
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  /* 通过给svg 图形元素设置fill= currentColor 图形元素的颜色会自动继承父级color的颜色 */
  overflow: hidden;

}
</style>
