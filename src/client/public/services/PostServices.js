class PostServices {
  constructor () {
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
}
