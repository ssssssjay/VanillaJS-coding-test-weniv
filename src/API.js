// fetch 기본형태는 아래와같다
// const promise = fetch(resource, [options])

// 데이터 불러오기 연습용 코드
// export const request = fetch(PRODUCT_API_DOMAIN)
//   .then(response => console.log(response))
//   .then(response => response.json())
//   .then(json => console.log(json))

const PRODUCT_API_IP = 'http://35.76.53.28:8080';
const COUPON_API_IP = 'http://35.76.53.28:8080/coupon';

const requestProduct = async () => {
  const productResponse = await fetch(`${PRODUCT_API_IP}/mall`);
  const productResponseJson = await productResponse.json();
  return productResponseJson;
};

export { PRODUCT_API_IP, COUPON_API_IP, requestProduct };