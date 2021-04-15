/**
 * @desc   Api encargado de las repsuestas de los servicios expuestos en la api Node para mercado Libre
 * @author  William Quintero
 * @since   2021
 */
const author = require("../models/author.json");
/**
 * @desc    Envio de Productos con el formato Solicitado a la Aplicación Front-End Formato Json
 *
 * @param   {object | array} results
 */
exports.successProducts = (results) => {
  var categories = getCategories(results);
  var items = getItems(results);
  return {
    author,
    categories,
    items,
  };
};
/**
 * @desc    Envio de Producto con el formato Solicitado a la Aplicación Front-End Formato Json
 *
 * @param   {object | array} results
 */
exports.successProduct = (results) => {
  var item = getItem(results);
  console.log(results);
  return {
    author,
    item,
  };
};

/**
 * @desc    Control de envio de errores 
 *
 * @param   {string} message
 * @param   {number} statusCode
 */
exports.error = (message, statusCode) => {
  // Listado de codigos de http
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];

  // Buscar si el codigo enviado fue de http si no enviar genericamente el 500
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    message,
    code: statusCode,
    error: true,
  };
};

/**
 * @desc    Envio de validacion del response
 *
 * @param   {object | array} errors
 */
exports.validation = (errors) => {
  return {
    message: "Validation errors",
    error: true,
    code: 422,
    errors,
  };
};

/**
 * @desc    funcion encargada de recorrer el JSON y armar la trama de salida de categorias
 *
 * @param   {object | array} categories
 */
function getCategories(results) {
  var categories = [];
  if (results["data"]["filters"].length > 0) {
    results["data"]["filters"][0]["values"].forEach((obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        if (key == "path_from_root") {
          value.forEach((obj) => {
            Object.entries(obj).forEach(([key, value]) => {
              if (key == "name") {
                categories.push(value);
              }
            });
          });
        }
      });
    });
  }

  return categories;
}
/**
 * @desc    funcion encargada de recorrer el JSON y armar la trama de salida del producto
 *
 * @param   {object | array} results
 */

function getItem(results) {
  var price = {
    currency: results.data.item.currency_id,
    amount: Math.floor(results.data.item.price),
    decimals: results.data.item.price - Math.floor(results.data.item.price),
  };
  var categories = [];
  if (results["data"]["categories"]["path_from_root"].length > 0) {
    results["data"]["categories"]["path_from_root"].forEach((obj) => {
      categories.push(obj.name);
    });
  }

  var item = {
    id: results.data.item.id,
    title: results.data.item.title,
    price,
    picture: results.data.item.thumbnail,
    condition: results.data.item.condition,
    free_shipping: results.data.item.shipping.free_shipping,
    sold_quantity: results.data.item.sold_quantity,
    description: results.data.description.plain_text,
    categories,
  };
  return item;
}

/**
 * @desc    funcion encargada de recorrer el JSON y armar la trama de salida de los productos
 *
 * @param   {object | array} results
 */

function getItems(results) {
  var items = [];
  results["data"]["results"].forEach((obj) => {
    var price = {
      currency: obj.currency_id,
      amount: Math.floor(obj.price),
      decimals: obj.price - Math.floor(obj.price),
    };
    var item = {
      id: obj.id,
      title: obj.title,
      price,
      picture: obj.thumbnail,
      condition: obj.condition,
      free_shipping: obj.shipping.free_shipping,
    };
    items.push(item);
  });
  return items;
}
