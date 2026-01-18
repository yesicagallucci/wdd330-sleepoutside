import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // 1. Obtener lo que ya hay en el carrito. Si está vacío, usar un arreglo []
  const cartItems = getLocalStorage("so-cart") || [];

  // 2. Agregar el nuevo producto al arreglo
  cartItems.push(product);

  // 3. Guardar el arreglo completo de nuevo en localStorage
  setLocalStorage("so-cart", cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
