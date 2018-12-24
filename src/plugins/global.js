export default ({ Vue }) => {
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
