import { getLocalStorage, setLocalStorage, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

// Obtener el ID del producto desde la URL (?product=...)
const productId = getParam('product');

if (!productId) {
  // Si no hay ID en la URL, mostrar mensaje de error
  document.querySelector('main').innerHTML = '<h2>Error: Product not found. Use a valid link.</h2>';
} else {
  // Cargar y mostrar el producto
  dataSource.findProductById(productId)
    .then(product => {
      if (product) {
        renderProductDetails(product);
        setupAddToCart(product);
      } else {
        document.querySelector('main').innerHTML = '<h2>Product not found</h2>';
      }
    })
    .catch(error => {
      console.error('Error al cargar el producto:', error);
      document.querySelector('main').innerHTML = '<h2>>Error loading product</h2>';
    });
}

// Función para llenar los elementos HTML con los datos del producto
function renderProductDetails(product) {
  // Marca (Brand.Name)
  document.getElementById('productBrand').textContent = product.Brand.Name;

  // Nombre del producto
  document.getElementById('productName').textContent = product.NameWithoutBrand || product.Name;

  // Imagen principal
  const img = document.getElementById('productImage');
  img.src = product.Image;
  img.alt = product.Name;

  // Precio final
  document.getElementById('productPrice').textContent = `$${product.FinalPrice}`;

  // Color (el primero disponible)
  document.getElementById('productColor').textContent = product.Colors[0]?.ColorName || 'N/A';

  // Descripción (usa HTML si viene con tags)
  document.getElementById('productDescription').innerHTML = product.DescriptionHtmlSimple || product.Description;

  // Llenar el data-id del botón Add to Cart
  const button = document.getElementById('addToCart');
  if (button) {
    button.dataset.id = product.Id;
  }
}

// Función para manejar el carrito (la que ya tenías, un poco ajustada)
function addProductToCart(product) {
  let cart = getLocalStorage('so-cart') || [];

  const existingItem = cart.find(item => item.Id === product.Id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  setLocalStorage('so-cart', cart);
  alert('Producto agregado al carrito!'); // Temporal, después podemos mejorarlo con un mensaje bonito
}

// Setup del evento click en el botón (usando el handler que ya tenías)
function setupAddToCart(product) {
  const button = document.getElementById('addToCart');
  if (button) {
    button.addEventListener('click', async (e) => {
      // No necesitamos buscar de nuevo, ya tenemos el product del render
      addProductToCart(product);
    });
  }
}
