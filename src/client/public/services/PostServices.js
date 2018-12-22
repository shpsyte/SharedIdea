// eslint-disable-next-line no-unused-vars
class PostServices {
  constructor () {
    // eslint-disable-next-line no-undef
    this._api = new Api()
    this.url = '/post'
  }

  async getAll () {
    return this._api.get(this.url).then(res => res)
  }

  async post (description) {
    return this._api
      .post(this.url, { description: description })
      .then(res => res)
  }

  async like (id) {
    return this._api.post(`/like/${id}`).then(res => res)
  }
}
