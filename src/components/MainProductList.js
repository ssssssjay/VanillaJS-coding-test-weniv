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
    console.log(this.state[0])
    const $productList = document.createElement('ul')
    const $btnCart = document.createElement('button')
    $btnCart.classList.add('btn-cart')
    $btnCart.innerHTML = `<img src="./assets/icon-shopping-cart.svg">`
    $productList.classList.add('product-list');
    $page.appendChild($productList)
    $productList.innerHTML = `
      ${this.state.map(product => 
        `
        <li class='product-item soldout' data-test-data='${product.id}'>
          <img class='item__img' src="http://35.76.53.28:8080/${product.thumbnailImg}" alt="${product.productName}대표사진">
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
    $productList.appendChild($btnCart)
    /*
    const productList = new MainProductListRender({
      $target : $page,
      initialState : this.state
    })
    */
    // $productList.addEventListener('click', (e) => console.log(e.target.parentNode.dataset))
    $productList.addEventListener('click', this.handleClickItem)
  }

  this.handleClickItem = (e) => {
    const ID = e.target.parentNode.dataset
    console.log(ID);
    const $itemDetailModal = document.createElement('section')
    $itemDetailModal.innerHTML = `<h1 class='item-detail-modal'>${ID.testData} 제품상세페이지모달입니다.</h1>`
    $target.appendChild($itemDetailModal)
    const productDetail = this.state[ID.testData - 1]
    console.log(productDetail)
    $itemDetailModal.innerHTML = `
      <img src="http://35.76.53.28:8080/${productDetail.thumbnailImg}" alt="제품상세이미지">
      <h2>${productDetail.productName}</h2>
      <span>택배배송 / 무료배송</span>
      <select name="" id="">
        <option value="">옵션을 선택하세요</option>
        <option value="opt1">opt1</option>
        <option value="opt2">opt2</option>
      </select>
      <section class="section-price">
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
          <dd>01010101</dd>
          <dt>재고 수량</dt>
          <dd>230개</dd>
        </dl>
    `
    const $closeModalBtn = document.createElement('button')
    $closeModalBtn.innerHTML = `<img src="./assets/icon-delete.svg">`
    $closeModalBtn.addEventListener('click', closeModal)
    $itemDetailModal.appendChild($closeModalBtn)

    function closeModal(e) {
      // console.log(e.target.parentNode.parentNode)
      $itemDetailModal.remove()
    }
  }

  // 왜 이렇게 하면 this.state에 initialState가 안박힐까
  console.log(this.state) // undefined...

  // 페이지 생성시에 상품데이터 긁어오도록
  fetchProducts();

}

// 왜 이렇게 하면 this.state에 initialState가 안박힐까
// 다른건 문제가 없지만, 상태가 제대라오 안불러와짐
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
          <img class='item__img' src="http://35.76.53.28:8080/${product.thumbnailImg}" alt="${product.productName}대표사진">
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