class ProductPrice {
  constructor(price, discountRate) {
    this.price = price;
    this.discountRate = discountRate;
  }

  render() {
    const productPriceContainer = document.createElement('div');
    productPriceContainer.setAttribute('class', 'product-price');

    const productPrice = document.createElement('strong');
    productPrice.setAttribute('class', `price m-price`);

    const priceType = document.createElement('span');
    priceType.innerText = '원';
    productPriceContainer.appendChild(productPrice);

    if (this.discountRate > 0) {
      // 0 === no discount
      const discountRateContainer = document.createElement('div');
      discountRateContainer.setAttribute('class', 'price-discount');

      const originPrice = document.createElement('strong');
      originPrice.setAttribute('class', 'price-strikethrough');
      originPrice.innerText = this.price;

      const discountRateDisplay = document.createElement('strong');
      discountRateDisplay.setAttribute('class', 'discount-rate');
      discountRateDisplay.innerText = this.discountRate + '%';

      this.price = this.price - this.price * (0.01 * this.discountRate);

      discountRateContainer.append(originPrice);
      discountRateContainer.append(priceType.cloneNode(true));
      discountRateContainer.append(discountRateDisplay);
      productPriceContainer.append(discountRateContainer);
    }

    productPrice.innerText = this.price;
    productPrice.appendChild(priceType);

    return productPriceContainer;
  }
}

export default ProductPrice;
