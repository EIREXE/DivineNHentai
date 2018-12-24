/*
export function someAction (context) {
}
*/
export function addBookToFavorites ({ commit }, book) {
  commit('addBookToFavorites', book)
}

export function removeBookFromFavorites ({ commit }, book) {
  commit('removeBookFromFavorites', book)
}
export function addBookToHistory ({ commit }, book) {
  commit('addBookToHistory', book)
}
