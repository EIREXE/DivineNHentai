<template>
  <div>
    <img ref="img" @click="onImgClick" class="full-width page-image" :src="src" alt="" @load="visible = false">
    <q-inner-loading :visible="visible">
      <q-spinner size="50px" color="primary"></q-spinner>
    </q-inner-loading>
  </div>
</template>

<script>
export default {
  name: 'LoadingImage',
  data () {
    return {
      visible: true
    }
  },
  methods: {
    onImgClick (clickData) {
      this.$emit('imgClick', clickData, this.$refs.img)
    }
  },
  props: ['src']
}
</script>

<style lang="scss">
.page-image {
  margin: none !important;
}
</style>
