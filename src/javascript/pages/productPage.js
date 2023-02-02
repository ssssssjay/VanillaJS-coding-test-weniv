// import { ProductItem } from '../components/Product/index.js';
import { ProductCard } from '../components/ProductCard/index.js';

class ProductPage {
  constructor() {
    this.mainElement = document.createElement('main');
    this.product = {};
  }

  // 전체 상품 가져오기
  async getProductData() {
    const response = await fetch(`http://test.api.weniv.co.kr/mall`);
    const data = await response.json();

    this.product = await data;
    console.log(data);
  }
  // 상품 리스트 세팅하기
  async setProductList() {
    await this.getProductData();
    // console.log(this.product);

    this.mainElement.classList.add('product');
    // console.log(this.mainElement);

    const productPageHeader = document.createElement('h1');
    productPageHeader.setAttribute('class', 'ir');
    productPageHeader.innerText = '상품목록 페이지';
    this.mainElement.appendChild(productPageHeader);

    const productList = document.createElement('ul');
    productList.setAttribute('class', 'product-list');

    // console.log(productList);

    this.product.forEach((item) => {
      const productItem = document.createElement('li');
      productItem.setAttribute('class', 'product-list');
      const productCard = new ProductCard(item);
      productItem.append(productCard.render());
      productList.appendChild(productItem);
    });

    this.mainElement.append(productList);
    // console.log(this.mainElement);
  }

  render() {
    // const container = document.createElement('div');
    // const element = document.createElement('h1');
    // element.innerText = '상품목록 페이지 입니다.';

    // const anchor1 = document.createElement('a');
    // anchor1.href = '/detail/1';
    // anchor1.innerText = '상품1 상세페이지로 이동';

    // container.appendChild(anchor1);

    // const anchor2 = document.createElement('a');
    // anchor2.href = '/detail/2';
    // anchor2.innerText = '상품2 상세페이지로 이동';

    // container.appendChild(anchor2);

    // const anchor3 = document.createElement('a');
    // anchor3.href = '/detail/3';
    // anchor3.innerText = '상품3 상세페이지로 이동';

    // container.appendChild(anchor3);

    // container.appendChild(element);

    this.setProductList();

    return this.mainElement;
  }
}

export default ProductPage;
