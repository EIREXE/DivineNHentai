import NHentai from 'nhentai-api'
import JSSoup from 'jssoup'
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
  Vue.prototype.$nh.parseNhentaiGallery = (text) => {
    let soup = new JSSoup(text)
    let scripts = soup.findAll('script')
    for (let script of scripts) {
      let scriptText = script.text.trim()
      if (scriptText.startsWith('var gallery')) {
        scriptText = scriptText.split('var gallery = new N.gallery(')[1]
        scriptText = scriptText.split(');')[0]
        return JSON.parse(scriptText)
      }
    }
  }

  Vue.prototype.$nh.parseNhentaiList = (text) => {
    let soup = new JSSoup(text)
    let galleries = soup.findAll('div', 'gallery')
    var results = []

    var id2lang = {
      '6346': 'japanese',
      '12227': 'english',
      '29963': 'chinese'
    }

    for (let gallery of galleries) {
      let cover = gallery.contents[0]
      console.log(cover)
      let img = cover.contents[0]
      let mediaId
      if ('data-src' in img.attrs) {
        mediaId = img.attrs['data-src'].split('/')
      } else {
        mediaId = img.attrs['src'].split('/')
      }
      mediaId = parseInt(mediaId[mediaId.length - 2])

      let tags = gallery.attrs['data-tags'].split(' ')
      var langKeys = Object.keys(id2lang)
      var language = 'english'
      for (let tag of tags) {
        if (langKeys.includes(tag)) {
          language = id2lang[tag]
        }
      }

      let title = ''
      title = cover.contents[2]
      if (!title) {
        title = cover.contents[1]
      }
      title = title.text
      var format
      if ('data-src' in img.attrs) {
        format = img.attrs['data-src'].split('.')
      } else {
        format = img.attrs['src'].split('.')
      }
      format = format[format.length - 1]
      if (format === 'jpg') {
        format = 'j'
      } else {
        format = 'p'
      }
      let result = {
        id: parseInt(cover.attrs.href.split('/')[2]),
        media_id: mediaId,
        images: {
          thumbnail: {
            t: format
          }
        },
        title: {
          english: title
        },
        tags: [
          {
            type: 'language',
            name: language
          }
        ]
      }
      results.push(result)
    }
    return results
  }
}
