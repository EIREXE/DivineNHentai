<template>
  <q-page :class="{'dark-bg': $divineGetPrimaryColor() === 'dark'}">
    <portal to="footer">
      <div class="q-pa-sm"><q-slider :min="1" @change="changePage" :max="gallery.num_pages" :value="page" :step="1" label color="primary" /></div>
    </portal>
    <template v-if="gallery">
      <div v-if="!loadPlaceHolders" class="row justify-center q-pa-md">
        <q-spinner color="white" slot="message" :size="40"></q-spinner>
      </div>
      <div class="row justify-center q-pa-none">
        <img  @click="imgClick" ref="img" class="page" :src="currentPageURL" @load="onImageLoaded()" alt=""/>
      </div>
    </template>
  <image-preloader v-if="loadPlaceHolders" v-for="p in getPagesToPreload()" :key="p" :src="p"/>
  </q-page>
</template>

<script>
import { debounce } from 'quasar'
import { mapActions } from 'vuex'
export default {
  name: 'BookRead',
  data () {
    return {
      page: 1,
      loadPlaceHolders: false,
      currentPageURL: ''
    }
  },
  created () {
    this.updateCurrentPageURL()
    this.addBookToHistory(this.gallery)
  },
  props: ['gallery'],
  methods: {
    ...mapActions('userData', [
      'addBookToHistory'
    ]),
    imgClick (event) {
      if (event.layerX < this.$refs.img.getBoundingClientRect().width / 2) {
        if (this.page > 1) {
          this.page--
          this.changePage()
        }
      } else {
        if (this.page < this.gallery.num_pages) {
          this.page++
          this.changePage()
        }
      }
    },
    changePage (newPage = null) {
      console.log('new page', newPage)
      if (newPage) {
        this.page = newPage
      }
      console.log('change page')
      window.scrollTo(0, 0)
      this.updateCurrentPageURL()
    },
    updateCurrentPageURL: debounce(function () {
      this.currentPageURL = this.$nh.getPage(this.gallery, this.page)
      console.log('url', this.currentPageURL)
      this.loadPlaceHolders = false
    }, 500),
    onImageLoaded () {
      console.log('image loaded, loading placeholders...')
      this.loadPlaceHolders = true
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
            pages.push(this.$nh.getPage(this.gallery, this.page - i - 1))
          }
        }
        if (newPagesToPreload > 0) {
          for (let i of [...Array(newPagesToPreload).keys()]) {
            pages.push(this.$nh.getPage(this.gallery, this.page + i + 1))
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
.dark-bg {
  background-color: #1F1F1F;
}
</style>
