<template>
  <BookGrid :books="books"></BookGrid>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BookHistory',
  computed: {
    ...mapState({
      books: state => state.userData.favoriteBooks
    })
  }
}
</script>

<style lang="scss">
</style>
