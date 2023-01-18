class ProductPage {
  render() {
    const container = document.createElement('div');
    const element = document.createElement('h1');
    element.innerText = '상품목록 페이지 입니다.';

    const anchor = document.createElement('a');
    anchor.href = './detail';
    anchor.innerText = '상품 상세페이지로 이동';

    container.appendChild(anchor);
    container.appendChild(element);

    return container;
  }
}

export default ProductPage;
