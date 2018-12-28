import NHentai from 'nhentai-api'

function getImageFormat (imageData) {
  if (imageData.t === 'j') {
    return 'jpg'
  } else {
    return 'png'
  }
}

export default ({ Vue }) => {
  console.log(new NHentai(true))
  Vue.prototype.$nh = new NHentai(true)
  Vue.prototype.$nh.getThumbnail = (book) => {
    return `https://t.nhentai.net/galleries/${book.media_id}/thumb.${getImageFormat(book.images.thumbnail)}`
  }
  Vue.prototype.$nh.getCover = (book) => {
    return `https://t.nhentai.net/galleries/${book.media_id}/thumb.${getImageFormat(book.images.cover)}`
  }
  Vue.prototype.$nh.getPage = (book, page) => {
    if (book.images.pages[page]) {
      return `https://i.nhentai.net/galleries/${book.media_id}/${page + 1}.${getImageFormat(book.images.pages[page])}`
    }
  }
  Vue.prototype.$nh.getPageThumb = (book, page) => {
    if (book.images.pages[page]) {
      return `https://t.nhentai.net/galleries/${book.media_id}/${page}t.${getImageFormat(book.images.pages[page])}`
    }
  }
  Vue.prototype.$nh.getRelatedBooks = (book) => {
    return `https://nhentai.net/api/gallery/${book.id}/related`
  }
  Vue.prototype.$nh.getLanguage = (book) => {
    for (let tag of book.tags) {
      if (tag.type === 'language' && tag.name !== 'translated') {
        return tag.name
      }
    }
    return 'english'
  }
  Vue.prototype.$nh.getFlagForLanguage = (lang) => {
    let flagMap = {
      english: require('../assets/flags/unitedkingdom.svg'),
      japanese: require('../assets/flags/japan.svg'),
      chinese: require('../assets/flags/china.svg')
    }
    console.log('flag', lang)
    return flagMap[lang] || flagMap[0]
  }
  Vue.prototype.$nh.getTagsOfType = (book, type) => {
    let tags = []

    for (let tag of book.tags) {
      if (tag.type === type) {
        tags.push(tag)
      }
    }

    return tags
  }
}
