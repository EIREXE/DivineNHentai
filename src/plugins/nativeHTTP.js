function parseResponse (response) {
  response.data = JSON.parse(response.data)
  return response
}
export default ({ Vue }) => {
  Vue.prototype.$nhttp = {
    get (request) {
      return new Promise((resolve, reject) => {
        cordova.plugin.http.get(request, {}, {}, (response) => resolve(parseResponse(response)), (response) => { reject(response) })
      })
    }
  }
}
