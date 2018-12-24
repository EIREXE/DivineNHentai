<template>
  <q-page>
    <template v-if="gallery">
      <div class="row justify-center q-pa-none">
        <img @click="imgClick" ref="img" class="page" :src="$nh.getPage(parseInt(gallery.media_id), page)" alt="">
      </div>
      <div class="row justify-center q-pa-md">
        <q-pagination v-model="page" :max="gallery.num_pages" :max-pages="6"/>
      </div>
    </template>
  <image-preloader v-for="p in getPagesToPreload()" :key="p" :src="p"/>
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
    },
    getPagesToPreload () {
      const pages = []
      const PAGES_TO_PRELOAD = 5
      if (this.page > 0) {
        let oldPagestoPreload = PAGES_TO_PRELOAD
        if (oldPagestoPreload > this.page) {
          oldPagestoPreload = PAGES_TO_PRELOAD - (PAGES_TO_PRELOAD - this.page) - 1
          console.log('old', oldPagestoPreload)
        }
        let newPagesToPreload = PAGES_TO_PRELOAD
        if ((this.gallery.num_pages - this.page) < newPagesToPreload) {
          newPagesToPreload = PAGES_TO_PRELOAD - (PAGES_TO_PRELOAD - (this.gallery.num_pages - this.page)) - 1
        }
        console.log('new', newPagesToPreload)
        if (oldPagestoPreload > 0) {
          for (let i of [...Array(oldPagestoPreload).keys()]) {
            pages.push(this.$nh.getPage(parseInt(this.gallery.media_id), this.page - i - 1))
          }
        }
        if (newPagesToPreload > 0) {
          for (let i of [...Array(newPagesToPreload).keys()]) {
            pages.push(this.$nh.getPage(parseInt(this.gallery.media_id), this.page + i + 1))
          }
        }
      }
      console.log(pages)
      return pages
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
