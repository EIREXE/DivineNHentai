<template>
    <div>
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
</template>

<script>

export default {
  name: 'BookCard',
  props: ['book']
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
