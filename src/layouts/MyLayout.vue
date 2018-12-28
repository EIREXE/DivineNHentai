<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header reveal :reveal-offset="1">
      <portal-target name="toolbar">
        <q-toolbar
          :color="$divineGetPrimaryColor()">
          <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
          >
            <q-icon name="menu" />
          </q-btn>
          <portal-target class="q-toolbar-title" name="toolbar-content">
            <q-toolbar-title>
              <portal-target name="title">
                Divine
              </portal-target>
            </q-toolbar-title>
          </portal-target>
          <portal-target name="toolbar-buttons">
          </portal-target>
        </q-toolbar>
      </portal-target>

    </q-layout-header>

    <q-layout-footer reveal class="bg-dark disabled" :reveal-offset="1">
      <portal-target name="footer">
      </portal-target>
    </q-layout-footer>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? ($divineIsDark() ? 'bg-dark' : 'bg-grey-2') : null"
    >
      <q-list
        :dark="$divineIsDark()"
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
        <q-item exact :to="{ name: 'settings' }">
          <q-item-side icon="settings" />
          <q-item-main label="Settings"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container class="page-container" :class="{'dark-bg': $divineGetPrimaryColor() === 'dark'}">
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
.dark-bg {
  background-color: #1F1F1F;
}

.page-container {
  padding-bottom: 0px !important;
}
</style>
