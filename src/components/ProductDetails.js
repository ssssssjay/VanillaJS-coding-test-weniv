// export default class ProductDetails {
//   constructor({ $target , productId }) {
//     this.state = productId;
//     this.section = document.createElement('section');
//     $target.appendChild(this.section);
//     this.render();
//   }

//   render() {
//     this.section.innerHTML = "";
//     const text = document.createElement("h1");
//     text.innerText = "제품상세정보페이지입니다.";
//     this.section.appendChild(text);
//   }
// }

export default function ProductDetails({ $target, productId }) {
  this.state = {productId};
  const $page = document.createElement('div');
  $page.classList.add('ProductDetails');
  $page.innerHTML = '<h1>제품상세페이지 모달 컴포넌트</h1>'

  this.render = () => {
    $target.appendChild($page);
  }
}