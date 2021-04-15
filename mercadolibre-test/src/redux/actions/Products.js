import {
    FETCH_PRODUCTS_BEGIN,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_SUCCESS,
  } from "./types";
  import {baseUrl} from "../../constants/fileWithConstants";
  
export const fetchProducts = (Products) => (dispatch) => {
    dispatch(fetchProductsBegin());
    fetch(`${baseUrl}/api/items?q=${Products}`)
      .then((res) => res.json())
      .catch((err) =>(
            console.log(err)
      )
      )
      .then((data) => {
        dispatch(fetchProductsSuccess(data));
      });
  };

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});