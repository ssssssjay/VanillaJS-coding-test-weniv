export default function MainProductList({ $target }) {
  const $page = document.createElement('div');
  $page.classList.add('MainProductList');

  $page.innerHTML = `
    <h1>전체상품목록 컴포넌트의 제목입니다.</h1>
    <p class='class'>전체상품목록 컴포넌트의 문단입니다.</p>
    `;

  this.render = () => {
    $target.appendChild($page);
  }
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