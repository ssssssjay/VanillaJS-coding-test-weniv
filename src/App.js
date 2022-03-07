import MainProductList from './components/MainProductList.js';
import ProductDetails from './components/ProductDetails.js';

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = location
    console.log($target); // '<div id='root'>...</div> index.js에서 {$target : document.querySelector('#root')}로 넘겨준 값이다.
    console.log(pathname); // '/index.html'
    $target.innerHTML = ''; // root를 깨끗하게 비워주고 원하는걸 넣기위한 작업 hello world가 그래서 사라지게 됨
    if (pathname === '/index.html') {
      console.log('/index.html로 요청이 들어와 MainProductList를 렌더함')
      new MainProductList({ $target }).render();
    } 
    else if (pathname.indexOf('/products/') === 0) {
      console.log('/products/ 로 요청이 들어와 ProductDetails를 렌더링')
      const [ , , productId] = pathname.split('/'); // '/products/1'를 자르면 세개가 나온다.
      new ProductDetails({ $target, productId }).render();
    } 
    else if (pathname === '/cart') {
      console.log('/cart 로 요청이 들어와 CartAndPayments를 렌더링')
    }
  }
  this.route();
}
// 당장은 모든get요청에 대해 index.html을 줄수가없어서 위의 처리가 잘 되는지 확인이 불가능하다

// export default class App {
//   constructor($target) {
//     const { pathname } = location;
//     console.log(pathname);
//     $target.innerHTML = '';
//     if (pathname === '/') {
//       new MainProductList({ $target }).render();
//     } else if (pathname.indexOf('/products/') === 0) {
//       const [ , , productId] = pathname.split('/');
//       new ProductDetails({ $target }, productId).render();
//     }
//   } 
// }