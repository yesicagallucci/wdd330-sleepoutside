// ProductDetails.mjs
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    // 1. Get product details
    this.product = await this.dataSource.findProductById(this.productId);

    // 2. Render the product HTML
    this.renderProductDetails();

    // 3. Add event listener to Add to Cart button
    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  renderProductDetails() {
    // Use the HTML in index.html as a template
    // Replace static text with values from this.product
    document.getElementById('productName').textContent = this.product.Name;
    document.getElementById('productPrice').textContent = `$${this.product.Price}`;
    // etc...
  }

  addProductToCart() {
    // Move the logic from product.js here
    // e.g., localStorage cart update
  }
}
