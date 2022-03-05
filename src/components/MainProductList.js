import { requestProduct } from "../API.js";

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
    /*
    const {thumbnailImg, productName, price} = this.state[0]
    $productList.innerHTML = 
    `
      <li>
        <img src="http://35.76.53.28:8080/${thumbnailImg}" alt="testIMG">
        <h2>${productName}</h2>
        <span>
          <span>${price}</span>
          <span>원</span>
        </span>
        <button>❤️</button>
      </li>
    `
    */
    $productList.innerHTML = `
      ${this.state.map(product => 
        `
        <li class='product-item soldout'>
          <img class='item__img' src="http://35.76.53.28:8080/${product.thumbnailImg}" alt="${product.productName}대표사진">
          <h2 class='item__name'>${product.productName}
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
  }
  
  // 왜 이렇게 하면 this.state에 initialState가 안박힐까
  console.log(this.state)
  // 페이지 생성시에 상품데이터 긁어오도록
  fetchProducts();
}

// 왜 이렇게 하면 this.state에 initialState가 안박힐까
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
    $productList.innerHTML = 
        `
          <li>
            <img src="" alt="testIMG">
            <h2>testh2</h2>
            <span>
              <span>testSPAN</span>
              <span>testSPAN</span>
            </span>
            <button>testBTN</button>
          </li>
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