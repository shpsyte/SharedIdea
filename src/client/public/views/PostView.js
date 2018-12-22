/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

class PostView {
  // constructor () {
  //   // this._elemento = element
  // }

  async showAll (model) {
    return ` ${model.docs.map(post => this.showOne(post)).join('')}  `
  }

  showOne (post) {
    return ` 
        <li class="tweet mdl-list__item mdl-list__item--three-line">
            <span class="mdl-list__item-primary-content">
              <span class="mdl-list__item-text-body">
              <h4>
                ${post.description}
                </h4>
             </span>
            </span>
            <button  data-id="${
  post._id
}"onClick="postController.handleLike(this)"  class="mdl-badge" data-badge="${
  post.like
}"><i class="material-icons">
thumb_up_alt
</i> </button>

            
        </li>
     `
  }
}
//   <i class="material-icons  mdl-list__item-avatar">person</i>
// <span class="mdl-list__item-secondary-content">
//   <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">star</i></a>
// </span>
// <span>${post.author ? post.author.name : 'Anonymous'}    </span>
