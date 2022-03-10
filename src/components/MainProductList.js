import { PRODUCT_API_IP, COUPON_API_IP, requestProduct } from "../API.js";

export default function MainProductList({ $target }) {
  const $page = document.createElement('section');
  $page.classList.add('main-product-list');
  $page.innerHTML = `
    <h1 class='sr-only'>전체상품목록 컴포넌트의 제목입니다.</h1>
    `;

  this.render = () => {
    $target.appendChild($page);
  }

  this.setState = (nextState) => {
    this.state = nextState;
  }

  const fetchProducts = async () => {
    const products = await requestProduct();
    this.setState(products)
    console.log(this.state)
    
    const $productList = document.createElement('ul')
    const $btnCart = document.createElement('button')
    
    $productList.classList.add('product-list');
    $btnCart.classList.add('btn-cart')
    $btnCart.innerHTML = `<img src="./assets/icon-shopping-cart.svg">`

    $page.appendChild($productList)
    $productList.innerHTML = `
      ${this.state.map(product => 
        `
        <li class='product-item' data-test-data='${product.id}'>
          <img class='item__img' src="${PRODUCT_API_IP}/${product.thumbnailImg}" alt="${product.productName}대표사진">
          <h2 class='item__name sl-ellipsis'>${product.productName}</h2>
          <div class'item__price'>
          <span class='number'>${product.price}</span>
          <span class='currency'>원</span>
          </div>
          <button class='item__btn-like'>
            <img src="./assets/icon-heart.svg">
          </button>
        </li>
        `).join('')}
    `
    $productList.appendChild($btnCart)
    $btnCart.addEventListener('click', this.handleClickCart)
    /* 안되는코드
    const productList = new MainProductListRender({
      $target : $page,
      initialState : this.state 얘가 잘 전달을 못하는 듯?
    })
    */
    $productList.addEventListener('click', this.handleClickItem)
  }
  // likeList = localStorage.getItem('likeList')
  let scrollPosition = 0;
  let likeList = [];
  localStorage.setItem('likeList', JSON.stringify(likeList))
  this.handleClickItem = (e) => {
    // 리스트 요소가 아니면 반환해주기
    if(e.target.closest('li') == null) {
      return;
    }
    const ID = +e.target.closest('li').dataset.testData // 숫자화 시켜주려고 +붙임. 아마도 문자열로 가져오는듯
    console.log(e);
    console.log(e.target);
    console.log(e.target.parentNode.className);

    const $mainPage = document.querySelector('.main-product-list')
    scrollPosition = window.pageYOffset;
    $mainPage.style.overflow = 'hidden';
    $mainPage.style.position = 'fixed';
    $mainPage.style.top = `-${scrollPosition}px`;
    $mainPage.style.width = '100%';
    $mainPage.style.overflowY = 'scroll'
    
    const savedLikeList = localStorage.getItem('likeList')
    if (e.target.parentNode.className === 'item__btn-like') {
      console.log(savedLikeList)

      if (!savedLikeList.includes(ID)) {
        e.target.src = "./assets/icon-heart-on.svg"
        // this.state[ID].isLike = true
        likeList.push(ID)
        console.log(likeList)
        localStorage.setItem('likeList', JSON.stringify(likeList))
      } else if(savedLikeList.includes(ID)) {
        e.target.src = "./assets/icon-heart.svg"
        // delete this.state[ID].isLike
        likeList = likeList.filter(i => i!==ID)
        console.log(likeList)
        localStorage.setItem('likeList', JSON.stringify(likeList))
      }
    } else {
      const productDetail = this.state[ID - 1]
      const $modalContainer = document.createElement('div')
      const $itemDetailModal = document.createElement('section')
      const $closeModalBtn = document.createElement('button')
      $closeModalBtn.innerHTML = `<img src="./assets/icon-delete.svg">`
      
      // console.log(Object.keys(productDetail.option)) 
      // 배열을 반환
      // console.log(Object.keys(productDetail.option).length) 
      // 요걸로 옵션 분기처리
      
      $modalContainer.classList.add('modal-container')
      $itemDetailModal.classList.add('modal-content')
      
      $modalContainer.appendChild($itemDetailModal)
      $target.appendChild($modalContainer)
      
      $itemDetailModal.innerHTML = `
        <img src="${PRODUCT_API_IP}/${productDetail.thumbnailImg}" alt="제품대표이미지" class='img-product__detail'>
        <h2 class="tit-product__detail">${productDetail.productName}</h2>
        <section class="section-price">
          <span class="price-product__detail">${productDetail.price}</span><span>원</span>
        </section>
        <span>택배배송 / 무료배송</span>
        <select name="" id="">
          <option value="">옵션을 선택하세요</option>
          <option value="opt1">opt1</option>
          <option value="opt2">opt2</option>
        </select>
        <section class="section-total__price">
          <span>총 상품 금액</span>
          <span>총 수량 <strong>1</strong>개</span>
          <span>${productDetail.price}</span>
        </section>
        <section class="section-btn">
          <button>바로 구매</button>
          <button><img src="./assets/icon-shopping-cart.svg"></button>
          <button><img src="./assets/icon-heart.svg"></button>
        </section>
        <section>
          <dl>
            <h2>상품정보</h2>
            <dt>상품 번호</dt>
            <dd>00000${productDetail.id}</dd>
            <dt>재고 수량</dt>
            <dd>${productDetail.stockCount}개</dd>
          </dl>
        </section>
        <section>
          <img src="${PRODUCT_API_IP}/${productDetail.detailInfoImage[0]}" alt="제품상세이미지">
          <img src="${PRODUCT_API_IP}/${productDetail.detailInfoImage[1]}" alt="제품상세이미지">
          <img src="${PRODUCT_API_IP}/${productDetail.detailInfoImage[2]}" alt="제품상세이미지">
        </section>
      `
      $itemDetailModal.appendChild($closeModalBtn)
      $closeModalBtn.addEventListener('click', closeModal)
  
      function closeModal() {
        $modalContainer.remove()
        $mainPage.style.removeProperty('overflow');
        $mainPage.style.removeProperty('position');
        $mainPage.style.removeProperty('top');
        $mainPage.style.removeProperty('width');
        window.scrollTo(0, scrollPosition);
      }
    }
  }
  this.handleClickCart = (e) => {
    console.log('hahahah')
    $page.innerHTML = ``
  }

  // 페이지 생성시에 상품데이터 긁어오도록
  fetchProducts();
}

