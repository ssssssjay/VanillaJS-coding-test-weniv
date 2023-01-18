class ProductDetail {
  render() {
    const container = document.createElement('div');
    const element = document.createElement('h1');
    element.innerText = '상품상세 페이지 입니다.';

    const anchor = document.createElement('a');
    anchor.href = './';
    anchor.innerText = '상품 목록페이지로 이동';

    container.appendChild(anchor);
    container.appendChild(element);

    return container;
  }
}
export default ProductDetail;
