<template>
  <q-infinite-scroll :handler="loadMore">
    <portal to="toolbar-buttons">
        <q-btn flat round icon="search" @click="$divineSearch()"/>
    </portal>
    <q-pull-to-refresh :handler="refresh">
      <BookGrid :books="results"></BookGrid>
  </q-pull-to-refresh>
  <div class="row justify-center q-pa-md">
    <q-spinner :color="$divineIsDark ? 'white' : 'primary'" slot="message" :size="40"></q-spinner>
  </div>
  </q-infinite-scroll>
</template>

<script>
export default {
  name: 'PageAbout',
  data () {
    return {
      results: [],
      page: 0
    }
  },
  created () {
  },
  methods: {
    refresh (done) {
      this.results = []
      this.page = 0
      this.loadMore(null, done)
    },
    loadMore (index, done) {
      this.page++
      this.$nhttp.get(`https://nhentai.net/api/galleries/all?page=${this.page}`).then((response) => {
        this.results = this.results.concat(response.data.result)
        done()
      })
    }
  }
}
</script>

<style lang="scss">

</style>
