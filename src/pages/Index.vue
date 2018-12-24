<template>
    <q-infinite-scroll :handler="loadMore">
      <q-pull-to-refresh :handler="refresh">
        <q-page padding class="row">
        <!-- Content, in this case some <p> tags -->
        <div v-for="result in results" :key="result.id" class="col-xs-6 col-sm-3 q-pa-sm">
          <router-link :to="{name: 'book_info', params: {id: result.id}}">
          <q-card>
            <q-card-media>
              <img :src="$nh.getThumbnail(result)" class="thumbnail" alt="">
            </q-card-media>
            <q-card-title class="q-pa-sm">
              <p class="card-title q-subheading q-ma-none"><img :src="$nh.getFlagForLanguage($nh.getLanguage(result))" class="flag"> {{ result.title.english }}</p>
            </q-card-title>
            <q-card-separator />

          </q-card>
          </router-link>
        </div>

        <!--
          slot="message" for DOM element to display (in this example
          a dots spinner) when loading additional content
        -->
        <q-spinner-dots slot="message" :size="40"></q-spinner-dots>
      </q-page>
    </q-pull-to-refresh>
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
      this.$axios.get(`https://cors.io/?https://nhentai.net/api/galleries/all?page=${this.page}`).then((response) => {
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
