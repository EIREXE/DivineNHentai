<template>
  <q-page>
    <q-list :dark="$divineIsDark()">
      <q-list-header>Appeareance</q-list-header>
      <q-item tag="label">
        <q-item-side>
          <q-checkbox :value="darkTheme" @input="setDarkTheme" />
        </q-item-side>
        <q-item-main>
          <q-item-tile label>DarkTheme</q-item-tile>
          <q-item-tile sublabel>Enables the dark theme</q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'PageAbout',
  computed: {
    ...mapState({
      darkTheme: state => state.settings.darkTheme
    })
  },
  methods: {
    ...mapActions('settings', ['setDarkTheme']),
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
