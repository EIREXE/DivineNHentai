import BookGrid from 'pages/BookGrid'

export default ({ Vue, app }) => {
  Vue.component('BookGrid', BookGrid)
  Vue.prototype.$divineGetPrimaryColor = function () {
    if (this.$store.state.settings.darkTheme) {
      return 'dark'
    } else {
      return 'primary'
    }
  }
  Vue.prototype.$divineIsDark = function () {
    return this.$store.state.settings.darkTheme
  }
  Vue.prototype.$divineSearch = function divineSearch (text, sortMode = 'new') {
    let params = {}
    if (text) {
      params.query = text
    }
    console.log('txt', text)
    this.$router.push({ name: 'search', params: params, query: { sort: sortMode } })
  }
}
