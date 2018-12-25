<template>
  <q-page padding class="row">
    <div v-for="book in books" :key="book.id" class="col-xs-6 col-sm-3 q-pa-sm">
      <router-link :to="{name: 'book_info', params: {id: book.id}}">
      <q-card :color="$divineIsDark() ? 'dark' : null">
        <q-card-media>
          <img :src="$nh.getThumbnail(book)" class="thumbnail" alt="">
        </q-card-media>
        <q-card-title class="q-pa-sm">
          <p class="card-title q-subheading q-ma-none"><img :src="$nh.getFlagForLanguage($nh.getLanguage(book))" class="flag"> {{ book.title.english }}</p>
        </q-card-title>
        <q-card-separator />

      </q-card>
      </router-link>
    </div>
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
