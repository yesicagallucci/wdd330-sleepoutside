// ../js/product-listing.js
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

// Carga header y footer
loadHeaderFooter();

// Obtiene la categoría desde el URL (ej: ?category=tents)
const category = getParam('category');

// Instancia ProductData (para conectar con API)
const dataSource = new ProductData();

// Selecciona el contenedor donde se van a renderizar los productos
const listElement = document.querySelector('.product-list');

// Instancia ProductList con la categoría, la fuente de datos y el contenedor
const myList = new ProductList(category, dataSource, listElement);

// Inicializa para mostrar los productos
myList.init();
