class ProductLikeButton {
  constructor(id) {
    this.productId = id;
    this.liked = this.checkLikeList();
  }

  addClickEvent(likeButton) {
    likeButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // console.log('like!!', e.target);
      const likeList = JSON.parse(localStorage.getItem('likeList'));
      // if (this.liked) {
      //   this.liked = false;
      //   localStorage.setItem('likeList', JSON.stringify(likeList.filter((id) => id !== this.productId)));
      // } else {
      //   this.liked = true;
      //   likeList.push(this.productId);
      //   localStorage.setItem('likeList', JSON.stringify(likeList));
      // }
      this.liked = !this.liked;
      this.liked && likeList.push(this.productId);
      const newLikeList = this.liked ? likeList : likeList.filter((id) => id !== this.productId);
      localStorage.setItem('likeList', JSON.stringify(newLikeList));
      this.liked ? e.target.classList.add('on') : e.target.classList.remove('on');
    });
  }

  checkLikeList() {
    if (!localStorage.getItem('likeList')) {
      localStorage.setItem('likeList', JSON.stringify([])); // key - value (string)
    }
    const likeList = JSON.parse(localStorage.getItem('likeList'));
    return likeList.includes(this.productId);
  }

  render() {
    const likeButton = document.createElement('button');
    likeButton.setAttribute('class', 'like-btn');
    this.liked && likeButton.classList.add('on');

    const likeButtonIr = document.createElement('span');
    likeButtonIr.setAttribute('class', 'ir');
    likeButtonIr.innerText = '좋아요 버튼';

    likeButton.appendChild(likeButtonIr);
    this.addClickEvent(likeButton);

    return likeButton;
  }
}

export default ProductLikeButton;
