import Vue from 'vue'
import Vuex from 'vuex'

import userData from './user-data'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      userData
    },
    plugins: [createPersistedState()]
  })

  return Store
}
