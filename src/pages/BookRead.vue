<template>
  <q-page>
    <template v-if="gallery">
      <div class="q-pa-md row justify-center">
        <div class="column">
          <q-pagination v-model="page" :max="gallery.num_pages" :max-pages="6"/>
        </div>
      </div>
      <div class="row justify-center q-pa-none">
        <img @click="imgClick" ref="img" class="page" :src="$nh.getPage(parseInt(gallery.media_id), page)" alt="">
      </div>
      <div class="row justify-center q-pa-md">
        <q-pagination v-model="page" :max="gallery.num_pages" :max-pages="6"/>
      </div>
    </template>
  </q-page>
</template>

<script>

export default {
  name: 'PageAbout',
  data () {
    return {
      page: 1
    }
  },
  props: ['gallery'],
  methods: {
    imgClick (event) {
      if (event.layerX < this.$refs.img.getBoundingClientRect().width / 2) {
        if (this.page > 1) {
          this.page--
        }
      } else {
        if (this.page < this.gallery.num_pages) {
          this.page++
        }
      }
    }
  }
}
</script>

<style lang="scss">
.page {
  width: 100%;
  height: 100%;
}
</style>
