/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
class PostController {
  constructor () {
    this._postServices = new PostServices()
    this._postView = new PostView()
    this._elemento = document.querySelector('.ul')
    this._btn = document.querySelector('#send')
    this._description = document.querySelector('#description')
    this._p2 = document.querySelector('#p2')
    this._list = []

    this._init()
  }

  _init () {
    this._btn.addEventListener('click', e => {
      e.preventDefault()
      this.store()
    })
    // setInterval(() => {
    this.getAll()
    //  }, 2000)
  }

  async getAll () {
    this._postServices
      .getAll()
      .then(posts => this.loadAll(posts))
      .catch(erro => (this._mensagem.texto = erro))
  }

  handleLike (e) {
    this._postServices
      .like(e.dataset.id)
      .then(post => (e.dataset.badge = post.like))
  }

  async loadAll (posts) {
    this._postView
      .showAll(posts)
      .then(li => {
        this._elemento.innerHTML = li
      })
      .catch(w => console.log(w))
  }

  createElementFromHTML (htmlString) {
    var div = document.createElement('div')
    div.innerHTML = htmlString.trim()

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild
  }

  async loadOne (post) {
    this._elemento.prepend(
      this.createElementFromHTML(this._postView.showOne(post))
    )
  }

  async store () {
    const description = document.querySelector('#description').value
    if (!description) {
      alert('Description is Required!')
    }
    this._p2.style.display = 'block'
    this._postServices.post(description).then(post => {
      this.loadOne(post)
      this._description.value = ''
      this._p2.style.display = 'none'
      var snackbarContainer = document.querySelector('#demo-snackbar-example')

      var data = {
        message: 'Post Add!',
        timeout: 2000
      }
      snackbarContainer.MaterialSnackbar.showSnackbar(data)
    })
  }
}
