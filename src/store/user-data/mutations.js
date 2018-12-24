/*
export function someMutation (state) {
}
*/
export function addBookToFavorites (state, book) {
  state.favoriteBooks.unshift(book)
  console.log('add book to fav', book.title.english)
}

export function removeBookFromFavorites (state, book) {
  console.log('remove book to fav', book.title.english)
  let idx = state.favoriteBooks.findIndex((foundBook) => {
    return book.id === foundBook.id
  })
  if (idx !== -1) {
    state.favoriteBooks.splice(idx, 1)
  }
  console.log(state.favoriteBooks)
}

export function addBookToHistory (state, book) {
  let idx = state.bookHistory.findIndex((foundBook) => {
    return book.id === foundBook.id
  })
  if (idx !== -1) {
    state.bookHistory.splice(idx, 1)
  }
  state.bookHistory.unshift(book)
}
