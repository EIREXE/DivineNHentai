<template>
  <q-page>
    <q-card>
      <router-link :to="{ name: 'book_read', params: { id: gallery.id } }">
        <q-card-media>
          <q-parallax :src="$nh.getCover(gallery)" :height="300">
            <div slot="loading">Loading...</div>
          </q-parallax>
        </q-card-media>
      </router-link>
      <q-card-title class="relative-position">
        <div>{{gallery.title.english}}</div>
        <div slot="right" class="row items-center">

          <q-btn round color="primary" @click="addBookToFavorites(gallery)" v-if="!isInFavorites()" icon="favorite_border" />
          <q-btn round color="primary" v-else @click="removeBookFromFavorites(gallery)" icon="favorite" />
        </div>
      </q-card-title>
      <q-card-separator></q-card-separator>
      <q-card-title class="relative-position">
        <div>{{gallery.title.japanese}}</div>
      </q-card-title>
      <q-card-separator></q-card-separator>
      <q-card-main>
        <q-field v-for="(tagLabel, tagTypeName) in tagTypes" v-if="$nh.getTagsOfType(gallery, tagTypeName).length > 0" label-width="3" :key="tagTypeName" :label="tagLabel + ':'" orientation="horizontal">
          <div class="row gutter-xs justify-left">
            <div class="tag-field" v-for="tag in $nh.getTagsOfType(gallery, tagTypeName)" :key="tag.name" v-if="tag.type === tagTypeName">
              <router-link :to="{name: 'search', params: {query: tag.id}, query: { tagged: 'true', prettyTag: tag.name, tagType: tag.type } }">
                <q-chip color="primary">{{ tag.name }}</q-chip>
              </router-link>
            </div>
          </div>
        </q-field>
      </q-card-main>
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PageAbout',
  data () {
    return {
      page: 1,
      tagTypes: {
        parody: 'Parodies',
        character: 'Characters',
        group: 'Groups',
        category: 'Categories',
        artist: 'Artists',
        tag: 'Tags'
      }
    }
  },
  props: ['gallery'],
  computed: {
    ...mapState({
      favoriteBooks: state => state.userData.favoriteBooks
    })
  },
  methods: {
    ...mapActions('userData', ['addBookToFavorites', 'removeBookFromFavorites']),
    isInFavorites (book) {
      for (let book of this.favoriteBooks) {
        console.log('favs', book)
        if (book.id === this.gallery.id) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang="scss">
.page {
  width: 100%;
  height: 100%;
}

.tag-field:empty {
  display: none;
}
</style>
