<template>
  <div>
    <portal to="title">
      {{ gallery.title.english }}
    </portal>
    <router-view :gallery="gallery"></router-view>
  </div>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'BookLayout',
  data () {
    return {
      gallery: null
    }
  },
  methods: {
    openURL,
    fetchData () {
      this.$nhttp.get(`https://nhentai.net/api/gallery/${this.$route.params.id}`).then((response) => {
        this.gallery = response.data
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.fetchData()
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style>
</style>
