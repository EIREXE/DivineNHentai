<template>
  <q-page :class="{'dark-bg': $divineGetPrimaryColor() === 'dark'}">
    <portal to="footer">
      <div class="q-pa-sm"><q-slider :min="0" @change="changePage" :max="gallery.num_pages - 1" :value="page" :step="1" label color="primary" /></div>
    </portal>
    <q-carousel v-if="gallery"
      v-model="page"
      color="white"
      infinite
      class="q-pa-none"
      height="full-height"
    >
      <q-carousel-slide class="q-pa-none" v-for="(page, i) in gallery.images.pages" :key="i" >
        <LoadingImage @imgClick="imgClick" class="book-page" :src="$nh.getPage(gallery, i)"/>
      </q-carousel-slide>

      <q-btn
        slot="quick-nav"
        slot-scope="props"
        color="white"
        flat
        dense
        :label="`${props.slide + 1}`"
        @click="props.goToSlide()"
        :class="{inactive: !props.current}"
      />
    </q-carousel>
  </q-page>
</template>

<script>
import { debounce } from 'quasar'
import { mapActions } from 'vuex'
export default {
  name: 'BookRead',
  data () {
    return {
      page: this.$route.query.initialPage || 0,
      loadPlaceHolders: false,
      currentPageURL: '',
      carouselHeight: 0
    }
  },
  created () {
    console.log(this.gallery)
    this.updateCurrentPageURL()
    this.addBookToHistory(this.gallery)
  },
  props: ['gallery'],
  methods: {
    ...mapActions('userData', [
      'addBookToHistory'
    ]),
    imgClick (event, img) {
      if (event.clientX < img.getBoundingClientRect().width / 2) {
        if (this.page > 0) {
          this.changePage(this.page - 1)
        }
      } else {
        if (this.page < this.gallery.num_pages - 1) {
          this.changePage(this.page + 1)
        }
      }
    },
    changePage (newPage = null) {
      if (newPage >= 0) {
        this.page = newPage
      }
      window.scrollTo(0, 0)
      this.updateCurrentPageURL()
    },
    updateCurrentPageURL: debounce(function () {
      this.currentPageURL = this.$nh.getPage(this.gallery, this.page)
      this.loadPlaceHolders = false
    }, 500),
    onImageLoaded () {
      this.loadPlaceHolders = true
    },
    getPagesToPreload () {
      const pages = []
      const PAGES_TO_PRELOAD = 5
      if (this.page > 0) {
        let oldPagestoPreload = PAGES_TO_PRELOAD
        if (oldPagestoPreload > this.page) {
          oldPagestoPreload = PAGES_TO_PRELOAD - (PAGES_TO_PRELOAD - this.page) - 1
        }
        let newPagesToPreload = PAGES_TO_PRELOAD
        if ((this.gallery.num_pages - this.page) < newPagesToPreload) {
          newPagesToPreload = PAGES_TO_PRELOAD - (PAGES_TO_PRELOAD - (this.gallery.num_pages - this.page)) - 1
        }
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

.book-page {
  width: 100% !important;
}
</style>
