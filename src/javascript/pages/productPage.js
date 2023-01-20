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
  }
  // 상품 리스트 세팅하기
  async setProductList() {
    await this.getProductData();
    console.log(this.product);

    this.mainElement.classList.add('product');
    // console.log(this.mainElement);
    this.mainElement.innerHTML = `
      <h1 class='ir'>상품목록 페이지</h1>
      <ul class='product-list'></ul>
    `;
    const productList = this.mainElement.querySelector('.product-list');
    console.log(productList);
    this.product.forEach((item) => {
      const productDetailLink = document.createElement('a');
      productDetailLink.href = `/detail/${item.id}`;
      productDetailLink.innerHTML = `
        <li class='product-item'>
          <div class='product-img'>
            <img src='http://test.api.weniv.co.kr/${item.thumbnailImg}' alt='상품이미지'
          </div>
          <strong class='product-name'>${item.productName}</strong>
          <div class='product-price'>
            <strong class='price m-price'>${item.price}<span>원</span></strong>
          </div>
        </li>
      `;
      productList.append(productDetailLink);
    });
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
