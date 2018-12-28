<template>
  <q-page padding class="row">
    <BookCard v-for="book in books" :key="book.id" :book="book" class="col-xs-6 col-sm-3 q-pa-sm"/>
  </q-page>
</template>

<script>

export default {
  name: 'BookGrid',
  props: ['books']
}
</script>

<style lang="scss">
.page {
  width: 100%;
  height: 100%;
}

.card-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.thumbnail {
  height: auto;
  width: auto;
}

.flag {
  max-height: 1rem;
  vertical-align: middle;
}
</style>
