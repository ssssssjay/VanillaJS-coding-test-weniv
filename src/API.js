// 게시물 Data : http://35.76.53.28:8080/mall
// 쿠폰 Data : http://35.76.53.28:8080/coupon
// fetch 기본형태는 아래와같다
// const promise = fetch(resource, [options])

// 강의에서 쓴 fetch예제 
// const fetchCat = async (text) => {
//   const OPEN_API_DOMAIN = "https://cataas.com";
//   const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
//   const responseJson = await response.json();
//   return `${OPEN_API_DOMAIN}/${responseJson.url}`;
// };

// const PRODUCT_API_IP = 'http://35.76.53.28:8080/mall';
// const COUPON_API_IP = 'http://35.76.53.28:8080/coupon';

// export const request = fetch(PRODUCT_API_DOMAIN)
// export const request = fetch('http://35.76.53.28:8080/mall')
//   .then(response => console.log(response))
//   .then(response => response.json())
//   .then(json => console.log(json))

export const requestProduct = async () => {
  const PRODUCT_API_IP = 'http://35.76.53.28:8080/mall';
  const productResponse = await fetch(PRODUCT_API_IP);
  const productResponseJson = await productResponse.json();
  return productResponseJson;
}