export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const products = await this.dataSource.getData(this.category);

      this.listElement.innerHTML = "";

      // Cambiar título
      const pageTitle = document.querySelector(".page-title");
      if (pageTitle) {
        pageTitle.textContent =
          "Top Products: " + this.capitalize(this.category);
      }

      products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        const image =
          product.Images?.PrimaryMedium ??
          product.Images?.PrimarySmall ??
          "";

        const price =
          product.ListPrice ??
          product.SuggestedRetailPrice ??
          "Price not available";

        card.innerHTML = `
          <a href="../product/index.html?id=${product.Id}">
            <img src="${image}" alt="${product.Name}" />
            <h3>${product.Name}</h3>
            <p>$${price}</p>
          </a>
        `;

        this.listElement.appendChild(card);
      });
    } catch (error) {
      console.error(error);
      this.listElement.innerHTML =
        "<p>Products could not be loaded.</p>";
    }
  }

  capitalize(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
