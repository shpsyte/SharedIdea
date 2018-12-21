class PostView {
  // constructor () {
  //   // this._elemento = element
  // }

  async showAll (model) {
    return ` ${model.docs.map(post => this.showOne(post)).join('')}  `
  }

  showOne (post) {
    return ` 
        <li class="mdl-list__item mdl-list__item--three-line">
            <span class="mdl-list__item-primary-content">
              <i class="material-icons  mdl-list__item-avatar">person</i>
              <span>${post.author ? post.author.name : 'Anonymous'}</span>
              <span class="mdl-list__item-text-body">
                ${post.description}
             </span>
            </span>
        </li>
     `
  }
}

// <span class="mdl-list__item-secondary-content">
//   <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">star</i></a>
// </span>
