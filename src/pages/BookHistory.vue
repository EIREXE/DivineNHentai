<template>
  <BookGrid :books="books"></BookGrid>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BookHistory',
  created () {
    console.log('stated', this.books)
  },
  computed: {
    ...mapState({
      books: state => state.userData.bookHistory
    })
  }
}
</script>

<style lang="scss">
.page {
  width: 100%;
  height: 100%;
}
</style>