// 위에서 this.state를 넘겨줌에도 불구하고, 아래에선 초기상태가 세팅이 안됨. 호출스택?과 관련이 있나? 아래는 사용안함
function MainProductListRender({ $target, initialState }) {
  const $productList = document.createElement('ul')
  $productList.classList.add('productList');
  $target.appendChild($productList)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    console.log(this.state)
    $productList.innerHTML = `
      ${this.state.map(product => 
      `
        <li class='product-item soldout' data-test-data='${product.id}'>
          <img class='item__img' src="${PRODUCT_API_IP}/${product.thumbnailImg}" alt="${product.productName}대표사진">
          <h2 class='item__name sl-ellipsis'>${product.productName}
            <button class='item__btn-like'>
              <img src="./assets/icon-heart.svg">
            </button>
          </h2>
          <div class'item__price'>
            <span class='number'>${product.price}</span>
            <span class='currency'>원</span>
          </div>
        </li>
      `).join('')}
    `
  }

  this.render()
}

// export default class MainProductList {
//   constructor({ $target }) {
//     this.section = document.createElement('section');
//     $target.appendChild(this.section);
//     this.render();
//   }

//   render() {
//     this.section.innerHTML = "";
//     const text = document.createElement("h1");
//     text.innerText = "전체상품목록입니다.";
//     this.section.appendChild(text);
//   }
// }