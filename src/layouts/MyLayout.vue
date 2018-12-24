<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          <portal-target name="title">
            Divine
          </portal-target>
        </q-toolbar-title>
        <portal-target name="toolbar-buttons">
        </portal-target>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-item exact :to="{ name: 'index' }">
          <q-item-side icon="home" />
          <q-item-main label="Home"/>
        </q-item>
        <q-item @click.native="$divineSearch()">
          <q-item-side icon="search" />
          <q-item-main label="Search" />
        </q-item>
        <q-item exact :to="{ name: 'history' }">
          <q-item-side icon="history" />
          <q-item-main label="History" />
        </q-item>
        <q-item exact :to="{ name: 'favorites' }">
          <q-item-side icon="favorite" />
          <q-item-main label="Favorites" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
