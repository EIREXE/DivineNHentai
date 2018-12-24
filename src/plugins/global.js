import BookGrid from 'pages/BookGrid'
export default ({ Vue }) => {
  Vue.component('BookGrid', BookGrid)
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
