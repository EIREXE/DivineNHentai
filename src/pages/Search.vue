<template>
  <q-infinite-scroll :handler="loadMore" ref="infiniteScroll">
    <portal to="title">
      <template v-if="isTagged">
        {{ $route.query.prettyTag }}
      </template>
      <template v-else>
        {{ $route.params.query }}
      </template>
    </portal>
    <portal to="toolbar-buttons" v-if="!isEditingSearch">
      <q-btn flat round icon="filter_list">
        <QPopover>
            <q-list link separator class="scroll" style="min-width: 100px">
              <q-item
                v-for="mode in sortModes"
                :key="mode.value" @click.native="$divineSearch(getQuery(), mode.value)">
                <q-item-main >
                  <span class="label" :class="{'text-primary': mode.value === getSortMode()}">{{mode.name}}</span>
                </q-item-main>
              </q-item>
          </q-list>
        </QPopover>
      </q-btn>
      <q-btn flat round icon="edit" @click="isEditingSearch = true"/>
    </portal>
    <portal to="toolbar-content" v-if="isEditingSearch">
        <q-search inverted icon="search" @change="(value) => {$divineSearch(value)}" dark :value="this.getQuery()" color="none" placeholder="Search" />
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
  name: 'Search',
  data () {
    return {
      results: [],
      page: 0,
      isTagged: false,
      isEditingSearch: false,
      sortModes: [
        {
          name: 'New',
          value: 'new'
        },
        {
          name: 'Popular',
          value: 'popular'
        }
      ]
    }
  },
  watch: {
    '$route' (to, from) {
      this.refresh()
    }
  },
  methods: {
    refresh (done = null) {
      this.results = []
      this.page = 0
      this.isEditingSearch = false
      if (this.$route.params.query) {
        this.$refs.infiniteScroll.resume()
        this.$refs.infiniteScroll.loadMore()
      } else {
        this.$refs.infiniteScroll.stop()
        this.isEditingSearch = true
      }
      if (done) {
        done()
      }
    },
    getQuery () {
      if (this.isTagged) {
        return `${this.$route.query.tagType}:${this.$route.query.prettyTag}`
      } else {
        return this.$route.params.query
      }
    },
    doSearch (value) {
      this.$refs.infiniteScroll.reset()
      this.$router.push({ name: 'search', params: { query: value }, query: { sort: this.getSortMode() } })
    },
    setSortMode (value) {
      if (value !== this.sortMode) {
        this.sortMode = value
      }
    },
    getSortMode () {
      if (this.$route.query.sort) {
        return this.$route.query.sort
      } else {
        return 'new'
      }
    },
    loadMore (index, done) {
      if (!this.$route.params.query) {
        this.$refs.infiniteScroll.stop()
        this.isEditingSearch = true
      } else {
        this.isTagged = this.$route.query.tagged === 'true'
        this.page++
        let searchType = 'search'
        let query = `?query=${this.$route.params.query}`
        if (this.isTagged) {
          searchType = 'tagged'
          query = `?tag_id=${this.$route.params.query}`
        }

        let sortString = ''
        if (this.getSortMode() !== 'new') {
          sortString = `&sort=${this.getSortMode()}`
        }
        this.$nhttp.get(`https://nhentai.net/api/galleries/${searchType}${query}&page=${this.page}${sortString}`).then((response) => {
          this.results = this.results.concat(response.data.result)
          if (done) {
            done()
          }
        })
      }
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
