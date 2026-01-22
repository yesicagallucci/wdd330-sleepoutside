import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

const productId = getParam('product'); // gets ?product=880RR
const dataSource = new ProductData('tents'); // loads tents.json

const product = new ProductDetails(productId, dataSource);
product.init(); // fetch data, render, and set up add-to-cart

