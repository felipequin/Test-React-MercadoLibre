import { combineReducers } from "redux";
import productsReducers from "./productsReducer";
import productReducers from "./productReducer";

export default combineReducers({
  products: productsReducers,
  product: productReducers,
});