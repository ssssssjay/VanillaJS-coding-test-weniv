// import Test from './components/Test.js';
import MainProductList from './components/MainProductList.js';
import ProductDetails from './components/ProductDetails.js';

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

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = location
    console.log($target); // '<div id='root'>...</div>
    console.log(pathname); // '/'
    $target.innerHTML = ''; // root를 깨끗하게 비워주고 원하는걸 넣기위한 작업
    if (pathname === '/') {
      const [ , , productId] = pathname.split('/');
      new ProductDetails({ $target, productId }).render();
      // new MainProductList({ $target }).render();
    } else if (pathname.indexOf('/products/') === 0) {
      const [ , , productId] = pathname.split('/');
      new ProductDetails({ $target, productId }).render();
    } else if (pathname === '/sungjae') {
      console.log('haha');
      new MainProductList({ $target }).render();
    }
  }
  this.route();
}