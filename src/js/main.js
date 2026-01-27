console.log("hola desde main.js");

import ProductData from "./ProductData.mjs";
const dataSource = new ProductData("tents");
async function loadData() {
  const list = await dataSource.getData();
  console.log(list);
}

loadData();
