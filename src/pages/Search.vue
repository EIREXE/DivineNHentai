<template>
  <q-infinite-scroll :handler="loadMore">
    <portal to="title">
      <template v-if="isTagged">
        {{ $route.query.prettyTag }}
      </template>
      <template v-else>
        {{ $route.params.query }}
      </template>
    </portal>
    <portal to="toolbar-buttons">
        <q-btn flat round icon="edit" @click="$divineSearch(getQuery())"/>
    </portal>
    <q-pull-to-refresh :handler="refresh">
      <BookGrid :books="results"></BookGrid>
    </q-pull-to-refresh>
    <div class="row justify-center q-pa-md">
      <q-spinner slot="message" :size="40"></q-spinner>
    </div>
  </q-infinite-scroll>
</template>

<script>

export default {
  name: 'Search',
  data () {
    return {
      results: [],
      page: 0,
      isTagged: false
    }
  },
  watch: {
    '$route' (to, from) {
      this.refresh()
    }
  },
  methods: {
    refresh (done) {
      this.results = []
      this.page = 0
      this.loadMore(null, done)
    },
    getQuery () {
      if (this.isTagged) {
        return `${this.$route.query.tagType}:${this.$route.query.prettyTag}`
      } else {
        return this.$route.params.query
      }
    },
    loadMore (index, done) {
      this.isTagged = this.$route.query.tagged === 'true'
      this.page++
      let searchType = 'search'
      let query = `?query=${this.$route.params.query}`
      if (this.isTagged) {
        searchType = 'tagged'
        query = `?tag_id=${this.$route.params.query}`
      }
      this.$nhttp.get(`https://nhentai.net/api/galleries/${searchType}${query}&page=${this.page}`).then((response) => {
        this.results = this.results.concat(response.data.result)
        done()
      })
    }
  }
}
</script>

<style lang="scss">
.card-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.thumbnail {
  height: 15rem;
  width: auto;
}

.flag {
  max-height: 1rem;
  vertical-align: middle;
}
</style>
