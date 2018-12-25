import BookGrid from 'pages/BookGrid'

export default ({ Vue }) => {
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
  Vue.prototype.$divineSearch = function promptSearch (text = '') {
    console.log(this)
    this.$q.dialog({
      title: 'Search',
      prompt: {
        model: text,
        type: 'text' // optional
      },
      cancel: true,
      color: 'secondary'
    }).then(data => {
      this.$router.push({ name: 'search', params: { query: data } })
    })
  }
}
